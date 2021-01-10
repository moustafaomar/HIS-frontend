<template>
<div class="container">
  <div class="row justify-content-center">
  <div class="col-md-5">
   <div class="card">
     <h2 class="card-title text-center">Login</h2>
      <div class="card-body py-md-4">
      <form class="form-signin" @submit.prevent="login">
        <h2 class="form-signin-heading">Please sign in</h2>
        <div class="alert alert-danger" v-if="error">{{ error }}</div>
        <label for="SSN" class="sr-only">SSN</label>
        <input v-model="ssn" type="text" id="SSN" class="form-control" placeholder="SSN" required autofocus>
        <label for="inputPassword" class="sr-only">Password</label>
        <input v-model="password" type="password" id="inputPassword" class="form-control" placeholder="Password" required>
        <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      </form>
</div>
  </div>
</div>
</div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from '../../axios'

export default {
  name: 'DoctorLogin',
  data () {
    return {
      ssn: '',
      password: '',
      error: false
    }
  },
  computed: {
    ...mapGetters({ currentUser: 'currentUser' })
  },
  methods: {
    login () {
      axios.post('http://localhost:5000/doctor/login', { 'SSN': this.ssn, 'password': this.password })
        .then(request => this.loginSuccessful(request))
        .catch(() => this.loginFailed())
    },
    loginSuccessful (req) {
      if (!req.data.token) {
        this.loginFailed()
        return
      }
      this.error = false
      localStorage.token = req.data.token
      this.$store.dispatch('login')
      this.$router.push('/doctor/dashboard')
    },
    loginFailed () {
      this.error = 'Login failed!'
      this.$store.dispatch('logout')
      delete localStorage.token
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