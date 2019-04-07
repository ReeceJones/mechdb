<template>
  <section class="container">
    <div>

      <h1 class="is-size-4 bit">
        You were signed out.
      </h1>

      <p>
        See you soon!
      </p>

      <nuxt-link
        to="/login"
        class="button is-large bit is-primary"
      >
        LOGIN
      </nuxt-link>

      <a
        class="button is-large bit is-light"
        @click.prevent="$router.go(-1)"
      >
        GO BACK
      </a>

    </div>
  </section>
</template>

<script>
export default {
  created () {
    if (this.$store.getters['user/isLoggedIn']) {
      this.$router.push('/')
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
  & > div {
    max-width: 400px;
    text-align: center;
  }
}
h1 {
  margin: 1em 0 .5em;
}
.button {
  margin: 2em .5em 2em;
}
</style>
