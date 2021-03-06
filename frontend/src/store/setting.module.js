import {http, AuthHttp} from '../http'
import {FETCH_SINGLE_CLASS, CLASS_CREATE, CLASS_UPDATE, CLASS_EDIT, FETCH_LEVEL } from './actions.type'
import {SET_CLASS, SET_SINGLE_CLASS, SET_LEVEL} from "./mutations.type";
import { getField, updateField } from 'vuex-map-fields';


const state = {
  classes: [],
  students: [],
  teachers: [],
  batch_create: [],
  levelOptions: [],
  option_class: [],
  summary: [],
  single_class: {},
  roleOptions: []
}

const getters = {
  getField,

  classes: state => state.classes,
  students: state => state.students,
  teachers: state => state.teachers,
  option_class: state => state.option_class,
  roleOptions: state => state.roleOptions,
  batch_create: state => state.batch_create,
  single_class: state => id => state.classes.data.find(c => c.id === id),
  studentsByClass: state => classId => state.students,
  levelOptions(state){
    if(state.summary){
      let all_level = state.summary.levels_translate
      let available_level = state.summary.valid_levels
      let cus_level = []
      for (var k in available_level) {
        if (all_level[available_level[k]]) {
          for (var prop in all_level) {
            if(all_level[prop]===all_level[available_level[k]]) {
              // state.level[prop] = all_level[available_level[k]]
              cus_level.push({key:prop,value:all_level[available_level[k]]})
            }
          }
        }
      }
      return cus_level
    }
  },
}

const actions = {

  async FETCH_STUDENT ({commit}){
    try{
      let res = await new AuthHttp().get('students')
      commit('SET_STUDENT', res.data)
    }catch (e) {

    }
  },
  async FETCH_OPTIONCLASS ({commit}){
    try{
      let res = await new AuthHttp().get('option_class')
      commit('SET_OPTIONCLASS', res)
    }catch (e) {

    }
  },

  async FETCH_TEACHER ({commit}){
    try{
      let res = await new AuthHttp().get('teachers')
      commit('SET_TEACHER', res.data)
    }catch (e) {

    }
  },

  async STUDENT_CREATE (context,payload){
    try{
      await new AuthHttp().http_post('student_single',payload)
      context.dispatch('FETCH_STUDENT')
    }catch (e) {

    }
  },

  async STUDENT_BATCH_CREATE (context,payload){
    try{
      new AuthHttp().post_file('student_batch',payload).then(res=>{
        // console.log('action_batch',res)
        context.commit('SET_BATCH_CREATE_RESULT',res)
        context.dispatch('FETCH_STUDENT')
      })

    }catch (e) {
      console.log(e);
    }
  },

  async STUDENT_UPDATE (context,payload){
    try{
      let res = await new AuthHttp().put('student_single',payload)
      context.dispatch('FETCH_STUDENT')
    }catch (e) {

    }
  },

  async STUDENT_DESTROY (context,payload){
    try{
      console.log('STUDENT_DESTROY',payload)
      let res = await new AuthHttp().delete(`users/${payload.user_id}`)
      context.dispatch('FETCH_STUDENT')
    }catch (e) {

    }
  },

  async TEACHER_DESTROY (context,payload){
    try{
      let res = await new AuthHttp().delete(`users/${payload.user_id}`)
      context.dispatch('FETCH_TEACHER')
    }catch (e) {

    }
  },

  async TEACHER_CREATE (context,payload){
    try{
      let res = await new AuthHttp().http_post('teacher_single',payload)
      context.dispatch('FETCH_TEACHER')
    }catch (e) {

    }
  },



  async EXPORT_TEACHER (context,payload){
    try{
      let res = await new AuthHttp().get_file('exportExcel/'+'teacher')
      // context.dispatch('FETCH_TEACHER')
    }catch (e) {

    }
  },

  async EXPORT_STUDENT (context,payload){
    try{
      let res = await new AuthHttp().get_file('exportExcel/'+'student')
      // context.dispatch('FETCH_TEACHER')
    }catch (e) {

    }
  },


  async TEACHER_BATCH_CREATE (context,payload){
    try{
      let res = await new AuthHttp().post_file('teacher_batch',payload).then(res=>{
        // console.log('action_batch',res)
        context.commit('SET_BATCH_CREATE_RESULT',res)
        context.dispatch('FETCH_TEACHER')
      })

    }catch (e) {

    }
  },

  async TEACHER_UPDATE (context,payload){
    try{
      let res = await new AuthHttp().put('teacher_single',payload)
      context.dispatch('FETCH_TEACHER')
    }catch (e) {

    }
  },

  async FETCH_CLASS ({commit}) {
    try {
      let res = await new AuthHttp().get('classes')
      commit(SET_CLASS, res.data )
    } catch (e) {}
  },

  async [FETCH_SINGLE_CLASS] (context,payload) {
    try {
      let res = await new AuthHttp().http_post('single_class',{id:payload})
      context.commit(SET_SINGLE_CLASS, res.data )
    } catch (e) {}
  },

  async FETCH_LEVEL ({commit}) {
    try {
      let res = await new AuthHttp().get('get_school_item_summary')
      console.log('FETCH LEVEL action',res)
      commit('SET_LEVEL',res)
    } catch (e) {}
  },

  async FETCH_ROLE ({commit}) {
    try {
      let res = await new AuthHttp().get('read_role')
      commit('SET_ROLE',res.data)
    } catch (e) {}
  },

  async CLASS_CREATE (context,payload){
    try{
       console.log(payload)
      await new AuthHttp().http_post('classes',payload)
      context.dispatch('FETCH_CLASS')
      context.dispatch('FETCH_LEVEL')
    }catch (e){

    }
  },

  async CLASS_UPDATE (context,payload){
    try{
      // console.log(data)
      let res = await new AuthHttp().put('classes',payload)
      console.log(res)
      context.dispatch('FETCH_CLASS')
      context.dispatch('FETCH_LEVEL')
    }catch (e){

    }
  },

  async CLASS_DESTROY (context,payload){
    await new AuthHttp().delete(`classes/${payload.classId}`)
    context.dispatch('FETCH_CLASS')
    context.dispatch('FETCH_LEVEL')
  }


}

const mutations = {

  updateField,

  SET_STUDENT (state,students){
    state.students = students
  },

  SET_TEACHER (state,teachers){
    state.teachers = teachers
  },

  SET_OPTIONCLASS (state,option_class){
    state.option_class = option_class
  },

  [SET_CLASS] (state,classes) {
    state.classes = classes
  },

  SET_BATCH_CREATE_RESULT (state,result){
    console.log(result)
    // console.log('set_batch',result)
    state.batch_create = result
  },

  [SET_SINGLE_CLASS] (state,single_class) {
    state.single_class = single_class
  },

  SET_LEVEL (state, summary) {
    console.log('setter',summary)
    state.summary = summary
  },

  SET_ROLE (state, roles) {
    console.log('setter',roles)
    state.roleOptions = roles
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
