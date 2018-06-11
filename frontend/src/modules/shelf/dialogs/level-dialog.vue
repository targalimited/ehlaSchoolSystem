<template>
  <vi-dialog :value="true" width="400">
    <vi-card>

      <vi-toolbar :brand="true">
        <div class="vi-toolbar__title">
          Assign level to reading
        </div>
      </vi-toolbar>

      <vi-card-content v-if="levels">
        <div class="input-group">
          <vi-checkbox
            v-for="level in levels"
            :key="level"
            :option-value="level"
            :label="level"
            v-model="newSelected"/>
        </div>

        <vi-button-row class="pt-30">
          <vi-button @click="$close(false)" size="135">Cancel</vi-button>
          <vi-button @click="onSubmit" primary size="135">Assign</vi-button>
        </vi-button-row>
      </vi-card-content>
    </vi-card>
  </vi-dialog>
</template>

<script>
  export default {
    name: 'level-dialog',

    props: ['selected'],

    data () {
      return {
        newSelected: []
      }
    },

    computed: {
      levels () {
        // TODO hard code
        return ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 's1', 's2', 's3', 's4', 's5', 's6']
      }
    },

    methods: {
      onSubmit () {
        this.$close(this.newSelected)
      }
    },

    created () {
//      if (Array.isArray(this.newSelected)) {
//        this.newSelected = this.selected
//      }
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
</style>
