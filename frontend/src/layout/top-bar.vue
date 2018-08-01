<template lang="pug">
  .top-bar
    img.top-bar__logo(src="../modules/auth/assets/app-logo.jpg")
    .top-bar__l
      .top-bar__l__top
        vi-select(
          :options="class_option"
          :value="class_id"
          @input="onClassChange"
          option-name="c_name"
          option-value="class_id"
          minimal
        )
          template(slot="selection" slot-scope="{selection}")
            .top-bar__title Class {{selection && selection.c_name}}
      ul.top-bar__tabs
        li.top-bar__tab(
          v-for="tab in tabs"
          :key="tab.title"
          tag="li"
          @click="navigate(tab.route)"
          :class="{'top-bar__tab--active': isTabActive(tab.route.name)}"
        ) {{tab.title}}
    vi-spacer
    .top-bar__r
      vi-button(icon color="brand" size="24" style="font-size: 20px" @click="createAsmt")
        div +
      vi-avatar(size="24" class="ml-8")
        vi-icon(name="avatar" size="16")
</template>

<script>
  import {createAsmtDialog} from '../modules/teach/dialogs'
  export default {
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
      onClassChange (new_class_id) {
        const newRoute = Object.assign({}, this.$route, {
          params: {
            class_id: new_class_id
          }
        })
        this.$router.push(newRoute)
      },
      navigate (route) {
        const newRoute = {
          ...route, ...{
            params: this.$route.params.class_id
          }
        }
        this.$router.push(newRoute)
      },
      createAsmt () {
        createAsmtDialog()
      },
      isTabActive (routeName) {
        return routeName === this.$route.name
      }
    },
    computed: {
      class_option () {
        return this.$store.state.teach.classList
      },
      class_id () {
        return parseInt(this.$route.params.class_id)
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
    height 75px
    padding 0 16px
    display flex
    align-items center
    box-shadow $box-shadow-2
    z-index 3
    position fixed
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

      &--active
        border-color $brand
</style>
