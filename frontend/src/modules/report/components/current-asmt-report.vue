<template lang="pug">
  .current-asmt-report
    button(@click="fetch") xx
    vi-no-data(v-if="!batchId" title="Select a assignment")
    vi-spinner(v-else-if="loading")
    vi-data-table(
      v-else
      :items="students"
      :item-height="600"
      :headers="headers"
      :pagination="pagination"
    )
      template(slot="item" slot-scope="{item}")
        vi-table-col {{item.name}}
        vi-table-col ok
        vi-table-col ok
        vi-table-col ok
        vi-table-col ok
</template>

<script>
  export default {
    props: {
      batchId: {
        required: true,
        default: null
      },
      itemId: {
        required: true
      }
    },
    data() {
      return {
        loading: false,
        students: [
          {
            name: 'John'
          },
          {
            name: 'John2'
          },
          {
            name: 'John3'
          },
          {
            name: 'John4'
          }
        ],
        pagination: {}
      }
    },
    computed: {
      report () {
        return this.$store.state.report.asmtReport[this.batchId]
      },
      headers () {
        const temp = ['name', 'Spell the Words', 'Spell the Words', 'Spell the Words', 'Spell the Words']
        // if (!this.report || !this.report[0]) return
        // const r = this.report[0]
        // console.log(r)
        // console.log(r.exercise)
        return temp.map(asmt => {
          return {
            text: asmt
          }
        })
      }
    },
    methods: {
      fetch () {
        console.log('fetch', this.batchId)
        if (!this.batchId) return
        this.$store.dispatch('getAsmtReport', {
          classId: this.$route.params.class_id,
          batchId: this.batchId,
          itemId: this.itemId,
        })
      }
    },
    created () {
      this.fetch()
    },
    watch: {
      batchId () {
        this.fetch()
      }
    }
  }
</script>
