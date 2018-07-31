<template lang="pug">
  div
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
        return this.$store.getters.weakness_list(this.class_id)
      },
      class_id () {
        return this.$route.params.class_id
      }
    },
    methods: {
      onSelect (id) {
        console.log(this.selected)
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
          class_id: this.class_id
        })
      }
    },
    created () {
      this.fetch()
    },
    watch: {
      class_id () {
        this.fetch()
      }
    }
  }
</script>
