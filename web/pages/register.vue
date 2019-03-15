<template>
  <section class="container">

    <form @submit.prevent="submitForm">

      <h1 class="is-size-5 bit">SIGN UP</h1>

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
        :type="{'is-danger': errors.has('username')}"
        :message="errors.first('username')"
      >
        <b-input
          v-validate="'required'"
          v-model="username"
          name="username"
          icon="account"
          placeholder="Choose a username"
        />
      </b-field>

      <button
        :class="{ 'is-loading': isLoading }"
        type="submit"
        class="button bit is-large is-primary"
      >
        REGISTER
      </button>
      <nuxt-link
        to="/login"
        class="button is-text is-size-7"
      >
        Already registered?
      </nuxt-link>
    </form>

  </section>
</template>

<script>
export default {
  data () {
    return {
      isLoading: false,
      email: '',
      username: '',
    }
  },
  methods: {
    async submitForm () {
      if (this.isLoading) return

      const isValid = await this.$validator.validateAll()
      if (!isValid) return

      this.isLoading = true
      try {
        await this.$api.post('users', {
          email: this.email,
          username: this.username,
        })
      } catch (e) {
        this.apiError(e, {
          'Username already in use': 'username',
          'Email is already registered': 'email',
        })
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
