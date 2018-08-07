<template lang="pug">
  panel
    vi-spinner(v-if="!weakness_list")
    template(v-else)
      vi-item(v-for="(weakness,i) in weakness_list" :key="i")
        vi-item-avatar
          vi-checkbox(@input="onSelect(weakness.id)" v-model="selected" :value="weakness.id")
        vi-item-content {{weakness.name_en}}
    div {{selected}}

</template>

<script>
  export default {
    name: "asmt-list",
    data () {
      return {
        selected: []
      }
    },
    computed: {
      weakness_list () {
        return this.$store.getters.weakness_list(this.classId)
      },
      classId () {
        return this.$route.params.classId
      }
    },
    methods: {
      onSelect (id) {
        this.$router.push({
          ...this.route,
          ...{
            query: {
              weakness_ids: this.selected
            }
          }
        })
      },
      fetch () {
        this.$store.dispatch('getWeaknessList', {
          classId: this.classId
        })
      }
    },
    created () {
      this.fetch()
    },
    watch: {
      classId () {
        this.fetch()
      }
    }
  }
</script>
