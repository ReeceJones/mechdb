<template>
  <section class="container">

    <form @submit.prevent="submitForm">

      <h1 class="is-size-5 bit">RECOVER PASSWORD</h1>

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

      <button
        :class="{ 'is-loading': isLoading }"
        type="submit"
        class="button bit is-large is-primary"
      >
        SEND EMAIL
      </button>
      <nuxt-link
        to="/login"
        class="button is-text is-size-7"
      >
        Back to login
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
    }
  },
  methods: {
    async submitForm () {
      if (this.isLoading) return

      const isValid = await this.$validator.validateAll()
      if (!isValid) return

      this.isLoading = true
      try {
        await this.$api.post('users/password', {
          email: this.email,
        })
        this.$toast.open({
          message: 'Email has been sent!',
          type: 'is-success',
          position: 'is-bottom',
        })
        this.$router.push('/login')
      } catch (e) {
        this.apiError(e, {
          'Unknown email': 'email',
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
</style>
