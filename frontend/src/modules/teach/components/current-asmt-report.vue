<template lang="pug">
  .current-asmt-report
    vi-no-data(v-if="!batch_id" title="Select a assignment")
    vi-spinner(v-else-if="loading")
    vi-data-table(
      v-else
      :items="students"
      :item-height="600"
      :headers="headers"
      :pagination="pagination"
    )
      template(slot="item" slot-scope="{item}")
        vi-table-col {{item.realname_en}}
        vi-table-col(v-for="(ex,i) in item.exercise" :key="i") {{ex.status}}
</template>

<script>
  export default {
    data() {
      return {
        loading: false,
        pagination: {}
      }
    },
    computed: {
      class_id () {
        return parseInt(this.$route.params.class_id)
      },
      batch_id () {
        return parseInt(this.$route.query.batch_id)
      },
      item_id () {
        return parseInt(this.$route.query.item_id)
      },
      students () {
        return this.$store.getters.asmtReport(this.batch_id) || []
      },
      headers () {
        if (!(this.students && this.students[0])) return
        let headers = this.students[0].exercise.map(ex => ex.name_en)
        headers = headers.map(asmt => {
          return {
            text: asmt,
            width: '80px'
          }
        })
        headers.unshift({
          text: 'Name',
          expand: true
        })
        return headers
      }
    },
    methods: {
      fetch () {
        if (!this.batch_id) return
        this.$store.dispatch('getAsmtReport', {
          class_id: this.class_id ,
          batch_id: this.batch_id,
          item_id: this.item_id,
        })
      }
    },
    created () {
      this.fetch()
    },
    watch: {
      batch_id () {
        this.fetch()
      }
    }
  }
</script>