<template lang="pug">
  notice-bar(v-if="isPilot")
    vi-icon(name="pilot" size="40")
    div
      h2 Pilot 100
      p You have participated in our Pilot 100 Scheme. Click here to start your journey!
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
