<template lang="pug">
  vi-row(justify-center)
    div logging out
    vi-spinner
</template>

<script>
export default {
  name: 'logout',

  created () {
    this.$store.dispatch('logout').then(() => {
      this.$router.push({
          name: 'login'
        })
    })
  }
}
</script>
