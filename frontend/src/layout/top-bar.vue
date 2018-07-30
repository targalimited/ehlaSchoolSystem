<template lang="pug">
  .top-bar
    .top-bar__l
      .top-bar__l__top
        .top-bar__title Class 3A
      ul.top-bar__tabs
        li.top-bar__tab(
          :class="{'top-bar__tab--active':true}"
        ) Current Assignment
        li.top-bar__tab Completed Assignment
        router-link.top-bar__tab(tag="li" :to="{name:'weakness-report', params:{class_id: 1}}") Weakness
    vi-spacer
    .top-bar__r
      vi-avatar(size="24")
        vi-icon(name="avatar" size="16")
</template>

<script>
  export default {
    data () {
      return {
        classes: []
      }
    },
    // TODO: where should we call this API
    async created () {
      this.classes = await this.$store.dispatch('getClasses')
    }
  }
</script>

<style lang="stylus">
  @import '../project-ui/stylus/settings.styl'
  .top-bar
    height 75px
    padding 0 16px
    display flex
    align-items center
    box-shadow $box-shadow-2
    z-index 100
    position fixed
    left 0
    top 0
    right 0

    &__l
      display flex
      flex-direction column
      height 75px

      &__top
        flex 1
        display flex
        align-items center

    &__title
      font-size 20px
      font-weight bold
      color $font-color-3

    &__tabs
      display flex
      height 30px
      font-size 13px

    &__tab
      margin-right 16px
      border-bottom 4px solid transparent
      cursor pointer

      &--active
        border-color $brand
</style>
