const state = {
  user: localStorage.token,
  patient: localStorage.patientToken,
  admin: localStorage.adminToken
}

const getters = {
  currentUser (state) {
    return state.user
  },
  currentPatient (state) {
    return state.patient
  },
  currentAdmin (state) {
    return state.admin
  }
}

export default {
  state,
  getters
}
