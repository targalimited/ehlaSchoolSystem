<template>
  <div class="coming-soon">
    <vi-app-bar :title="title"></vi-app-bar>
    <vi-row align-center justify-center>
      <div>
        <img class="logo" src="../modules/auth/assets/app-logo.jpg" alt="">
        <div class="message">Stay Tuned</div>
      </div>
    </vi-row>
  </div>
</template>

<script>
  export default {
    props: ['title']
  }
</script>

<style lang="stylus" scoped>
  .coming-soon
    background #f9f9f9

  .vi-row
    height calc(100vh - 70px)
    text-align center

  .logo
    width 100px
    height @width

  .message
    font-size 64px
    color #d7d7d7
</style>
