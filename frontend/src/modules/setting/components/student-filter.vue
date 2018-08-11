<template lang="pug">
  .student-filter
    .filter-header Filter by class
    vi-checkbox(v-for="opt in option_class" :value="opt" :label="opt" :key="opt" :input-value="classFilters" @input="onClassChange")
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'student-filter',
    computed: {
      ...mapGetters([
        'option_class'
      ]),
      classFilters () {
        return this.$route.query.classes
      }
    },
    methods: {
      onClassChange (v) {
        let route = { name: 'settings-student' }
        if (v) {
          route.query = { classes: v }
        }
        this.$router.replace(route)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .filter-header
    text-transform: uppercase
    font-size 12px
    font-weight bold
    margin-bottom 8px
</style>
