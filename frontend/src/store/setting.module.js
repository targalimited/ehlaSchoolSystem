import {http, AuthHttp} from '../http'
import {FETCH_CLASS, FETCH_SINGLE_CLASS, CLASS_CREATE, CLASS_UPDATE, CLASS_DESTROY, CLASS_EDIT, FETCH_LEVEL } from './actions.type'
import {SET_CLASS, SET_SINGLE_CLASS, SET_LEVEL} from "./mutations.type";
import { getField, updateField } from 'vuex-map-fields';


const state = {
  classes: [],
  students: [],
  teachers: [],
  levelOptions: [],
  summary: [],
  single_class: {}
}

const getters = {
  getField,

  classes (state){
    // console.log(state.classes)
    return state.classes
  },

  students: state => state.students,
  teachers: state => state.teachers,

  single_class: state => id => state.classes.data.find(c => c.id === id),

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
  }

}

const actions = {

  async FETCH_STUDENT ({commit}){
    try{
      let res = await new AuthHttp().get('students')
      commit('SET_STUDENT', res.data)
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
      let res = await new AuthHttp().http_post('student_single',payload)
      // commit('ADD_STUDENT', res.data)
    }catch (e) {

    }
  },

  async STUDENT_UPDATE (context,payload){
    try{
      let res = await new AuthHttp().put('student_single',payload)
      // commit('ADD_STUDENT', res.data)
    }catch (e) {

    }
  },


  async [FETCH_CLASS] ({commit}) {
    try {
      let res = await new AuthHttp().get('classes')

      commit(SET_CLASS, res.data )
    } catch (e) {}
  },

  async [FETCH_SINGLE_CLASS] (context,payload) {
    try {
      let res = await ApiService.post('single_class',{id:payload})
      context.commit(SET_SINGLE_CLASS, res.data )
    } catch (e) {}
  },

  async [FETCH_LEVEL] ({commit}) {
    try {
      let res = await ApiService.get('get_school_item_summary')
      commit(SET_LEVEL,res.data)
    } catch (e) {}
  },

  async [CLASS_CREATE] ({dispatch}, {data}){
    try{
      // console.log(data)
      await ApiService.post('classes',data)
      dispatch(FETCH_CLASS)
      dispatch(FETCH_LEVEL)
    }catch (e){

    }
  },

  async [CLASS_UPDATE] ({dispatch}){
    try{
      // console.log(data)
      await ApiService.post('classes',state.single_class)
      dispatch(FETCH_CLASS)
      dispatch(FETCH_LEVEL)
    }catch (e){

    }
  },

  async [CLASS_DESTROY] (context,payload){
    await ApiService.delete('class/'+payload)
    context.dispatch(FETCH_CLASS)
    context.dispatch(FETCH_LEVEL)
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

  ADD_STUDENT (state,result){

  },

  [SET_CLASS] (state,classes) {
    state.classes = classes
  },

  [SET_SINGLE_CLASS] (state,single_class) {
    state.single_class = single_class
  },

  [SET_LEVEL] (state, summary) {
    state.summary = summary
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
