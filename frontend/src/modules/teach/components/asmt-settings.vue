<template lang="pug">
  .asmt-settings
    .asmt-settings__banner(:style="{'background-image' : `url(${asmtImage})`}")
      h2 {{asmtName}}
    .my-24.mx-24
      .input-group
        label Start Date
        vi-date-picker(v-model="startDate" placeholder="Start Date")
      .input-group
        label End Date
        vi-date-picker(v-model="endDate" placeholder="End Date")
      .input-group
        label Remark
        vi-input(v-model="remark" placeholder="Remarks (optional)" type="textarea")
    .dialog__action.vi-dialog__footer
      vi-button.mr-16(@click="$emit('cancel')") cancel
      vi-button(@click="submit" color="brand") confirm
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
        startDate: '',
        endDate: '',
        remark: '',
        asmtData: {}
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
      item () {
        if (!this.itemId) return null
        return this.$store.getters.getItemById(this.itemId)
      },
      asmtImage () {
        return this.isEdit ? this.prevSettings.thumbnail_path : this.item.thumbnail_path
      },
      asmtName () {
        return this.isEdit ? this.prevSettings.name_en : this.item.name_en
      }
    },

    methods: {
      async initFetch () {
        // if (this.isEdit) return
        this.asmtData = await this.$store.dispatch('getItemById', {
          classId: this.classId,
          itemId: this.itemId
        })
      },
      async submit () {
        await this.$store.dispatch('setAssignment', {
          classId: this.classId,
          itemId: this.itemId,
          batchId: this.batchId,
          itemType: this.asmtData.item_type,
          startDate: this.startDate,
          endDate: this.endDate,
          remark: this.remark,
          exercises: this.asmtData.exercises.map(e => e.exercise_id),
          videos: []
        })
        this.$emit('done')
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
  .asmt-settings
    &__banner
      height 200px
      background-size cover
      background-position center
      position relative
      display flex
      align-items flex-end
      justify-content center
      text-align center
      color white
      font-size 18px

      h2
        position relative
        z-index 1

      &:before
        position: absolute
        top 0
        bottom 0
        left 0
        right 0
        background rgba(0,0,0,0.2)
        content: ''
        display block

    .input-group
      &:not(:last-child)
        margin-bottom 16px

      label
        font-size 18px
        font-weight bold
        display block

  .dialog
    &__body
      min-height 400px
      overflow-y auto

    &__action
      display flex
      align-items center
      justify-content center
      padding 20px
</style>
