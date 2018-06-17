<template>
  <div class="library-main-view">

    <vi-app-bar title="EHLA Categories"/>

    <vi-container>

      <div class="reading-section">
        <vi-row wrap>
          <vi-col v-for="(cat, i) in cats" xs6 :key="i">

            <div class="reading-item">

              <vi-icon size="100" name="lock"/>

              <img :src="cat.image" alt="">

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
        cats: [
          {
            image: 'http://ehla-media-bucket.s3.amazonaws.com/images_20180201/secondary-d-1529141849542.jpg',
            name: 'English Reading'
          },
          {
            image: 'https://ehlacademy.org/images/about05.jpg',
            name: 'Intelligent Diagnosis & Teaching'
          },
          {
            image: 'https://ehlacademy.org/images/about04.jpg',
            name: 'Intelligent Tracking Exercise & Tutorial'
          },
          {
            image: 'http://ehla-media-bucket.s3.amazonaws.com/images_20180201/secondary-d-1529141849542.jpg',
            name: 'Literature in English Programme'
          },
          {
            image: 'http://ehla-media-bucket.s3.amazonaws.com/images_20180201/secondary-d-1529141849542.jpg',
            name: 'Structured/Featured Programme'
          },
          {
            image: 'http://ehla-media-bucket.s3.amazonaws.com/images_20180201/secondary-d-1529141849542.jpg',
            name: 'Bookmark'
          }
        ]
      }
    }
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
