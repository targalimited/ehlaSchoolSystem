<template>
  <div>
    <div class="vi-banner">
      <vi-icon class="vi-banner__icon" name="avatar" size="60"/>
      <div class="vi-banner__title">Profile</div>
    </div>
    <vi-container>
      <vi-section-header>Change password</vi-section-header>
      <vi-input v-model="oldPw" placeholder="Enter your current password"/>
      <vi-input v-model="newPw" placeholder="Enter your new password"/>
      <vi-button @click="changePW" color="brand">Submit</vi-button>
    </vi-container>
  </div>
</template>

<script>

import {messageBox} from '../dialogs'

export default {

  name: 'profile',

  data () {
    return {
      oldPw: '',
      newPw: '',
      error: false
    }
  },

  methods: {
    async changePW () {
      let loader = this.$loading.show()
      const res = await this.$store.dispatch('changepw', {
        oldpw: this.oldPw,
        newpw: this.newPw
      })

      if (res) {
        messageBox(res)
        this.oldPw = ''
        this.newPw = ''
        this.error = true
      }
      loader.hide()
    }
  }
}
</script>

<style lang="stylus" scoped>
  .vi-input
    margin-bottom 20px
    width 300px

  .vi-button
    width 300px
</style>
