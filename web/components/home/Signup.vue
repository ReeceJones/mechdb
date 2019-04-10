<template>
  <form @submit.prevent="submitForm">

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

    <b-field
      :type="{'is-danger': errors.has('password')}"
      :message="errors.first('password')"
    >
      <b-input
        v-validate="'required'"
        v-model="password"
        name="password"
        icon="key"
        placeholder="Choose a password"
        type="password"
      />
    </b-field>

    <button
      :class="{ 'is-loading': isLoading }"
      type="submit"
      class="button bit is-large is-primary"
    >
      CREATE ACCOUNT
    </button>
    <nuxt-link
      to="/login"
      class="button is-text is-size-7"
    >
      Login
    </nuxt-link>
  </form>
</template>

<script>
export default {
  data () {
    return {
      isLoading: false,
      email: '',
      username: '',
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
        await this.$api.post('users', {
          email: this.email,
          username: this.username,
          password: this.password,
        })
        await this.$store.dispatch('user/login', {
          email: this.email,
          password: this.password,
        })
        this.$router.push(this.$store.getters['user/redirectTo'])
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
</style>
