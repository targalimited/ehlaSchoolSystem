export default {
  methods: {
    genHeader () {
      if ((this.noHeader) || !this.headers ||  (this.items && this.items.length === 0)) return null

      let row
      if (this.$slots.head) {
        row = this.$slots.head
      } else {
        row = this.headers.map(h => {
          if (h.slot) {
            // use the slot specified
            return this.$createElement('vi-table-col', {
              staticClass: 'vi-table__col--head'
            }, this.$slots[h.slot])
          } else {
            return this.genHeaderCell(h)
          }
        })
      }

      const head = this.$createElement('div', {
        staticClass: 'vi-table__head'
      }, row)

      if (typeof this.stickyHeader !== 'undefined') {
        return this.$createElement('div', {
          directives: [{
            name: 'sticky',
            value: {
              offset: this.stickyHeader,
              zIndex: 2
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
          }
        }, [sortIcon])
        children.push(btn)
      }

      const data = {
        staticClass: 'vi-table__col--head',
        class: {
          'vi-table__col--sm-sort': this.smallSortIcon,
          'vi-table__col--sortable': header.sortable,
          'vi-table__col--active': this.pagination.sortBy === header.index
        },
        style: {
          width: header.width
        }
      }

      if (header.sortable) {
        data.nativeOn = {
          click: () => {
            this.sort(header.index)
          }
        }
      }

      return this.$createElement('vi-table-col', data, [children])
    }
  }
}
