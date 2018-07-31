import ViInput from '../vi-input'
import ViMenu from '../vi-menu'
import ViIcon from '../vi-icon'
import '../vi-icon/collection/navigation/down'
import {ViItem, ViItemAction, ViItemAvatar, ViItemContent} from '../vi-item'
import ViChip from '../vi-chip'
import selectGenerator from './select-generator'

export default {
  name: 'vi-select',
  mixins: [selectGenerator],
  components: {
    ViInput, ViItem, ViItemAction, ViItemAvatar, ViItemContent, ViMenu, ViIcon, ViChip
  },
  props: {
    value: [String, Array, Number],
    searchValue: '',
    options: Array,
    optionName: {
      default: 'name'
    },
    optionValue: {
      default: 'value'
    },
    cacheMultiple: {
      type: [Boolean, String],
      default: false
    },
    placeholder: {
      default: 'Select'
    },
    mandatory: {
      default: true
    },
    chip: false,
    allowCreate: false,
    autoComplete: false,
    line: false,
    nudgeBottom: {
      type: [Number, String],
      default: 0
    },
    disabled: false,
    readonly: false,
    prefixIcon: String,
    collapseMultiple: false,
    darker: Boolean,
    header: String,
    minWidth: [String, Number],
    attach: {
      type: null,
      default: false
    },
    minimal: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      cacheValue: '',
      search: '',
      opened: false,
      isFocused: false
    }
  },
  computed: {
    selection () {
      if (this.isPrimitive) return this.value
      if (this.multiple) {
        // if (typeof value === 'undefined') return []
        return this.cacheValue.map(v => this.options.find(o => o[this.optionValue] === v))
      } else {
        return this.options.find(o => o[this.optionValue] === this.cacheValue)
      }
    },
    filteredOptions () {
      if (!this.autoComplete) return this.options
      const search = this.search.toString().toLowerCase()
      if (search.trim() === '') return this.options
      return this.options.filter(option => {
        return option[this.optionName].toLowerCase().indexOf(search) !== -1
      })
    },
    multiple () {
      return Array.isArray(this.value)
    },
    isPrimitive () {
      if (!this.options) return true
      return this.options.length > 0 && typeof this.options[0] === 'string'
    },
    isEdited () {
      const a = JSON.stringify(this.value)
      const b = JSON.stringify(this.cacheValue)
      return a !== b
    },
    hasInput () {
      return this.autoComplete || this.allowCreate || this.extraSearch
    },
    // get extra input value while having a multiple tag
    extraSearch () {
      return this.$listeners.search
    },
    // the display and the keydown handler will change under this state
    isCollapsingChip () {
      return this.collapseMultiple && this.selection.length > 1
    }
  },
  methods: {
    getOptionValue (opt) {
      if (!opt) return
      return this.isPrimitive ? opt : opt[this.optionValue]
    },
    getOptionName (opt) {
      if (!opt) return
      return this.isPrimitive ? opt : opt[this.optionName]
    },
    cloneValue () {
      if (this.isPrimitive || !this.multiple) {
        this.cacheValue = this.value
      } else {
        this.cacheValue = this.value.slice()
      }
    },
    isSelected (opt) {
      const v = this.getOptionValue(opt)
      if (this.multiple) {
        if (this.cacheValue.length === undefined) {
          throw new Error('for multiple mode please use array')
        }
        return this.cacheValue.includes(v)
      } else {
        if (!this.cacheValue) return false
        return this.cacheValue === v
      }
    },
    toggle (opt) {
      if (this.isSelected(opt)) this.remove(opt)
      else this.add(opt)
      if (this.autoComplete) {
        this.$refs.input.focus()
      }
      if (!this.cacheMultiple) this.$emit('input', this.cacheValue)
    },
    add (opt) {
      const v = this.getOptionValue(opt)
      if (this.multiple) {
        this.cacheValue.push(v)
      } else {
        this.cacheValue = v
      }
    },
    remove (opt) {
      const v = this.getOptionValue(opt)
      if (this.multiple) {
        this.cacheValue.splice(this.cacheValue.indexOf(v), 1)
      } else {
        if (!this.mandatory) {
          this.cacheValue = this.isPrimitive ? '' : {}
        }
      }
    },
    /*
      a very customized function for multiple select
      select the new option and clear all others and close the dropdown
      i.e. usage in admin panel: no team filter
     */
    hardSelect (opt) {
      const v = this.getOptionValue(opt)
      this.cacheValue = [v]
      this.$emit('input', this.cacheValue)
      this.opened = false
    },
    /**
     * When select is used without options, a close button is there for reset
     */
    reset () {
      this.search = ''
      this.$emit('input', [])
      this.$emit('search', '')
    },
    onClick () {
      this.opened = true
    },
    handleClose () {
      this.opened = false
    },
    handleBlur () {
      this.$emit('blur')

      // if allow create, add the value and clear the search
      if (this.allowCreate && this.search) {
        this.add(this.search)
        this.search = ''
        // TODO put this emit input logic into one place
        if (!this.cacheMultiple) this.$emit('input', this.cacheValue)
      }

      // if auto complete, clear the search
      if (this.autoComplete && this.search) {
        this.search = ''
      }
    },
    onKeydown (e) {
      if (!this.hasInput) return

      // Open the dropdown if closed
      if (!this.opened) {
        this.opened = true
      }

      // on Enter, Comma, Semicolon
      const confirmKeys = [13] // TODO: 186, 188 is not working (the search is not cleared afterward)
      if (confirmKeys.includes(e.keyCode) && this.search && this.allowCreate) {
        // TODO trim
        const content = this.search
        this.search = ''
        console.log(this.search)
        if (this.cacheValue.includes(content)) return
        this.add(content)
      }

      // on BACKSPACE
      if (e.keyCode === 8 && !this.isCollapsingChip) {
        if (this.search === '' && this.cacheValue.length > 0) {
          this.remove(this.cacheValue[this.cacheValue.length - 1])
        }
      }

      if (!this.cacheMultiple) this.$emit('input', this.cacheValue)
    }
  },
  created () {
    this.cloneValue()
  },
  watch: {
    value () {
      this.cloneValue()
    },
    searchValue (v) {
      this.search = v
    }
  },
  render (h) {
    if (!this.options) {
      return this.genInputBox()
    }
    return h('div', {
      staticClass: 'vi-select'
    }, [h('vi-menu', {
      props: {
        contentClass: this.cacheMultiple ? 'vi-menu__content--multiple' : '',
        closeOnContentClick: !this.multiple,
        nudgeBottom: this.nudgeBottom,
        minWidth: this.minWidth,
        value: this.opened,
        attach: this.attach
      },
      on: {
        input: (v) => {
          this.opened = v
        }
      }
    }, [
      this.genInputBox(),
      this.genMenu()
    ])])
  }
}
