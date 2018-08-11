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
            vi-input-error(v-if="dateInValid" class="mt-4") End date is eariler then start date
          .input-group
            label Remark
            vi-input.textarea(v-model="form.remark" placeholder="Remarks (optional)" type="textarea" @input="update" no-resize)
      vi-col(xs6)
        .px-16.py-16
          vi-spinner(v-if="!students")
          vi-no-data(v-else-if="students.length === 0" icon="alert" title="No students" content="This class has no students. Please contact the admin")
          template(v-else)
            h4.section-title {{students.length}} students in {{className}}
            vi-item(v-for="student in students" :key="student.id" height="50" divided)
              vi-item-avatar
                vi-avatar(size="30")
                  vi-icon(name="avatar")
              vi-item-content
                vi-item-title {{student.realname_en}}
                vi-item-subtitle {{student.realname_zh}}
</template>

<script>
  import moment from 'moment'
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
      },
      valid: {
        type: Boolean,
        required: true
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
      },
      dateInValid () {
        if (!(this.form.startDate && this.form.endDate)) return false
        else return moment(this.form.startDate).isAfter(this.form.endDate)
      },
      formInvalid () {
        const noStudents = this.students && this.students.length === 0
        return !(this.form.startDate && this.form.endDate) || this.dateInValid || noStudents
      },
      students () {
        return this.$store.getters.getStudentsByClass(this.classId)
      },
      className () {
        return this.$store.getters.getClassNameById(this.classId)
      }
    },

    methods: {
      async initFetch () {
        this.$store.dispatch('getStudentsByClass', {
          classId: this.classId
        })
        await this.$store.dispatch('getItemById', {
          classId: this.classId,
          itemId: this.itemId
        })

        this.form.exercises = this.itemData.exercises.map(e => e.exercise_id)
        if (this.itemData.videos) this.form.videos = this.itemData.videos.map(e => e.exercise_id)
        this.form.itemType = this.itemData.item_type
      },
      update () {
        this.$emit('input', this.form)
        this.$emit('update:valid', !this.formInvalid)
      }
    },

    created () {
      this.initFetch()
      if (this.prevSettings) {
        this.startDate = this.prevSettings.start_date
        this.endDate = this.prevSettings.end_date
        this.remark = this.prevSettings.remark
      }
    },

    watch: {
      students () {
        this.update()
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
        color $blue-text
        text-transform uppercase
        display block
        margin-bottom 4px

      .vi-menu
        width 100%

      .vi-input.textarea
        height 100px

    .section-title
      font-size 12px
      text-transform: uppercase
      color $blue-text
      margin-bottom 16px
</style>
