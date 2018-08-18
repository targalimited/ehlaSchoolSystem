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
            vi-input-error(v-if="dateInValid" class="mt-4") End date is earlier than start date
          .input-group(v-if="form.exercises")
            label Exercises
            vi-spinner(v-if="form.exercises.length === 0")
            vi-item(
              v-else
              v-for="ex in form.exercises" :key="ex.exercise_id"
              @click="inspectExercise(ex)"
              link="no-style" divided height="60"
              :class="{'disabled': ex.students.length === 0}"
              :active="isInspecting(ex)")
              vi-item-content
                vi-item-title {{ex.title_en}}
                vi-item-subtitle {{ex.students.length}} students assigned
              vi-item-action
                // vi-switch(:value="ex.students.length > 0" @input="toggleEx(ex)" :sync="true")
          .input-group(v-if="form.videos")
            label Videos
            vi-spinner(v-if="form.videos.length === 0")
            vi-item(
              v-else
              v-for="ex in form.videos" :key="ex.exercise_id"
              @click="inspectExercise(ex)"
              link="no-style" divided height="60"
              :class="{'disabled': ex.students.length === 0}"
              :active="isInspecting(ex)"
            )
              vi-item-content
                vi-item-title {{ex.name_en}}
                vi-item-subtitle {{ex.students.length}} students assigned
              vi-item-action
                // vi-switch(:value="ex.students.length > 0" @input="toggleEx(ex)" :sync="true")
          .input-group
            label Remark
            vi-input.textarea(v-model="form.remark" placeholder="Remarks (optional)" type="textarea" @input="update" no-resize)
      vi-col(xs6)
        .student-section(:class="{secondary: !inspectingEx}")
          vi-spinner(v-if="!students")
          vi-no-data(v-else-if="students.length === 0" icon="alert" title="No students" content="This class has no students. Please contact the admin")
          template(v-else)
            template(v-if="!inspectingEx")
              .section-title {{students.length}} students in {{className}}
            .ex-header(v-else-if="inspectingEx.media")
              .ex-title {{inspectingEx.name_en}}
              .ex-desc {{inspectingEx.teaching_lang_en}}
              // img(:src="inspectingEx.thumbnail_path")
            .ex-header(v-else)
              .ex-title {{inspectingEx.title_en}}
              .ex-desc {{inspectingEx.description_en}}

            vi-item(
              v-for="student in students"
              :key="student.id" height="60"
              divided link
              @click="toggleStudent(student.id)"
              :class="{'disabled': inspectingEx && inspectingEx.students.length === 0}"
            )
              vi-item-avatar
                vi-avatar(size="30")
                  vi-icon(name="avatar")
              vi-item-content
                vi-item-title {{student.realname_en}}
                vi-item-subtitle {{student.realname_zh}}
              vi-item-action(v-if="inspectingEx")
                // vi-checkbox(:input-value="isStudentSelected(student)")
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
        },
        inspectingEx: ''
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
        const noExerciseSelected = this.form.exercises.every(ex => ex.students.length === 0)
        return !(this.form.startDate && this.form.endDate) || this.dateInValid || noStudents || noExerciseSelected
      },
      students () {
        return this.$store.getters.getStudentsByClass(this.classId)
      },
      className () {
        return this.$store.getters.getClassNameById(this.classId)
      },
      selectedStudents () {
        const ex = this.inspectingEx
        if (!ex) return null
        return ex.students
      }
    },

    methods: {
      async initFetch () {
        await Promise.all([
          this.$store.dispatch('getStudentsByClass', {
            classId: this.classId
          }),
          this.$store.dispatch('getItemById', {
            classId: this.classId,
            itemId: this.itemId
          })
        ])

        if (this.itemData.exercises) {
          const exList = JSON.parse(JSON.stringify(this.itemData.exercises))
          this.$set(this.form, 'exercises', exList)
          exList.forEach(ex => {
            this.$set(ex, 'students', this.students.map(s => s.id))
          })
        }
        if (this.itemData.videos) {
          const exList = JSON.parse(JSON.stringify(this.itemData.videos))
          this.$set(this.form, 'videos', exList)
          exList.forEach(ex => {
            this.$set(ex, 'students', this.students.map(s => s.id))
          })
        }
        this.form.itemType = this.itemData.item_type
      },
      update () {
        this.$emit('input', this.form)
        this.$emit('update:valid', !this.formInvalid)
      },
      inspectExercise (ex) {
        this.inspectingEx = ex
      },
      isStudentSelected (student) {
        if (!this.selectedStudents) return
        return this.selectedStudents.includes(student.id)
      },
      isInspecting (ex) {
        return ex.exercise_id === this.inspectingEx.exercise_id
      },
      toggleStudent (studentId) {
        // TODO: disable individual assignment feature temporarily
        // if (!this.inspectingEx) return
        // const studentIds = this.inspectingEx.students
        // if (studentIds.includes(studentId)) {
        //   studentIds.splice(studentIds.indexOf(studentId), 1)
        // } else {
        //   studentIds.push(studentId)
        // }
        // this.update()
      },
      toggleEx (ex) {
        let students = ex.students
        if (students.length > 0) {
          this.$set(ex, 'students', [])
        } else {
          this.$set(ex, 'students', this.students.map(s => s.id))
        }
        this.update()
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

    .vi-row > .vi-col
      overflow-y auto

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

    .student-section
      padding 16px

      &.secondary
        background: #f9f9f9;
        opacity: 0.75;

    .section-title
      font-size 12px
      text-transform: uppercase
      color $blue-text
      margin-bottom 16px

    .ex-header
      padding-bottom 16px
      margin-bottom 16px
      border-bottom 1px solid $border-color

    .ex-title
      font-size 20px
      color $brand

    .ex-desc
      font-size 12px
      font-style: italic
      color $font-color-2

    .vi-item
      &.disabled
        .vi-item__content
          opacity 0.3

      &.vi-item--active
        background $bg-color
        label 5px $brand left
</style>
