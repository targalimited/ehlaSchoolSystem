<template lang="pug">
  .asmt-item(:class="{'asmt-item--active': isSelected}")
    vi-row(align-center)
      .asmt-item__date {{asmtData.start_date | formatDate}} - {{asmtData.end_date | formatDate}}
      vi-spacer
      vi-menu(left v-if="!locked")
        vi-button(slot="activator" icon flat size="30")
          vi-icon(name="more" size="18")
        vi-item(link @click="onEdit(asmtData)")
          vi-item-avatar
            vi-icon(name="edit" size="18")
          vi-item-content Edit Assignment
        vi-item(link @click="lockAsmt(asmtData)")
          vi-item-avatar
            vi-icon(name="lock" size="18")
          vi-item-content Lock Assignment
        vi-item(link @click="lockAsmt")
          vi-item-avatar
            vi-icon(name="trash" size="18")
          vi-item-content Delete Assignment
    vi-item(height="80")
      vi-item-avatar
        vi-avatar(:size="60" :src="asmtData.thumbnail_path")
      vi-item-content
        vi-item-title {{asmtData.name_en}}
        vi-item-subtitle(v-if="asmtData.exercise_assignments") ({{asmtData.exercise_assignments.length}} exercises, 3 Videos)
        vi-item-subtitle 16/20 std completed
    // .asmt-item__remark(v-if="asmtData.remark") {{asmtData.remark}}
</template>


<script>
  import {editAsmtDialog} from '../dialogs'
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
    },

    methods: {
      onEdit (asmtData) {
        editAsmtDialog({
          itemId: asmtData.item_id,
          batchId: asmtData.batch_id
        })
      },
      lockAsmt (asmtData) {
        this.$store.dispatch('lockAsmt', {
          batchId: asmtData.batch_id,
          classId: this.$route.params.classId
        })
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
      font-size 12px

    .vi-item
      // padding 0 20px
</style>
