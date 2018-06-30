import Body from './body'
import Header from './header'
import {getObjectValueByPath} from '../../util/helper'
import ViSticky from '../../directives/sticky'
import { VirtualScroller } from 'vue-virtual-scroller'

export default {
  name: 'vi-data-table',

  mixins: [Body, Header],

  components: { VirtualScroller },

  provide () {
    return {
      headers: this.headers
    }
  },

  directives: {
    ViSticky
  },

  props: {
    pagination: {
      type: Object,
      default: () => {}
    },
    items: Array,
    headers: Array,
    search: String,

    // the selected row
    value: Array | String,

    // the key as the value for the row
    itemKey: {
      type: String,
      default: 'id'
    },

    // style the table row to be divided
    divided: Boolean,

    // specify the item height for virtual scroll list to work
    // could support item dynamic height in the future
    itemHeight: {
      type: Number | String,
      required: true
    },

    // set a fixed height for the scrolling container
    // when scroll height is 0 (by default), the table will be full page (pageMode is on for virtual scroll list)
    tableHeight: {
      type: Number | String,
      required: false,
      default: 0
    },

    // when it is page mode you probably want to set header as sticky
    stickyHeader: Number,

    // Dont render the header
    noHeader: {
      type: Boolean,
      default: false
    },

    filter: {
      type: Function,
      default: (val, search) => {
        return val != null &&
          typeof val !== 'boolean' &&
          val.toString().toLowerCase().indexOf(search) !== -1
      }
    },

    customFilter: {
      type: Function,
      default: (items, search, filter) => {
        search = search.toString().toLowerCase()
        if (search.trim() === '') return items

        return items.filter(i => (
          Object.keys(i).some(j => filter(i[j], search))
        ))
      }
    },

    customSort: {
      type: Function,
      default: (items, index, isDescending) => {
        if (index === null) return items

        return items.sort((a, b) => {
          let sortA = getObjectValueByPath(a, index)
          let sortB = getObjectValueByPath(b, index)

          if (isDescending) {
            [sortA, sortB] = [sortB, sortA]
          }

          // Check if both are numbers
          if (!isNaN(sortA) && !isNaN(sortB)) {
            return sortA - sortB
          }

          // Check if both cannot be evaluated
          if (sortA === null && sortB === null) {
            return 0
          }

          [sortA, sortB] = [sortA, sortB]
            .map(s => (
              (s || '').toString().toLocaleLowerCase()
            ))

          if (sortA > sortB) return 1
          if (sortA < sortB) return -1

          return 0
        })
      }
    }
  },

  data () {
    return {
      searchLength: 0,
      defaultPagination: {
        descending: false,
        page: 1,
        rowsPerPage: 20,
        sortBy: null,
        totalItems: 0
      }
    }
  },

  computed: {
    pageMode () {
      return !this.tableHeight
    },

    /*
      this is the core of when and how the list is updated
     */
    filteredItems () {
      let items = this.items.slice()

      const hasSearch = typeof this.search !== 'undefined' &&
        this.search !== null

      if (hasSearch) {
        items = this.customFilter(items, this.search, this.filter)
        this.searchLength = items.length
      }

      items = this.customSort(
        items,
        this.pagination.sortBy,
        this.pagination.descending
      )

      return items
    },

    itemsLength () {
      if (this.search) return this.searchLength
      return this.items.length
    },

    hasPagination () {
      const pagination = this.pagination || {}

      return Object.keys(pagination).length > 0
    },

    isMultiple () {
      return Array.isArray(this.value)
    }
  },

  methods: {
    isSelected (item) {
      const key = item[this.itemKey]
      if (this.isMultiple) {
        return this.value.includes(key)
      } else {
        return this.value === key
      }
    },
    add (item) {
      let selected
      if (this.isMultiple) {
        selected = this.value.slice()
        selected.push(item[this.itemKey])
      } else {
        selected = item[this.itemKey]
      }
      this.$emit('input', selected)
    },
    remove (item) {
      let selected
      if (this.isMultiple) {
        selected = this.value.slice()
        selected.splice(selected.indexOf(item[this.itemKey]), 1)
      } else {
        selected = ''
      }
      this.$emit('input', selected)
    },
    toggle (item) {
      if (this.isSelected(item)) {
        this.remove(item)
      } else {
        this.add(item)
      }
    },
    toggleAll () {
      let newValue
      if (this.value.length) newValue = []
      else newValue = this.items.map(i => i[this.itemKey])
      this.$emit('input', newValue)
    },
    sort (index) {
      const { sortBy, descending } = this.pagination
      if (sortBy === null) {
        this.updatePagination({ sortBy: index, descending: false })
      } else if (sortBy === index && !descending) {
        this.updatePagination({ descending: true })
      } else if (sortBy !== index) {
        this.updatePagination({ sortBy: index, descending: false })
      } else {
        this.updatePagination({ sortBy: index, descending: false })
      }
    },

    /**
     * called during init and whenever sorting, nextPage is updated
     * user can got the updatedPagination from prop :pagination.sync
     */
    updatePagination (val) {
      const pagination = this.hasPagination ? this.pagination : this.defaultPagination
      const updatedPagination = Object.assign({}, pagination, val)
      this.$emit('update:pagination', updatedPagination)
    },

    initPagination () {
      this.updatePagination(
        Object.assign({}, this.defaultPagination, this.pagination)
      )
    }
  },

  created () {
    this.initPagination()
  },

  render (h) {
    return h('div', {
      staticClass: 'vi-table',
      class: {
        'vi-table--divided': this.divided
      }
    }, [
      this.genHeader(),
      this.genBody()
    ])
  }
}
