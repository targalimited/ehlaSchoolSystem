<template lang="pug">
  panel(:disabled="!batch_id" :loading="locking").asmt-report
    // Empty: no batch ID is selected
    template(v-if="!batch_id")
      vi-row(justify-center mt-40)
        vi-no-data(v-if="!batch_id" title="Assignment Report" content="Please select an assignment" icon="report")
    // Locked: if the batch is locked and the type is not locked
    template(v-else-if="!locked && batchData && batchData.is_locked == 1")
      vi-row(justify-center mt-40)
        vi-no-data(title="Assignment is locked" content="You can view this locked assignment in under the locked section" icon="lock")
    // Normal
    template(v-else-if="batchData")
      template(slot="head")
        vi-spacer
        template(v-if="!locked")
          // vi-button(icon flat @click="editAsmt" disabled)
            vi-icon(name="edit")
          vi-button(icon flat @click="lockAsmt")
            vi-icon(name="lock")
          // vi-button(icon flat @click="deleteAsmt" disabled)
            vi-icon(name="trash")
      template(slot="foot")
        .remark(v-if="remark") Remark: {{remark}}
      .asmt-report__banner
        h2 {{batchData.name_en}}
        vi-row
          vi-col(xs6)
            vi-item
              vi-item-avatar
                vi-avatar C
              vi-item-content
                vi-item-subtitle Assigned by:
                vi-item-title Teacher {{batchData.teacher_id}}
          vi-col(xs6)
            vi-item
              vi-item-avatar
                vi-avatar C
              vi-item-content
                vi-item-subtitle Due Date:
                vi-item-title {{batchData.end_date | formatDate}}
      vi-spinner(v-if="loading && students.length === 0")
      vi-data-table(
        v-else
        :items="students"
        :item-height="60"
        :table-height="500"
        :headers="headers"
        :pagination="pagination"
      )
        template(slot="item" slot-scope="{item}")
          vi-table-col {{item.realname_en}}
          vi-table-col(v-for="(ex,i) in item.exercise" :key="i")
            template(v-if="locked") {{ex.marks}}
            template(v-else)
              template(v-if="ex.status === 0")
                vi-icon(name="clear" size="12" color="red")
              template(v-if="ex.status === 1")
                vi-icon(name="done" size="12" color="green")
              template(v-if="ex.status === 2") N/A
</template>

<script>
  import {editAsmtDialog} from '../dialogs'
  export default {
    props: {
      locked: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        loading: false,
        locking: false,
        pagination: {}
      }
    },
    computed: {
      classId () {
        return parseInt(this.$route.params.classId)
      },
      batch_id () {
        return parseInt(this.$route.query.batch_id)
      },
      item_id () {
        return parseInt(this.$route.query.item_id)
      },
      batchData () {
        return this.$store.getters.asmtReport(this.batch_id)
      },
      remark () {
        if (!this.batchData) return
        return this.batchData.remark
      },
      students () {
        if (!this.batchData) return
        return this.batchData.report || []
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
      async fetch () {
        if (!this.batch_id) return
        this.loading = true
        await this.$store.dispatch('getAsmtReport', {
          classId: this.classId,
          batchId: this.batch_id,
          itemId: this.item_id,
        })
        this.loading = false
      },
      editAsmt () {
        editAsmtDialog({
          itemId: this.batchData.item_id,
          batchId: this.batchData.batch_id
        })
      },
      async lockAsmt () {
        const confirm = await this.$messageBox({
          title: 'Are you sure',
          message: 'Once an assignment is locked, students cannot access and complete the assignment anymore'
        })
        if (!confirm) return
        this.locking = true
        await this.$store.dispatch('lockAsmt', {
          batchId: this.batchData.batch_id,
          classId: this.$route.params.classId
        })
        this.locking = false
        this.$message(`${this.batchData.name_en} has been locked successfully`)
      },
      deleteAsmt (asmtData) {
        // TODO
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

<style lang="stylus">
  @import '../../../project-ui/stylus/main.styl'
  .asmt-report
    .vi-table__col
      flex 1

    .vi-table__head
      background none
      border-bottom 1px solid $border-color

    &__banner
      padding 16px 24px
      border-bottom 1px solid $border-color

      h2
        font-weight 400
        font-size 26px
        line-height 1.2
        margin-bottom 16px
</style>
