import Vue from 'vue'
import VeeValidate from 'vee-validate'

Vue.use(VeeValidate, {
  events: '',
  inject: true,
})

Vue.mixin({
  methods: {
    apiError (err, fieldError = {}) {
      let message
      if (typeof err === 'string') {
        // simple string as parameter
        message = err
      } else if (err.response.data.error) {
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
