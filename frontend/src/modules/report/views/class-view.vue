<template>
  <div class="class-view">
    <vi-app-bar title="Report: select class"></vi-app-bar>

    <vi-container>
      <vi-row wrap>
        <vi-col xs3 v-for="(c,i) in classList" :key="i">
          <router-link :to="{name: 'item-report', params: {class: c}}">
            <vi-card>
              <div class="bottom">
                <!--<router-link :to="{name: 'setting-student', query: {classes: c.c_name}}">-->
                <!--<vi-button text small style="font-size: 14px">-->
                <!--<vi-icon name="star" left size="12"/>-->
                <!--{{c.students.length}} Students-->
                <!--<vi-icon name="right" right size="10"/>-->
                <!--</vi-button>-->
                <!--</router-link>-->

                <!--<router-link :to="{name: 'setting-teacher', query: {classes: c.c_name}}">-->
                <!--<vi-button text small style="font-size: 14px">-->
                <!--<vi-icon name="star" left size="12"/>-->
                <!--{{c.teachers.length}} Teachers-->
                <!--<vi-icon name="right" right size="10"/>-->
                <!--</vi-button>-->
                <!--</router-link>-->
              </div>

              <div class="center">
                {{c}}
              </div>
            </vi-card>
          </router-link>

        </vi-col>
      </vi-row>
    </vi-container>
  </div>
</template>

<script>
  export default {
    data() {
      return {
       classList: ['1A', '1B', '1C', '1D', '2A', '2B', '2C', '2D', '3A', '3B', '3C', '3D', '4A', '4B', '4C', '4D']
      }
    }
  }
</script>


<style lang="stylus" scoped>
  @import '../../../lib/stylus/main.styl'

  .vi-card
    background #dfeef6
    height 200px
    display flex
    flex-flow row wrap
    align-items center
    justify-content center
    font-size 20px
    box-shadow $shadow
    cursor pointer
    transition all $transition

    &:hover
      box-shadow $shadow-2

    .bottom
      position absolute
      bottom 4px
      left 8px

    .vi-menu
      position absolute
      top 8px
      right 8px

</style>
