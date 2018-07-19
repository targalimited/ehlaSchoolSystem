<template>
  <div class="assign-options-view">
    <vi-app-bar title="Dinana and the Dirty Blanket"></vi-app-bar>

    <vi-container>

      <vi-section-header>Start Date & End Date</vi-section-header>

      <vi-row>
        <div class="input-group">
          <vi-input-label>Start Date</vi-input-label>
          <vi-date-picker
            v-model="startDate"
            placeholder="Select a start date"/>
          <!-- TODO: validation -->
          <!--<vi-input-error>Required</vi-input-error>-->
        </div>
        <div class="input-group ml-20">
          <vi-input-label>End Date</vi-input-label>
          <vi-date-picker
            placeholder="Select an end date"
            v-model="endDate"/>
          <!--<vi-input-error>Required</vi-input-error>-->
        </div>
      </vi-row>

      <vi-section-header class="mb-8">Exercises</vi-section-header>
      <vi-item v-for="(ex, i) in exerciseOptions" :key="i" :height="60">
        <vi-item-avatar>
          <vi-checkbox v-model="selectedExercises" :option-value="ex.exercise_id"/>
        </vi-item-avatar>
        <vi-item-content>
          <vi-item-title>0{{i + 1}}. {{ex.title_en}}</vi-item-title>
        </vi-item-content>
        <vi-item-action>
          <vi-button-toggle v-model="ex.recipients" mandatory>
            <vi-button value="class" flat>
              <vi-icon name="team" size="22"/>
              Whole
            </vi-button>
            <vi-button value="student" flat @click="selectStudents(ex)">
              <vi-icon name="team" size="22"/>
              Individual <template v-if="ex.recipients === 'student'">({{ex.students.length}})</template>
            </vi-button>
          </vi-button-toggle>
        </vi-item-action>
      </vi-item>

      <vi-section-header>Videos</vi-section-header>

      <vi-item v-for="opt in videoOptions" :key="opt.value" :height="60">
        <vi-item-avatar>
          <vi-checkbox v-model="selectedVideos" :option-value="opt.exercise_id"/>
        </vi-item-avatar>
        <vi-item-content>
          <vi-item-title>{{opt.name_en}}</vi-item-title>
          <vi-item-subtitle>{{opt.teaching_lang_en}}</vi-item-subtitle>
        </vi-item-content>
      </vi-item>

      <!-- TODO: should we show video here or inside a dialog? -->
      <!--<vi-row wrap>-->
        <!--<vi-col xs4 v-for="i in 6" :key="i">-->
          <!--<div class="video-placeholder"></div>-->
        <!--</vi-col>-->
      <!--</vi-row>-->

      <vi-section-header>Remarks</vi-section-header>

      <vi-input
        type="textarea"
        v-model="remark"
        placeholder="Remarks is optional"/>

      <div class="mt-30">
        <vi-button-row>
          <vi-button size="150">Cancel</vi-button>
          <vi-button @click="onSubmit" primary size="150">Confirm</vi-button>
        </vi-button-row>
      </div>

    </vi-container>

  </div>
</template>

<script>
  import {studentDialog} from '../dialogs'
  export default {
    name: 'assign-options-view',

    props: {

    },

    data() {
      return {
        asmtData: {},
        startDate: '',
        endDate: '',
        remark: '',
        selectedVideos: [],
        selectedExercises: []
      }
    },

    computed: {
      $classId () {
        return this.$route.query.classId
      },
      $itemId () {
        return this.$route.query.itemId
      },
      $itemType () {
        return this.$route.query.itemType
      },
      videoOptions () {
        return this.asmtData.videos
      },
      exerciseOptions () {
        return this.asmtData.exercises
      }
    },

    methods: {
      async selectStudents (ex) {
        const res = await studentDialog(ex.students)
        // TODO check if all students are selected, if yes, it should be class
        if (!res) {
          ex.recipients = ex.recipients === 'class' ? 'class' : false
        }
        ex.students = res
      },
      async onSubmit () {
        await this.$store.dispatch('asmt/setAssignment', {
          classId: this.$classId,
          itemId: this.$itemId,
          itemType: this.$itemType,
          startDate: this.startDate,
          endDate: this.endDate,
          remark: this.remark,
          exercises: this.selectedExercises,
          videos: this.selectedVideos
        })
        this.$router.push({
          name: 'asmt-list'
        })
      }
    },

    async created () {
      const classId = this.$classId
      const itemId = this.$itemId
      const res = await this.$store.dispatch('asmt/getItemById', {
        classId, itemId
      })
      this.asmtData = res.data
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../../lib/stylus/main.styl'

  .input-group
    position relative
    padding-bottom 22px

    .vi-input-label
      margin-bottom 8px
      display block

    .vi-input-error
      position absolute
      bottom 0
      left 0

  .video-placeholder
    height 120px
    background $grey-2

  .vi-section-header
    margin-top 20px
</style>
