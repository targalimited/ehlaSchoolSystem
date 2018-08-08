<template lang="pug">
  .notice-bar
    slot
</template>

<style lang="stylus">
  .notice-bar
    padding 20px
    display flex
    background #efb03e
    color white
    align-items center

    > .vi-icon
      color inherit
      margin-right 20px
</style>
