<template>
  <div class="vi-no-data" :class="{'vi-no-data--small': small}">
    <vi-icon :size="iconSize" v-if="icon" :name="icon"/>
    <div v-if="title" class="vi-no-data__title">{{title}}</div>
    <div class="vi-no-data__content">
      <slot>
        <template v-if="content">{{content}}</template>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'vi-no-data',
  props: {
    icon: {
      type: String
    },
    title: {
      type: String
    },
    content: {
      type: String
    },
    iconSize: {
      default: 80
    },
    small: {
      type: Boolean,
      default: false
    }
  }
}
</script>
