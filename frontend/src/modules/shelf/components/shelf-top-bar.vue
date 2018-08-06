<template lang="pug">
  topbar Accessible Items Overview
    template(slot="tabs") Unassigned | Assigned
</template>

<script>
  import Topbar from '@/components/top-bar'
  export default {
    components: {
      Topbar
    }
  }
</script>
