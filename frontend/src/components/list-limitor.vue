<script>
  export default {
    name: 'list-limit',
    props: {
      limit: {
        type: [Number, String],
        default: 5
      },
      items: {
        type: Array,
        required: true
      }
    },
    data () {
      return {
        showAll: false
      }
    },
    computed: {
      filteredItems () {
        return this.showAll ? this.items : this.items.slice(0, this.limit)
      }
    },
    methods: {
      genList () {
        return this.filteredItems.map(item => {
          return this.$scopedSlots.item({
            item: item
          })
        })
      },
      genToggle () {
        let ele
        if  (this.$scopedSlots.activator) {
          ele = this.$scopedSlots.activator({
            opened: this.showAll
          })
        } else {
          ele = this.$createElement('vi-button', {
            props: {
              text: true,
              small: true,
              color: 'brand'
            }
          }, this.showAll ? 'Show less' : 'Show more')
          ele = [ele]
        }
        return this.$createElement('div', {
          on: {
            click: () => {
              this.showAll = !this.showAll
            }
          }
        }, ele)
      }
    },
    render (h) {
      const children = this.genList()
      if (this.items.length > this.limit) children.push(this.genToggle())
      return h('div', {
        staticClass: 'list-limitor'
      }, children)
    }
  }
</script>
