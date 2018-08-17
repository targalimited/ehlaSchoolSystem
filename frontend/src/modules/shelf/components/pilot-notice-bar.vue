<template>
  <div class="lib-cat-view" :class="{'no-access' : accessNotAllow}">

    <vi-row align-center class="ui-message" v-if="accessNotAllow">
      <vi-icon name="alert"/>
      <template v-if="type === 'pilot'">
        You don't have access to this category. Please go to the <router-link class="ml-4 ui-link" :to="{name: 'browse-free-root'}">free access scheme</router-link>
      </template>
      <template v-else>
        You don't have access to this category. Please go to the <router-link class="ml-4 ui-link" :to="{name: 'browse-pilot-root'}">pilot page</router-link>
      </template>

    </vi-row>

    <div class="welcome" v-if="type === 'pilot'">
      <div class="welcome__main">
        <div class="welcome__head">
          Journey begins.
        </div>
        <p>
          Thank you for your enrolment in EHLA’s ‘School Pilot 100’ Programme.
          Your journey starts here.
          You may select teaching resources from the menu below.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'pilot-notice-bar',

    props: ['type'], // type: 'pilot' or 'free'

    computed: {
      accessNotAllow () {
        return (this.type === 'free' && this.$store.getters['shelf/isPilot']) ||
          (this.type === 'pilot' && !this.$store.getters['shelf/isPilot'])
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import '../../../project-ui/stylus/settings.styl'
  .welcome
    background #78bda0
    color white
    font-weight 400
    padding 16px 16px 24px
    font-size 16px

    &__main
      max-width 600px
      margin 0 auto

    &__head
      font-size 24px
      font-weight bold

  .ui-message
    padding 20px
    display flex
    background #efb03e
    color white

    .vi-icon
      flex-shrink 0
      margin-right 20px
      color inherit

    a
      border-bottom 1px solid currentColor


</style>
