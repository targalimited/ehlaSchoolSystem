<template lang="pug">
  .top-bar-header
    vi-select(
      :options="class_option"
      :value="classId"
      @input="onClassChange"
      option-name="c_name"
      option-value="classId"
      minimal
    )
      template(slot="selection" slot-scope="{selection}")
        .top-bar__title {{selection && selection.c_name}}'s {{title}}
</template>

<script>
  export default {
    props: {
      title: String
    },
    data () {
      return {
        classes: []
      }
    },
    methods: {
      onClassChange (new_classId) {
        const newRoute = Object.assign({}, this.$route, {
          params: {
            classId: new_classId
          }
        })
        this.$router.push(newRoute)
      }
    },
    computed: {
      class_option () {
        return this.$store.state.teach.classList
      },
      classId () {
        return parseInt(this.$route.params.classId)
      }
    },
    // TODO: where should we call this API
    async created () {
      this.classes = await this.$store.dispatch('getClasses')
    }
  }
</script>
