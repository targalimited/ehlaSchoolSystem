<template>
  <panel class="student-view">

    <div slot="head">
      <vi-button @click="onExport" dark>
        <vi-icon left name="add-thick" size="12"/>
        Export
      </vi-button>
      <vi-button @click="onBatchImport" dark>
        <vi-icon left name="add-thick" size="12"/>
        Batch import
      </vi-button>
      <vi-button @click="onAddStudent" dark>
        <vi-icon left name="add-thick" size="12"/>
        Create student
      </vi-button>
      <vi-input style="flex: 1" v-model="search" slot="action" prefix-icon="search" placeholder="Search student by name or class"/>
      <vi-select :options="option_class" v-model="classFilters" placeholder="Filter by class" max-width="300" style="width: 160px" class="ml-8"/>
    </div>

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
          {{item.student_detail.realname_en}}
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
  </panel>
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
        'option_class',
        'batch_create'
      ]),
    },

    methods: {
      async onExport () {
        this.$store.dispatch('EXPORT_STUDENT')
      },
      async onBatchImport () {
        const file = await batchImportDialog()
        if (!file) return
        this.$store.dispatch('STUDENT_BATCH_CREATE',file).then(()=>{
          // console.log(this.$store.getters.batch_create.message)
        })

      },
      onAddStudent () {
        studentDialog({
          OptionClass: this.option_class
        }).then(res => {
          // console.log("response", res.fullname);
          if(res)
          this.$store.dispatch('STUDENT_CREATE', {
            realname_en: res.realname_en,
            username: res.username,
            password: res.password,
            school_num: res.school_num,
            realname_zh: res.realname_zh,
            className: res.className,
            classNo: res.classNo
          })
        })
      },
      onEdit (student) {
        console.log(student);

        studentDialog({
          oldRealname_en: student.student_detail.realname_en,
          oldRealname_zh: student.student_detail.realname_zh,
          oldUsername: student.student_detail.username,
          oldSchool_num: student.student_detail.school_num,
          OptionClass: this.option_class,
          oldClass: student.single_class.c_name,
          oldClassNo: student.student_detail.class_no
        }).then(res=>{
          if(res) {
            res.student_id = student.student_id
            this.$store.dispatch('STUDENT_UPDATE', res)
          }
        })
      },
      async onDelete (student) {
        try {
          await this.$messageBox({
            title: 'Delete student',
            message: `Are you sure you want to delete student ${student.student_detail.realname_en}`
          })
          // TODO cal API
          this.$store.dispatch('STUDENT_DESTROY',{user_id:student.student_id})
        } catch (e) {}
      },
      filterByClass (items) {
         // console.log('filterByClass',items);
        if (!this.classFilters) return items
        return items.filter(i => {
          return this.classFilters === i.single_class.c_name
        })
      },
      filterFunction (items, search, filter) {
        items = this.filterByClass(items)
        search = search.toString().toLowerCase()
        if (search.trim() === '') return items

        // console.log('filter',filter);
        return items.filter(i => filter(i.student_detail.realname_en, search))
      },
    },

    watch: {
      batch_create: function (val) {
        let title = (val.status) ? 'success' : 'error'
        this.$message({
          message: val.message,
          duration: 4000,
          type: title,
          position: 'center'
        })
      },
      deep: true
    },

    created () {
      // this.items = genData()
      const classQuery = this.$route.query.classes
      if (classQuery) this.classFilters = classQuery
    },

    mounted (){
      this.$store.dispatch('FETCH_OPTIONCLASS')
      this.$store.dispatch('FETCH_STUDENT')
    }
  }
</script>
