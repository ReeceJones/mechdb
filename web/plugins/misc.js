import Vue from 'vue'

// temporary WIP component
import wip from '../components/wip.vue'
Vue.component('wip', wip)

// global read-only upload url variable
Vue.mixin({
  data: function() {
    return {
      get uploadUrl() {
        return process.env.uploadUrl
      }
    }
  }
})
