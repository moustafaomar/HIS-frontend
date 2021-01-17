import Vue from 'vue'
import Router from 'vue-router'
import DoctorDashboard from '../components/Doctor/DoctorDashboard'
import DoctorLogin from '../components/Doctor/DoctorLogin'
import PatientLogin from '../components/Patient/PatientLogin'
import PatientDashboard from '../components/Patient/PatientDashboard'
import PatientSignup from '../components/Patient/PatientSignup'
import PatientUpload from '../components/Patient/PatientUpload'
import DoctorLogout from '../components/Doctor/DoctorLogout'
import DoctorCalendar from '../components/Doctor/DoctorCalendar'
import ViewCalendar from '../components/Doctor/ViewCalendar'
import DoctorFiles from '../components/Doctor/DoctorFiles'
import PatientLogout from '../components/Patient/PatientLogout'
import AdminLogin from '../components/Admin/AdminLogin'
import AdminLogout from '../components/Admin/AdminLogout'
import AdminDashboard from '../components/Admin/AdminDashboard'
import CreateDoctor from '../components/Admin/CreateDoctor'
import ViewLinked from '../components/Admin/ViewLinked'
import AdminPatients from '../components/Admin/AdminPatients'
import AdminDoctors from '../components/Admin/AdminDoctors'
import Rooms from '../components/Admin/Rooms'
import EditPatient from '../components/Admin/EditPatient'
import EditDoctor from '../components/Admin/EditDoctor'
import AddtoRoom from '../components/Admin/AddtoRoom'
import AddPatienttoRoom from '../components/Admin/AddPatienttoRoom'
import Relate from '../components/Admin/Relate'
import CreateAdmin from '../components/Admin/CreateAdmin'
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
      path: '/doctor/:did/:pid',
      component: DoctorFiles,
      meta: { doctor: true, patient: false, admin: false }
    },
    {
      path: '/doctor/calendar',
      component: DoctorCalendar,
      meta: { doctor: true, patient: false, admin: false }
    },
    {
      path: '/doctor/viewCalendar',
      component: ViewCalendar,
      meta: { doctor: true, patient: false, admin: false }
    },
    {
      path: '/patient/dashboard',
      component: PatientDashboard,
      meta: { patient: true, doctor: false, admin: false }
    },
    {
      path: '/patient/:pid/:did',
      component: PatientUpload,
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
      path: '/admin/rooms',
      component: Rooms,
      meta: { doctor: false, patient: false, admin: true }
    },
    {
      path: '/admin/doctor/create',
      component: CreateDoctor,
      meta: { doctor: false, patient: false, admin: true }
    },
    {
      path: '/admin/createAdmin',
      component: CreateAdmin,
      meta: { doctor: false, patient: false, admin: true }
    },
    {
      path: '/admin/patients',
      component: AdminPatients,
      meta: { doctor: false, patient: false, admin: true }
    },
    {
      path: '/admin/doctors',
      component: AdminDoctors,
      meta: { doctor: false, patient: false, admin: true }
    },
    {
      path: '/admin/patients/edit/:ssn',
      component: EditPatient,
      meta: { doctor: false, patient: false, admin: true }
    },
    {
      path: '/admin/doctors/edit/:ssn',
      component: EditDoctor,
      meta: { doctor: false, patient: false, admin: true }
    },
    {
      path: '/admin/doctors/DtR/:ssn',
      component: AddtoRoom,
      meta: { doctor: false, patient: false, admin: true }
    },
    {
      path: '/admin/patients/PtR/:ssn',
      component: AddPatienttoRoom,
      meta: { doctor: false, patient: false, admin: true }
    },
    {
      path: '/admin/viewLinked',
      component: ViewLinked,
      meta: { doctor: false, patient: false, admin: true }
    },
    {
      path: '/admin/relate',
      component: Relate,
      meta: { doctor: false, patient: false, admin: true }
    },
    {
      path: '/admin/logout',
      component: AdminLogout
    }
  ]
})
router.beforeEach(async(to, from, next) => {
  if (to.meta) {
    if (to.meta.doctor) {
      if (!localStorage.token) {
        next({ path: '/doctor/login' })
      } else {
        await axios.get('http://localhost:5000/doctor/dashboard', {headers: {'x-access-token': localStorage.token}}).then((res) => {
          next()
        }).catch(() => {
          next({ path: '/doctor/login' })
        })
      }
    } else if (to.meta.patient) {
      if (!localStorage.patientToken) {
        next({ path: '/patient/login' })
      } else {
        await axios.get('http://localhost:5000/patient/dashboard', {headers: {'x-access-token': localStorage.patientToken}}).then((res) => {
          next()
        }).catch(() => {
          next({ path: '/patient/login' })
        })
      }
    } else if (to.meta.admin) {
      if (!localStorage.adminToken) {
        next({ path: '/admin/login' })
      } else {
        await axios.get('http://localhost:5000/admin/dashboard', {headers: {'x-access-token': localStorage.adminToken}}).then((res) => {
          next()
        }).catch(() => {
          next({ path: '/admin/login' })
        })
      }
    } else if (to.meta.drlogin) {
      if (localStorage.token) {
        await axios.get('http://localhost:5000/doctor/dashboard', {headers: {'x-access-token': localStorage.token}}).then((res) => {
          next({ path: '/doctor/dashboard' })
        }).catch(() => {
          next()
        })
      } else next()
    } else if (to.meta.patientlogin) {
      if (localStorage.patientToken) {
        await axios.get('http://localhost:5000/patient/dashboard', {headers: {'x-access-token': localStorage.patientToken}}).then((res) => {
          next({ path: '/patient/dashboard' })
        }).catch(() => {
          next()
        })
      } else next()
    } else if (to.meta.adminlogin) {
      if (localStorage.adminToken) {
        await axios.get('http://localhost:5000/admin/dashboard', {headers: {'x-access-token': localStorage.adminToken}}).then((res) => {
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
