<template>
  <div class="vi-tabs" :class="{'vi-tabs--vertical': vertical}">
    <ul role="tablist" class="vi-tabs__list" :style="style" :class="{'vi-tabs__list--with-border' : border}">
      <!-- TODO: i have moved the :aria-selected :aria-control from <a> to <li> - whats the consequence? -->
      <li
        v-for="(tab, i) in tabs"
        :key="i"
        :class="{ 'vi-tabs__item--active': tab.isActive, 'is-disabled': tab.isDisabled, 'vi-tabs__item--button': buttonTab }"
        class="vi-tabs__item"
        role="presentation"
        v-show="tab.isVisible"
        :aria-controls="tab.hash"
        :aria-selected="tab.isActive"
        @click="selectTab(tab.hash, $event)"
        :href="tab.hash"
      >
        <vi-icon class="vi-tabs__item__prefix-icon" v-if="tab.prefixIcon" :name="tab.prefixIcon" :size="tab.iconSize"/>
        <a v-html="tab.header"
           class="vi-tabs__item-a"
           role="tab"
        ></a>
      </li>
      <vi-spacer/>
      <slot name="right"/>
    </ul>
    <div class="vi-tabs__panels">
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
      },
      vertical: {
        type: Boolean | Number,
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
      style () {
        if (!this.vertical) return
        const width = typeof this.vertical === 'boolean' ? 140 : this.vertical
        return {width: `${width}px`}
      }
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

        this.$emit('input', this.activeTabHash);

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
