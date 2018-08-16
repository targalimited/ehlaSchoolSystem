<template lang="pug">
  vi-row(align-center).unassigned-library-notice
    vi-icon(name="info-circular" class="mr-12")
    div
      div(v-if="!isAdmin")
       | Only
       strong &nbsp;administrator&nbsp;
       | could assign levels to item.
      div
       strong Unassigned items&nbsp;
       | are not yet accessible by teachers and students until level(s) is assigned.
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    computed: mapGetters(['isAdmin'])
  }
</script>

<style lang="stylus">
  @import '../../../project-ui/stylus/main.styl'
  .unassigned-library-notice
    background $pale-yellow
    padding 8px 16px

    .vi-icon
      color inherit
      opacity 0.7
</style>
