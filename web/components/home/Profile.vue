<template>
  <div
    v-if="$store.getters['user/isLoggedIn']"
    class="card"
  >
    <div class="card-content">
      <p>
        Logged in as <strong>{{ user.username }}</strong>
      </p>
      <div class="tags has-addons reputation">
        <span class="tag is-light">
          REP
        </span>
        <span class="tag is-warning">
          <strong>{{ user.reputation }}</strong>
        </span>
      </div>
      <br>
      <nuxt-link
        :to="'/u/' + user.username"
        class="button bit is-primary is-large"
      >
        VIEW PROFILE
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      user: state => state.user.data,
    }),
  },
}
</script>

<style lang="scss" scoped>
.card {
  text-align: center;
}
.reputation {
  margin: 1em 0 2em;
  display: inline-flex;
}
</style>
