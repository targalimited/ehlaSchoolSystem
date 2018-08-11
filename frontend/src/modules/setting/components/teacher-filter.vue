<template lang="pug">
  .teacher-filter
    .filter-header Filter by class
    vi-checkbox(v-for="opt in option_class" :value="opt" :label="opt" :key="opt" :input-value="classFilters" @input="onClassChange" multiple)
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'teacher-filter',
    computed: {
      ...mapGetters([
        'teachers',
        'option_class',
        'batch_create'
      ]),
      classFilters () {
        return this.$route.query.classes || []
      }
    },
    methods: {
      onClassChange (v) {
        this.$router.replace({
          name: 'settings-teacher',
          query: {
            classes: v
          }
        })
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
