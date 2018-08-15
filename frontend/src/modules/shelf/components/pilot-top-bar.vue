<template lang="pug">
  topbar Pilot 100
    template(slot="tabs")
      router-link.top-bar__tab(
        v-for="tab in cats"
        :key="tab.key"
        :to="{name: 'browse-pilot-category', params: {catKey: tab.key}}"
      ) {{tab.name_en}}
</template>

<script>
  import Topbar from '@/components/top-bar'
  export default {
    components: {
      Topbar
    },
    computed: {
      cats () {
        return this.$store.state.shelf.cats
      }
    }
  }
</script>
