<template lang="pug">
  topbar {{title}}
    template(slot="tabs")
      router-link.top-bar__tab(
        v-for="tab in cats"
        :key="tab.key"
        :class="{'disabled': !valid}"
        :to="{name: 'browse-pilot-category', params: {catKey: tab.key}}"
      ) {{tab.name_en}}
</template>

<script>
  import Topbar from '@/components/top-bar'
  export default {
    props: {
      title: String
    },
    components: {
      Topbar
    },
    computed: {
      cats () {
        return this.$store.state.shelf.cats
      },
      valid () {
        const isPilot = this.$store.getters['shelf/isPilot']
        const routeName = this.$route.name
        if (routeName === 'browse-free-root') {
          return !isPilot
        } else {
          return isPilot
        }
      }
    }
  }
</script>
