<template>
  <panel class="student-view">

    <vi-row slot="head">
      <vi-button @click="onAddStudent" color="green" outline small>
        Create student
      </vi-button>

      <vi-spacer/>

      <vi-button @click="onExport" flat small>
        Export
      </vi-button>
      <vi-button @click="onBatchImport" flat small>
        Batch import
      </vi-button>
    </vi-row>

    <vi-input v-model="search" prefix-icon="search" placeholder="Search student name" class="mx-16 my-16"/>

    <vi-data-table
      v-if="students"
      :headers="headers"
      :items="students"
      :search="search"
      :sticky-header="130"
      :pagination.sync="pagination"
      :custom-filter="filterFunction"
      no-header
      divided
      :item-height="69">

      <div slot="item" slot-scope="{item}" class="vi-table__row">

        <vi-table-col>
          <vi-item>
            <vi-item-avatar>
              <vi-avatar size="30"><vi-icon name="avatar"></vi-icon></vi-avatar>
            </vi-item-avatar>
            <vi-item-content>
              <vi-item-title>{{item.student_detail && item.student_detail.realname_en}}</vi-item-title>
              <vi-item-subtitle>{{item.student_detail && item.student_detail.realname_zh}}</vi-item-subtitle>
            </vi-item-content>
          </vi-item>
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
    name: 'student-list',

    data() {
      return {
        items: [],
        search: '',
        pagination: {},
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
      classFilter () {
        return this.$route.query.classes
      }
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
          this.$store.dispatch('STUDENT_DESTROY',{user_id:student.student_id})
        } catch (e) {}
      },
      filterByClass (items) {
        if (!this.classFilter) return items
        return items.filter(student => {
          return this.classFilter === student.single_class.c_name
        })
      },
      filterFunction (items, search, filter) {
        items = this.filterByClass(items)
        search = search.toString().toLowerCase()
        if (search.trim() === '') return items
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

    mounted (){
      this.$store.dispatch('FETCH_OPTIONCLASS')
      this.$store.dispatch('FETCH_STUDENT')
    }
  }
</script>
