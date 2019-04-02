import Vue from 'vue'
import axios from 'axios'

import wip from '../components/wip.vue'
Vue.component(wip)

const baseURL = process.server ? process.env.API_URL : '/api'

const api = axios.create({
  baseURL: baseURL + '/',
})

Vue.api = api
Vue.prototype.$api = api
