<template>
  <div class="home-view">

    <vi-app-bar style="height: 110px" title="Accessible Items Overview">
      <div class="vi-banner__info">{{selectedCount}}/ {{summary.total_item_qtt}} reading packs</div>
      <vi-row wrap class="level-section" v-if="levelsQuota">
        <vi-col v-for="(lv, i) in levelsQuota" :key="i">
          <span class="level-label level-label--dark">{{lv.level}}</span>
          {{lv.selected}}/{{lv.maxQuota}} <span v-if="lv.full" class="full">Full</span>
        </vi-col>
      </vi-row>
    </vi-app-bar>

    <div class="pt-40" v-if="selectedItems">

      <vi-data-table
        class="selected-item-table"
        :pagination.sync="pagination"
        :sticky="140"
        :items="selectedItems"
        :headers="headers"
        :search="search">

        <div slot="item" slot-scope="{item}" class="vi-table__row">

          <vi-table-col class="ellipsis">
            <reading-item small :item="item"/>
          </vi-table-col>

          <vi-table-col>
            <vi-chip>{{item.cat_type}}</vi-chip>

          </vi-table-col>

          <vi-table-col>
            <div>
              <template v-if="item.levels.length === 0">
                <vi-button @click="chooseLevel(item)">Assign level(s)</vi-button>
              </template>
              <template v-else>
                <div class="level-label" v-for="lv in item.levels">{{lv}}</div>
              </template>
            </div>
          </vi-table-col>

          <vi-table-col>
            <vi-menu left min-width="200">
              <vi-button
                slot="activator"
                :disabled="loading"
                text icon>
                <vi-icon left name="more" size="20"/>
              </vi-button>

              <vi-item @click="chooseLevel(item)" :link="true">
                <vi-item-avatar>
                  <vi-icon name="edit"/>
                </vi-item-avatar>
                <vi-item-content>{{item.levels.length === 0 ? 'Assign' : 'Edit'}} level(s)</vi-item-content>
              </vi-item>

              <vi-item v-if="item.levels.length === 0" @click="removeReading(item)" :link="true">
                <vi-item-avatar>
                  <vi-icon name="trash"/>
                </vi-item-avatar>
                <vi-item-content>Remove item</vi-item-content>
              </vi-item>
            </vi-menu>

          </vi-table-col>
        </div>
      </vi-data-table>
    </div>
  </div>
</template>

<script>
  import {levelDialog} from '../dialogs'
  import ReadingItem from '../components/reading-item'

  export default {
    name: 'shelf-view',

    components: { ReadingItem },

    data () {
      return {
        loading: false,
        pagination: {},
        search: '',
        headers: [
          {
            text: 'Name'
          },
          {
            text: 'cat'
          },
          {
            text: 'level'
          },
          {
            text: ''
          }
        ]
      }
    },

    computed: {
      summary () {
        return this.$store.state.shelf.summary || {}
      },
      selectedItems () {
        return this.$store.state.shelf.selectedItems
      },
      readingCategories () {
        return this.$store.getters['shelf/categories']
      },
      selectedCount () {
        return this.$store.getters['shelf/selectedCount']
      },
      levelsQuota () {
        return this.$store.getters['shelf/levelsQuota']()
      }
    },

    methods: {
      async removeReading (item) {
        this.loading = true
        const confirm = await this.$messageBox({
          title: 'Remove item',
          message: 'Do you want to remove this item?'
        })
        if (!confirm) {
          this.loading = false
          return
        }
        await this.$store.dispatch('shelf/remove', {
          id: item.id,
          cat: item.cat_grouper
        })
        this.loading = false
        this.$message('Reading removed')
      },
      async chooseLevel (item) {
        const currentLevels = item.levels
        const newLevels = await levelDialog(currentLevels, item.cat_grouper)
        if (!newLevels) return
        let loader = this.$loading.show()
        this.$store.dispatch('shelf/assignLevels', {
          id: item.id,
          levels: newLevels
        }).then(function(res){
          loader.hide()
        }).finally(function(){
          loader.hide()
        })

      }
    },

    mounted () {
      this.$store.dispatch('shelf/getDashboard')
    }
  }
</script>

<style lang="stylus">
  .selected-item-table .vi-table__col
    font-size 16px

    &:nth-child(1)
      flex 1
      // width 50%
      // max-width 340px
      /*width 40%*/
      justify-content flex-start

    &:nth-child(2)
      width 18%
      // max-width 150px
      // min-width 120px
      justify-content flex-start
      @media(max-width: 750px)
        width 90px

    &:nth-child(3)
      width 18%
      justify-content flex-start
      @media(max-width: 750px)
        width 90px
      // min-width 100px

    &:nth-child(4)
      flex-shrink 0
      width 5%
</style>

<style scoped lang="stylus">
  @import '../../../lib/stylus/main.styl'
  .banner
    padding 24px
    text-align center
    border 1px solid $border-color
    border-radius 6px
    background-image linear-gradient(to bottom, $brand, $brand 60px, white 61px, white 100%)

    .vi-avatar
      background white

    &__title
      font-size 22px
      margin-top 8px
      margin-bottom 16px

    .action-bar
      border-top 1px solid rgba(255,255,255,0.3)
      margin-top 12px
      padding-top 12px
      width 100%

  .stat
    display inline-flex
    align-items center
    line-height 1

    .vi-item
      display inline-flex !important

    &__icon
      color $brand

      .stat--small &
        color $mild-grey
        width 34px
        height 34px

    &__int
      color $dark-grey
      font-size 32px

      .stat--small &
        font-size 26px

    &__name
      color $mild-grey
      margin-left 8px
      font-size 16px
      position relative
      top 2px

    &__info
      width 100%
      margin-top 4px
      color $mild-grey

  .stat-section
    margin-bottom 16px

  .reading-section
    background $bg-color
    padding 24px

    .add-button
      margin-left: 8px;
      position: relative;
      top: 3px;
      min-width 0

    .vi-col
      margin-bottom 24px

  .reading-item
    text-align center

    .vi-icon
      display block
      margin 0 auto
      color $light-grey
      margin-bottom 8px

    .vi-item
      display inline-flex
      max-width 206px
      line-height 1.33
      font-size 16px
      justify-center center
      margin-bottom 16px

      .vi-item__avatar
        font-size: 24px;
        flex-shrink: 0;
        font-weight: bold;

    .vi-button
      display block
      margin 0 auto


  .reminder
    display flex
    align-items center
    background #d4b742
    color white
    padding 8px 24px
    font-size 15px
    font-weight bold

    .vi-icon
      margin-right 12px

  .level-section
    font-size 16px
    margin-top 2px

  .level-label
    font-size 14px
    border-radius 50%
    font-weight bold
    display inline-flex
    align-items center
    justify-content center
    width 30px
    height @width
    margin-right 2px
    background #8db2c5
    color white

    &--dark
      background rgba(255,255,255,0.3)
      color #fff

  .full
    color red
    font-size 14px
</style>
