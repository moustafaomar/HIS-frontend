/* global localStorage */

import * as MutationTypes from './mutation-types'

const state = {
  user: localStorage.token,
  patient: localStorage.patientToken
}

const mutations = {
  [MutationTypes.LOGIN] (state) {
    state.user = localStorage.token
  },
  [MutationTypes.LOGOUT] (state) {
    state.user = null
  }
}

const getters = {
  currentUser (state) {
    return state.user
  },
  currentPatient (state) {
    return state.patient
  }
}

const actions = {
  login ({ commit }) {
    commit(MutationTypes.LOGIN)
  },

  logout ({ commit }) {
    commit(MutationTypes.LOGOUT)
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
