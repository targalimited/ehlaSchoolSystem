<template>
  <vi-dialog :value="true" width="400" persistant>
    <vi-card>
      <vi-toolbar :brand="true">
        <div class="vi-toolbar__title">
          {{isEdit ? 'Edit' : 'Create'}} student
        </div>
      </vi-toolbar>

      <vi-card-content>
        <div class="input-group">
          <vi-input-label>English name</vi-input-label>
          <vi-input placeholder="English Name" v-model="realname_en"/>
        </div>

        <div class="input-group">
          <vi-input-label>Chinese name</vi-input-label>
          <vi-input placeholder="Chinese Name" v-model="realname_zh"/>
        </div>

        <div class="input-group">
          <vi-input-label>Username</vi-input-label>
          <vi-input placeholder="Username" v-model="username" :disabled="isEdit" />
        </div>

        <div class="input-group">
          <vi-input-label>Student No.</vi-input-label>
          <vi-input placeholder="Student Number" v-model="student_num"/>
        </div>

        <div class="input-group" >
          <vi-input-label>Password</vi-input-label>
          <vi-input placeholder="Password" v-model="password" type="password"/>
        </div>

        <div class="input-group" >
          <vi-input-label>Confirm password</vi-input-label>
          <vi-input placeholder="Confirm Password" v-model="password_confirmation" type="password"/>
          <vi-input-error v-if="!passwordMatch">Password do not match</vi-input-error>
        </div>

        <div class="input-group">
          <vi-input-label>Class</vi-input-label>
          <vi-select placeholder="Select Student Class" v-model="className" :options="OptionClass" :chip="true"/>
        </div>

        <vi-button-row>
          <vi-button @click="$close(false)">Cancel</vi-button>
          <vi-button @click="submit" primary :disabled="!valid">Confirm</vi-button>
        </vi-button-row>
      </vi-card-content>
    </vi-card>
  </vi-dialog>
</template>

<script>
export default {
  name: 'level-dialog',

  props: ['oldRealname_en', 'oldUsername', 'oldClass', 'OptionClass', 'oldRealname_zh','oldPassword', 'oldstudent_num'],

  data () {
    return {
      realname_en: this.oldRealname_en ? this.oldRealname_en : '',
      realname_zh: this.oldRealname_zh ? this.oldRealname_zh : '',
      username: this.oldUsername ? this.oldUsername : '',
      className: [],
      password: '',
      password_confirmation: '',
      student_num: this.oldstudent_num ? this.oldstudent_num : '',
    }
  },

  computed: {
    isEdit () {
      return !!this.oldClass
    },
    passwordMatch () {
      return this.password_confirmation === this.password
    },
    valid () {
      return this.passwordMatch &&
        this.realname_en &&
        this.realname_zh &&
        this.username &&
        this.className &&
        this.student_num
    }
  },

  created () {
    if (this.oldClass) {
      this.className = this.oldClass.map(c => c.name)
    }
  },

  methods: {
    submit () {

      if(this.password !== this.password_confirmation){
        console.log('not match');
        return false
      }else{
        if(this.isEdit){
          if(this.password.length === 0 && this.password===this.password_confirmation)
            this.password = ''

        }else{

        }

        this.$close({
          realname_en: this.realname_en,
          username: this.username,
          password: this.password,
          school_num: this.student_num,
          realname_zh: this.realname_zh,
          className: this.className
        })
      }
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
