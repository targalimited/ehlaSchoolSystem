<template>
  <vi-menu
    v-model="opened"
    :nudgeRight="nudgeRight"
    :nudgeBottom="nudgeBottom"
    :nudgeTop="nudgeTop"
    :nudgeLeft="nudgeLeft"
    :offsetX="offsetX"
    :offsetY="offsetY"
    :fullWidth="width === '100%'"
    content-class="vi-date-picker-dialog"
    max-width="350px"
    max-height="auto"
    :disabled="disabled"
    :close-on-content-click="false">

    <vi-input
      :style="{width: width}"
      slot="activator"
      :darker="darker"
      :value="displayDate"
      :disabled="disabled"
      :error="error"
      :placeholder="placeholder"
      :name="name"
      clickable>
      <vi-icon size="10" :flip-y="opened" slot="append" name="down"/>
    </vi-input>

    <datepicker :inline="true" @selected="onSelect" :highlighted="highlighted" :disabledDates="disabledDates"/>
  </vi-menu>
</template>

<script>
  import Datepicker from 'vuejs-datepicker'
  import moment from 'moment'
  export default {
    name: 'vi-date-picker',

    components: {Datepicker},

    props: {
      name: '',
      disabled: {
        default: false,
        type: Boolean
      },
      error: {
        default: false,
        type: Boolean
      },
      darker: {
        default: false,
        type: Boolean
      },
      width: {
        default: 'auto'
      },
      value: {
        type: String
      },
      placeholder: {
        type: String,
        default: 'Select a date'
      },
      outputFormat: {
        default: 'YYYY-MM-DD'
      },
      displayFormat: {
        default: 'DD MMM YYYY'
      },
      offsetX: {
        default: false
      },
      offsetY: {
        default: true
      },
      nudgeRight: {
        default: 0
      },
      nudgeBottom: {
        default: 0
      },
      nudgeLeft: {
        default: 0
      },
      nudgeTop: {
        default: 0
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
      },
      highlighted () {
        const d = this.value
        const y = moment(d, this.outputFormat).format('YYYY')
        const m = moment(d, this.outputFormat).format('MM')
        const date = moment(d, this.outputFormat).format('DD')
        return { dates: [new Date(y, m - 1, date)] }
      },
      disabledDates () {
        return {
          to: moment().subtract(1, 'days').toDate()
        }
      },
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
