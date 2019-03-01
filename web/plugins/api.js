import Vue from 'vue'
import axios from 'axios'

const baseURL = process.server ? process.env.API_URL : '/api'
console.log('baseURL', baseURL)

const api = axios.create({
  baseURL: baseURL + '/',
})

Vue.api = api
Vue.prototype.$api = api

// global rend-only upload url variable
Vue.mixin({
  data: function() {
    return {
      get uploadUrl() {
        return process.env.uploadUrl
      }
    }
  }
})
