<template>
  <div class="default-layout">
    <!--<top-bar/>-->
    <!--<main class="default-layout__main">-->
      <router-view/>
    <!--</main>-->
  </div>
</template>

<script>
  import TopBar from './top-bar'
  export default {
    name: 'default-layout',
    components: {TopBar}
  }
</script>

<style lang="stylus">
  .default-layout__main
    margin-top 75px
</style>
