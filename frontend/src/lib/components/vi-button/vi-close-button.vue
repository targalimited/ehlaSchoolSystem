<template functional>
  <div @click="$emit('click')" class="vi-close-button">
    <svg width="24" height="24"><path d="M15.1,12l6.7-7.5c0.4-0.4,0.4-1.1-0.1-1.5l-1.9-1.7c-0.4-0.4-1.1-0.4-1.5,0.1L12,8.5L5.6,1.4C5.3,0.9,4.6,0.9,4.1,1.3L2.3,2.9C1.8,3.3,1.8,4,2.2,4.5L8.9,12l-6.7,7.5c-0.4,0.4-0.4,1.1,0.1,1.5l1.9,1.7c0.4,0.4,1.1,0.4,1.5-0.1l6.3-7.1l6.4,7.1c0.4,0.4,1.1,0.5,1.5,0.1l1.9-1.7c0.4-0.4,0.5-1.1,0.1-1.5L15.1,12z"/></svg>
  </div>
</template>

<script>
  export default {
    name: 'vi-close-button'
  }
</script>

<style lang="stylus">
  @import '../../stylus/main.styl'
  .vi-close-button
    width 22px
    height 22px
    display flex
    align-items center
    justify-content center
    border-radius 20px
    background $dark-grey
    cursor pointer
    z-index 1

    svg
      transform scale(0.4)
      fill white
</style>
