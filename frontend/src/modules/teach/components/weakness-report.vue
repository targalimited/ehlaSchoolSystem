<template lang="pug">
  panel.weakness-report
    vi-no-data(v-if="!$weaknessIds" icon="report" title="Weakness Report" content="Select up to 6 weakness to generate the weakness report")
    vi-spinner(v-else-if="loading && weakness_report.length === 0")
    vi-data-table(
      v-else
      :items="weakness_report"
      :item-height="68"
      :headers="headers"
      :pagination="pagination"
      divided
    )
      template(slot="item" slot-scope="{item}")
        vi-table-col {{item.realname_en}}
        vi-table-col(v-for="(w,i) in item.weakness" :key="i")
          div
            vi-chip
              vi-icon(name="done" color="green")
              span {{w.correct_cnt}}
            vi-chip.ml-4
              vi-icon(name="clear" style="color: red")
              span {{w.wrong_cnt}}
</template>

<script>
  export default {
    name: 'weakness-report',
    data () {
      return {
        // TODO: store in vuex
        weakness_report: [],
        pagination: {},
        loading: false
      }
    },
    computed: {
      $classId () {
        return this.$route.params.classId
      },
      $weaknessIds () {
        return this.$store.state.teach.selectedWeakness
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
        if (!(this.$classId && this.$weaknessIds)) return
        this.loading = true
        const res = await this.$store.dispatch('getClassWeaknessReport', {
          classId: this.$classId,
          weakness_ids: this.$weaknessIds,
        })
        this.weakness_report = res
        this.loading = false
      }
    },
    created () {
      this.initFetch()
    },
    watch: {
      $weaknessIds () {
        this.initFetch()
      }
    }
  }
</script>

<style lang="stylus">
  @import '../../../project-ui/stylus/main.styl'
  .weakness-report
    .vi-table__head
      background none
      border-bottom 1px solid $border-color
    .vi-table__col
      flex 1
</style>
