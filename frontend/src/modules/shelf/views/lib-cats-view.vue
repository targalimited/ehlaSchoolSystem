<template>
  <div class="lib-cat-view">

    <div class="vi-banner">
      <vi-icon class="vi-banner__icon" name="pilot" size="40"/>
      <div class="vi-banner__title">School Pilot 100</div>
    </div>

    <div class="welcome">
      <p>
        Thank you for your enrolment in EHLA’s ‘School Pilot 100’ Programme.

      </p>
      <p>Your journey starts here.</p>
      <p>
        You may select teaching resources from the menu below
      </p>

      <vi-icon class="mt-8" name="down"/>
    </div>

    <vi-container>

      <div class="reading-section">
        <vi-row wrap>
          <vi-col v-for="(cat, i) in readingCategories" xs6 :key="i">
            <div class="reading-item">

              <img :src="cat.image.secondary" alt="">

              {{cat.name_en}}

              <div>
                ({{cat.selectedCount}} item selected)
              </div>

              <router-link :to="{name: 'lib', params: {key: cat.key}}">
                <vi-button class="add-button" color="green" large>
                  Add <vi-icon size="18" right name="right"/>
                </vi-button>
              </router-link>
            </div>
          </vi-col>
        </vi-row>
      </div>
    </vi-container>

  </div>
</template>

<script>
  export default {
    name: 'lib-cat-view',

    computed: {
      readingCategories () {
        return this.$store.getters['shelf/categories']
      }
    },

    created() {
      this.$store.dispatch('shelf/getSummary')
    }
  }
</script>

<style scoped lang="stylus">
  @import '../../../lib/stylus/main.styl'

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
        min-width 42px

    .vi-button
      display block
      margin 0 auto
      min-width 100px
      font-size 18px

  .img
    width 100%
    height 200px
    background-size cover

  .welcome
    background #42d495
    color white
    font-weight bold
    padding 20px
    text-align center
    // color $brand
    font-size 20px
    margin-bottom 24px
</style>
