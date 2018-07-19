<template>
  <div class="teacher-view" style="margin-top: 60px">

    <vi-app-bar title="Teachers">

      <div slot="action">
        <vi-button @click="onAddTeacher" dark>
          <vi-icon left name="add-thick" size="12"/>
          Batch import
        </vi-button>
        <vi-button @click="onAddTeacher" dark>
          <vi-icon left name="add-thick" size="12"/>
          Create teacher
        </vi-button>
      </div>

      <div slot="append">
        <vi-row>
          <vi-input style="flex: 1" v-model="search" slot="action" prefix-icon="search" placeholder="Search teacher by name or class"/>
          <vi-select :options="classOptions" v-model="classFilters" placeholder="Filter by class" max-width="300" style="width: 160px" class="ml-8"/>
        </vi-row>
      </div>
    </vi-app-bar>

    <vi-data-table
      v-if="items"
      :headers="headers"
      :items="items"
      :search="search"
      :sticky-header="130"
      :pagination.sync="pagination"
      :custom-filter="filterFunction"
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
          {{item.subject}}
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
    return [...Array(60).keys()].map(i => {
      const names = ['Anson Mak', 'Jeff Wong', 'Tam Ma', 'Benny Jay', 'Calvin Lee', 'Timothy', 'Chan Siu Hei', 'Mei To Poon', 'Chan Kim Man', 'Man Sui Fong']
      const classes = ['1A', '1B', '1C', '1D', '2A', '2B', '2C', '2D', '3A', '3B', '3C', '3D', '4A', '4B', '4C', '4D']
      return {
        name: names[Math.floor(Math.random() * names.length)],
        username: names[Math.floor(Math.random() * names.length)].toLowerCase(),
        subject: 'Eng',
        class: classes[Math.floor(Math.random() * classes.length)],
      }
    })
  }

  import {teacherDialog} from '../dialogs'
  import { mapGetters } from 'vuex'

  export default {
    name: 'teacher-view',

    data() {
      return {
        classFilters: '',
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
            expand: true
          },
          {
            text: 'Class',
            index: 'class',
            sortable: true,
            width: '30%'
          },
          {
            text: 'Subject',
            index: 'subject',
            sortable: true,
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
      classOptions() {
        return ['1A', '1B', '1C', '1D', '2A', '2B', '2C', '2D', '3A', '3B', '3C', '3D', '4A', '4B', '4C', '4D']
      },
      ...mapGetters([
        'teachers',
      ]),
    },

    methods: {
      async onAddTeacher () {
        const res = await teacherDialog()
        if (!res) return
        console.log('create teacher API', res)
      },
      async onEdit (teacher) {
        const res = await teacherDialog({
          oldFullname: teacher.name,
          oldUsername: teacher.username,
          oldClass: teacher.class
        })
        if (!res) return
        console.log('Edit teacher API', res)
      },
      async onDelete (teacher) {
        try {
          await this.$messageBox({
            title: 'Delete teacher',
            message: `Are you sure you want to delete teacher ${teacher.name}`
          })
          // TODO cal API
          console.log('delete teacher api', teacher.username)
        } catch (e) {}
      },
      filterByClass (items) {
        if (this.classFilters.length === 0) return items
        return items.filter(i => {
          return this.classFilters.includes(i.class)
        })
      },
      filterFunction (items, search, filter) {
        items = this.filterByClass(items)
        search = search.toString().toLowerCase()
        if (search.trim() === '') return items

        return items.filter(i => (
          filter(i.name, search)
        ))
      },
    },

    created () {
      this.items = genData()
      const classQuery = this.$route.query.classes
      if (classQuery) this.classFilters = classQuery
    },
    mounted (){
      console.log(this.students)
      this.$store.dispatch('FETCH_TEACHER')
    }
  }
</script>
