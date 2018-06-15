<template>
    <div class="vi-checkbox" @click="toggleCheck" :class="{'vi-checkbox--disabled': disabled}">
        <div class="vi-checkbox__iconContainer">
            <vi-icon class="vi-checkbox__icon" :class="classes" :name="iconName"/>
        </div>
        <div class="vi-checkbox__label" :class="textClasses">
            <slot>
                {{label}}
            </slot>
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
      label: String,
      optionValue: String,
      inputValue: Array | String,
      maxSelected: Number,
      brandLabel: Boolean,
      orderList: Array,
      disabled: Boolean
    },
    computed: {
      classes() {
        return {
          "vi-checkbox--disabled": ((this.inputValue.length >= this.maxSelected) && !this.inputValue.includes(this.optionValue) && typeof(this.inputValue) == "object"),
          "vi-checkbox-swap--disabled": ((this.inputValue.length >= this.maxSelected) && !this.inputValue != this.optionValue && typeof(this.inputValue) == "string"),
          "vi-checkbox--checked": this.inputValue.includes(this.optionValue),
          "vi-checkbox--empty": !this.inputValue.includes(this.optionValue)
        }
      },
      iconName() {
        if (this.inputValue.includes(this.optionValue)) {
          return "checkbox-checked"
        }
        if (this.inputValue != this.optionValue && this.inputValue.length > 0 && typeof(this.inputValue) == "string") {
          return "checkbox-swap"
        }
        if (!this.inputValue.includes(this.optionValue)) {
          return "checkbox-empty"
        }
      },
      textClasses() {
        return {
          "vi-checkbox__text--brandLabel": this.inputValue.includes(this.optionValue) && this.brandLabel == true,
        }
      }
    },
    methods: {
      toggleCheck() {
        if (typeof(this.inputValue) == "string") {
          let inputValue = [].concat(this.inputValue) // no mutation
          if (inputValue.includes(this.optionValue)) {
              inputValue = ""
          } else {
              inputValue = this.optionValue
          }
          this.$emit('input', inputValue)
        }
        if (typeof(this.inputValue) == "object") {
          let inputValue = [].concat(this.inputValue) // no mutation
          if (inputValue.includes(this.optionValue)) {
              inputValue.splice(inputValue.indexOf(this.optionValue), 1)
          } else {
              inputValue.push(this.optionValue)
          }
          if (this.orderList) {
              inputValue.sort((a,b) => {return this.orderList.map((e) => { return e.uuid ? e.uuid:''}).indexOf(a) - this.orderList.map((e) => { return e.uuid ? e.uuid:'' }).indexOf(b);})
          }
          this.$emit('input', inputValue)
        }
      }
    }
  }
  </script>

<style lang="stylus">
@import '../../stylus/main.styl'

.vi-checkbox
    display flex
    align-items center

.vi-checkbox__icon
    display block !important
    margin auto

.vi-checkbox__icon.vi-checkbox--empty
    color $light-grey

.vi-checkbox__icon.vi-checkbox--checked
    color $brand-ascent

.vi-checkbox__iconContainer
    display inline
    cursor pointer

.vi-checkbox__label
    display inline
    font-size 14px
    margin-left 10px
    cursor pointer
    width 100%

.vi-checkbox--disabled
    pointer-events none
    opacity 0.3

.vi-checkbox-swap--disabled
    color $light-grey

.vi-checkbox__text--brandLabel
    color $brand-ascent
</style>

