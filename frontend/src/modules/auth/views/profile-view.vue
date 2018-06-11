<template>
  <div>profile</div>
</template>

<script>
export default {
  name: 'login',

  data () {
    return {
      username: '',
      password: '',
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
  // @import '~dali/src/stylus/main'

  .login
    background #2585b4

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
