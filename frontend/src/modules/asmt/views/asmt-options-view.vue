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
      <vi-item v-for="(ex, i) in exercises" :key="i" :height="60">
        <vi-item-avatar>
          <vi-checkbox-boolean :value="!!ex.recipients" @input="ex.recipients = !!ex.recipients ? false : 'class'"/>
        </vi-item-avatar>
        <vi-item-content>
          <vi-item-title>0{{i + 1}}. {{ex.name}}</vi-item-title>
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
          <vi-checkbox v-model="selectedVideo" :option-value="opt.value"/>
        </vi-item-avatar>
        <vi-item-content>
          <vi-item-title>{{opt.title}}</vi-item-title>
          <vi-item-subtitle>{{opt.subtitle}}</vi-item-subtitle>
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
        startDate: '',
        endDate: '',
        remark: '',
        selectedVideo: 'all',
        exercises: [
          {
            id: 1,
            name: 'Spell the words',
            recipients: false,
            students: []
          },
          {
            id: 2,
            name: 'Mix and Match',
            recipients: 'class',
            students: []
          },
          {
            id: 3,
            name: 'Multiple choices',
            recipients: 'student',
            students: ['1']
          }
        ],
        videoOptions: [
          {
            value: 'all',
            title: 'All videos',
            subtitle: 'All videos in English and Chinese will be assigned to students'
          },
          {
            value: 'chi',
            title: 'Chinese videos only',
            subtitle: 'Assign all videos in Chinese to students'
          },
          {
            value: 'en',
            title: 'English videos only',
            subtitle: 'Assign all videos in English to students'
          }
        ]
      }
    },

    computed: {

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
      onSubmit () {
        this.$router.push({
          name: 'asmt-list'
        })
      }
    },

    created () {

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
