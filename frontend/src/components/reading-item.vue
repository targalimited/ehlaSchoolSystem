<template>
  <div class="reading-item" :class="{'reading-item--sm': small}">
    <div class="reading-item__image">
      <img :src="item.thumbnail_path" alt="">
    </div>
    <div class="reading-item__content">
      <div class="reading-item__title text-ellipsis">{{item.name_en}}</div>
      <div class="reading-item__info text-ellipsis">{{item.info_nd_en}}</div>
      <div class="reading-item__info text-ellipsis">{{item.info_en}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'reading-item',

    props: {
      item: {
        type: Object,
        required: true,
        validator: v => {
          return v.hasOwnProperty('thumbnail_path')
        }
      },
      small: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../lib/stylus/settings.styl'

  .reading-item
    display inline-flex
    align-items center
    text-align left
    width 100%
    overflow hidden

    &__image
      flex-shrink 0
      max-width 180px
      margin-right 20px

      .reading-item--sm &
        max-width 120px
        margin-right 16px

    &__content
      flex 1
      max-width 100%

    &__title
      font-size 20px
      margin-bottom 4px
      text-align left

      .reading-item--sm &
        font-size 18px

    &__info
      text-align left
      font-size 16px
      color $mild-grey

      .reading-item--sm &
        font-size 14px
</style>
