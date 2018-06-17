<template>
  <div class="home-view">

    <div class="banner"></div>

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
                  <div class="stat__name">Accessible Items</div>
                </vi-row>
                <!--<div class="stat__info">Quota: {{summary.total_item_qtt}} readings</div>-->
              </vi-item-content>
              <vi-item-action>
                <vi-icon name="arrow-right" size="48" color="light-grey"/>
              </vi-item-action>
            </vi-item>
          </router-link>
        </div>
      </div>
    </div>

    <div class="start">
      <vi-icon name="pilot" size="100"/>
      The journey of Pilot School starts here
    </div>

    <vi-row>
      <vi-col v-for="i in 4">
        <div class="pdf">
          PDF {{i}}
        </div>

        <div class="vi-link">PDF_XYZ.pdf (download)</div>
      </vi-col>
    </vi-row>

  </div>
</template>

<script>
export default {
  name: 'home',

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

  created() {
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

  .pdf
    width 100px
    height 150px
    background #d7d7d7
    margin 10px


  .start
    background #42d495
    color white
    font-weight bold
    padding 20px
    text-align center
    font-size 20px
    margin 24px
    border-radius 20px
</style>
