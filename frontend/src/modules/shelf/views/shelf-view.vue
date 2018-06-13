<template>
  <div class="home-view">

    <div class="vi-banner">
      <vi-icon class="vi-banner__icon" name="shelf" size="60"/>
      <div>
        <div class="vi-banner__title">Selected Readings</div>
        <div class="vi-banner__info">{{selectedCount}}/ {{summary.total_item_qtt}} readings</div>
        <!--<div class="vi-banner__info">9 Selected reading are not assigned to any levels</div>-->
      </div>

      <!--<vi-input class="search-input" line prefix-icon="search" placeholder="Search by name" v-model="search"/>-->
    </div>

    <div class="reminder">
      <vi-icon name="alert" size="26"/>
      You have readings that has not been assigned to any levels</div>

    <div v-if="selectedItems">

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
            <vi-chip>{{item.cat_name}}</vi-chip>

          </vi-table-col>

          <vi-table-col>
            <div>
              <template v-if="item.levels.length === 0">
                <a @click="chooseLevel" class="ui-link">Assign levels</a>
              </template>
              <template v-else>
                {{item.levels | join}}
                <a @click="chooseLevel(item.levels)" class="ui-link">Edit</a>
              </template>
            </div>
          </vi-table-col>

          <vi-table-col>
            <vi-button :disabled="loading" @click="removeReading(item)" text icon v-if="item.levels.length === 0">
              <vi-icon left name="trash" size="28"/>
            </vi-button>
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
        return this.$store.state.shelf.summary
      },
      selectedItems () {
        return this.$store.state.shelf.selectedItems
      },
      readingCategories () {
        return this.$store.getters['shelf/categories']
      },
      selectedCount () {
        return this.$store.getters['shelf/selectedCount']
      }
    },

    methods: {
      async removeReading (item) {
        this.loading = true
        await this.$store.dispatch('shelf/remove', {
          id: item.id,
          cat: item.cat_grouper
        })
        this.loading = false
        this.$message('Reading removed')
      },
      chooseLevel (levels) {
        // TODO API call
        levels = levels || []
        levelDialog(levels).then(v => {
          console.log('CALL API with the selected levels', v)
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
      justify-content flex-start

    &:nth-child(2)
      width 20%
      min-width 120px
      justify-content flex-start

    &:nth-child(3)
      width 10%
      min-width 100px

    &:nth-child(4)
      width 40px
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
    font-size 18px
    font-weight bold

    .vi-icon
      margin-right 12px
</style>
