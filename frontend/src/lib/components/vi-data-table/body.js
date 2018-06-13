export default {
  methods: {
    genBody () {
      let children = []

      if (this.items.length === 0) {
        children.push(this.genNoData())
      } else if (this.filteredItems.length === 0) {
        children.push(this.genNoResult())
      } else {
        children = this.filteredItems.map(item => {
          return this.genBodyRow(item)
        })
      }

      if (this.showPagination) {
        children.push(this.genPagination())
      }

      return this.$createElement('div', {
        staticClass: 'vi-table__body'
      }, children)
    },

    genNoData () {
      let children
      if (this.$slots.noData) {
        children = [this.$slots.noData]
      } else {
        children = [this.$createElement('div', 'no data')]
      }
      return this.$createElement('div', {
        staticClass: 'vi-data-table__no-data'
      }, children)
    },

    genNoResult () {
      let children
      if (this.$slots.noResult) {
        children = [this.$slots.noResult]
      } else {
        children = [this.$createElement('div', 'no result')]
      }
      return this.$createElement('div', {
        staticClass: 'vi-data-table__no-data'
      }, children)
    },

    genBodyRow (item) {
      const row = this.$scopedSlots.item({
        item: item,
        checked: this.value && this.value.includes(item[this.itemKey]),
        toggle: this.toggle
      })
      const children = [row]
      const data = {}

      // if no td is given
      if (row.length > 1) {
        data.staticClass = 'vi-table__row'
      }

      if (this.checkbox) {
        children.unshift(this.genBodyCheckbox(item[this.itemKey]))
      }
      return this.$createElement('div', data, children)
    },

    genBodyCheckbox (key) {
      const checked = this.value.includes(key)
      const checkbox = this.$createElement('vi-checkbox-boolean', {
        nativeOn: {
          click: () =>  {
            this.toggle(key)
          }
        },
        props: {
          value: checked,
        }
      })

      return this.$createElement('div', {
        staticClass: 'vi-table__col'
      }, [checkbox])
    },

    genPagination () {
      let children = []
      children.push(this.genNextPageButton())
      return this.$createElement('div', {
        staticClass: 'pagination'
      }, children)
    },

    genNextPageButton () {
      return this.$createElement('vi-button', {
        on: {
          click: this.nextPage
        }
      }, 'next')
    }
  }
}
