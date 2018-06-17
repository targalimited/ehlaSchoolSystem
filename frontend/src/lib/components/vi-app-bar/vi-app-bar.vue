<template>
  <div class="ui-banner" :class="{'ui-banner--fixed': fixed}">
    <!-- TODO this component is mixed with application logic, move outside -->
    <vi-button v-if="back" icon text flat dark @click="$router.back()"><vi-icon name="left"/></vi-button>
    <div>
      <span v-if="title" class="ui-banner__title">{{title}}</span>

      <div v-if="$slots.default|| subtitle" class="ui-banner__info">
        <slot v-if="$slots.default"></slot>
        <template v-else="subtitle">{{subtitle}}</template>
      </div>
    </div>

    <vi-spacer></vi-spacer>

    <vi-menu left min-width="180" :nudge-bottom="14">
      <vi-button slot="activator" icon text>
        <vi-icon name="avatar"/>
      </vi-button>

      <router-link :to="{name: 'config'}">
        <vi-item :link="true">
          <vi-item-avatar>
            <vi-icon name="config"/>
          </vi-item-avatar>
          <vi-item-content>Settings</vi-item-content>
        </vi-item>
      </router-link>

      <router-link :to="{name: 'config'}">
        <vi-item :link="true">
          <vi-item-avatar>
            <vi-icon name="avatar"/>
          </vi-item-avatar>
          <vi-item-content>Profile</vi-item-content>
        </vi-item>
      </router-link>

      <vi-item @click="logout" :link="true">
        <vi-item-avatar>
          <vi-icon name="logout"/>
        </vi-item-avatar>
        <vi-item-content>Logout</vi-item-content>
      </vi-item>
    </vi-menu>
  </div>
</template>

<script>
  export default {
    name: 'vi-app-bar',
    props: {
      title: '',
      subtitle: '',
      fixed: {
        default: true,
        type: Boolean
      },
      back: {
        default: true,
        type: Boolean
      },
      title: {
        type: String
      }
    },
    methods: {
      logout () {
        this.$store.dispatch('logout')
        this.$router.replace({
          name: 'login'
        })
      }
    },
  }
</script>

<style lang="stylus">
  @import '../../stylus/main.styl'
  .ui-banner
    display flex
    align-items center
    background $brand
    color white
    padding 8px 8px
    height 70px

    &--fixed
      position fixed
      top 0
      left 220px
      right 0
      z-index 999

      +screen(900px)
        left 74px

    small
      font-size 0.75em
      margin-left 0.2em

    .vi-button
      margin-right 8px
      color white !important

    &__title
      font-size 22px
      font-weight bold
      line-height 1

    &__info
      font-size 16px
      font-weight bold

      small
        font-size 14px
</style>
