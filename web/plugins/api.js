import Vue from 'vue'
import axios from 'axios'

const baseURL = process.server ? process.env.API_URL : '/api'

const api = axios.create({
  baseURL: baseURL + '/',
})

Vue.api = api
Vue.prototype.$api = api

Vue.mixin({
  methods: {
    apiError (err, fieldError = {}) {
      let message
      if (typeof err === 'string') {
        // simple string as parameter
        message = err
      } else if (err.response && err.response.data.error) {
        // API standard error
        message = err.response.data.error
        // catch form-specific error
        if (fieldError[message]) {
          this.errors.add({
            field: fieldError[message],
            msg: message,
          })
          return
        }
      } else {
        // default handler
        message = '💥 There has been an error with the server'
        console.error(err)
      }
      this.$toast.open({
        message,
        type: 'is-danger',
        position: 'is-bottom',
      })
    },
  },
})
