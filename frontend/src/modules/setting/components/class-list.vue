<template>
  <panel class="class-view">
    <vi-button :disabled="!isSuperAdmin" slot="head" @click="onAddClass" color="green" outline small>
      Create class
    </vi-button>

    <vi-row wrap px-16 my-16>
      <vi-col xs3 v-for="(c,i) in classes" :key="i">
        <vi-card>
          <vi-menu left>
            <vi-button slot="activator" icon text>
              <vi-icon name="more"/>
            </vi-button>
            <vi-item :link="true" @click="onEdit(c)">
              <vi-item-avatar>
                <vi-icon name="edit"/>
              </vi-item-avatar>
              <vi-item-content>
                Edit class
              </vi-item-content>
            </vi-item>
            <vi-item :link="true" @click="onDelete(c)" v-if="!c.lock && !c.students.length && !c.teachers.length">
              <vi-item-avatar>
                <vi-icon name="trash"/>
              </vi-item-avatar>
              <vi-item-content>
                Delete class
              </vi-item-content>
            </vi-item>
            <vi-item :link="true" @click="onConfirm(c)" v-if="!c.lock">
              <vi-item-avatar>
                <vi-icon name="checkbox-checked"/>
              </vi-item-avatar>
              <vi-item-content>
                Confirm class
              </vi-item-content>
            </vi-item>
          </vi-menu>

          <div class="bottom">
            <router-link :to="{name: 'settings-student', query: {classes: c.c_name}}">
              <vi-button text small style="font-size: 14px">
                <vi-icon name="star" left size="12"/>
                {{c.students.length}} Students
                <vi-icon name="right" right size="10"/>
              </vi-button>
            </router-link>

            <router-link :to="{name: 'settings-teacher', query: {classes: c.c_name}}">
              <vi-button text small style="font-size: 14px">
                <vi-icon name="star" left size="12"/>
                {{c.teachers.length}} Teachers
                <vi-icon name="right" right size="10"/>
              </vi-button>
            </router-link>
          </div>

          <div class="lock" v-if="c.lock">
            <vi-icon name="lock" left size="12"/>
          </div>

          <div class="center">
            {{c.c_name}}
          </div>
        </vi-card>
      </vi-col>
    </vi-row>
  </panel>
</template>

<script>
  import { mapGetters } from 'vuex'
  import {FETCH_CLASS,FETCH_LEVEL, FETCH_SINGLE_CLASS, CLASS_CREATE, CLASS_UPDATE, CLASS_DESTROY, CHECK_AUTH} from "@/store/actions.type";
  import { mapFields } from 'vuex-map-fields';
  import {classDialog} from '../dialogs'

  export default {
    name: 'class-view',

    computed: {
      ...mapGetters([
        'levelOptions',
        'classes',
        'single_class',
        'isSuperAdmin'
      ]),
      ...mapFields([
        'single_class.c_name',
        'single_class.level',
        'single_class.id'
      ]),
    },

    methods: {
      onAddClass () {
        classDialog({levelOptions:this.levelOptions}).then(res =>{
          console.log('class_view',res)
          this.$store.dispatch('CLASS_CREATE',res)
        })
      },
      onEdit (classv) {
        classDialog({
          levelOptions:this.levelOptions,
          oldClassName: classv.c_name,
          oldClassLevel: classv.level,
          classLock: classv.lock
        }).then(res=>{
          //  console.log(res)
          // console.log(classv);
           this.$store.dispatch('CLASS_UPDATE',{id:classv.id,name:res.className,level:res.classLevel})
        })
      },
      async onDelete(c){
        try {
          await this.$messageBox({
            title: 'Delete class',
            message: `Are you sure you want to delete Class ${c.c_name}`
          })
          // TODO cal API
          this.$store.dispatch('CLASS_DESTROY',{classId:c.id})
        } catch (e) {}
      },
      async onConfirm(c){
        try {
          await this.$messageBox({
            title: 'Confirm class',
            message: `Are you sure you confirm Class ${c.c_name}`
          })
          // TODO cal API
          this.$store.dispatch('CLASS_UPDATE',{id:c.id,lock:1})
        } catch (e) {}
      }
    },
    mounted(){
      this.$store.dispatch('FETCH_LEVEL')
      this.$store.dispatch('FETCH_CLASS')
    },

    created () {
      // this.classList = genData()
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../../project-ui/stylus/settings.styl'

  .class-view
    width 660px

  .vi-card
    height 160px
    display flex
    flex-flow row wrap
    align-items center
    justify-content center
    font-size 20px
    box-shadow $shadow
    cursor pointer
    transition all $transition

    &:hover
      box-shadow $shadow-2

    .bottom
      position absolute
      bottom 4px
      left 8px

    .vi-menu
      position absolute
      top 8px
      right 8px

    .lock
      position absolute
      top 4px
      left 8px
      color #777

</style>
