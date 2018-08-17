<template lang="pug">
  .sidebar
    img.sidebar__logo(src="../modules/auth/assets/app-logo.jpg")
    router-link.menu-link(:to="{name: 'home'}")
      vi-button(icon flat dark)
        vi-icon(name="home" size="30")
      .name Home
    router-link.menu-link(:to="{name: 'browse-ehla-root'}")
      vi-button(icon flat dark)
        vi-icon(name="apps" size="24")
      .name Browse
    router-link.menu-link(:to="{name: 'library-unassigned'}")
      vi-button(icon flat dark)
        vi-icon(name="shelf" size="30")
      .name Manage
    template(v-if="defaultClassId && userGroupId === 3")
      router-link.menu-link(:to="{name: 'asmt-class-progress', params:{classId: defaultClassId}}")
        vi-button(icon flat dark)
          vi-icon(name="assignment" size="28")
        .name Assign
      router-link.menu-link(:to="{name: 'report-class-weakness', params:{classId: defaultClassId}}")
        vi-button(icon flat dark)
          vi-icon(name="report" size="28")
        .name Report
    router-link.menu-link(:to="{name: 'settings-class'}" v-if="userGroupId === 1 || userGroupId === 2")
      vi-button(icon flat dark)
        vi-icon(name="config" size="20")
      .name Settings
    .sidebar__divider
    .sidebar__group
      router-link.menu-link(:to="{name: 'browse-free-root'}")
        vi-button(icon flat dark)
          vi-icon(name="free-access" size="22")
        .name Free
      router-link.menu-link(:to="{name: 'browse-pilot-root'}")
        vi-button(icon flat dark)
          vi-icon(name="pilot" size="28")
        .name Pilot
</template>

<script>
  export default {
    name: 'sidebar',
    computed: {
      defaultClassId () {
        return this.$store.getters.defaultClassId
      },
      userGroupId () {
        return this.$store.getters.userGroupId
      }
    }
  }
</script>

<style lang="stylus">
  .sidebar
    width 60px
    font-size 11px
    text-align center
    color white

    &__divider
      height 1px
      background rgba(255, 255, 255, 0.3)
      margin 24px 16px

    &__logo
      width 50px
      height 50px
      margin 12px 5px
      border-radius 6px

    &__group
      background rgba(35,35,35,0.18)
      border-radius 20px
      margin 6px

      .vi-button
        margin 8px 4px !important

    .vi-button
      margin 8px 10px

    .menu-link
      display block

      &:hover, &.router-link-active
        .vi-button
          color white

        .vi-button__content:before
          opacity 0.3 !important

      .name
        margin -8px 0 12px
</style>
