<template>
  <div class="lib-cat-view">

    <div class="vi-banner">
      <vi-icon class="vi-banner__icon" name="daily-reading" size="60"/>
      <div class="vi-banner__title">Browser readings</div>
    </div>

    <vi-container>

      <router-link
        class="reading-cat" v-for="(cat, i) in readingCategories"
        :key="i"
        :to="{name: 'lib', params: {key: cat.key}}">

        <vi-icon :name="cat.icon" size="100"/>

        <vi-item height="auto">
          <vi-item-content>{{cat.name_en}}</vi-item-content>
        </vi-item>
      </router-link>
    </vi-container>

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

  .reading-cat
    display flex
    align-items center
    font-size 18px
    padding 32px
    border 1px solid $border-color
    margin-bottom 16px
    border-radius 6px

    &:hover
      box-shadow $shadow

    .vi-icon
      margin-right 32px
      color $light-grey

    .vi-item
      font-size 28px
      color $brand

</style>
