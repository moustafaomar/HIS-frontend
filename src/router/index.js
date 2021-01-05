import Vue from 'vue'
import Router from 'vue-router'
import DoctorDashboard from '../components/Doctor/DoctorDashboard'
import DoctorLogin from '../components/Doctor/DoctorLogin'
import PatientLogin from '../components/Patient/PatientLogin'
import PatientDashboard from '../components/Patient/PatientDashboard'
import PatientSignup from '../components/Patient/PatientSignup'
import DoctorLogout from '../components/Doctor/DoctorLogout'
import PatientLogout from '../components/Patient/PatientLogout'
import AdminLogin from '../components/Admin/AdminLogin'
import AdminLogout from '../components/Admin/AdminLogout'
import AdminDashboard from '../components/Admin/AdminDashboard'
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
      meta: { doctor: false, patient: false, drlogin: true, patientlogin: false, admin: false, adminlogin: false }
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
      meta: { doctor: false, patient: false, drlogin: false, admin: false, adminlogin: false, patientlogin: true }
    },
    {
      path: '/patient/logout',
      component: PatientLogout
    },
    {
      path: '/doctor/dashboard',
      component: DoctorDashboard,
      meta: { doctor: true, patient: false, admin: false }
    },
    {
      path: '/patient/dashboard',
      component: PatientDashboard,
      meta: { patient: true, doctor: false, admin: false }
    },
    {
      path: '/admin/login',
      component: AdminLogin,
      meta: { doctor: false, patient: false, drlogin: false, admin: false, adminlogin: true, patientlogin: false }
    },
    {
      path: '/admin/dashboard',
      component: AdminDashboard,
      meta: { doctor: false, patient: false, admin: true }
    },
    {
      path: '/admin/logout',
      component: AdminLogout
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
    } else if (to.meta.admin) {
      if (!localStorage.adminToken) {
        next({ path: '/admin/login' })
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
    } else if (to.meta.adminlogin) {
      if (localStorage.adminToken) {
        axios.get('http://localhost:5000/admin/dashboard', {headers: {'x-access-token': localStorage.adminToken}}).then((res) => {
          next({ path: '/admin/dashboard' })
        }).catch(() => {
          next()
        })
      } else next()
    }
  }
  next()
})
export default router
