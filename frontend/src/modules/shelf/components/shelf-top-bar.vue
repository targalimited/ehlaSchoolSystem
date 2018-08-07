<template lang="pug">
  topbar Accessible Items Overview
    template(slot="tabs")
      router-link.top-bar__tab(
        v-for="tab in tabs"
        :key="tab.name"
        :to="tab.route"
      ) {{tab.name}}
</template>

<script>
  import Topbar from '@/components/top-bar'
  export default {
    components: {
      Topbar
    },
    data () {
      return {
        tabs: [
          {
            name: 'Unassigned',
            route: {
              name: 'library-unassigned'
            }
          },
          {
            name: 'Assigned',
            route: {
              name: 'library-assigned'
            }
          }
        ]
      }
    }
  }
</script>
