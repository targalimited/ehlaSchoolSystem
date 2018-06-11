<template>
  <div :class="[
    type === 'textarea' ? 'vi-input' : 'vi-input',
    {
      'vi-input--disabled': disabled,
      'vi-input--readonly': readonly,
      'vi-input--clickable': clickable,
      'vi-input--focused': focused,
      'vi-input--error': error,
      'vi-input--line': line,
      'vi-input--darker': darker,
      'vi-input--no-resize': noResize,
    }
    ]"
       @mouseenter="hovering = true"
       @mouseleave="hovering = false"
       @keydown="handleKeydown"
       @click="handleClick"
  >
    <template v-if="type !== 'textarea'">

      <span class="vi-input__prefix" v-if="prefixIcon">
        <vi-icon :name="prefixIcon"/>
      </span>

      <div class="vi-input__selection">

        <slot v-if="$slots.prepend" name="prepend"></slot>

        <input
          class="vi-input__inner"
          v-bind="$props"
          :disabled="disabled || clickable"
          :value="value"
          ref="input"
          @input="handleInput"
          @focus="handleFocus"
          @blur="handleBlur"
          :readonly="readonly || clickable"
          :maxlength="maxLength"
        >
      </div>

      <transition name="fade-transition">
        <span
          class="vi-input__suffix"
          :class="{'vi-input__suffix--clearable': clearable}"
          v-if="suffixIcon || showClear">

          <vi-icon v-if="!showClear" :name="suffixIcon"/>

          <vi-button v-if="showClear" @click.native="clear" text icon size="30" color="light-grey" style="margin-right: -10px">
            <vi-icon size="10" name="clear"/>
          </vi-button>
        </span>
      </transition>

      <div class="vi-input__append" v-if="$slots.append">
        <slot name="append"></slot>
      </div>
    </template>
    <textarea
      v-else
      :maxlength="maxLength"
      class="vi-input__inner vi-input__inner--textarea"
      :value="value"
      @input="handleInput"
      ref="textarea"
      v-bind="$props"
      :disabled="disabled"
      @focus="handleFocus"
      @blur="handleBlur"
      :rows="6"
    >
    </textarea>
  </div>
</template>

<script>
  import ViIcon from '../vi-icon'
  import '../vi-icon/collection/content/clear'
  export default {
    name: 'vi-input',
    components: {
      ViIcon
    },
    props: {
      value: {
        required: false // TODO
      },
      type: {
        type: String,
        default: 'text'
      },
      placeholder: String,
      name: String,
      id: String,
      disabled: {
        type: Boolean,
        default: false
      },
      error: {
        type: Boolean,
        default: false
      },
      readonly: {
        type: Boolean,
        default: false
      },
      clickable: {
        type: Boolean,
        default: false
      },
      clearable: {
        type: Boolean,
        default: false
      },
      forceShowClear: Boolean,
      prefixIcon: String,
      suffixIcon: String,
      line: {
        type: Boolean,
        default: false
      },
      noResize: Boolean,
      maxLength: String,
      darker: Boolean
    },
    data () {
      return {
        hovering: false,
        focused: false
      }
    },
    computed: {
      showClear () {
        const showClear = this.clearable && this.value !== ''
        if (this.forceShowClear) return showClear
        else return showClear && (this.focused || this.hovering)
      }
    },
    methods: {
      handleBlur (event) {
        this.focused = false
        this.$emit('blur', event)
      },
      handleFocus (event) {
        this.focused = true
        this.$emit('focus', event)
      },
      handleInput (event) {
        this.$emit('input', event.target.value)
      },
      handleClick () {
        if (this.clickable) this.$emit('click')
      },
      handleKeydown (e) {
        this.$emit('keydown', event)
      },
      clear (e) {
        e.stopPropagation()
        this.$emit('input', '')
        this.$refs.input.focus()
      }
    }
  }
</script>
