<template>
  <div class="login">
    <vi-card>
      <vi-card-content>

        <vi-toolbar-logo/>
        <!--<img class="logo" src="../assets/ehla-app-logo.jpeg" alt="">-->

        <div class="header">
          <div class="title">School System</div>
          <div class="subtitle">Login to your account:</div>
        </div>

        <div class="input-group">
          <vi-input-label>Username</vi-input-label>
          <vi-input v-model="username" placeholder="Enter your username"/>
        </div>

        <div class="input-group">
          <vi-input-label>Password</vi-input-label>
          <vi-input v-model="password" type="password" placeholder="Enter your username"/>
        </div>

        <vi-input-error class="mb-24" v-if="error">Username or password not correct</vi-input-error>

        <vi-button :disabled="loading" @click="submit" primary>{{loading ? 'Loggin in...' : 'Login'}}</vi-button>

      </vi-card-content>
    </vi-card>
  </div>
</template>

<script>
export default {

  name: 'login',

  data () {
    return {
      username: '',
      password: '',
      error: false,
      loading: false
    }
  },

  methods: {
    async submit () {
      let loader = this.$loading.show()
      const res = await this.$store.dispatch('login', {
        username: this.username,
        password: this.password
      })
      if (res && this.$store.getters.isAuthenticated) {
        this.$router.push({
          name: 'home'
        })
      } else {
        this.error = true
      }
      loader.hide()
    }
  }
}
</script>

<style lang="stylus" scoped>
  // @import '~dali/src/stylus/main'

  .login
    background-image url(../assets/home_banner.png)
    background-size cover
    position fixed
    top 0
    bottom 0
    left 0
    right 0

  .vi-toolbar-logo
    display block
    text-align center

  .logo
    width 120px

  .input-group
    margin-bottom 16px

  .vi-card
    width 360px
    margin 80px auto
    box-shadow 2px 2px 22px 0 rgba(0,0,0,0.1)

  .vi-button
    width 100%
    margin-top 24px
    height 40px

  .header
    margin 24px 0 32px
    text-align center

  .title
    font-size 30px
    margin-bottom 6px
    line-height 1

  .subtitle
    font-size 18px
    color #777
    font-style italic
    line-height 1

  #layout-1 > polygon, #layout-1 > path
    fill black

  .vi-toolbar-logo
    height 40px
    margin-left 0

    svg
      width auto
</style>
