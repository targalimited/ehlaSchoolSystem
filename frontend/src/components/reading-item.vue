<template>
  <div class="reading-item" :class="{'reading-item--sm': small}">
    <div class="reading-item__image" :style="{'background-image': `url(${item.thumbnail_path})`}"></div>
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
  @import '../project-ui/stylus/settings.styl'

  .reading-item
    display inline-flex
    align-items center
    text-align left
    width 100%
    overflow hidden

    &__image
      flex-shrink 0
      width 150px
      height 90px
      margin-right 20px
      background-size cover
      background-position center
      border-radius 10px

      .reading-item--sm &
        max-width 120px
        margin-right 16px

    &__content
      flex 1
      overflow hidden

    &__title
      font-size 18px
      margin-bottom 4px
      text-align left

      .reading-item--sm &
        font-size 18px

    &__info
      text-align left
      font-size 14px
      color $mild-grey

      .reading-item--sm &
        font-size 14px
</style>
