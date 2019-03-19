import Vue from 'vue'
import Cookie from 'js-cookie'

export const state = () => ({
  token: null,
  data: {},
})

export const getters = {
  isLoggedIn (state) {
    return !!state.data.email
  },
  isAdmin (state, getters) {
    return getters.isLoggedIn && state.data.isAdmin
  },
  isVerified (state, getters) {
    return getters.isLoggedIn && state.data.isVerified
  },
}

export const mutations = {

  AUTH_TOKEN: function (state, payload) {
    let token = Cookie.get('token')
    if (payload) {
      Cookie.set('token', payload, { expires: 7 })
      token = payload
    }
    Vue.api.defaults.headers.common['Authorization'] = 'Bearer ' + token
    state.token = token
  },
  AUTH_LOGOUT: function (state) {
    Cookie.remove('token')
    delete Vue.api.defaults.headers.common['Authorization']
    state.token = null
    state.data = {}
  },
  AUTH_USER: function (state, payload) {
    state.data = payload
  },

}

export const actions = {

  async getUser({ commit }) {
    try {
      const { data } = await Vue.api.get('users')
      commit('AUTH_USER', data)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Bad credentials')
      }
      throw error
    }
  },

  async login({ commit, dispatch }, { email, password }) {
    try {
      const { data } = await Vue.api.post('users/signin', { email, password })
      commit('AUTH_TOKEN', data.token)
      await dispatch('getUser')
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Bad credentials')
      }
      throw error
    }
  },

  async logout({ commit }) {
    await Vue.api.post('users/signout')
    commit('AUTH_LOGOUT')
  },

  async tryToken({ commit, dispatch }, payload) {
    let token = payload || Cookie.get('token')
    if (!token) {
      return
    }
    commit('AUTH_TOKEN', token)
    try {
      await dispatch('getUser')
    } catch(e) {
      commit('AUTH_LOGOUT')
    }
  },

}
