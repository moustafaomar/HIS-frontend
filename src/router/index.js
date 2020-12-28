import Vue from 'vue'
import Router from 'vue-router'
import DoctorDashboard from '../components/Doctor/DoctorDashboard'
import DoctorLogin from '../components/Doctor/DoctorLogin'
import PatientLogin from '../components/Patient/PatientLogin'
import PatientDashboard from '../components/Patient/PatientDashboard'
import PatientSignup from '../components/Patient/PatientSignup'
import Logout from '@/components/Logout'
import Index from '@/components/Index'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Index
    },
    {
      path: '/doctor/login',
      component: DoctorLogin
    },
    {
      path: '/patient/signup',
      component: PatientSignup
    },
    {
      path: '/patient/login',
      component: PatientLogin
    },
    {
      path: '/doctor/dashboard',
      component: DoctorDashboard
    },
    {
      path: '/patient/dashboard',
      component: PatientDashboard
    },
    {
      path: '/logout',
      component: Logout
    }
  ]
})
