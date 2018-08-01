<template lang="pug">
  // TODO: hardcoded
  vi-dialog.create-asmt-dialog(:value="true")
    asmt-options(v-if="!selectedAsmt" :selectedClass="classId " selectedCat="RCD" @input="v => {selectedAsmt = v}")
    asmt-settings(v-if="selectedAsmt" :item-id="selectedAsmt.id" :class-id="classId" @done="onFinish")
</template>

<script>
  import AsmtOptions from '../components/asmt-options'
  import AsmtSettings from '../components/asmt-settings'
  export default {
    name: 'create-asmt-dialog',

    components: { AsmtOptions, AsmtSettings },

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
