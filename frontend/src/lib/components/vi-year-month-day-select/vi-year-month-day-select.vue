<template>
  <div class="vi-year-month-day-select">
    <vi-select :line="line" placeholder="-" @input="onSelect" v-model="month" :options="monthOptions"/>
    <vi-select :line="line" placeholder="-" @input="onSelect" v-model="day" :options="dayOptions"/>
    <vi-select :line="line" placeholder="-" @input="onSelect" v-model="year" :options="yearOptions"/>
  </div>
</template>

<script>
  import {getPadNumber} from '../../util/helper'
  import ViSelect from '../vi-select'
  const range = (start, end) => Array.from({length: (end - start + 1)}, (v, k) => k + start)
  const genDays = () => {
    return range(1, 31).map(d => {
      return {
        value: getPadNumber(d),
        name: getPadNumber(d)
      }
    })
  }
  const genYears = () => {
    const year = new Date().getFullYear()
    return range(year - 100, year).map(d => {
      return {
        value: String(d),
        name: d
      }
    }).reverse()
  }
  export default {
    name: 'vi-year-month-day-select',
    components: {
      ViSelect
    },
    props: {
      // YYYY-MM-DD
      value: String,
      line: Boolean
    },
    data () {
      return {
        dayOptions: genDays(),
        monthOptions: [
          {
            name: 'Jan',
            value: '01'
          },
          {
            name: 'Feb',
            value: '02'
          },
          {
            name: 'Mar',
            value: '03'
          },
          {
            name: 'Apr',
            value: '04'
          },
          {
            name: 'May',
            value: '05'
          },
          {
            name: 'Jun',
            value: '06'
          },
          {
            name: 'Jul',
            value: '07'
          },
          {
            name: 'Aug',
            value: '08'
          },
          {
            name: 'Sep',
            value: '09'
          },
          {
            name: 'Oct',
            value: '10'
          },
          {
            name: 'Nov',
            value: '11'
          },
          {
            name: 'Dec',
            value: '12'
          }
        ],
        yearOptions: genYears(),
        day: '',
        month: '',
        year: '',
      }
    },
    computed: {
      isValid () {
        return this.day && this.month && this.year
      },
      computedDateString () {
        return `${this.year}-${getPadNumber(this.month)}-${getPadNumber(this.day)}`
      }
    },
    methods: {
      transformValue () {
        if (!this.value) return
        const arr = this.value.split('-')
        this.day = arr[2]
        this.month = arr[1]
        this.year = arr[0]
      },
      onSelect () {
        if (!this.isValid) return
        this.$emit('input', this.computedDateString)
      }
    },
    created () {
      this.transformValue()
    },
    watch: {
      value () {
        this.transformValue()
      }
    }
  }
</script>

<style lang="stylus">
  @import '../../stylus/main.styl'
  .vi-year-month-day-select
    display flex

    .vi-select
      width 33.33%
      +not-last()
        margin-right 10px

    .vi-input__inner
      text-align center

    .vi-input__suffix
      padding-left 4px
</style>
