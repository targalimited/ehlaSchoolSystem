<template>
  <vi-dialog :value="true" width="400">
    <vi-card>

      <div class="vi-dialog__header">
        Assign level to reading
      </div>

      <vi-card-content v-if="levels">
        <div class="input-group">
          <vi-row v-for="level in levels" :key="level.level">
            <vi-checkbox
              :value="level.level"
              :label="level.level | levelName"
              :disabled="isDisabled(level) || level.confirm_lock"
              v-model="newSelected"/>
            <!-- TODO: this message is hardcode-->
            <span class="note" v-if="isCatDisabled(level)">You have already assigned 3 Reading Comprehension Diagnosis to this level</span>
            <span class="note" v-if="level.confirm_lock">The item is already assigned to {{level.level | levelName}} level</span>
          </vi-row>
        </div>

        <vi-button-row class="vi-dialog__footer">
          <vi-button small outline @click="$close(false)" size="135">Cancel</vi-button>
          <vi-button small @click="onSubmit" color="brand" size="135">Assign</vi-button>
        </vi-button-row>
      </vi-card-content>
    </vi-card>
  </vi-dialog>
</template>

<script>
  export default {
    name: 'level-dialog',

    props: ['selected', 'cat'],

    data () {
      return {
        newSelected: []
      }
    },

    computed: {
      levels () {
        let options = this.$store.getters['shelf/levelsQuota'](this.cat)
        return options.map(option => {
          return Object.assign({}, option, {
            confirm_lock: this.isLocked(option)
          })
        })
      }
    },

    methods: {
      isCatDisabled (level) {
        const isLevelAlreadySelected = this.selected.includes(level.level)
        return (level.catFull && !isLevelAlreadySelected)
      },
      isDisabled (level) {
        return (level.full && !this.selected.includes(level.level)) || this.isCatDisabled(level)
      },
      onSubmit () {
        this.$close(this.newSelected)
      },
      isLocked (option) {
        const obj = this.selected.find(level => level.level_id === option.level)
        return obj && obj.confirm_lock
      }
    },

    created () {
      if (Array.isArray(this.newSelected)) {
        this.newSelected = this.selected.map(lv => lv.level_id)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .vi-button-row
    margin-top 24px

  .input-group
    margin-bottom 24px

  .vi-checkbox
    margin-bottom 16px

  .note
    font-size 12px
    color red
    line-height 1.2
    margin-left 12px
    margin-top 10px
</style>
