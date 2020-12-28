<template></template>

<script>
export default {
  name: 'Logout',
  created () {
    delete localStorage.token
    localStorage.token = ''
    this.$store.dispatch('logout')
    // this.$router.push('/')
  }
}
</script>
