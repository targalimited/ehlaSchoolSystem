<template lang="pug">
  vi-dialog.edit-asmt-dialog(:value="true")
    asmt-settings(
      :item-id="itemId"
      :class-id="classId"
      :batch-id="batchId"
      @done="onFinish"
    )
</template>

<script>
  import AsmtOptions from '../components/asmt-options'
  import AsmtSettings from '../components/asmt-settings'
  export default {
    name: 'edit-asmt-dialog',

    components: { AsmtOptions, AsmtSettings },

    props: {
      itemId: {
        type: String,
        required: true
      },
      batchId: {
        type: String,
        required: true
      }
    },

    computed: {
      classId () {
        return parseInt(this.$route.params.class_id)
      }
    },

    methods: {
      onFinish () {
        this.$close()
      }
    }
  }
</script>
