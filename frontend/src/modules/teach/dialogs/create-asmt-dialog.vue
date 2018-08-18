<template lang="pug">
  vi-dialog(scrollable :value="true" max-width="740" content-class="create-asmt-dialog")
    .vi-dialog__main
      .vi-dialog__header
        span Assign
        b {{catName}}
        span to
        b {{className}}
      .scroll-container
        vi-row(v-if="step === 1" minimal)
          vi-col(xs6)
            asmt-options(:selectedClass="classId" :selectedCat="catId" @input="v => {selectedItemId = v}")
          vi-col(xs6 preview-container)
            item-preview(:item-id="selectedItemId")
        asmt-settings(v-else-if="step === 2" :item-id="selectedItemId" :class-id="classId" v-model="form" :valid.sync="valid")
      .vi-dialog__footer
        vi-button-row(v-if="step === 1")
          vi-button(outline @click="$close") Cancel
          vi-button(color="brand" :disabled="!selectedItemId" @click="step = 2") Next
        vi-button-row(v-if="step === 2")
          vi-button(outline @click="step = 1") Back
          vi-button(color="brand" :disabled="!valid || loading" @click="submit") Confirm
</template>

<script>
  import AsmtOptions from '../components/asmt-options'
  import ItemPreview from '../components/item-preview'
  import AsmtSettings from '../components/asmt-settings'
  export default {
    name: 'create-asmt-dialog',

    components: { AsmtOptions, AsmtSettings, ItemPreview },

    props: {
      catId: String
    },

    computed: {
      classId () {
        return parseInt(this.$route.params.classId)
      },
      className () {
        return this.$store.getters.getClassNameById(this.classId)
      },
      catName () {
        return this.$store.getters.getCatNameById(this.catId)
      },
      itemData () {
        if (!this.selectedItemId) return null
        return this.$store.getters.getItemById(this.selectedItemId)
      }
    },

    data () {
      return {
        step: 1,
        selectedItemId: '',
        form: {},
        valid: false,
        loading: false
      }
    },

    methods: {
      async submit () {
        this.loading = true
        // prompt the user when the item is firstly assigned
        if (!this.itemData.confirm_lock) {
          if (window.confirm('are you sure to assign - it will be locked')) {
            this.$store.dispatch('confirmItem', {
              itemId: this.itemData.id,
              classId: this.form.classId
            })
          } else {
            return
          }
        }
        const exercises = this.form.exercises.filter(ex => ex.students.length > 0).map(ex => {
          return {
            exercise_id: ex.exercise_id,
            student_ids: ex.students
          }
        })
        const videos = this.form.videos.filter(ex => ex.students.length > 0).map(ex => {
          return {
            exercise_id: ex.exercise_id,
            student_ids: ex.students
          }
        })
        const form = {
          classId: this.form.classId,
          itemId: this.form.itemId,
          itemType: this.form.itemType,
          remark: this.form.remark,
          startDate: this.form.startDate,
          endDate: this.form.endDate,
          exercises: exercises,
          videos: videos
        }
        await this.$store.dispatch('setAssignment', form)
        this.loading = false
        this.$message(`${this.itemData.name_en} is assigned to ${this.className} successfully!`)
        this.$close()
      }
    }
  }
</script>

<style lang="stylus">
  .create-asmt-dialog
    .asmt-options
      border-top none
      border-left none
      border-bottom none

    .item-preview
      height 500px
      overflow-y auto
      padding 20px

    .asmt-settings, .asmt-settings > .vi-row
      height 100%

    .scroll-container
      height 500px
      overflow auto


</style>
