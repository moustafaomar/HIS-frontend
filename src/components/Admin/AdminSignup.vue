<template>
<div class="container">
  <div class="row justify-content-center">
  <div class="col-md-5">
   <div class="card">
     <h2 class="card-title text-center">Register</h2>
      <div class="card-body py-md-4">
        <form @submit.prevent="signup">
            <div class="form-group">
                <input type="text" v-model="name" class="form-control" id="name" placeholder="Name">
            </div>
            <div class="form-group">
                <input type="text" v-model="ssn" class="form-control" id="ssn" placeholder="SSN">
            </div>
            <div class="form-group">
                <input type="text" v-model="phone" class="form-control" id="phone" placeholder="Phone">
            </div>                          
            <div class="form-group">
                <input type="password" v-model="password" class="form-control" id="password" placeholder="Password">
            </div>
            <div class="d-flex flex-row align-items-center justify-content-between">
                <a href="/patient/login">Login</a>
                <button class="btn btn-primary">Create Account</button>
            </div>
        </form>
     </div>
  </div>
</div>
</div>
</div>
</template>
<script>
import axios from '../../axios'
import { mapGetters } from 'vuex'
export default {
  name: 'PatientSignup',
  data () {
    return {
      ssn: '',
      password: '',
      name: '',
      phone: '',
      error: false
    }
  },
  computed: {
    ...mapGetters({ currentPatient: 'currentPatient' })
  },
  methods: {
    signup () {
      axios.post('http://localhost:5000/patient/register', {
        'Name': this.name,
        'SSN': this.ssn,
        'phone': this.phone,
        'password': this.password
      }).then((res) => {
        if (res.status === 200) {
          this.login()
        }
      }).catch((error) => {
        this.error = error.response.data.message
      })
    },
    login () {
      axios.post('http://localhost:5000/patient/login', { 'SSN': this.ssn, 'password': this.password })
        .then(request => this.loginSuccessful(request))
        .catch(() => this.loginFailed())
    },
    loginSuccessful (req) {
      if (!req.data.token) {
        this.loginFailed()
        return
      }
      this.error = false
      localStorage.patientToken = req.data.token
      mapGetters.currentPatient = req.data.token
      this.$store.dispatch('login')
      this.$router.replace(this.$route.query.redirect || '/patient/dashboard')
    },
    loginFailed () {
      this.error = 'Login failed!'
      this.$store.dispatch('logout')
      delete localStorage.patientToken
    }
  }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css?family=PT+Sans');

body{
  background: #fff;
  font-family: 'PT Sans', sans-serif;
}
h2{
  padding-top: 1.5rem;
}
a{
  color: #333;
}
a:hover{
  color: #da5767;
  text-decoration: none;
}
.card{
  border: 0.40rem solid #f8f9fa;
  top: 10%;
}
.form-control{
  background-color: #f8f9fa;
  padding: 20px;
  padding: 25px 15px;
  margin-bottom: 1.3rem;
}

.form-control:focus {

    color: #000000;
    background-color: #ffffff;
    border: 3px solid #da5767;
    outline: 0;
    box-shadow: none;

}
</style>