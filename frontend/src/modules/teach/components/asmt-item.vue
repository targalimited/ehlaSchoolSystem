<template lang="pug">
  .asmt-item(:class="{'asmt-item--active': isSelected}")
    vi-row(justify-space-between mb-8)
      .asmt-item__teacher From: {{asmtData.teacher_realname_en}}
      .asmt-item__date {{asmtData.start_date | formatDate}} - {{asmtData.end_date | formatDate}}
    vi-item(height="70")
      vi-item-avatar
        vi-avatar(:size="60" :src="asmtData.thumbnail_path")
      vi-item-content
        vi-item-title {{asmtData.name_en}}
        vi-item-subtitle {{exercisesInfo}}
        vi-item-subtitle {{asmtData.ttl_stu_cpt}}/{{asmtData.ttl_stu}} std completed
</template>


<script>
  export default {
    name: 'asmt-item',

    props: {
      asmtData: {
        type: Object
      },
      locked: {
        type: Boolean,
        required: false,
        default: false
      }
    },

    computed: {
      isSelected () {
        const id = this.$route.query.batch_id
        return parseInt(this.asmtData.batch_id) === parseInt(id)
      },
      exercisesInfo () {
        const exercises = this.asmtData.exercise_assignments
        const videos = this.asmtData.video_assignments
        if (exercises && videos) return `${exercises.length} exercises and ${videos.length} videos`
        else if (exercises) return `${exercises.length} exercises`
        else if (videos) return `${videos.length} videos`
      }
    }
  }
</script>

<style lang="stylus">
  @import '../../../project-ui/stylus/settings.styl'
  .asmt-item
    border-bottom 1px solid $border-color
    padding 10px 20px
    cursor pointer

    &:hover
      background $bg-color-1

    &--active
      border-top 1px solid $border-color
      background $bg-color-1
      border-color $brand

    &__date
      text-transform uppercase
      font-size 11px
      color $brand

    &__teacher
      font-size 11px
</style>
