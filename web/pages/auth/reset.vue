<template>
  <section class="container">

    <form @submit.prevent="submitForm">

      <h1 class="is-size-5 bit">SET NEW PASSWORD</h1>

      <b-field>
        <b-input
          :value="$route.query.email"
          type="email"
          icon="email"
          disabled
        />
      </b-field>

      <b-field
        :type="{'is-danger': errors.has('password')}"
        :message="errors.first('password')"
      >
        <b-input
          v-validate="'required'"
          ref="password"
          v-model="password"
          name="password"
          type="password"
          icon="key"
          placeholder="New password"
        />
      </b-field>

      <b-field
        :type="{'is-danger': errors.has('password2')}"
        :message="errors.first('password2')"
      >
        <b-input
          v-validate="'required|confirmed:password'"
          v-model="password2"
          name="password2"
          type="password"
          icon="content-duplicate"
          placeholder="Confirm password"
          data-vv-as="password"
        />
      </b-field>

      <button
        :class="{ 'is-loading': isLoading }"
        type="submit"
        class="button bit is-large is-primary"
      >
        SAVE
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
      password: '123',
      password2: '123',
    }
  },
  methods: {
    async submitForm () {
      if (this.isLoading) return

      const isValid = await this.$validator.validateAll()
      if (!isValid) return

      this.isLoading = true
      try {
        await this.$api.put('users/password', {
          email: this.$route.query.email,
          passwordToken: this.$route.query.token,
          password: this.password,
        })
        this.$toast.open({
          message: 'Password has been updated!',
          type: 'is-success',
          position: 'is-bottom',
        })
        await this.$store.dispatch('user/login', {
          email: this.$route.query.email,
          password: this.password,
        })
        this.$router.push('/profile')
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
</style>
