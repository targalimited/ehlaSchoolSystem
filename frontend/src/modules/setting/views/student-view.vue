<template>
  <div class="student-view" style="margin-top: 60px">

    <vi-app-bar title="Students">

      <div slot="action">
        <vi-button @click="onBatchImport" dark>
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
          <vi-select :options="option_class" v-model="classFilters" placeholder="Filter by class" max-width="300" style="width: 160px" class="ml-8"/>
        </vi-row>
      </div>
    </vi-app-bar>

    <vi-data-table
      v-if="students"
      :headers="headers"
      :items="students"
      :search="search"
      :sticky-header="130"
      :pagination.sync="pagination"
      :custom-filter="filterFunction"
      :item-height="69">

      <div slot="item" slot-scope="{item}" class="vi-table__row">

        <vi-table-col>
          {{item.realname_en}}
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
  import {studentDialog, batchImportDialog} from '../dialogs'

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
      ...mapGetters([
        'students',
        'option_class'
      ]),
    },

    methods: {
      async onBatchImport () {
        const file = await batchImportDialog()
        if (!file) return
        this.$store.dispatch('STUDENT_BATCH_CREATE',file)

      },
      onAddStudent () {
        studentDialog({
          OptionClass: this.option_class
        }).then(res => {
          // console.log("response", res.fullname);
          this.$store.dispatch('STUDENT_CREATE', {
            realname_en: res.realname_en,
            username: res.username,
            password: res.password,
            school_num: res.school_num,
            realname_zh: res.realname_zh,
            className: res.className
          })
        })
      },
      onEdit (student) {
        console.log(student);

        studentDialog({
          oldRealname_en: student.realname_en,
          oldRealname_zh: student.realname_zh,
          oldUsername: student.username,
          oldSchool_num: student.school_num,
          OptionClass: this.option_class,
          oldClass: student.single_class.c_name
        }).then(res=>{
          // console.log(student)
           this.$store.dispatch('STUDENT_UPDATE',{id:student.student_id,fullname:res.fullname,className:res.className})
        })
      },
      async onDelete (student) {
        try {
          await this.$messageBox({
            title: 'Delete student',
            message: `Are you sure you want to delete student ${student.name}`
          })
          // TODO cal API
          this.$store.dispatch('STUDENT_DESTROY',{user_id:student.student_id})
        } catch (e) {}
      },
      filterByClass (items) {
        if (!this.classFilters) return items
        return items.filter(i => {
          return this.classFilters === i.single_class.c_name
        })
      },
      filterFunction (items, search, filter) {
        items = this.filterByClass(items)
        search = search.toString().toLowerCase()
        if (search.trim() === '') return items

        return items.filter(i => (
          filter(i.realname, search)
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
      this.$store.dispatch('FETCH_OPTIONCLASS')
      this.$store.dispatch('FETCH_STUDENT')
    }
  }
</script>
