<template>
  <div class="student-view" style="margin-top: 60px">

    <vi-app-bar title="Students">

      <div slot="action">
        <vi-button @click="onAddStudent" dark>
          <vi-icon left name="add-thick" size="12"/>
          Batch import
        </vi-button>
        <vi-button @click="onAddStudent" dark>
          <vi-icon left name="add-thick" size="12"/>
          Create student
        </vi-button>
      </div>

      <div slot="append">
        <vi-input class="search-box" v-model="search" slot="action" prefix-icon="search" placeholder="Search student by name or class"/>
      </div>
    </vi-app-bar>

    <vi-data-table
      v-if="items"
      :headers="headers"
      :items="items"
      :search="search"
      :sticky-header="130"
      :pagination.sync="pagination"
      :item-height="69">

      <div slot="item" slot-scope="{item}" class="vi-table__row">

        <vi-table-col>
          {{item.name}}
        </vi-table-col>

        <vi-table-col>
          <vi-chip>
            {{item.class}}
          </vi-chip>
        </vi-table-col>

        <vi-table-col>
          <vi-button @click="onEdit(item)" icon text>
            <vi-icon name="edit" size="22"/>
          </vi-button>
          <vi-button @click="onDelete(item)" icon text>
            <vi-icon name="trash" size="20"/>
          </vi-button>
        </vi-table-col>
      </div>
    </vi-data-table>
  </div>
</template>

<script>
  function genData () {
    return [...Array(100).keys()].map(i => {
      const names = ['Anson Mak', 'Jeff Wong', 'Tam Ma', 'Benny Jay', 'Calvin Lee', 'Timothy', 'Chan Siu Hei', 'Mei To Poon', 'Chan Kim Man', 'Man Sui Fong']
      const classes = ['1A', '1B', '1C', '1D', '2A', '2B', '2C', '2D', '3A', '3B', '3C', '3D', '4A', '4B', '4C', '4D']
      return {
        name: names[Math.floor(Math.random() * names.length)],
        username: names[Math.floor(Math.random() * names.length)].toLowerCase(),
        class: classes[Math.floor(Math.random() * classes.length)],
      }
    })
  }

  import {studentDialog} from '../dialogs'

  export default {
    name: 'student-view',

    props: {

    },

    data() {
      return {
        items: [],
        search: '',
        pagination: {
          sortBy: 'name'
        },
        headers: [
          {
            text: 'Name',
            index: 'name',
            sortable: true,
            searchable: true,
            expand: true
          },
          {
            text: 'Class',
            index: 'class',
            sortable: true,
            searchable: true,
            width: '30%'
          },
          {
            text: '',
            width: '72px'
          }
        ]
      }
    },

    computed: {

    },

    methods: {
      onAddStudent () {
        studentDialog()
      },
      onEdit (student) {
        studentDialog({
          oldFullname: student.name,
          oldUsername: student.username,
          oldClass: student.class
        })
      },
      async onDelete (student) {
        try {
          await this.$messageBox({
            title: 'Delete student',
            message: `Are you sure you want to delete student ${student.name}`
          })
          // TODO cal API
          console.log('delete student api', student.username)
        } catch (e) {}
      }
    },

    created () {
      this.items = genData()
    }
  }
</script>

<style lang="stylus">
  @import '../../../lib/stylus/main.styl'
</style>
