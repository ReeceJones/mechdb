<template>
  <section class="container">
    <div>

      <h1 class="is-size-4 bit">
        Thank you!
      </h1>

      <p>
        <strong>Your changes are now pending validation.</strong> Meanwhile, you can submit more changes, and view your history on your profile.
      </p>

      <a
        class="button is-large bit is-primary"
        @click.prevent="$router.go(-2)"
      >
        GO BACK
      </a>

      <nuxt-link
        :to="'/edits/' + $route.query.id"
        class="button is-large bit is-light"
      >
        VIEW DETAILS
      </nuxt-link>

      <br>
      <nuxt-link
        :to="'/u/' + $store.state.user.data.username"
        class="button is-text is-small"
      >
        <b-icon
          icon="account"
          size="is-small"
        />
        My Profile
      </nuxt-link>

    </div>
  </section>
</template>

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
