<!--
  This component list the pickable asmt options given the selected class and selected category
  And will emit an input event to the parent for the selected item
-->
<!-- TODO: allow the preview side by side -->

<template lang="pug">
  .asmt-options
    reading-item(v-for="(item,i) in items" :key="i" :item="item" @click.native="$emit('input', item)")
</template>

<script>
  export default {
    name: 'asmt-options',

    props: {
      selectedClass: [String, Number],
      selectedCat: String
    },

    computed: {
      items () {
        return this.$store.getters.getItemListByClassCat(this.selectedClass, this.selectedCat)
      }
    },

    methods: {
      async initFetch () {
        this.$store.dispatch('getItemListByClassCat', {
          classId: this.selectedClass,
          catId: this.selectedCat
        })
      }
    },

    created () {
      this.initFetch()
    }
  }
</script>
