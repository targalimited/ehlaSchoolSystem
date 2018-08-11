<template lang="pug">
  notice-bar(v-if="isPilot")
    vi-icon(name="pilot" size="40")
    div
      h2 Pilot 100
      p You have participated in our Pilot 100 Scheme. Click
        router-link(:to="{name: 'browse-pilot-root'}" class="vi-link px-4") here
        span to start your journey!
</template>

<script>
  export default {
    name: 'home-notice-bar',

    computed: {
      isPilot () {
        return this.$store.getters['shelf/isPilot']
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .notice-bar
    background #78bda0

  .vi-link
    padding 0 4px
    border-bottom 1px solid currentColor
</style>
