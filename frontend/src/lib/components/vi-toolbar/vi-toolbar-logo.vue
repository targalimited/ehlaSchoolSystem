<template functional>
  <router-link to="/" class="vi-toolbar-logo">
    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="226.77px" height="51.023px" viewBox="0 87.635 226.77 51.023" enable-background="new 0 87.635 226.77 51.023" xml:space="preserve"><g id="layout-1"><polygon fill="#FFFFFF" points="68.963,97.648 68.963,136.872 98.88,136.872 98.88,130.667 76.72,130.667 76.72,120.031 95.994,120.031 95.994,113.602 76.497,113.602 76.497,103.854 98.88,103.854 98.88,97.648 "/><polygon fill="#FFFFFF" points="108.284,97.648 108.284,136.872 115.377,136.872 115.377,120.031 133.77,120.031 133.77,136.872 140.856,136.872 140.856,97.648 133.547,97.648 133.547,113.602 115.153,113.602 115.153,97.648 "/><polygon fill="#FFFFFF" points="150.521,97.648 157.832,97.648 157.832,130.003 178.224,130.003 178.224,136.872 150.521,136.872 "/><path fill="#FFFFFF" d="M207.291,97.648h-6.429l-17.506,39.219h7.31l4.207-9.525h17.947l3.99,9.525h7.533L207.291,97.648z M197.318,120.918l6.646-15.437l6.652,15.437H197.318z"/><g><polygon fill="#0690CF" points="30.6,89.221 30.6,96.633 6.282,108.59 6.282,114.011 30.6,102.129 30.6,109.465 6.282,121.385 6.282,128.401 31.041,116.207 31.041,123.497 1.021,138.29 1.021,103.649 "/><polygon fill="#92D400" points="30.836,89.221 30.836,96.39 59.98,110.824 59.98,103.406 "/><polygon fill="#92D400" points="30.836,102.091 59.98,116.405 59.98,123.817 49.255,118.397 49.255,125.056 59.98,130.355 59.98,137.729 31.315,123.497 31.315,116.283 42.437,121.786 42.437,115.09 30.836,109.306 "/></g></g></svg>
  </router-link>
</template>

<script>
  export default {
    name: 'vi-toolbar-logo',
    props: ['name']
  }
</script>

<style lang="stylus">
  @import '../../stylus/main.styl'

  .vi-toolbar-logo
    height 26px
    display inline-flex
    align-items center
    font-size 14px
    color #4a4a4a
    font-style italic
    font-weight 300
    margin 0 10px

    svg
      height inherit
      width 114px

    &__name
      padding-left 10px
      margin-top 4px
</style>
