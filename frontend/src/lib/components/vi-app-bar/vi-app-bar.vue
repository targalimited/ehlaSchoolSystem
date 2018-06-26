<template>
  <div class="vi-app-bar" :class="{'vi-app-bar--fixed': fixed}">
    <!-- TODO this component is mixed with application logic, move outside -->
    <vi-button v-if="back" icon flat dark @click="$router.back()"><vi-icon name="left"/></vi-button>
    <div>
      <span v-if="title" class="vi-app-bar__title">{{title}}</span>

      <div v-if="$slots.default|| subtitle" class="vi-app-bar__info">
        <slot v-if="$slots.default"></slot>
        <template v-else="subtitle">{{subtitle}}</template>
      </div>
    </div>

    <vi-spacer></vi-spacer>

    <slot name="action"></slot>

    <vi-menu left min-width="180" :nudge-bottom="14" content-class="profile-menu" :attach="true">
      <vi-button slot="activator" icon flat dark>
        <vi-icon name="config" size="22"/>
      </vi-button>

      <router-link :to="{name: 'config'}">
        <vi-item :link="true">
          <vi-item-content>Class</vi-item-content>
        </vi-item>
      </router-link>

      <router-link :to="{name: 'config'}">
        <vi-item :link="true">
          <vi-item-content>Student</vi-item-content>
        </vi-item>
      </router-link>

      <router-link :to="{name: 'config'}">
        <vi-item :link="true">
          <vi-item-content>Teacher</vi-item-content>
        </vi-item>
      </router-link>
    </vi-menu>

    <vi-menu left min-width="180" :nudge-bottom="14" content-class="profile-menu" :attach="true">
      <vi-button slot="activator" icon flat dark>
        <vi-icon name="avatar" size="22"/>
      </vi-button>

      <router-link :to="{name: 'config'}">
        <vi-item :link="true">
          <vi-item-avatar>
            <vi-icon name="config"/>
          </vi-item-avatar>
          <vi-item-content>Settings</vi-item-content>
        </vi-item>
      </router-link>

      <router-link :to="{name: 'profile'}">
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
  .vi-app-bar
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
      z-index 2

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

  .profile-menu
    color #555

    .vi-icon
      color #adadad
</style>
