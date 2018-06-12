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
      <vi-button @click="submit" color="brand">Submit</vi-button>
    </vi-container>
  </div>
</template>

<script>
export default {
  name: 'login',

  data () {
    return {
      oldPw: '',
      newPw: '',
      error: false
    }
  },

  methods: {
    async submit () {
      const res = await this.$store.dispatch('login', {
        username: this.username,
        password: this.password
      })
      if (res) {
        this.$router.push({
          name: 'home'
        })
      } else {
        this.error = true
      }
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
