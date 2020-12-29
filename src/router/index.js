import Vue from 'vue'
import Router from 'vue-router'
import DoctorDashboard from '../components/Doctor/DoctorDashboard'
import DoctorLogin from '../components/Doctor/DoctorLogin'
import PatientLogin from '../components/Patient/PatientLogin'
import PatientDashboard from '../components/Patient/PatientDashboard'
import PatientSignup from '../components/Patient/PatientSignup'
import DoctorLogout from '../components/Doctor/DoctorLogout'
import PatientLogout from '../components/Patient/PatientLogout'
import Logout from '@/components/Logout'
import Index from '@/components/Index'
import 'axios'
Vue.use(Router)

const router = new Router({
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
      path: '/doctor/logouot',
      component: DoctorLogout
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
      path: '/patient/logout',
      component: PatientLogout
    },
    {
      path: '/doctor/dashboard',
      component: DoctorDashboard,
      meta: { doctor: true, patient: false }
    },
    {
      path: '/patient/dashboard',
      component: PatientDashboard,
      meta: { patient: true, doctor: false }
    },
    {
      path: '/logout',
      component: Logout
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.meta) {
    if (to.meta.doctor) {
      if (!localStorage.token) {
        next({ path: '/doctor/login' })
      } else next()
    } else if (to.meta.patient) {
      if (!localStorage.patientToken) {
        next({ path: '/patient/login' })
      } else next()
    }
  }
  next()
})
export default router
