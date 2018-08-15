<template>
  <div class="search-panel">

    <vi-spinner v-if="loading"/>

    <template v-else>
      <div v-if="levelOptions" class="search-panel__section">
        <vi-input-label>Filter by levels</vi-input-label>
        <div class="options-container">
          <vi-checkbox
            v-for="opt in levelOptions"
            :key="opt.value"
            :input-value="levelFilter"
            :value="opt.value"
            :label="opt.value_name_en"
            @input="v => {$store.commit('shelf/changeLevelFilter', v)}"
          />
        </div>
      </div>

      <div v-if="difficultyOptions" class="search-panel__section">
        <vi-input-label>Filter by difficulties</vi-input-label>
        <div class="options-container">
          <vi-checkbox
            v-for="opt in difficultyOptions"
            :key="opt.value"
            :input-value="difficultyFilter"
            :value="opt.value"
            @input="v => {$store.commit('shelf/changeDifficultyFilter', v)}"
            :label="opt.value_name_en"
          />
        </div>
      </div>

      <div v-if="texttypeOptions" class="search-panel__section">
        <vi-input-label>Filter by text types</vi-input-label>
        <div class="options-container">
          <vi-checkbox
            v-for="opt in texttypeOptions"
            :key="opt.value"
            :input-value="texttypeFilter"
            :value="opt.value"
            @input="v => {$store.commit('shelf/changeTexttypeFilter', v)}"
            :label="opt.value_name_en"
          />
        </div>
      </div>

      <div v-if="themeOptions" class="search-panel__section">
        <vi-input-label>Filter by themes</vi-input-label>
        <div class="options-container">
          <list-limit :items="themeOptions">
            <vi-checkbox
              slot="item" slot-scope="{item}"
              :input-value="themeFilter"
              :value="item.value"
              @input="v => {$store.commit('shelf/changeThemeFilter', v)}"
              :label="item.value_name_en"
            />
          </list-limit>
        </div>
      </div>

      <div v-if="subthemeOptions" class="search-panel__section">
        <vi-input-label>Filter by sub-themes</vi-input-label>
        <div class="options-container">
          <list-limit :items="subthemeOptions">
            <template slot="item" slot-scope="{item}">
              <vi-checkbox
                :input-value="subthemeFilter"
                :value="item.value"
                @input="v => {$store.commit('shelf/changeSubthemeFilter', v)}"
                :label="item.value_name_en"
              />
            </template>
          </list-limit>
        </div>
      </div>

      <div v-if="weaknessOptions" class="search-panel__section">
        <vi-input-label>Filter by weakness</vi-input-label>
        <vi-dialog v-model="weaknessDialog">
          <vi-button color="green" small outline slot="activator">Weakness options</vi-button>
          <div class="vi-dialog__header">Filter by weakness</div>
          <div class="vi-dialog__body">
            <div class="options-container">
              <vi-checkbox
                v-for="opt in weaknessOptions"
                :key="opt.value"
                :input-value="weaknessFilter"
                :value="opt.value"
                @input="v => {$store.commit('shelf/changeWeaknessFilter', v)}"
                :label="opt.value_name_en"
              />
            </div>
          </div>
          <div class="vi-dialog__footer">
            <vi-button @click="weaknessDialog = false">Confirm</vi-button>
          </div>
        </vi-dialog>
      </div>
    </template>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        weaknessDialog: false
      }
    },
    props: ['catKey'],
    computed: {
      levelFilter () {
        return this.$store.state.shelf.levelFilter
      },
      difficultyFilter () {
        return this.$store.state.shelf.difficultyFilter
      },
      texttypeFilter () {
        return this.$store.state.shelf.texttypeFilter
      },
      themeFilter () {
        return this.$store.state.shelf.themeFilter
      },
      subthemeFilter () {
        return this.$store.state.shelf.subthemeFilter
      },
      weaknessFilter () {
        return this.$store.state.shelf.weaknessFilter
      },
      levelOptions () {
        return this.$store.state.shelf.levelOptions
      },
      difficultyOptions () {
        return this.$store.state.shelf.difficultyOptions
      },
      texttypeOptions () {
        return this.$store.state.shelf.texttypeOptions
      },
      themeOptions () {
        return this.$store.state.shelf.themeOptions
      },
      subthemeOptions () {
        return this.$store.state.shelf.subthemeOptions
      },
      weaknessOptions () {
        return this.$store.state.shelf.weaknessOptions
      },
      loading () {
        return !(this.levelOptions || this.difficultyOptions || this.texttypeOptions || this.themeOptions || this.subthemeOptions || this.weaknessOptions)
      }
    },
    watch: {
      'catKey' () {
        this.$store.commit('shelf/clearAllFilter')
      }
    }
  }
</script>

<style lang="stylus">
  .search-panel
    &__section
      margin-bottom 24px

    .vi-input-label
      font-size 12px
      display block
      text-transform: uppercase
      margin-bottom 8px
</style>
