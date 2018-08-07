<template lang="pug">
  panel.asmt-list
    template(slot="head")
      vi-menu(v-if="!locked")
        vi-button(slot="activator" color="green" outline small) new assignment
        vi-item(v-for="cat in catList" :key="cat.key" @click="createAsmt(cat.key)" link) {{cat.name_en}}
    template
      vi-spinner(v-if="loading && asmtList.length === 0")
      vi-no-data(v-else-if="asmtList.length === 0" title="no data")
      asmt-item(
        v-else
        v-for="d in asmtList"
        :key="d.batch_id"
        :locked="locked"
        :asmt-data="d"
        @click.native="onSelect(d)"
      )
</template>

<script>
  import AsmtItem from './asmt-item'
  import {createAsmtDialog} from '../../../modules/teach/dialogs'
  export default {
    name: "asmt-list",

    components: { AsmtItem },

    props: ['locked'],

    computed: {
      $classId () {
        return this.$route.params.classId
      },
      asmtList () {
        const TYPE = this.locked ? 'lockedBatchList' : 'activeBatchList'
        return this.$store.getters[TYPE](this.$classId) || []
      },
      catList () {
        return this.$store.state.teach.catList
      }
    },
    data () {
      return {
        loading: false
      }
    },
    methods: {
      onSelect (d) {
        const newRoute = {
          ...this.$route,
          ...{
            query: {
              batch_id: d.batch_id,
              item_id: d.item_id
            }
          }
        }
        this.$router.push(newRoute)
      },
      async initFetch () {
        this.loading = true
        await this.$store.dispatch('getAsmtList', {
          classId: this.$classId
        })
        this.loading = false
      },
      createAsmt (id) {
        createAsmtDialog({
          catId: id
        })
      }
    },
    created () {
      this.initFetch()
    },
    watch: {
      '$classId': function () {
        console.log('fetch')
        this.initFetch()
      }
    }
  }
</script>

<style lang="stylus">
  @import '../../../project-ui/stylus/main.styl'
  .asmt-list
    &__head
      border-bottom 1px solid $border-color
      height 50px
      display flex
      align-items center
      padding 0 16px

    &__body
      //
</style>
