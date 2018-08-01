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

    data () {
      return {
        items: []
      }
    },

    props: {
      selectedClass: [String, Number],
      selectedCat: String
    },

    methods: {
      async initFetch () {
        const res = await this.$store.dispatch('getItemListByClassCat', {
          class_id: this.selectedClass,
          cat_id: this.selectedCat
        })
        this.items = res
      }
    },

    created () {
      this.initFetch()
    }
  }
</script>
