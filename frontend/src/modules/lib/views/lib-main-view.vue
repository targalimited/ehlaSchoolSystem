<template>
  <div class="library-main-view">

    <vi-app-bar title="EHLA Categories"/>

    <vi-container>

      <div class="reading-section">
        <vi-row wrap>
          <vi-col v-for="(cat, i) in cats" xs6 :key="i">

            <div class="reading-item">

              <vi-icon size="100" name="lock"/>

              <img v-if="school_level === 'P'" :src="cat.images.primary" alt="">
              <img v-if="school_level === 'S'" :src="cat.images.secondary" alt="">
              {{cat.name}}


            </div>
          </vi-col>
        </vi-row>
      </div>
    </vi-container>
  </div>
</template>

<script>
  export default {
    name: 'library-main-view',

    data () {
      return {
        school_level: this.$store.getters.user.school.edu_lv,
        cats: [
          {
            name: 'English Reading',
            images: {
              primary: 'https://s3-ap-southeast-1.amazonaws.com/ehla-media-bucket/aSchool/P-reading.jpg',
              secondary: 'https://s3-ap-southeast-1.amazonaws.com/ehla-media-bucket/aSchool/S-reading.jpg'
            }
          },
          {
            name: 'Intelligent Diagnosis & Teaching',
            images: {
              primary: 'https://s3-ap-southeast-1.amazonaws.com/ehla-media-bucket/aSchool/diagnosis.jpg',
              secondary: 'https://s3-ap-southeast-1.amazonaws.com/ehla-media-bucket/aSchool/diagnosis.jpg'
            }
          },
          {
            name: 'Intelligent Tracking Exercise & Tutorial',
            images: {
              primary: 'https://ehlacademy.org/images/about04.jpg',
              secondary: 'https://ehlacademy.org/images/about04.jpg'
            }
          },
          {
            name: 'Literature in English Programme',
            images: {
              primary: 'https://s3-ap-southeast-1.amazonaws.com/ehla-media-bucket/aSchool/P-literature.jpg',
              secondary: 'https://s3-ap-southeast-1.amazonaws.com/ehla-media-bucket/aSchool/S-literature.jpg'
            }
          },
          {
            name: 'Structured/Featured Programme',
            images: {
              primary: 'https://s3-ap-southeast-1.amazonaws.com/ehla-media-bucket/aSchool/features.jpg',
              secondary: 'https://s3-ap-southeast-1.amazonaws.com/ehla-media-bucket/aSchool/features.jpg'
            }
          },
          {
            name: 'Bookmark',
            images: {
              primary: 'https://s3-ap-southeast-1.amazonaws.com/ehla-media-bucket/aSchool/bookmark.jpg',
              secondary: 'https://s3-ap-southeast-1.amazonaws.com/ehla-media-bucket/aSchool/bookmark.jpg'
            }
          }
        ]
      }
    },

  }
</script>

<style scoped lang="stylus">
  @import '../../../lib/stylus/main.styl'
  .reading-section
    // opacity 0.6

  .reading-item
    position relative
    font-weight bold
    margin-bottom 20px
    // color $brand

    .vi-icon
      position absolute
      top 0
      left 0
      right 0
      bottom 0
      margin 50px auto
      color white
      opacity 0.7

</style>
