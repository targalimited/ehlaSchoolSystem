<template lang="pug">
  .image-holder(:style="{'padding-top':ratio}")
    .image-holder__inner(:style="{'background-image': `url(${src})`}")
</template>

<script>
  export default {
    name: 'ratio-holder',
    props: {
      src: {
        type: String,
        required: true
      },
      ratio: {
        type: String,
        default: '56%'
      }
    }
  }
</script>

<style lang="stylus">
  .image-holder
    position relative

    &__inner
      position absolute
      top 0
      bottom 0
      left 0
      right 0
      background-position center
      background-size cover
</style>
