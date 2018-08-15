<template>
  <div>
    <vi-section-header>Change password</vi-section-header>
    <vi-input type="password" v-model="oldPw" placeholder="Enter your current password"/>
    <vi-input type="password" v-model="newPw" placeholder="Enter your new password"/>
    <vi-button @click="changePW" :disabled="loading || !(oldPw && newPw)" color="brand">Submit</vi-button>
  </div>
</template>

<script>
export default {
  name: 'profile-view',

  data () {
    return {
      oldPw: '',
      newPw: '',
      loading: false
    }
  },

  methods: {
    async changePW () {
      this.loading = true

      try  {
        await this.$store.dispatch('changepw', {
          oldpw: this.oldPw,
          newpw: this.newPw
        })
        this.$message('Password updated successfully')
      } catch (e) {
        this.$message({
          type: 'error',
          message: e.err_msg
        })
      }
      this.loading = false
      this.oldPw = ''
      this.newPw = ''
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
