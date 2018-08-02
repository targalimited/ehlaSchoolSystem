<template lang="pug">
  div.weakness-report
    vi-spinner(v-if="!weakness_report")
    vi-data-table(
      v-else
      :items="weakness_report"
      :item-height="68"
      :headers="headers"
      :pagination="pagination"
    )
      template(slot="item" slot-scope="{item}")
        vi-table-col {{item.realname_en}}
        vi-table-col(v-for="(w,i) in item.weakness" :key="i")
          div
            div v {{w.correct_cnt}}
            div x {{w.wrong_cnt}}
</template>

<script>
  export default {
    name: 'weakness-report',
    data () {
      return {
        // TODO: store in vuex
        weakness_report: [],
        pagination: {}
      }
    },
    computed: {
      $class_id () {
        return this.$route.params.class_id
      },
      $weakness_ids () {
        return this.$route.query.weakness_ids
      },
      headers () {
        if (!(this.weakness_report && this.weakness_report[0])) return
        let headers = this.weakness_report[0].weakness.map(ex => ex.name_en)
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
      async initFetch () {
        if (!(this.$class_id && this.$weakness_ids)) return
        const res = await this.$store.dispatch('getClassWeaknessReport', {
          class_id: this.$class_id,
          weakness_ids: this.$weakness_ids,
        })
        this.weakness_report = res
      }
    },
    created () {
      this.initFetch()
    },
    watch: {
      $weakness_ids () {
        this.initFetch()
      }
    }
  }
</script>

<style lang="stylus">
  .weakness-report
    .vi-table__col
      flex 1
</style>
