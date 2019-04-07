<template>
  <section class="container">

    <form @submit.prevent="submitForm">

      <h1 class="is-size-5 bit">LOGIN</h1>

      <b-field
        :type="{'is-danger': errors.has('email')}"
        :message="errors.first('email')"
      >
        <b-input
          v-validate="'required|email'"
          v-model="email"
          name="email"
          type="email"
          icon="email"
          placeholder="Enter your email"
        />
      </b-field>

      <b-field
        :type="{'is-danger': errors.has('password')}"
        :message="errors.first('password')"
      >
        <b-input
          v-validate="'required'"
          v-model="password"
          name="password"
          type="password"
          icon="key"
          placeholder="********"
        />
      </b-field>

      <button
        :class="{ 'is-loading': isLoading }"
        type="submit"
        class="button bit is-large is-primary"
      >
        LOGIN
      </button>
      <nuxt-link
        to="/auth/password"
        class="button is-text is-size-7"
      >
        Forgot password ?
      </nuxt-link>
      <br>
      <br>
      <h2 class="is-size-5 bit">NO ACCOUNT?</h2>
      <nuxt-link
        to="/register"
        class="button bit is-large is-light"
      >
        REGISTER
      </nuxt-link>
    </form>

  </section>
</template>

<script>
export default {
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$store.commit('user/AUTH_REDIRECT', from.fullPath)
    })
  },
  data () {
    return {
      isLoading: false,
      email: '',
      password: '',
    }
  },
  methods: {
    async submitForm () {
      if (this.isLoading) return

      const isValid = await this.$validator.validateAll()
      if (!isValid) return

      this.isLoading = true
      try {
        await this.$store.dispatch('user/login', {
          email: this.email,
          password: this.password,
        })
        this.$router.push(this.$store.getters['user/redirectTo'])
      } catch (e) {
        this.apiError(e)
      }
      this.isLoading = false
    }
  },
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
form {
  width: 300px;
  text-align: left;
}
h1 {
  margin-bottom: 1em;
}
h2 {
  margin: 1.5em 0 1em;
}
</style>
