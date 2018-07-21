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
          <vi-input-label>Teacher No.</vi-input-label>
          <vi-input placeholder="Teacher Number" v-model="teacher_num"/>
        </div>

        <div class="input-group" >
          <vi-input-label>Password</vi-input-label>
          <vi-input placeholder="Password" v-model="password"/>
        </div>

        <div class="input-group" >
          <vi-input-label>Confirm password</vi-input-label>
          <vi-input placeholder="Confirm Password" v-model="password_confirmation"/>
        </div>

        <div class="input-group">
          <vi-input-label>Role</vi-input-label>
          <vi-select placeholder="Select Role" v-model="role" :options="roleOptions" option-value="value" option-name="name"/>
        </div>

        <div class="input-group">
          <vi-input-label>Class</vi-input-label>
          <vi-select placeholder="Select Student Class" v-model="className" :options="OptionClass" :chip="true"/>
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

    props: ['oldRealname_en', 'oldUsername', 'oldClass', 'oldRole' , 'OptionClass', 'oldRealname_zh','oldPassword', 'oldTeacher_num'],

    data () {
      return {
        realname_en: this.oldRealname_en ? this.oldRealname_en : '',
        realname_zh: this.oldRealname_zh ? this.oldRealname_zh : '',
        username: this.oldUsername ? this.oldUsername : '',
        className: this.oldClass ? [this.oldClass] : [],
        role: this.oldRole ? this.oldRole : '',
        password: '',
        password_confirmation: '',
        teacher_num: this.oldTeacher_num ? this.oldTeacher_num : '',
      }
    },
    mounted(){
      console.log(this.option_class)
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
            teacher_num: this.teacher_num,
            realname_zh: this.realname_zh,
            className: this.className,
            role: this.role,
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
