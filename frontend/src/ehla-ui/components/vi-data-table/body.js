import {VirtualScroller} from "vue-virtual-scroller";

export default {
  methods: {
    genBody () {
      let children = []
      if (this.items.length === 0) {
        children.push(this.genNoData())
      } else if (this.filteredItems.length === 0) {
        children.push(this.genNoResult())
      } else if (this.disableVirtualScroll) {
        children.push(this.genStandardList())
      } else {
        children.push(this.genVirtualList())
      }

      return this.$createElement('div', {
        staticClass: 'vi-table__body'
      }, children)
    },

    genStandardList () {
      return this.filteredItems.map(item => {
        return this.genBodyRow(item, false)
      })
    },

    genVirtualList () {
      return this.$createElement('VirtualScroller', {
        style: {
          height: this.tableHeight ? this.tableHeight + 'px' : 'auto'
        },
        props: {
          items: this.filteredItems,
          itemHeight: this.itemHeight,
          keyField: 'uuid',
          pageMode: this.pageMode
        },
        slot: 'default',
        scopedSlots: {
          default: item => this.genBodyRow(item, true)
        }
      })
    },

    genBodyRow (_item, isVirtualScroll)  {
      const key = isVirtualScroll ? _item.itemIndex : ''
      const item = isVirtualScroll ? _item.item : _item
      const row = this.$scopedSlots.item({
        key: key,
        item: item,
        checked: this.isSelected(item),
        toggle: this.toggle,
        disabled: this.isMax && !(this.isSelected(item))
      })
      const children = [row]
      const data = {}

      // if no td is given
      if (row.length > 1) {
        data.staticClass = 'vi-table__row'
      }

      return this.$createElement('div', data, children)
    },

    genNoData () {
      let children
      if (this.$slots.noData) {
        children = [this.$slots.noData]
      } else {
        children = [this.$createElement('div', 'No data')]
      }
      return this.$createElement('div', {
        staticClass: 'vi-table__no-data'
      }, children)
    },

    genNoResult () {
      let children
      if (this.$slots.noResult) {
        children = [this.$slots.noResult]
      } else {
        children = [this.$createElement('vi-no-data', {
          props: {
            iconSize: 64,
            icon: 'search',
            title: 'No results found',
            content: this.noResultsText
          }
        })]
      }
      return this.$createElement('div', {
        staticClass: 'vi-table__no-result'
      }, children)
    }
  }
}
