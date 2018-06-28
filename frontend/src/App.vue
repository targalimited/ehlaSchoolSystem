<template>
  <vi-app class="app">

    <div class="app__sidebar" v-if="$route.name !== 'login'">

      <vi-item class="logo-item" height="70">
        <vi-item-avatar><img class="logo-item__logo" src="./modules/auth/assets/app-logo.jpg"/></vi-item-avatar>
        <vi-item-content>
          <div>i-Education</div>
          <div class="logo-item__subtitle">School Portal</div>
        </vi-item-content>
      </vi-item>

      <div class="app__sidebar__main">
        <router-link :to="{name: 'home'}">
          <vi-item class="nav-item" :link="true" height="60">
            <vi-item-avatar><vi-icon class="ml-4" name="home" size="30"/></vi-item-avatar>
            <vi-item-content>Home</vi-item-content>
          </vi-item>
        </router-link>

        <router-link :to="{name: 'lib-main'}">
          <vi-item class="nav-item" :link="true" height="60">
            <vi-item-avatar><vi-icon class="ml-4" name="apps" size="30"/></vi-item-avatar>
            <vi-item-content>EHLA Categories</vi-item-content>
          </vi-item>
        </router-link>

        <router-link :to="{name: 'shelf'}">
          <vi-item class="nav-item" :link="true" height="60">
            <vi-item-avatar><vi-icon class="ml-4" name="shelf" size="36"/></vi-item-avatar>
            <vi-item-content>Accessible Items Overview</vi-item-content>
          </vi-item>
        </router-link>

        <router-link :to="{name: 'assignment'}">
          <vi-item class="nav-item" :link="true" height="60">
            <vi-item-avatar><vi-icon class="ml-4" name="assignment" size="36"/></vi-item-avatar>
            <vi-item-content>Assign Homework</vi-item-content>
          </vi-item>
        </router-link>

        <router-link :to="{name: 'report'}">
          <vi-item class="nav-item" :link="true" height="60">
            <vi-item-avatar><vi-icon class="ml-4" name="report" size="36"/></vi-item-avatar>
            <vi-item-content>Report</vi-item-content>
          </vi-item>
        </router-link>

        <div class="app__sidebar__divider"></div>

        <router-link :to="{name: 'lib-cat'}">
          <vi-item class="nav-item" :link="true" height="60">
            <vi-item-avatar><vi-icon class="ml-4" name="pilot" size="36"/></vi-item-avatar>
            <vi-item-content>School Pilot 100 (2018/19)</vi-item-content>
          </vi-item>
        </router-link>

        <router-link :to="{name: 'free-access'}">
          <vi-item class="nav-item" :link="true" height="60">
            <vi-item-avatar><vi-icon class="ml-4" name="free-access" size="30"/></vi-item-avatar>
            <vi-item-content>Free Access Scheme</vi-item-content>
          </vi-item>
        </router-link>
      </div>
    </div>

    <div class="app__scroll">
      <router-view/>
    </div>

    <dialogs-wrapper wrapper-name="default" />
  </vi-app>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="stylus">

  @import url('https://fonts.googleapis.com/css?family=Lato:300,400,700');
  @import './lib/stylus/main.styl'
  @import 'vue-loading-overlay/dist/vue-loading.min.css'

  html, body
    font-size 18px
    min-width 755px
    overflow-x auto

  .vi-link
    cursor pointer
    display inline
    color $brand

    &:hover
      border-bottom 1px solid currentColor

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
    background #878787
    width 220px
    flex-shrink 0
    font-size 14px
    box-shadow $shadow-2
    overflow hidden
    transition width 0.3s

    &__main
      display flex
      flex-direction column
      height calc(100% - 80px)
      color white

      .spacer
        flex 1

    +screen(900px)
      width 74px

      #layout-1 > polygon:first-child
        display none

    &__divider
      height 1px
      background white
      margin 10px 20px
      opacity 0.5

    .vi-item.nav-item
      margin-top 8px
      width 220px

      &:hover
        background #a1a1a1

      ^[0] .router-link-active ^[-1..-1]
        background rgba(255,255,255,0.3) !important
        label 6px #009aec left

      .vi-item__content
        font-size 15px
        font-weight bold
        line-height 1.2

        +screen(900px)
          opacity 0

      .vi-item__avatar
        width 50px
        flex-shrink 0

    .logo-item
      background white
      padding 7px 10px
      font-size 20px
      align-items flex-end
      width 220px
      height 70px

      &__logo
        width 56px
        height @width

      &__subtitle
        font-size 14px

    .vi-toolbar-logo
      height auto
      margin 16px

      svg
        width 165px
        flex-shrink 0

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
    padding-top 70px
    padding-left 220px
    width 100%

    +screen(900px)
      padding-left 74px

  .vdp-datepicker__calendar
    border none
</style>
