<template lang="pug">
  .asmt-settings
    img(:src="asmtData.thumbnail_path")
    h2 {{isEdit ? 'Edit' : 'Create'}} {{asmtData.name_en}}
    vi-row
      vi-col(xs6)
        vi-date-picker(v-model="startDate" placeholder="Start Date")
      vi-col(xs6)
        vi-date-picker(v-model="endDate" placeholder="End Date")
    vi-button-row
      vi-button cancel
      vi-button(@click="submit") confirm
</template>

<script>
  export default {
    name: 'asmt-settings',

    props: {
      classId: {
        type: [String, Number],
        required: true
      },
      itemId: {
        type: [String, Number],
        required: true
      },
      // provide batch_id means edit item
      batchId: {
        type: [String, Number],
        required: false
      }
    },

    data () {
      return {
        startDate: this.prevStartDate || '',
        endDate: this.prevEndDate || '',
        remark: this.prevRemark || '',
        asmtData: {}
      }
    },

    computed: {
      isEdit () {
        return !!this.batchId
      }
    },

    methods: {
      async initFetch () {
        this.asmtData = await this.$store.dispatch('getItemById', {
          classId: this.classId,
          itemId: this.itemId
        })
      },
      async submit () {
        await this.$store.dispatch('setAssignment', {
          classId: this.classId,
          itemId: this.itemId,
          batchId: this.batchId,
          itemType: this.asmtData.item_type,
          startDate: this.startDate,
          endDate: this.endDate,
          remark: this.remark,
          exercises: this.asmtData.exercises.map(e => e.exercise_id),
          videos: []
        })
        this.$emit('done')
      }
    },

    created () {
      this.initFetch()
    }
  }
</script>
