<template lang="pug">
  .top-bar
    .top-bar__l
      .top-bar__l__top
        slot(v-if="$slots.default")
        template(v-else) {{title}}
      ul.top-bar__tabs(v-if="$slots.tabs")
        slot(name="tabs")
    vi-spacer
    .top-bar__r
      vi-menu
        vi-item.profile-btn(slot="activator")
          vi-item-avatar
            vi-avatar(size="24" class="ml-16")
              vi-icon(name="avatar" size="16")
          vi-item-content
            vi-item-title {{$store.getters.username}}
        router-link(:to="{name: 'config'}")
          vi-item(link) Config
        router-link(:to="{name: 'profile'}")
          vi-item(link) Profile
        router-link(:to="{name: 'logout'}")
          vi-item(link) Logout
</template>

<script>

  export default {
    props: {
      title: String
    }
  }
</script>

<style lang="stylus">
  @import '../project-ui/stylus/settings.styl'
  .top-bar
    background white
    height 75px
    padding 0 16px
    display flex
    align-items center
    box-shadow $box-shadow-2
    z-index 3
    left 40px
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
        font-size 22px
        font-weight normal
        color $font-color-3

    &__title
      font-size 22px
      font-weight normal
      color $font-color-3

    &__tabs
      display flex
      height 30px
      font-size 13px

    &__tab
      margin-right 16px
      border-bottom 4px solid transparent
      cursor pointer

      &--active, &.router-link-active
        border-color $brand

    .profile-btn
      max-width 100px

      .vi-item__title
        font-size 12px
        font-weight normal
</style>
