<template>
  <div class="home-view">

    <div class="banner">
      <!--Welcome to EHLA School System!-->
    </div>

    <div class="dashboard">

      <div class="dashboard__l">
        <vi-avatar size="120">
          <vi-icon name="school" color="light-grey" size="120"/>
        </vi-avatar>
      </div>

      <div class="dashboard__r">
        <div class="dashboard__title">{{$store.state.auth.schoolName}}</div>

        <div class="stat-section">

          <router-link class="stat" :to="{name: 'shelf'}">
            <vi-item height="auto">
              <vi-item-avatar>
                <vi-icon class="stat__icon" name="shelf" size="60"/>
              </vi-item-avatar>
              <vi-item-content>
                <vi-row align-center>
                  <div class="stat__int">{{selectedCount}}</div>
                  <div class="stat__name">Selected Reading</div>
                </vi-row>
                <div class="stat__info">Quota: {{summary.total_item_qtt}} readings</div>
              </vi-item-content>
              <vi-item-action>
                <vi-icon name="arrow-right" size="48" color="light-grey"/>
              </vi-item-action>
            </vi-item>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',

  created: function() {

  },

  computed: {
    summary () {
      return this.$store.state.shelf.summary
    },
    readingCategories () {
      return this.$store.getters['shelf/categories']
    },
    selectedCount () {
      return this.$store.getters['shelf/selectedCount']
    }
  },

  mounted () {
    this.$store.dispatch('shelf/getSummary')
  }
}
</script>

<style lang="stylus">
  .selected-item-table .vi-table__col
    &:nth-child(1)
      width 40%
      justify-content flex-start

    &:nth-child(2)
      width 20%
      min-width 120px
      justify-content flex-start

    &:nth-child(3)
      width 20%
      min-width 100px

    &:nth-child(4)
      width 40px
</style>

<style scoped lang="stylus">
  @import '../../../lib/stylus/main.styl'
  .banner
    padding 24px
    font-size 34px
    background $brand
    color white
    min-height 80px
    *
      color white

  .dashboard
    margin-top -90px
    padding 24px 40px
    display flex

    &__l
      padding-top 12px
      width 144px
      flex-shrink 0

    &__r
      flex 1

    .vi-avatar
      background white

    &__title
      font-size 32px
      margin-top 8px
      margin-bottom 12px
      color white

    .action-bar
      border-top 1px solid rgba(255,255,255,0.3)
      margin-top 12px
      padding-top 12px
      width 100%

    .search-input
      background none
      border-bottom 1px solid white !important
      width 74px

      &.vi-input--focused
        width 220px

      input::placeholder
              color white

  .stat
    display inline-flex
    align-items center
    line-height 1
    font-size 20px
    cursor pointer

    &:hover
      *
        color $brand


    .vi-item
      display inline-flex !important

      &__action
        margin-left 48px

    &__icon
      color $brand
      width 80px
      height @width

      .stat--small &
        color $mild-grey
        width 34px
        height @width

    &__int
      color $dark-grey
      font-size 44px

      .stat--small &
        font-size 26px

    &__name
      color $mild-grey
      margin-left 8px
      font-size 22px
      position relative
      top 2px

    &__info
      width 100%
      margin-top 4px
      margin-left 8px
      color $mild-grey
      font-size 16px
</style>
