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
import axios from 'axios'
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
      component: DoctorLogin,
      meta: { doctor: false, patient: false, drlogin: true, patientlogin: false }
    },
    {
      path: '/doctor/logout',
      component: DoctorLogout
    },
    {
      path: '/patient/signup',
      component: PatientSignup
    },
    {
      path: '/patient/login',
      component: PatientLogin,
      meta: { doctor: false, patient: false, drlogin: false, patientlogin: true }
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
    } else if (to.meta.drlogin) {
      if (localStorage.token) {
        axios.get('http://localhost:5000/doctor/dashboard', {headers: {'x-access-token': localStorage.token}}).then((res) => {
          next({ path: '/doctor/dashboard' })
        }).catch(() => {
          next()
        })
      } else next()
    } else if (to.meta.patientlogin) {
      if (localStorage.patientToken) {
        axios.get('http://localhost:5000/patient/dashboard', {headers: {'x-access-token': localStorage.patientToken}}).then((res) => {
          next({ path: '/patient/dashboard' })
        }).catch(() => {
          next()
        })
      } else next()
    }
  }
  next()
})
export default router
