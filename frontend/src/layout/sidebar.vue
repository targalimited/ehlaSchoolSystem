<template lang="pug">
  .sidebar
    img.sidebar__logo(src="../modules/auth/assets/app-logo.jpg")
    router-link(:to="{name: 'home'}")
      vi-button(icon flat dark)
        vi-icon(name="home" size="30")
    router-link(:to="{name: 'browse-ehla-root'}")
      vi-button(icon flat dark)
        vi-icon(name="apps" size="24")
    router-link(:to="{name: 'library-unassigned'}")
      vi-button(icon flat dark)
        vi-icon(name="shelf" size="30")
    template(v-if="defaultClassId")
      router-link(:to="{name: 'asmt-class-progress', params:{classId: defaultClassId}}")
        vi-button(icon flat dark)
          vi-icon(name="assignment" size="28")
      router-link(:to="{name: 'report-class-weakness', params:{classId: defaultClassId}}")
        vi-button(icon flat dark)
          vi-icon(name="report" size="28")
    router-link(:to="{name: 'settings-class'}")
      vi-button(icon flat dark)
        vi-icon(name="config" size="20")
    .sidebar__divider
    .sidebar__group
      router-link(:to="{name: 'browse-free-root'}")
        vi-button(icon flat dark)
          vi-icon(name="free-access" size="22")
      router-link(:to="{name: 'browse-pilot-root'}")
        vi-button(icon flat dark)
          vi-icon(name="pilot" size="28")
</template>

<script>
  export default {
    name: 'sidebar',
    computed: {
      defaultClassId () {
        return this.$store.getters.defaultClassId
      }
    }
  }
</script>

<style lang="stylus">
  .sidebar
    width 60px

    &__divider
      height 1px
      background rgba(255, 255, 255, 0.3)
      margin 24px 16px

    &__logo
      width 50px
      height 50px
      margin 12px 5px

    &__group
      background rgba(35,35,35,0.18)
      border-radius 20px
      margin 6px

      .vi-button
        margin 8px 4px !important

    .vi-button
      margin 8px 10px

    .router-link-active
      .vi-button
        background rgba(255,255,255,0.2)
</style>
