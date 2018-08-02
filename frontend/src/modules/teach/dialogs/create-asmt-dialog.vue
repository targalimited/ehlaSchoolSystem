<template lang="pug">
  // TODO: hardcoded
  vi-dialog(scrollable :value="true" max-width="640")
    .vi-dialog__main
      .vi-dialog__header Create assignment
      template
        asmt-options(v-if="!selectedAsmt" :selectedClass="classId " :selectedCat="catId" @input="v => {selectedAsmt = v}")
        asmt-settings(v-if="selectedAsmt" :item-id="selectedAsmt.id" :class-id="classId" @done="onFinish" @cancel="$close()")
</template>

<script>
  import AsmtOptions from '../components/asmt-options'
  import AsmtSettings from '../components/asmt-settings'
  export default {
    name: 'create-asmt-dialog',

    components: { AsmtOptions, AsmtSettings },

    props: {
      catId: String
    },

    computed: {
      classId () {
        return parseInt(this.$route.params.class_id)
      }
    },

    data () {
      return {
        selectedAsmt: ''
      }
    },

    methods: {
      onFinish () {
        if (this.$route.name !== 'asmt-status') {
          this.$router.push({
            name: 'asmt-status',
            params: {
              class_id: this.$route.params.class_id
            }
          })
        }
        this.$close()
      }
    }
  }
</script>
