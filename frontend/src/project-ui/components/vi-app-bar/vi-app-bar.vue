<template>
  <div class="vi-app-bar" :class="{'vi-app-bar--fixed': fixed}">

    <transition name="slide-y-transition">
      <div v-if="$slots.overlay" class="vi-app-bar__overlay">
        <slot name="overlay"></slot>
      </div>
    </transition>

    <div class="vi-app-bar__main">
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

      <slot name="secondaryAction"></slot>

      <div v-if="$slots.secondaryAction" class="vi-app-bar__divider"></div>

      <slot name="action">
        <vi-menu left min-width="180" :nudge-bottom="14" content-class="profile-menu" :attach="true">
          <vi-button slot="activator" icon flat dark>
            <vi-icon name="config" size="22"/>
          </vi-button>

          <router-link :to="{name: 'setting-class'}">
            <vi-item :link="true">
              <vi-item-content>Class</vi-item-content>
            </vi-item>
          </router-link>

          <router-link :to="{name: 'setting-student'}">
            <vi-item :link="true">
              <vi-item-content>Student</vi-item-content>
            </vi-item>
          </router-link>

          <router-link :to="{name: 'setting-teacher'}">
            <vi-item :link="true">
              <vi-item-content>Teacher</vi-item-content>
            </vi-item>
          </router-link>
        </vi-menu>

        <vi-menu left min-width="180" :nudge-bottom="14" content-class="profile-menu" :attach="true">
          <vi-button slot="activator" icon flat dark>
            <vi-icon name="avatar" size="30"/>
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
      </slot>
    </div>
    <div v-if="$slots.append" class="vi-app-bar__append">
      <slot name="append"></slot>
    </div>
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
    position relative

    .vi-icon
      color inherit

    &__main
      display flex
      align-items center
      background $brand
      color white
      padding 8px 8px
      height 70px

    &__overlay
      padding 8px 8px
      height 70px
      background $green
      color white
      padding 8px
      display flex
      align-items center
      position absolute
      left 0
      right 0
      top 0
      z-index 1

    &__append
      padding 8px 8px
      background $bg-color

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
      font-size 24px
      line-height 1

    &__info
      font-size 16px
      font-weight bold

      small
        font-size 14px

    &__divider
      height 30px
      width 1px
      background rgba(255,255,255,0.5)
      margin 0 8px

  .profile-menu
    color #555

    .vi-icon
      color #adadad
</style>
