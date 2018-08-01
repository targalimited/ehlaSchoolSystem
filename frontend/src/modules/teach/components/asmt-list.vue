<template lang="pug">
  div
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
  export default {
    name: "asmt-list",

    components: { AsmtItem },

    props: ['locked'],

    computed: {
      $class_id () {
        return this.$route.params.class_id
      },
      asmtList () {
        const TYPE = this.locked ? 'lockedAsmtList' : 'activeAsmtList'
        return this.$store.getters[TYPE](this.$class_id) || []
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
          class_id: this.$class_id
        })
        this.loading = false
      }
    },
    created () {
      this.initFetch()
    },
    watch: {
      '$class_id': function () {
        this.initFetch()
      }
    }
  }
</script>
