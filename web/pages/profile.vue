<template>
  <div>
    Logged in as <strong>{{ userData.name }}</strong> (<em>{{ userData.email }}</em>)
    &nbsp;
    <button
      class="button bit is-danger is-pulled-right"
      @click="logout"
    >
      SIGN OUT
    </button>

    <div class="notification is-warning">
      <b-icon
        icon="alert"
        size="is-large"
      />
      <span class="is-size-2">
        WORK IN PROGRESS !
      </span>
    </div>
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
