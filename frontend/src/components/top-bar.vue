<template lang="pug">
  .top-bar
    .top-bar__l
      .top-bar__l__top
        slot(v-if="$slots.default")
        template(v-else) {{title}}
      ul.top-bar__tabs(v-if="$slots.tabs")
        slot(name="tabs")
    vi-spacer
    .top-bar__r
      vi-menu(left)
        vi-button(slot="activator" icon color="brand" size="24" style="font-size: 20px")
          div +
        vi-item(v-for="cat in catList" :key="cat.key" @click="createAsmt(cat.key)" link) {{cat.name_en}}
      vi-avatar(size="24" class="ml-16")
        vi-icon(name="avatar" size="16")
</template>

<script>
  import {createAsmtDialog} from '../modules/teach/dialogs'
  export default {
    props: {
      title: String
    },
    data () {
      return {
        classes: [],
        tabs: [
          {
            route: {
              name: 'asmt-status'
            },
            title: 'Current Assignment'
          },
          {
            route: {
              name: 'asmt-report'
            },
            title: 'Completed Assignment'
          },
          {
            route: {
              name: 'weakness-report'
            },
            title: 'Weakness'
          }
        ]
      }
    },
    methods: {
      onClassChange (new_classId) {
        const newRoute = Object.assign({}, this.$route, {
          params: {
            classId: new_classId
          }
        })
        this.$router.push(newRoute)
      },
      navigate (route) {
        const newRoute = {
          ...route, ...{
            params: this.$route.params.classId
          }
        }
        this.$router.push(newRoute)
      },
      createAsmt (id) {
        createAsmtDialog({
          catId: id
        })
      },
      isTabActive (routeName) {
        return routeName === this.$route.name
      }
    },
    computed: {
      class_option () {
        return this.$store.state.teach.classList
      },
      classId () {
        return parseInt(this.$route.params.classId)
      },
      catList () {
        return this.$store.state.teach.catList
      }
    },
    // TODO: where should we call this API
    async created () {
      this.classes = await this.$store.dispatch('getClasses')
    }
  }
</script>

<style lang="stylus">
  @import '../project-ui/stylus/settings.styl'
  .top-bar
    background white
    height 75px
    padding 0 16px
    display flex
    align-items center
    box-shadow $box-shadow-2
    z-index 3
    left 40px
    top 0
    right 0

    &__l
      display flex
      flex-direction column
      height 75px

      &__top
        flex 1
        display flex
        align-items center
        font-size 20px
        font-weight bold
        color $font-color-3

    &__title
      font-size 20px
      font-weight bold
      color $font-color-3

    &__logo
      width 60px
      height @width
      margin-right 16px

    &__tabs
      display flex
      height 30px
      font-size 13px

    &__tab
      margin-right 16px
      border-bottom 4px solid transparent
      cursor pointer

      &--active, &.router-link-active
        border-color $brand
</style>
