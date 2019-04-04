import Vue from 'vue'
import moment from 'moment'

// moderation components
import UserNotVerified from '../components/global/UserNotVerified.vue'
Vue.component('UserNotVerified', UserNotVerified)

// empty table content
import EmptyTable from '../components/global/EmptyTable.vue'
Vue.component('EmptyTable', EmptyTable)

// temporary WIP component
import wip from '../components/global/Wip.vue'
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

// moment filter
Vue.filter('date', function (value) {
  const m = moment(value)
  const now = moment()
  if (!m.isValid()) return '-'

  let format = 'MM/DD H:mm'
  if (m.format('YYYY') !== now.format('YYYY')) {
    format = 'YY/' + format
  }

  return m.format(format)
})
