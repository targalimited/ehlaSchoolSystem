<template>
  <vi-app class="app">

    <div class="app__sidebar" v-if="$route.name !== 'login'">

      <vi-toolbar-logo/>

      <router-link :to="{name: 'home'}">

        <vi-item :link="true" height="60">
          <vi-item-avatar><vi-icon name="home" size="40"/></vi-item-avatar>
          <vi-item-content>Home</vi-item-content>
        </vi-item>
      </router-link>

      <router-link :to="{name: 'shelf'}">

        <vi-item :link="true" height="60">
          <vi-item-avatar><vi-icon name="shelf" size="46"/></vi-item-avatar>
          <vi-item-content>Selected Readings</vi-item-content>
        </vi-item>
      </router-link>

      <router-link :to="{name: 'lib-cat'}">

        <vi-item :link="true" height="60">
          <vi-item-avatar><vi-icon name="daily-reading" size="46"/></vi-item-avatar>
          <vi-item-content>Browse Readings</vi-item-content>
        </vi-item>
      </router-link>

      <div class="spacer"></div>

      <router-link :to="{name: 'profile'}">
        <vi-item :link="true" height="60">
          <vi-item-avatar><vi-icon name="avatar" size="28"/></vi-item-avatar>
          <vi-item-content>Profile</vi-item-content>
        </vi-item>
      </router-link>

      <vi-item @click="logout" :link="true" height="60">
        <vi-item-avatar><vi-icon name="logout" size="28"/></vi-item-avatar>
        <vi-item-content>Logout</vi-item-content>
      </vi-item>
    </div>

    <div class="app__scroll">
      <router-view/>
    </div>

    <dialogs-wrapper wrapper-name="default" />
  </vi-app>
</template>

<script>
export default {
  name: 'App',

  methods: {
    logout () {
      this.$store.dispatch('logout')
      this.$router.replace({
        name: 'login'
      })
    }
  },

  mounted () {
    this.$bus.$on('sellers', v => {
      console.log('receive event!', v)
    })
  }
}
</script>

<style lang="stylus">

  @import url('https://fonts.googleapis.com/css?family=Lato:300,400,700');
  @import './lib/stylus/main.styl'
  @import 'vue-loading-overlay/dist/vue-loading.min.css'

  html, body
    font-size 18px

  .vi-banner
    display flex
    align-items center
    background $brand
    color white
    padding 16px 24px

    small
      font-size 0.75em
      margin-left 0.2em

    &__icon
      margin-right 16px

    &__title
      font-size 26px
      font-weight bold

    &__info
       font-size 18px
       font-weight bold

  .vi-link
    cursor pointer
    display inline
    color $brand

    &:hover
      border-bottom 1px solid currentColor

    .search-input
      background none
      border-bottom 1px solid white !important
      width 74px

      &.vi-input--focused
        width 220px

      input::placeholder
        color white

  .app
    display flex
    align-items stretch
    height 100%
    font-size 18px

  .app__sidebar
    position fixed
    left 0
    top 0
    bottom 0
    background #686868
    width 260px
    flex-shrink 0
    font-size 18px
    box-shadow $shadow-2
    overflow hidden
    transition width 0.3s
    display: flex;
    flex-direction: column;

    +screen(900px)
      width 74px

      #layout-1 > polygon:first-child
        display none

    *
      color white

    .vi-item
      color #002a3f
      margin-top 8px

      &:hover
        background #a1a1a1

      ^[0] .router-link-active ^[-1..-1]
        background #858585 !important

        label 6px #009aec left

    .vi-item__content
      font-size 17px
      font-weight bold

    .vi-item__avatar
      width 56px

    .vi-toolbar-logo
      height auto
      margin 16px

      svg
        width 165px
        flex-shrink 0

    .spacer
      flex 1

  .app__viewport
    height 100%
    overflow hidden
    flex 1 0 0
    color #00557f
    display flex
    flex-direction column
    wdith 100%

    > div
      height 100%
      overflow hidden
      display flex
      flex-direction column

  .app__scroll
    margin-left 260px
    width 100%

    +screen(900px)
      margin-left 74px

  .vdp-datepicker__calendar
    border none
</style>
