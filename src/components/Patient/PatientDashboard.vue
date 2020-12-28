<template>
<div id="app">
    Hello, Patient
</div>
</template>
<script>
import { mapGetters } from 'vuex'
import axios from '../../axios'
export default {
  name: 'PatientDashboard',
  created () {
    this.checkCurrentLogin()
  },
  updated () {
    this.checkCurrentLogin()
  },
  computed: {
    ...mapGetters({ currentPatient: 'currentPatient' })
  },
  methods: {
    checkCurrentLogin () {
      axios.get('http://localhost:5000/patient/dashboard', {headers: {'x-access-token': this.currentPatient}}).then((res) => {
        if (res.status !== 200) {
          this.$router.push('/patient/login')
        }
      }).catch(() => {
        this.$router.push('/patient/login')
      })
    }
  }
}
</script>