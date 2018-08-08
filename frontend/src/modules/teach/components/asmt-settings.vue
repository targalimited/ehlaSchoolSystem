<template lang="pug">
  .asmt-settings
    vi-row(minimal)
      vi-col(xs6)
        reading-item(:item="itemData")
        .asmt-settings__form
          .input-group
            label Start Date
            vi-date-picker(v-model="form.startDate" placeholder="Start Date" @input="update")
          .input-group
            label End Date
            vi-date-picker(v-model="form.endDate" placeholder="End Date" @input="update")
          .input-group
            label Remark
            vi-input.textarea(v-model="form.remark" placeholder="Remarks (optional)" type="textarea" @input="update" no-resize)
      vi-col(xs6) yo
</template>

<script>
  export default {
    name: 'asmt-settings',

    props: {
      classId: {
        type: [String, Number],
        required: true
      },
      itemId: {
        type: [String, Number],
        required: true
      },
      // provide batch_id means edit item
      batchId: {
        type: [String, Number],
        required: false
      }
    },

    data () {
      return {
        form: {
          classId: this.classId,
          itemId: this.itemId,
          batchId: this.batchId,
          itemType: '',
          startDate: '',
          endDate: '',
          remark: '',
          exercises: [],
          videos: [],
        }
      }
    },

    computed: {
      isEdit () {
        return !!this.batchId
      },
      prevSettings () {
        if (!this.batchId) return null
        return this.$store.getters.getBatchById(this.batchId)
      },
      itemData () {
        if (!this.itemId) return null
        return this.$store.getters.getItemById(this.itemId)
      }
    },

    methods: {
      async initFetch () {
        await this.$store.dispatch('getItemById', {
          classId: this.classId,
          itemId: this.itemId
        })

        this.form.exercises = this.itemData.exercises.map(e => e.exercise_id)
        this.form.itemType = this.itemData.item_type
      },
      update () {
        this.$emit('input', this.form)
      }
    },

    created () {
      this.initFetch()
      if (this.prevSettings) {
        this.startDate = this.prevSettings.start_date
        this.endDate = this.prevSettings.end_date
        this.remark = this.prevSettings.remark
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../../project-ui/stylus/main.styl'
  .asmt-settings
    &__form
      padding 16px

    .vi-row > .vi-col:last-child
      border-left 1px solid $border-color

    .reading-item
      padding 16px

      &__image
        width 130px

    .input-group
      &:not(:last-child)
        margin-bottom 16px

      label
        font-size 14px
        color #2a739b
        text-transform uppercase
        display block
        margin-bottom 4px

      .vi-menu
        width 100%

      .vi-input.textarea
        height 100px

</style>
