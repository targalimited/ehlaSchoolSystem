<template>
  <div class="assignment-list-view">

    <vi-app-bar title="Assessment list">
      <vi-input class="search-box" v-model="search" slot="action" prefix-icon="search" placeholder="Search Assessment by name"/>
    </vi-app-bar>

    <vi-data-table
      v-if="items"
      :headers="headers"
      :items="items"
      :search="search"
      :pagination.sync="pagination"
      :item-height="135">

      <router-link :to="{name: 'asmt-options'}" slot="item" slot-scope="{item}" class="vi-table__row vi-table__row--link">

        <vi-table-col>
          <vi-item height="60">
            <vi-item-avatar>
              <vi-avatar>
                <img :src="item.item.thumbnail_path"/>
              </vi-avatar>
            </vi-item-avatar>
            <vi-item-content>
              <vi-item-title>
                {{item.item.name_en}}
              </vi-item-title>
              <vi-item-subtitle>
                 <!-- TODO -->
                {{item.item.exercise_assignments.length}} Exercises,
                <!--{{item.videos.length}} Videos-->
              </vi-item-subtitle>
            </vi-item-content>
          </vi-item>
        </vi-table-col>

        <vi-table-col>
          <vi-chip :prepend="item.class_id">
            <!--{{item.whole_class ? 'All' : 'Some'}}-->
          </vi-chip>
        </vi-table-col>

        <vi-table-col>
          <!-- TODO: @bill should give cat_grouper -->
          {{item.item_type}}
        </vi-table-col>

        <vi-table-col>
          {{item.start_date}} - {{item.end_date}}
        </vi-table-col>

        <vi-table-col>
          {{item.remark ? item.remark : '-'}}
        </vi-table-col>
      </router-link>
    </vi-data-table>
  </div>
</template>

<script>
  export default {
    name: 'assignment-list-view',

    props: {

    },

    data() {
      return {
        search: '',
        headers: [
          {
            text: 'Name',
            index: 'name_en',
            sortable: true,
            searchable: true,
            expand: true
          },
          {
            text: 'Class',
            index: 'class_name',
            width: '100px',
            sortable: true,
            align: 'left'
          },
          {
            text: 'Type',
            index: 'type',
            width: '100px',
            sortable: true,
            align: 'left'
          },
          {
            text: 'Assigned Date',
            index: 'start_date',
            width: '100px',
            sortable: true,
            align: 'left'
          },
          {
            text: 'Remark',
            width: '80px',
            align: 'left'
          }
        ],
        pagination: {}
      }
    },

    computed: {
      items () {
        return this.$store.state.asmt.asmtList
      }
    },

    methods: {

    },

    created () {
      this.$store.dispatch('asmt/getAsmtList')
    }
  }
</script>

<style lang="stylus">
  @import '../../../lib/stylus/settings.styl'

  .search-box
    background none
    border none
    color white
    width 100px

    ::placeholder
      color white

    .vi-input__prefix .vi-icon
      color white
</style>
