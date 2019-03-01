<template>
  <section class="container">

    <form @submit.prevent="submitForm">
      Email : <input v-model="email">
      <br>
      Password : <input v-model="password">
      <br>
      <button type="submit">LOGIN</button>
      <router-link to="/auth/password">Forgot password ?</router-link>
      <br>
      <br>
      <router-link to="/register">Register</router-link>
    </form>

  </section>
</template>

<script>
export default {
  data () {
    return {
      email: 'kartsims@gmail.com',
      password: '123',
    }
  },
  methods: {
    async submitForm () {
      try {
        await this.$store.dispatch('user/login', {
          email: this.email,
          password: this.password,
        })
        this.$router.push('/profile')
      } catch (e) {
        if (e.response.data.error) {
          alert(e.response.data.error)
        } else {
          alert('Error on login, see console')
          console.log(e)
        }
      }
    }
  },
}
</script>

<style>

.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
