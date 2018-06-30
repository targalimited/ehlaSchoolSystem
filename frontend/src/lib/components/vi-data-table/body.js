import {VirtualScroller} from "vue-virtual-scroller";

export default {
  methods: {
    genBody () {
      let children = []
      if (this.items.length === 0) {
        children.push(this.genNoData())
      } else if (this.filteredItems.length === 0) {
        children.push(this.genNoResult())
      } else {
        children.push(this.genVirtualList())
      }

      return this.$createElement('div', {
        staticClass: 'vi-table__body'
      }, children)
    },

    genVirtualList () {
      const virtualList = this.$createElement('VirtualScroller', {
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
          default: item => this.genBodyRow(item)
        }
      })
      return virtualList
    },

    genBodyRow (item)  {
      const row = this.$scopedSlots.item({
        key: item.itemIndex,
        item: item.item,
        checked: this.isSelected(item.item),
        toggle: this.toggle
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
    }
  }
}
