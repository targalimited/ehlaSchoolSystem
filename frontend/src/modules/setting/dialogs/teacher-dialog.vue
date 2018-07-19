<template>
  <vi-dialog :value="true" width="400" persistant>
    <vi-card>
      <vi-toolbar :brand="true">
        <div class="vi-toolbar__title">
          {{isEdit ? 'Edit' : 'Create'}} teacher
        </div>
      </vi-toolbar>

      <vi-card-content>
        <div class="input-group">
          <vi-input-label>Full name</vi-input-label>
          <vi-input placeholder="Full name" v-model="fullname"/>
        </div>

        <div class="input-group">
          <vi-input-label>Username</vi-input-label>
          <vi-input placeholder="Username" v-model="username"/>
        </div>

        <div class="input-group">
          <vi-input-label>Role</vi-input-label>
          <vi-select placeholder="Select Role" v-model="role" :options="roleOptions" option-value="value" option-name="name"/>
        </div>

        <div class="input-group">
          <vi-input-label>Class</vi-input-label>
          <vi-select placeholder="Select Student Class" v-model="className" :options="classOptions" :chip="true"/>
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

    props: ['oldFullname', 'oldUsername', 'oldClass', 'oldRole'],

    data () {
      return {
        fullname: this.oldFullname ? this.oldFullname : '',
        username: this.oldUsername ? this.oldUsername : '',
        className: this.oldClass ? [this.oldClass] : [],
        role: this.oldRole ? this.oldRole : ''
      }
    },

    computed: {
      classOptions() {
        return ['1A', '1B', '1C', '1D', '2A', '2B', '2C', '2D', '3A', '3B', '3C', '3D', '4A', '4B', '4C', '4D']
      },
      roleOptions() {
        return [{
          value: 'teacher',
          name: 'Teacher'
        }, {
          value: 'teacher2',
          name: 'Teacher2'
        }, {
          value: 'teacher3',
          name: 'Teacher3'
        }]
      },
      isEdit () {
        return !!this.oldClass
      }
    },

    methods: {
      submit () {
        this.$close({
          fullname: this.fullname,
          username: this.username,
          className: this.className,
          role: this.role,
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
