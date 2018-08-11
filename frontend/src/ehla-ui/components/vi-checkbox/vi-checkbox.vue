<template>
  <div class="vi-checkbox" :class="classes">
    <div class="vi-checkbox__main" @click="toggle">
      <vi-icon class="vi-checkbox__icon" :name="isChecked ? 'checkbox-checked' : 'checkbox-empty'"/>
      <div v-if="label" class="vi-checkbox__label">{{label}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'vi-checkbox',
    model: {
      event: 'input',
      prop: 'inputValue'
    },
    props: {
      label: {
        type: String,
        required: false
      },
      inline: {
        type: Boolean,
        required: false,
        default: false
      },
      disabled: {
        type: Boolean,
        required: false
      },
      inputValue: {
        type: Boolean | String | Number,
        required: true
      },
      value: {
        type: String | Number,
        required: false
      },
      multiple: {
        type: Boolean,
        required: false
      }
    },
    computed: {
      classes () {
        return {
          'vi-checkbox--active': this.isChecked,
          'vi-checkbox--disabled': this.disabled,
          'vi-checkbox--inline': this.inline
        }
      },
      isMultiple () {
        return this.multiple || Array.isArray(this.inputValue)
      },
      isBoolean () {
        return typeof this.inputValue === 'boolean'
      },
      isChecked () {
        if (this.isBoolean) {
          return this.inputValue === true
        } else if (this.isMultiple) {
          return this.inputValue.includes(this.value)
        } else {
          return this.inputValue === this.value
        }
      }
    },
    methods: {
      toggle () {
        if (this.disabled) return
        let newValue
        if (this.isBoolean) {
          newValue = !this.inputValue
        } else if (this.isMultiple) {
          newValue = [...this.inputValue]
          if (this.isChecked) newValue.splice(newValue.indexOf(this.value), 1)
          else newValue.push(this.value)
        } else {
          if (this.isChecked) newValue = ''
          else newValue = this.value
        }
        this.$emit('input', newValue)
      }
    }
  }
</script>
