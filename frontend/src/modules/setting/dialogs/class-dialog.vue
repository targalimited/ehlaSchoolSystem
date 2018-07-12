<template>
  <vi-dialog :value="true" width="400" persistant>
    <vi-card>
      <vi-toolbar :brand="true">
        <div class="vi-toolbar__title">
          {{isEdit ? 'Edit' : 'Create'}} class
        </div>
      </vi-toolbar>

      <vi-card-content>
        <div class="input-group">
          <vi-input-label>Class name</vi-input-label>
          <vi-input placeholder="Class name" v-model="className"/>
        </div>

        <div class="input-group">
          <vi-input-label>Level</vi-input-label>
          <vi-input placeholder="Level" v-model="classLevel"/>
        </div>

        <vi-button-row>
          <vi-button @click="$close(false)">Cancel</vi-button>
          <vi-button @click="submit" primary>Confirm</vi-button>
        </vi-button-row>
      </vi-card-content>
    </vi-card>
  </vi-dialog>
</template>

<script>
export default {
  name: 'level-dialog',

  props: ['oldClassName', 'oldClassLevel'],

  data () {
    return {
      className: this.oldClassName ? this.oldClassName : '',
      classLevel: this.oldClassLevel ? this.oldClassLevel : ''
    }
  },

  computed: {
    isEdit () {
      return !!this.oldClassName
    }
  },

  methods: {
    submit () {
      this.$close({
        className: this.className,
        classLevel: this.classLevel,
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .vi-button-row
    margin-top 24px

  .input-group
    margin-bottom 24px
</style>
