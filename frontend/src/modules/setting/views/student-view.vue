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
        <vi-row>
          <vi-input style="flex: 1" v-model="search" slot="action" prefix-icon="search" placeholder="Search student by name or class"/>
          <vi-select :options="classOptions" v-model="classFilters" placeholder="Filter by class" max-width="300" style="width: 160px" class="ml-8"/>
        </vi-row>
      </div>
    </vi-app-bar>

    <vi-data-table
      v-if="items"
      :headers="headers"
      :items="students"
      :search="search"
      :sticky-header="130"
      :pagination.sync="pagination"
      :custom-filter="filterFunction"
      :item-height="69">

      <div slot="item" slot-scope="{item}" class="vi-table__row">

        <vi-table-col>
          {{item.details.user.nickname}}
        </vi-table-col>

        <vi-table-col>
          <vi-chip>
            {{item.single_class.c_name}}
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

  import { mapGetters } from 'vuex'

  // function genData () {
  //   return [...Array(100).keys()].map(i => {
  //     const names = ['Anson Mak', 'Jeff Wong', 'Tam Ma', 'Benny Jay', 'Calvin Lee', 'Timothy', 'Chan Siu Hei', 'Mei To Poon', 'Chan Kim Man', 'Man Sui Fong']
  //     const classes = ['1A', '1B', '1C', '1D', '2A', '2B', '2C', '2D', '3A', '3B', '3C', '3D', '4A', '4B', '4C', '4D']
  //     return {
  //       name: names[Math.floor(Math.random() * names.length)],
  //       username: names[Math.floor(Math.random() * names.length)].toLowerCase(),
  //       class: classes[Math.floor(Math.random() * classes.length)],
  //     }
  //   })
  // }

  import {studentDialog} from '../dialogs'

  export default {
    name: 'student-view',

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
        'students',
      ]),
    },

    methods: {
      onAddStudent () {
        studentDialog().then(res => {
            // console.log("response", res.fullname);
            this.$store.dispatch('STUDENT_CREATE',{fullname:res.fullname,className:res.className})
          })
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
      // this.items = genData()
      const classQuery = this.$route.query.classes
      if (classQuery) this.classFilters = classQuery
    },

    mounted (){
      console.log(this.students)
      this.$store.dispatch('FETCH_STUDENT')
    }
  }
</script>
