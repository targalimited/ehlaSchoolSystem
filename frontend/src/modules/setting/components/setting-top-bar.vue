<template lang="pug">
  topbar Settings
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
            name: 'Classes',
            route: {
              name: 'settings-class'
            }
          },
          {
            name: 'Students',
            route: {
              name: 'settings-student'
            }
          },
          {
            name: 'Teachers',
            route: {
              name: 'settings-teacher'
            }
          }
        ]
      }
    }
  }
</script>
