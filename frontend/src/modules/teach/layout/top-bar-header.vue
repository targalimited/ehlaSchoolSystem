<template lang="pug">
  .top-bar-header
    template(v-if="classOption.length === 0") {{title}}
    vi-select(
      v-else
      :options="classOption"
      :value="classId"
      @input="onClassChange"
      option-name="c_name"
      option-value="class_id"
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
      classOption () {
        return this.$store.state.teach.classList
      },
      classId () {
        return parseInt(this.$route.params.classId)
      }
    }
  }
</script>
