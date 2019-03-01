<template>
  <section class="container">

    <form @submit.prevent="submitForm">
      Email : <input v-model="email">
      <br>
      <button type="submit">REGISTER</button>
      <br>
      <br>
      <router-link to="/login">Back to login</router-link>
    </form>

  </section>
</template>

<script>
export default {
  data () {
    return {
      email: 'kartsims@gmail.com',
    }
  },
  methods: {
    async submitForm () {
      try {
        await this.$api.post('users', {
          email: this.email,
        })
      } catch (e) {
        if (e.response.data.error) {
          alert(e.response.data.error)
        } else {
          alert('Error on registration, see console')
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
