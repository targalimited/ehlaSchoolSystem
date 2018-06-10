export default {
  methods: {
    genHeader () {
      if (this.items && this.items.length === 0) return null
      if (!this.header) return

      let row
      if (this.$slots.head) {
        row = this.$slots.head
      } else {
        row = this.headers.map(h => {
          if (h.slot) {
            // use the slot specified
            return this.$createElement('div', {
              staticClass: 'vi-table__col vi-table__col--head'
            }, this.$slots[h.slot])
          } else {
            return this.genHeaderCell(h)
          }
        })
      }

      if (this.checkbox) row.unshift(this.genCheckbox())

      const head = this.$createElement('div', {
        staticClass: 'vi-table__head'
      }, row)

      if (typeof this.sticky !== 'undefined') {
        return this.$createElement('div', {
          directives: [{
            name: 'sticky',
            value: {
              offset: this.sticky
            }
          }],
          staticClass: 'sticky'
        }, [head])
      } else {
        return head
      }
    },

    genHeaderCell (header) {
      let children = []

      const text = this.$createElement('div', {
        staticClass: 'text'
      }, header.text)
      children.push(text)

      if (header.sortable) {
        const sortIcon = this.$createElement('vi-icon', {
          props: {
            name: 'down',
            size: 10,
            flipY: this.pagination.descending && this.pagination.sortBy === header.index
          }
        })
        const btn = this.$createElement('vi-button', {
          props: {
            flat: true,
            icon: true,
            circular: true,
            size: 26,
            active: this.pagination.sortBy === header.index
          },
          on: {
            click: () => {
              this.sort(header.index)
            }
          }
        }, [sortIcon])
        children.push(btn)
      }

      return this.$createElement('div', {
        staticClass: 'vi-table__col vi-table__col--head',
        class: {
          'vi-table__col--sortable': header.sortable
        },
        style: {
          width: header.width
        }
      }, [children])
    },

    genCheckbox () {
      const checked = this.value.length === this.items.length

      const checkbox = this.$createElement('vi-checkbox-boolean', {
        nativeOn: {
          click: this.toggleAll
        },
        props: {
          value: checked
        }
      })

      return this.$createElement('div', {
        staticClass: 'vi-table__col'
      }, [checkbox])
    }
  }
}
