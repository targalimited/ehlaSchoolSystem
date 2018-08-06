<template lang="pug">
  .sidebar
    img.logo(src="../modules/auth/assets/app-logo.jpg")
    router-link(:to="{name: 'home'}")
      vi-button(icon flat)
        vi-icon(name="home")
    router-link(:to="{name: 'lib-main'}")
      vi-button(icon flat)
        vi-icon(name="apps")
    router-link(:to="{name: 'shelf'}")
      vi-button(icon flat)
        vi-icon(name="shelf")
    router-link(:to="{name: 'asmt-class-progress', prop:{classId: 1}}")
      vi-button(icon flat)
        vi-icon(name="assignment")
    router-link(:to="{name: 'report-class-weakness', props:{classId: 1}}")
      vi-button(icon flat)
        vi-icon(name="report")
    router-link(:to="{name: 'free-access'}")
      vi-button(icon flat)
        vi-icon(name="free-access")
    router-link(:to="{name: 'browse-root'}")
      vi-button(icon flat)
        vi-icon(name="pilot")
</template>

<style lang="stylus">
  .sidebar
    width 100%
</style>
