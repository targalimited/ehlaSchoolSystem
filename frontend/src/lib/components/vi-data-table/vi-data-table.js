import Body from './body'
import Header from './header'
import {getObjectValueByPath} from '../../util/helper'
import ViSticky from '../../directives/sticky'

export default {
  name: 'vi-data-table',

  mixins: [Body, Header],

  directives: {
    ViSticky
  },

  props: {
    showPagination: {
      type: Boolean,
      default: false
    },
    pagination: {
      type: Object,
      default: () => {}
    },
    infiniteScroll: {
      type: [Boolean, Number],
      default: true
    },
    items: Array,
    headers: Array,
    search: String,
    sticky: Number,
    checkbox: Boolean,
    // the selected row (when using checkbox)
    value: Array,
    // the key as the value for the row in checkbox mode
    itemKey: {
      type: String,
      default: 'id'
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

      let from, to
      if (this.infiniteScroll) {
        from = 0
        to = this.pagination.page * this.pagination.rowsPerPage
      } else {
        const rowsPerPage = this.pagination.rowsPerPage
        const pageStart = this.pagination.page - 1
        from = rowsPerPage * pageStart
        to = from + rowsPerPage
      }
      items = items.slice(from, to)
      return items
    },

    itemsLength () {
      if (this.search) return this.searchLength
      return this.items.length
    },

    hasPagination () {
      const pagination = this.pagination || {}

      return Object.keys(pagination).length > 0
    }
  },

  methods: {
    toggle (key) {
      let selected = this.value.slice()
      if (selected.includes(key)) selected.splice(selected.indexOf(key), 1)
      else selected.push(key)
      this.$emit('input', selected)
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
    },

    nextPage () {
      const {page, rowsPerPage} = this.pagination
      if (page * rowsPerPage > this.itemsLength) return
      this.updatePagination({
        page: page + 1
      })
    }
  },

  created () {
    this.initPagination()
  },

  mounted () {
    if (this.infiniteScroll) {
      const offset = Number.isInteger(this.infiniteScroll) ? this.infiniteScroll : 200
      document.addEventListener('scroll', e => {
        if ((window.innerHeight + window.scrollY) + offset >= document.body.scrollHeight) {
          this.nextPage()
        }
      })
    }
  },

  render (h) {
    return h('div', {
      staticClass: 'vi-table'
    }, [
      this.genHeader(),
      this.genBody()
    ])
  }
}
