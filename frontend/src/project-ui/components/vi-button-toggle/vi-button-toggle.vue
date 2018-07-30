<script>
  export default {
    name: 'vi-button-toggle',

    model: {
      prop: 'inputValue',
      event: 'change'
    },

    data () {
      return {
        buttons: [],
        listeners: []
      }
    },

    props: {
      inputValue: {
        required: false
      },
      items: {
        type: Array,
        default: () => []
      },
      mandatory: Boolean,
      multiple: Boolean
    },

    computed: {
      classes () {
        return {
          'btn-toggle': true,
          'btn-toggle--selected': this.hasValue
        }
      },
      hasValue () {
        return (this.multiple && this.inputValue.length) ||
          (!this.multiple && this.inputValue !== null &&
            typeof this.inputValue !== 'undefined')
      }
    },

    watch: {
      inputValue: {
        handler () {
          this.update()
        },
        deep: true
      }
    },

    methods: {
      isSelected (i) {
        const item = this.getValue(i)
        if (!this.multiple) {
          return this.inputValue === item
        }

        return this.inputValue.includes(item)
      },
      updateValue (i) {
        console.log('update value', i)
        const item = this.getValue(i)
        if (!this.multiple) {
          if (this.mandatory && this.inputValue === item) return
          return this.$emit('change', this.inputValue === item ? null : item)
        }

        const items = this.inputValue.slice()

        const index = items.indexOf(item)
        if (index > -1) {
          items.length >= 1 && !this.mandatory && items.splice(index, 1)
        } else {
          items.push(item)
        }

        this.$emit('change', items)
      },
      getValue (i) {
        return ('value' in this.buttons[i]) && !!this.buttons[i].value
          ? this.buttons[i].value
          : i
      },
      update () {
        console.log('update')
        this.buttons
          .forEach((elm, i) => {
            // Fix for testing, dataset does not exist on elm?
            if (!elm.dataset) elm.dataset = {}

            if (this.isSelected(i)) {
              elm.setAttribute('data-selected', true)
              elm.classList.add('vi-button--active')
            } else {
              elm.removeAttribute('data-selected')
              elm.classList.remove('vi-button--active')
            }

            elm.dataset.index = i
          })
      }
    },

    mounted () {
      const options = { passive: true }
      this.buttons = this.$slots.default
        .filter(vnode => vnode.tag !== undefined)
        .map((vnode, i) => {
          this.listeners.push(this.updateValue.bind(this, i))
          vnode.elm.addEventListener('click', this.listeners[i], options)
          return vnode.elm
        })

      this.update()
    },

    render (h) {
      return h('div', { class: this.classes }, this.$slots.default)
    }
  }
</script>
