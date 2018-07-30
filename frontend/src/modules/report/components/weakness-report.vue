<template lang="pug">
  div hi
</template>

<script>
  export default {
    methods: {
      fetch () {
        this.$store.dispatch('getClassWeaknessReport', {
          classId: this.$route.params.class_id,
          batchId: 1,
          itemId: 1,
        })
      }
    },
    created () {
      this.fetch()
    }
  }
</script>
