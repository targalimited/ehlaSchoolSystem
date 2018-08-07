<template lang="pug">
  .asmt-item(:class="{'asmt-item--active': isSelected}")
    vi-row(justify-space-between mb-8)
      .asmt-item__teacher From: Teacher {{asmtData.teacher_id}}
      .asmt-item__date {{asmtData.start_date | formatDate}} - {{asmtData.end_date | formatDate}}
    vi-item(height="70")
      vi-item-avatar
        vi-avatar(:size="60" :src="asmtData.thumbnail_path")
      vi-item-content
        vi-item-title {{asmtData.name_en}}
        vi-item-subtitle(v-if="asmtData.exercise_assignments") ({{asmtData.exercise_assignments.length}} exercises, 3 Videos)
        vi-item-subtitle 16/20 std completed
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
