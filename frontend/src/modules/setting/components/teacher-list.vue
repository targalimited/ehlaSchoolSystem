<template>
  <panel class="teacher-list">

    <vi-row slot="head">
      <vi-button @click="onAddTeacher" color="green" outline small>
        Create teacher
      </vi-button>
      <vi-spacer></vi-spacer>
      <vi-button @click="onExport" flat small>
        Export
      </vi-button>
      <vi-button @click="onBatchImport" flat small>
        Batch import
      </vi-button>
    </vi-row>

    <vi-input v-model="search" prefix-icon="search" placeholder="Search teacher by name or class" class="mx-16 my-16"/>

    <vi-data-table
      v-if="teachers"
      :headers="headers"
      :items="teachers"
      :search="search"
      :pagination.sync="pagination"
      :custom-filter="filterFunction"
      divided
      no-header
      :item-height="64">

      <div slot="item" slot-scope="{item}" class="vi-table__row">

        <vi-table-col>
          <vi-item>
            <vi-item-avatar>
              <vi-avatar size="40">{{item.realname_en | firstLetter}}</vi-avatar>
            </vi-item-avatar>
            <vi-item-content>
              <vi-item-title>{{item.realname_en}}</vi-item-title>
              <vi-item-subtitle>{{item.realname_zh}}</vi-item-subtitle>
            </vi-item-content>
          </vi-item>
        </vi-table-col>

        <vi-table-col>
          <vi-chip v-for="(single_class, index) in item.classes" :key="index" class="vi-chip--select-multi">
            {{single_class.name}}
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
  import { teacherDialog, batchImportDialog } from '../dialogs'
  import { mapGetters } from 'vuex'

  export default {
    name: 'teacher-list',

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
            width: '100px'
          }
        ]
      }
    },

    computed: {
      ...mapGetters([
        'teachers',
        'option_class',
        'batch_create'
      ]),
      classFilters () {
        return this.$route.query.classes || []
      }
    },

    methods: {
      async onExport () {
        this.$store.dispatch('EXPORT_TEACHER')
      },
      async onBatchImport () {
        const file = await batchImportDialog()
        if (!file) return
        this.$store.dispatch('TEACHER_BATCH_CREATE',file)

      },
      async onAddTeacher () {
        const res = await teacherDialog({
          OptionClass: this.option_class
        }).then(res => {
          if(res)
          this.$store.dispatch('TEACHER_CREATE',res)
        })
        if (!res) return
        console.log('create teacher API', res)
      },
      async onEdit (teacher) {
        console.log('onEdit',teacher)
        const res = await teacherDialog({
          oldRealname_zh: teacher.realname_zh,
          oldRealname_en: teacher.realname_en,
          oldUsername: teacher.username,
          oldClass: teacher.classes,
          OptionClass: this.option_class,
          oldTeacher_num: teacher.school_num,
          oldRole: teacher.role_id,
        }).then(res=>{
          res.teacher_id=teacher.teacher_id
          if(res)
          this.$store.dispatch('TEACHER_UPDATE',res)
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
          this.$store.dispatch('TEACHER_DESTROY',{user_id:teacher.teacher_id})

        } catch (e) {}
      },
      filterByClass (items) {
        if (this.classFilters.length === 0) return items
        return items.filter(teacher => {
          const classIds = teacher.classes.map(c => c.name)
          return classIds.some(classId => {
            return this.classFilters.includes(classId)
          })
        })
      },
      filterFunction (items, search, filter) {
        items = this.filterByClass(items)
        search = search.toString().toLowerCase()
        if (search.trim() === '') return items

        return items.filter(i => (
          filter(i.realname_en, search)
        ))
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
      this.$store.dispatch('FETCH_ROLE')
      this.$store.dispatch('FETCH_TEACHER')
    }
  }
</script>
