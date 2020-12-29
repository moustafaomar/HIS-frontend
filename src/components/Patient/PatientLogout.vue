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
    delete localStorage.patientToken
    this.$router.push('/patient/dashboard')
  }
}
</script>
