<template lang="pug">
  topbar Free access scheme
    template(slot="tabs")
      router-link.top-bar__tab(
        v-for="tab in cats"
        :key="tab.key"
        :to="{name: 'browse-free-category', params: {key: tab.key}}"
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
