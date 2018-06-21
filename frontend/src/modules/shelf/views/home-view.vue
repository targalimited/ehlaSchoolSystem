<template>
  <div class="home-view">

    <vi-app-bar :fixed="false" :back="false"/>


    <div class="dashboard">

      <vi-row justify-center>
        <vi-avatar size="120">
          <vi-icon name="school" color="light-grey" size="120"/>
        </vi-avatar>
      </vi-row>

      <div class="dashboard__title">{{$store.state.auth.schoolName}}</div>

      <div class="stat-section">

        <router-link class="stat" :to="{name: 'shelf'}">
          <vi-item height="auto">
            <vi-item-avatar>
              <vi-icon class="stat__icon" name="shelf" size="50"/>
            </vi-item-avatar>
            <vi-item-content>
              <vi-row align-center>
                <div class="stat__int">{{selectedCount}}</div>
                <div class="stat__name">Accessible Items</div>
              </vi-row>
              <!--<div class="stat__info">Quota: {{summary.total_item_qtt}} readings</div>-->
            </vi-item-content>
          </vi-item>
        </router-link>
      </div>
    </div>

    <router-link :to="{name: 'lib-cat'}" class="start">
      <vi-icon name="pilot" size="60" class="pr-16"/>
      <span>The journey of Pilot School starts here</span>
      <vi-spacer/>
      <vi-icon name="arrow-right" size="40" class="pl-10"/>
    </router-link>

    <vi-container class="pdf-section">
      <vi-section-header>Resources:</vi-section-header>
      <vi-row wrap>
        <vi-col v-for="(resource, i) in resources" xs4 :key="i">
          <div class="pdf">
            <div class="pdf__img">
              <img v-if="school_level === 'P'" :src="resource.cover.primary" alt="">
              <img v-if="school_level === 'S'" :src="resource.cover.secondary" alt="">
            </div>
            <a :href="resource.source" class="vi-link" download target="_blank">{{resource.name}} (download)</a>
          </div>
        </vi-col>
      </vi-row>
    </vi-container>

  </div>
</template>

<script>
export default {
  name: 'home',

  data () {
    return {
      school_level: this.$store.getters.user.school.edu_lv,
      resources: [
        {
          name: "Comprehension(primary)",
          cover: {
            primary: "https://s3-ap-southeast-1.amazonaws.com/ehla-media-bucket/aSchool/pdf_cover/pdf3-comprehension-primary.png",
            secondary: "https://s3-ap-southeast-1.amazonaws.com/ehla-media-bucket/aSchool/pdf_cover/pdf3-comprehension-primary.png",
          },
          source: "https://s3-ap-southeast-1.amazonaws.com/ehla-media-bucket/aSchool/pdf/Comprehension(primary).pdf"
        },
        {
          name: "Comprehension(secondary)",
          cover: {
            primary: "https://s3-ap-southeast-1.amazonaws.com/ehla-media-bucket/aSchool/pdf_cover/pdf3-comprehension-secondary.png",
            secondary: "https://s3-ap-southeast-1.amazonaws.com/ehla-media-bucket/aSchool/pdf_cover/pdf3-comprehension-secondary.png",
          },
          source: "https://s3-ap-southeast-1.amazonaws.com/ehla-media-bucket/aSchool/pdf/Comprehension(secondary).pdf"
        },
        {
          name: "Eng Lit",
          cover: {
            primary: "https://s3-ap-southeast-1.amazonaws.com/ehla-media-bucket/aSchool/pdf_cover/pdf2-literature-primary.png",
            secondary: "https://s3-ap-southeast-1.amazonaws.com/ehla-media-bucket/aSchool/pdf_cover/pdf2-literature-secondary.png",
          },
          source: "https://s3-ap-southeast-1.amazonaws.com/ehla-media-bucket/aSchool/pdf/Eng+Lit.pdf"
        },
        {
          name: "Intelligent Diagnosis",
          cover: {
            primary: "https://s3-ap-southeast-1.amazonaws.com/ehla-media-bucket/aSchool/pdf_cover/pdf3-comprehension-Intelligent.png",
            secondary: "https://s3-ap-southeast-1.amazonaws.com/ehla-media-bucket/aSchool/pdf_cover/pdf3-comprehension-Intelligent.png",
          },
          source: "https://s3-ap-southeast-1.amazonaws.com/ehla-media-bucket/aSchool/pdf/Intelligent+Diagnosis.pdf"
        },
        {
          name: "Reading section",
          cover: {
            primary: "https://s3-ap-southeast-1.amazonaws.com/ehla-media-bucket/aSchool/pdf_cover/pdf1-solution+reading.png",
            secondary: "https://s3-ap-southeast-1.amazonaws.com/ehla-media-bucket/aSchool/pdf_cover/pdf1-solution+reading.png",
          },
          source: "https://s3-ap-southeast-1.amazonaws.com/ehla-media-bucket/aSchool/pdf/Reading+section.pdf"
        }
      ]
    }
  },

  computed: {
    summary () {
      return this.$store.state.shelf.summary
    },
    readingCategories () {
      return this.$store.getters['shelf/categories']
    },
    selectedCount () {
      return this.$store.getters['shelf/selectedCount']
    }
  },

  created() {
    this.$store.dispatch('shelf/getSummary')
  }
}
</script>

<style scoped lang="stylus">
  @import '../../../lib/stylus/main.styl'
  .home-view
    margin-top -70px

  .dashboard
    padding 24px 40px

    .vi-avatar
      margin-top -80px
      background white
      position relative
      z-index 3

    &__title
      text-align center
      font-size 32px
      margin-top 8px
      margin-bottom 12px

  .stat-section
    display flex
    justify-content center

  .stat
    display inline-flex
    align-items center
    line-height 1
    font-size 18px
    cursor pointer

    &:hover
      *
        color $brand

    .vi-item
      display inline-flex !important

      &__action
        margin-left 48px

    &__icon
      color $brand

    &__int
      color $dark-grey
      font-size 30px

    &__name
      color $mild-grey
      margin-left 8px
      font-size 18px
      position relative
      top 2px

    &__info
      width 100%
      margin-top 4px
      margin-left 8px
      color $mild-grey
      font-size 16px

  .pdf-section
    background #f9f9f9
    text-align center

  .pdf
    text-align center
    margin-bottom: 20px
    font-size 14px

    &__img
      width 100px
      height 150px
      background #d7d7d7
      margin 0 auto 8px auto


  .start
    background #42d495
    color white
    font-weight bold
    padding 20px
    text-align center
    font-size 20px
    margin 24px
    border-radius 20px
    align-items center
    display flex
    cursor pointer

    &:hover
      background darken(#42d495, 10%)
</style>
