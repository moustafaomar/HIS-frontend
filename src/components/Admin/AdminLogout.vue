<template></template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'AdminLogout',
  data () {
    return {
      ...mapGetters({ currentAdmin: 'currentAdmin' })
    }
  },
  created () {
    delete localStorage.adminToken
    this.$router.push('/admin/dashboard')
  }
}
</script>
