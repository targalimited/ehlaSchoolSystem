<template>
  <div class="teacher-view" style="margin-top: 60px">

    <vi-app-bar title="Teachers">

      <div slot="action">
        <vi-button @click="onExport" dark>
          <vi-icon left name="add-thick" size="12"/>
          Export
        </vi-button>
        <vi-button @click="onBatchImport" dark>
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
          <vi-select :options="option_class" v-model="classFilters" placeholder="Filter by class" max-width="300" style="width: 160px" class="ml-8"/>
        </vi-row>
      </div>
    </vi-app-bar>

    <vi-data-table
      v-if="teachers"
      :headers="headers"
      :items="teachers"
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
          <vi-chip  v-for="(single_class, index) in item.classes" :key="index">
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
  </div>
</template>

<script>
  import { teacherDialog, batchImportDialog } from '../dialogs'
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
      ])
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
        // console.log('filterByClass',items);
        if (this.classFilters.length === 0) return items
        return items.filter(i => {

         return this.classFilters.includes(i.classes.name)

        })
      },
      filterFunction (items, search, filter) {
        items = this.filterByClass(items)
        search = search.toString().toLowerCase()
        console.log('filterFunction',search)
        if (search.trim() === '') return items

        return items.filter(i => (
          filter(i.realname_en, search)
        ))
      },
    },

    watch: {
      batch_create: function (val) {
        this.$message({
          message: val.message,
          duration: 4000,
          type: 'error',
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
      // console.log(this.teachers)
      this.$store.dispatch('FETCH_OPTIONCLASS')
      this.$store.dispatch('FETCH_ROLE')
      this.$store.dispatch('FETCH_TEACHER')
    }
  }
</script>
