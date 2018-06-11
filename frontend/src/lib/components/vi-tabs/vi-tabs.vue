<template>
  <div class="vi-tabs">
    <ul role="tablist" class="vi-tabs__list" :class="{'vi-tabs__list--with-border' : border}">
      <li
        v-for="(tab, i) in tabs"
        :key="i"
        :class="{ 'vi-tabs__item--active': tab.isActive, 'is-disabled': tab.isDisabled, 'vi-tabs__item--button': buttonTab }"
        class="vi-tabs__item"
        role="presentation"
        v-show="tab.isVisible"
      >
        <vi-icon class="vi-tabs__item__prefix-icon" v-if="tab.prefixIcon" :name="tab.prefixIcon" :size="tab.iconSize"/>
        <a v-html="tab.header"
           :aria-controls="tab.hash"
           :aria-selected="tab.isActive"
           @click="selectTab(tab.hash, $event)"
           :href="tab.hash"
           class="vi-tabs__item-a"
           role="tab"
        ></a>
      </li>
      <vi-spacer/>
      <slot name="right"/>
    </ul>
    <div class="tabs-component-panels">
      <slot/>
    </div>
  </div>
</template>

<script>
  import expiringStorage from './expiring-storage';

  export default {
    props: {
      cacheLifetime: {
        default: 5,
      },
      options: {
        type: Object,
        required: false,
        default: () => ({
          useUrlFragment: false,
        }),
      },
      // apply for button style
      buttonTab: {
        type: Boolean,
        default: false
      },
      border: {
        type: Boolean,
        default: false
      }
    },

    data: () => ({
      tabs: [],
      activeTabHash: '',
    }),

    computed: {
      storageKey() {
        return `vue-tabs-component.cache.${window.location.host}${window.location.pathname}`;
      },
    },

    created() {
      this.tabs = this.$children;
    },

    mounted() {
      window.addEventListener('hashchange', () => this.selectTab(window.location.hash));

      if (this.findTab(window.location.hash)) {
        this.selectTab(window.location.hash);
        return;
      }

      const previousSelectedTabHash = expiringStorage.get(this.storageKey);

      if (this.findTab(previousSelectedTabHash)) {
        this.selectTab(previousSelectedTabHash);
        return;
      }

      if (this.tabs.length) {
        this.selectTab(this.tabs[0].hash);
      }
    },

    methods: {
      findTab(hash) {
        return this.tabs.find(tab => tab.hash === hash);
      },

      selectTab(selectedTabHash, event) {
        // See if we should store the hash in the url fragment.
        if (event && !this.options.useUrlFragment) {
          event.preventDefault();
        }

        const selectedTab = this.findTab(selectedTabHash);

        if (! selectedTab) {
          return;
        }

        if (selectedTab.isDisabled) {
          return;
        }

        this.tabs.forEach(tab => {
          tab.isActive = (tab.hash === selectedTab.hash);
        });

        this.$emit('changed', { tab: selectedTab });

        this.activeTabHash = selectedTab.hash;

        expiringStorage.set(this.storageKey, selectedTab.hash, this.cacheLifetime);
      },

      setTabVisible(hash, visible) {
        const tab = this.findTab(hash);

        if (! tab) {
          return;
        }

        tab.isVisible = visible;

        if (tab.isActive) {
          // If tab is active, set a different one as active.
          tab.isActive = visible;

          this.tabs.every((tab, index, array) => {
            if (tab.isVisible) {
              tab.isActive = true;

              return false;
            }

            return true;
          });
        }
      },
    },
  };
</script>

<style lang="stylus">
  @import '../../stylus/main.styl'

  .vi-tabs

    &__list
      display flex

      &--with-border
        border-bottom 1px solid #e5e5e5

    &__item
      display inline-flex
      align-items center
      color $mild-grey
      min-height 36px
      font-size 16px
      margin-right 32px
      position relative

      &__prefix-icon
        margin-right 8px
        color $light-grey

      &:before
        content: ''
        display block
        position absolute
        right 0
        left 0
        bottom -1px
        color inherit
        background currentColor
        height 1px
        opacity 0

      &:hover
        &:before
          opacity 1
          color $dark-border-color

      &--active
        color $brand !important

        .vi-tabs__item__prefix-icon
          color $brand

        &:before
          opacity 1
          background $brand !important

      &--button
        font-size 14px
        text-transform uppercase
        // margin 0
</style>
