<template>
  <div class="reading-item" :class="{'reading-item--sm': small}">
    <img class="reading-item__image" :src="item.thumbnail_path" alt="">
    <div class="reading-item__content">
      <div class="reading-item__title">{{item.name_en}}</div>
      <div class="reading-item__info">{{item.info_nd_en}}</div>
      <div class="reading-item__info">{{item.info_en}}</div>
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

<style lang="stylus">
  @import '../../../lib/stylus/main.styl'

  .reading-item
    display inline-flex
    align-items center
    text-align left

    &__image
      flex-shrink 0
      max-width 240px
      margin-right 20px

      .reading-item--sm &
        max-width 180px

    &__content
      flex 1

    &__title
      font-size 26px
      margin-bottom 4px
      text-align left

      .reading-item--sm &
        font-size 20px

    &__info
      text-align left
      font-size 18px
      color $mild-grey

      .reading-item--sm &
        font-size 16px
</style>
