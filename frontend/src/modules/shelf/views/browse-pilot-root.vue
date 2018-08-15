<template>
  <div class="browse-pilot-root" :class="{'no-access' : accessNotAllow}">

    <vi-row wrap>
      <vi-col v-for="(cat, i) in readingCategories" xs6 :key="i">
        <router-link class="reading-item" :to="{name: 'browse-pilot-category', params: {catKey: cat.key}}">
          <image-holder ratio="60%" :src="school_level === 'P' ? cat.image.primary : cat.image.secondary"></image-holder>
          <h3>{{cat.name_en}}</h3>
        </router-link>
      </vi-col>
    </vi-row>

  </div>
</template>

<script>
  export default {
    name: 'lib-cat-view',

    props: ['type'], // type: 'pilot' or 'free'

    data () {
      return {
        school_level: this.$store.getters.user.school.edu_lv
      }
    },

    computed: {
      readingCategories () {
        return this.$store.getters['shelf/categories']
      },
      accessNotAllow () {
        return (this.type === 'free' && this.$store.getters['shelf/isPilot']) ||
          (this.type === 'pilot' && !this.$store.getters['shelf/isPilot'])
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import '../../../project-ui/stylus/settings.styl'
  .reading-item
    &:hover
      .image-holder
        box-shadow $box-shadow-2

  .image-holder
    transition box-shadow 0.3s
    border-radius 6px
    margin-bottom 8px
    overflow hidden

  h3
    margin-bottom 16px
    color $blue-text
</style>
