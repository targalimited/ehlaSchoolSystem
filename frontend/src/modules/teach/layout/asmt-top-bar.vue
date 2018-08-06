<template lang="pug">
  top-bar
    top-bar-header(title="Assignment")
    template(slot="tabs")
      li.top-bar__tab(
        v-for="tab in tabs"
        :key="tab.title"
        @click="navigate(tab.route)"
        :class="{'top-bar__tab--active': isTabActive(tab.route.name)}"
      ) {{tab.title}}
</template>

<script>
  import TopBarHeader from './top-bar-header'
  export default {
    components: {
      TopBarHeader
    },
    data () {
      return {
        tabs: [
          {
            route: {
              name: 'asmt-status'
            },
            title: 'In Progress'
          },
          {
            route: {
              name: 'asmt-report'
            },
            title: 'Locked'
          },
          {
            route: {
              name: 'weakness-report'
            },
            title: 'Draft'
          }
        ]
      }
    },
    methods: {
      navigate (route) {
        const newRoute = {
          ...route, ...{
            params: this.$route.params.classId
          }
        }
        this.$router.push(newRoute)
      },
      isTabActive (routeName) {
        return routeName === this.$route.name
      }
    }
  }
</script>
