<template>
  <div class="lib-cat-view">

    <div class="vi-banner">
      <vi-icon class="vi-banner__icon" name="daily-reading" size="60"/>
      <div class="vi-banner__title">Browser readings</div>
    </div>

    <vi-container>

      <router-link
        class="reading-cat" v-for="cat in readingCategories" :key="cat.key"
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
  export default {
    name: 'lib-cat-view',

    computed: {
      readingCategories () {
        return this.$store.getters['shelf/categories']
      }
    },

    mounted () {
      this.$store.dispatch('shelf/getDashboard')
    }
  }
</script>

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
