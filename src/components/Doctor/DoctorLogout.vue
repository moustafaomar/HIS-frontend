<template></template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'PatientLogout',
  data () {
    return {
      ...mapGetters({ currentPatient: 'currentPatient' })
    }
  },
  created () {
    delete localStorage.token
    this.$router.push('/doctor/dashboard')
  }
}
</script>
