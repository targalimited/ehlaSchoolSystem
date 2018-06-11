<!-- TODO
  1. should we have moment as dependency?
  2. not yet implement props (just output now)
  -->

<template>
  <vi-menu v-model="opened" left :nudge-bottom="10" :close-on-content-click="false">

    <vi-input style="width: 100%" slot="activator" darker line :value="displayDate" :placeholder="placeholder"/>

    <datepicker :inline="true" @selected="onSelect"/>
  </vi-menu>
</template>

<script>

import Datepicker from 'vuejs-datepicker'
import moment from 'moment'
export default {
  name: 'vi-date-picker',

  components: {Datepicker},

  props: {
    value: {
      type: String
    },
    placeholder: {
      type: String
    },
    outputFormat: {
      default: 'YYYY-MM-DD'
    },
    displayFormat: {
      default: 'DD MMM YYYY'
    }
  },

  data () {
    return {
      opened: false
    }
  },

  computed: {
    outputDate () {
      if (!this.value) return ''
      return moment(this.value).format(this.outputFormat)
    },
    displayDate () {
      if (!this.outputDate) return ''
      return moment(this.outputDate).format(this.displayFormat)
    }
  },

  methods: {
    onSelect (date) {
      this.opened = false
      const output = moment(date).format(this.outputFormat)
      this.$emit('input', output)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .vi-menu
    display block !important
</style>
