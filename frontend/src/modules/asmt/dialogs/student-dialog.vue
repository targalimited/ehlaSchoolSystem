<template>
  <vi-dialog :value="true" width="400">
    <vi-card>

      <vi-toolbar :brand="true">
        <div class="vi-toolbar__title">
          Select students
        </div>
      </vi-toolbar>

      <vi-card-content v-if="studentOptions.length > 0">

        <vi-data-table
          :items="studentOptions"
          :headers="headers"
          :pagination.sync="pagination"
          v-model="newSelected"
          :item-height="50"
          :table-height="300"
          item-key="id">

          <!-- TODO select all -->
          <div slot="toggleAll">
            <vi-checkbox-boolean :value="true"/>
          </div>


          <div slot="item" slot-scope="{item, toggle, checked}"
               @click="toggle(item)"
               class="vi-table__row vi-table__row--link">
            <vi-table-col>
              <vi-checkbox-boolean :value="checked"/>
            </vi-table-col>
            <vi-table-col>
              {{item.name}}
            </vi-table-col>
          </div>
        </vi-data-table>

        <vi-button-row class="pt-30">
          <vi-button @click="$close(false)" size="135">Cancel</vi-button>
          <vi-button @click="onSubmit" primary size="135">Assign</vi-button>
        </vi-button-row>
      </vi-card-content>
    </vi-card>
  </vi-dialog>
</template>

<script>
  export default {
    name: 'level-dialog',

    props: ['selected'],

    data () {
      return {
        newSelected: [],
        headers: [
          {
            text: '',
            width: '50px',
            slot: 'toggleAll'
          },
          {
            text: 'Student Name',
            expand: true,
            index: 'name',
            align: 'left'
          }
        ],
        pagination: {}
      }
    },

    computed: {
      studentOptions () {
        return [
          {
            id: 1,
            name: 'Chan Tai Man'
          },
          {
            id: 2,
            name: 'Chan Ling'
          },
          {
            id: 3,
            name: 'Chan Siu Fong'
          },
          {
            id: 4,
            name: 'Chan Go Man'
          },
          {
            id: 5,
            name: 'Chan Cool Man'
          },
          {
            id: 6,
            name: 'Chan Hot Man'
          },
          {
            id: 7,
            name: 'Siu Tai Man'
          },
          {
            id: 8,
            name: 'Wong Tai Man'
          },
          {
            id: 9,
            name: 'Wong Tai'
          },
          {
            id: 10,
            name: 'Wong Chun Ming'
          }
        ]
      }
    },

    methods: {
      onSubmit () {
        this.$close(this.newSelected)
      }
    },

    created () {
      if (Array.isArray(this.newSelected)) {
        this.newSelected = this.selected
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .vi-button-row
    margin-top 24px

  .input-group
    margin-bottom 24px

  .vi-checkbox
    margin-bottom 16px

  .note
    font-size 12px
    color red
    line-height 1.2
    margin-left 12px
</style>
