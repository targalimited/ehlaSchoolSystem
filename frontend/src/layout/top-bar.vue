<template lang="pug">
  .top-bar
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
        ) {{tab.title}}
    vi-spacer
    .top-bar__r
      vi-avatar(size="24")
        vi-icon(name="avatar" size="16")
</template>

<script>
  export default {
    data () {
      return {
        classes: [],
        tabs: [
          {
            route: {
              name: 'asmt-report'
            },
            title: 'Current Assignment'
          },
          {
            route: {
              name: 'asmt-report',
              query: {
                completed: true
              }
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
    z-index 100
    position fixed
    left 0
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

    &__tabs
      display flex
      height 30px
      font-size 13px

    &__tab
      margin-right 16px
      border-bottom 4px solid transparent
      cursor pointer

      &.router-link-exact-active
        border-color $brand
</style>
