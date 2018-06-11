<template>
  <div class="home-view">

    <div class="banner">
      <!--Welcome to EHLA School System!-->
    </div>

    <div class="dashboard">

      <div class="dashboard__l">
        <vi-avatar size="160">
          <vi-icon name="school" color="light-grey" size="160"/>
        </vi-avatar>
      </div>

      <div class="dashboard__r">
        <div class="dashboard__title">Munsang Collage</div>

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


    <div class="reading-section">
      <vi-row wrap v-if="summary">
        <vi-col v-for="(cat, i) in readingCategories" xs6 :key="i">
          <div class="reading-item">

            <vi-icon class="" :name="cat.icon" size="60"/>

            <vi-item height="auto">
              <vi-item-avatar>{{cat.item_ids.length}}</vi-item-avatar>
              <vi-item-content>{{cat.name_en}}</vi-item-content>
            </vi-item>

            <router-link :to="{name: 'lib', params: {key: cat.key}}">
              <vi-button class="add-button" color="green" large>
                Add <vi-icon size="18" right name="right"/>
              </vi-button>
            </router-link>
          </div>
        </vi-col>
        <!--<vi-col v-for="cat in readingCategories">-->
        <!--<vi-row align-center justify-center>-->
        <!--<div class="stat stat--small">-->
        <!--<vi-item height="auto">-->
        <!--<vi-item-avatar>-->
        <!--<vi-icon class="stat__icon" :name="cat.icon" size="40"/>-->
        <!--</vi-item-avatar>-->
        <!--<vi-item-content>-->
        <!--<vi-row align-center>-->
        <!--<div class="stat__int">{{cat.item_ids.length}}</div>-->
        <!--<div class="stat__name">{{cat.name_en}}</div>-->
        <!--</vi-row>-->
        <!--</vi-item-content>-->
        <!--</vi-item>-->
        <!--</div>-->
        <!--<vi-button class="add-button" color="green" small>-->
        <!--Add-->
        <!--</vi-button>-->
        <!--</vi-row>-->
        <!--</vi-col>-->
      </vi-row>
    </div>
  </div>
</template>

<script>
import {createCouponDialog} from '../dialogs'

export default {
  name: 'home',

  data () {
    return {
      search: '',
      headers: [
        {
          text: 'Name'
        },
        {
          text: 'cat'
        },
        {
          text: 'level'
        },
        {
          text: ''
        }
      ]
    }
  },

  computed: {
    summary () {
      return this.$store.state.shelf.summary
    },
    selectedItems () {
      return this.$store.state.shelf.selectedItems
    },
    readingCategories () {
      return this.$store.getters['shelf/categories']
    },
    selectedCount () {
      return this.$store.getters['shelf/selectedCount']
    }
  },

  methods: {
    goToDetails (id) {
      this.$router.push({
        name: 'coupon',
        params: {
          id: id
        }
      })
    },

    async createCoupon () {
      const res = await createCouponDialog({title: 'Create coupon'})
      const {typeId, expiryDays, expiryDate, startDate, maxNewCustomers, count, minTotalAmount} = res
      this.$store.dispatch('createCoupon', {
        typeId, expiryDays, expiryDate, startDate, maxNewCustomers, count, minTotalAmount
      })
    },

    onSelect (v) {
      console.log('on select', v)
      this.$bus.$emit('coupons', 'abc')
    }
  },

  mounted () {
    console.log('home page')
    // this.$store.dispatch('shelf/getSummary')
    this.$store.dispatch('shelf/getDashboard')
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
    min-height 100px
    *
      color white

  .dashboard
    margin-top -90px
    padding 24px 40px
    display flex

    &__l
      width 184px
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

  .stat-section
    margin-bottom 16px

  .reading-section
    background $bg-color
    padding 24px

    .add-button
      margin-left: 8px;
      position: relative;
      top: 3px;
      min-width 0

    .vi-col
      margin-bottom 24px

  .reading-item
    text-align center

    > .vi-icon
      display block
      margin 0 auto
      color $light-grey
      margin-bottom 8px
      width 68px
      height @width

    .vi-item
      display inline-flex
      max-width 326px
      line-height 1.33
      font-size 20px
      justify-center center
      margin-bottom 16px

      .vi-item__avatar
        font-size: 42px;
        flex-shrink: 0;
        // font-weight: bold;
        min-width 42px

    .vi-button
      display block
      margin 0 auto
      min-width 100px
      font-size 18px

</style>
