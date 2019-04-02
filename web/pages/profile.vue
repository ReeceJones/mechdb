<template>
  <div>
    Logged in as <strong>{{ userData.username }}</strong>
    <span
      v-if="userData.isAdmin"
      class="tag is-small is-light"
    >
      ADMIN
    </span>
    <span
      v-else-if="userData.isVerified"
      class="tag is-small is-light"
    >
      VERIFIED
    </span>
    &nbsp;
    <button
      class="button bit is-danger is-pulled-right"
      @click="logout"
    >
      SIGN OUT
    </button>

    <wip/>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      userData: state => state.user.data,
    }),
  },
  methods: {
    async logout () {
      await this.$store.dispatch('user/logout')
      this.$router.push('/')
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
