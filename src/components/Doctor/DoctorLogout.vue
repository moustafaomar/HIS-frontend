<template></template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'DoctorLogout',
  data () {
    return {
      ...mapGetters({ currentUser: 'currentUser' })
    }
  },
  created () {
    delete localStorage.token
    this.$router.push('/doctor/dashboard')
  }
}
</script>
