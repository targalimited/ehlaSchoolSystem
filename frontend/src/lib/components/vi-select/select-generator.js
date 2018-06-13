export default {
  methods: {
    genInputBox () {
      if (this.$scopedSlots.activator) {
        return this.$createElement('div', {
          slot: 'activator'
        }, this.$scopedSlots.activator({
          opened: this.opened
        }))
      }

      let data = {
        staticClass: 'vi-input vi-input--select',
        class: {
          'vi-input--line': this.line,
          'vi-input--darker': this.darker,
          'vi-input--selected': this.selection
        }
      }
      // we dont need menu when no option is provided
      if (this.options) data.slot = 'activator'
      const children = [this.genSelection()]

      let icon

      if (this.options) {
        icon = this.$createElement('vi-icon', {
          staticClass: 'vi-icon--caret',
          props: {
            name: 'down'
          }
        })
      } else {
        icon = this.$createElement('vi-icon', {
          staticClass: 'vi-icon--clear',
          props: {
            name: 'clear'
          },
          directives: [{
            name: 'show',
            value: this.selection.length
          }],
          nativeOn: {
            click: e => {
              e.stopPropagation()
              this.$refs.input.focus()
              this.reset()
            }
          }
        })
      }

      const suffixIcon = this.$createElement('span', {
        staticClass: 'vi-input__suffix'
      }, [icon])
      children.push(suffixIcon)


      if (this.prefixIcon) {
        const icon = this.$createElement('vi-icon', {
          props: {
            name: this.prefixIcon
          }
        })
        children.unshift(this.$createElement('span', {
          staticClass: 'vi-input__prefix'
        }, [icon]))
      }

      return this.$createElement('div', data, children)
    },
    genSearch () {
      const hasValue = this.multiple ? this.value.length > 0 :
        this.value !== '' || typeof value !== 'undefined'

      const data = {
        ref: 'input',
        staticClass: 'vi-input__inner',
        attrs: {
          disabled: this.disabled || !this.hasInput,
          readonly: this.readonly
        },
        domProps: {
          value: this.search
        },
        directives: [
          {
            name: 'show',
            value: this.hasInput || (this.placeholder && !hasValue)
          }
        ]
      }

      if (this.hasInput) {
        data.on = {
          focus: () => {
            if (this.disabled || this.readonly || this.isFocused) return
            this.$emit('focus')
            this.isFocused = true
          },
          input: e => {
            this.search = e.target.value
            if (this.extraSearch) this.$emit('search', this.search)
          },
          blur: () => {
            this.$emit('blur')
          },
          keydown: this.onKeydown
        }
      }

      // multiple with selected value do not show placeholder
      const showPlaceholder = this.placeholder && this.multiple ? !hasValue : true
      if (showPlaceholder) data.domProps.placeholder = this.placeholder

      return this.$createElement('input', data)
    },
    genSelection () {
      let selection = []
      if (this.$scopedSlots.selection) {
        selection = this.genScopedSlot()
      } else if (this.chip) {
        selection = this.genChips()
      } else {
        selection = this.genCommaText()
      }

      if (!Array.isArray(selection)) {
        console.log('error!', selection)
      } else {
        selection.push(this.genSearch())
      }

      return this.$createElement('div', {
        staticClass: 'vi-input__selection'
      }, selection)
    },
    genCommaText () {
      if (this.multiple) {
        return this.selection.map(s => {
          return this.$createElement('div', {
            staticClass: 'vi-input__selection__comma'
          }, this.getOptionName(s) + ',')
        })
      } else {
        return [this.$createElement('div', {
          staticClass: 'vi-input__selection__comma'
        }, this.getOptionName(this.selection))]
      }
    },
    genChips () {
      if (!this.multiple) {
        console.log('warning, you should provide array to value if using chip')
      }

      if (this.isCollapsingChip) {
        return [this.genCombinedChip()]
      }

      return this.selection.map(s => {
        return this.$createElement('vi-chip', {
          staticClass: 'vi-chip--select-multi',
          props: {
            removable: true
          },
          on: {
            remove: e => {
              this.remove(s)
            }
          }
        }, this.getOptionName(s))
      })
    },
    genCombinedChip () {
      const prepend = this.collapseMultiple || ''
      const label = `${this.selection.length} Selected`
      const data = {
        staticClass: 'vi-chip--select-multi',
      }
      if (prepend) data.props = {prepend: prepend}
      return this.$createElement('vi-chip', data, label)
    },
    genScopedSlot () {
      if (this.multiple) {
        return this.selection.map(s => {
          return this.$scopedSlots.selection({
            selection: s,
            parent: this
          })
        })
      } else {
        return [this.$createElement('div', {},
          [this.$scopedSlots.selection({selection: this.selection})]
        )]
      }
    },
    genMenu () {
      if (!this.options) return

      let children = []
      // list of items and header
      children.push(this.genItems())

      // confirm button (for cache multiple)
      if (this.cacheMultiple) {
        children.push(this.genConfirmButton())
      }

      return children
    },

    genItems () {

      const children = this.filteredOptions.map(option => {
        return this.genItem(option)
      })

      // no-result
      if (this.filteredOptions.length === 0) {
        let child
        if (this.$scopedSlots.noData) {
          child = [this.$scopedSlots.noData({
            search: this.search
          })]
        } else {
          child = 'No data'
        }
        const empty = this.$createElement('div', {
          staticClass: 'vi-menu__empty'
        }, child)
        children.push(empty)
      }

      // header
      if (this.header) {
        const header = this.$createElement('div', {
          staticClass: 'vi-menu__header'
        }, this.header)
        children.unshift(header)
      }

      return this.$createElement('div', {
        staticClass: 'vi-menu__items'
      }, children)
    },

    genConfirmButton () {
      if (!this.cacheMultiple) return
      const text = typeof this.cacheMultiple === 'string' ? this.cacheMultiple : 'Confirm'
      return this.$createElement('vi-button', {
        staticClass: 'vi-menu__confirm-button',
        props: {
          primary: true,
          disabled: !this.isEdited
        },
        on: {
          click: () => {
            this.$emit('input', this.cacheValue)
            this.opened = false
          }
        }
      }, text)
    },

    genItem (option) {
      const data = {
        on: {
          click: () => {
            this.toggle(option)
          }
        }
      }

      if (this.$scopedSlots.item) {
        return this.$scopedSlots.item({
          item: option,
          selected: this.isSelected(option),
          parent: this
        })
      }

      data.props = {
        selectable: true
      }

      let children
      if (this.multiple) {
        const checkbox = this.$createElement('vi-checkbox-boolean', {
          props: {
            value: this.isSelected(option)
          }
        })
        const action = this.$createElement('vi-item-action', [checkbox])
        const content = this.$createElement('vi-item-content', this.getOptionName(option))
        children = [action, content]
      } else {
        children = this.getOptionName(option)
      }
      return this.$createElement('vi-item', data, children)
    }
  }
}
