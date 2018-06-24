<template>
  <div class="library-main-view">

    <vi-app-bar title="EHLA Categories"/>

    <vi-container>

      <div class="reading-section">
        <vi-row wrap>
          <vi-col v-for="(cat, i) in cats" xs6 :key="i">

            <div class="reading-item">

              <div class="circle">
                <vi-icon size="20" name="lock"/>
              </div>
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
              primary: 'https://s3-ap-southeast-1.amazonaws.com/ehla-media-bucket/aSchool/tutorial.jpg',
              secondary: 'https://s3-ap-southeast-1.amazonaws.com/ehla-media-bucket/aSchool/tracking+exerciese-s.jpg'
            }
          },
          {
            name: 'Literature in English Programme',
            images: {
              primary: 'https://s3-ap-southeast-1.amazonaws.com/ehla-media-bucket/aSchool/primary-Eng+Lit.png',
              secondary: 'https://s3-ap-southeast-1.amazonaws.com/ehla-media-bucket/aSchool/secordary-Eng+Lit.png'
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

    .circle
      width 40px
      height 40px
      display inline-flex
      align-items center
      justify-content center
      position absolute
      top 10px
      right 10px
      background rgba(0,0,0,0.4)
      border-radius 50%

    .vi-icon
      color white
      opacity 0.9

</style>
