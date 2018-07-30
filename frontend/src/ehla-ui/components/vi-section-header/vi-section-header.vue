<template>
  <div class="vi-section-header">
    <div class="vi-section-header__title">
      <slot></slot>
    </div>
    <div class="vi-section-header__spacer"></div>
    <slot name="right"></slot>
  </div>
</template>

<script>
  export default {
    name: 'vi-section-header'
  }
</script>
