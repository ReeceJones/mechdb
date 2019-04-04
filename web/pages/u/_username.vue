<template>
  <div
    v-if="user"
    class="container"
  >

    <h1 class="is-size-4 bit">
      {{ user.username }}
      <span
        v-if="user.isAdmin"
        class="tag is-light"
      >
        ADMIN
      </span>
      <span
        v-else-if="user.isVerified"
        class="tag is-light"
      >
        VERIFIED
      </span>
    </h1>

    <template v-if="canSeeHistory">
      <h2 class="bit">History</h2>
      <UserEdits :username="user.username"/>
    </template>

  </div>
</template>

<script>
import UserEdits from '@/components/User/Edits'

export default {
  components: {
    UserEdits,
  },
  data () {
    return {
      user: null,
    }
  },
  computed: {
    canSeeHistory () {
      return this.$store.getters['user/isLoggedIn'] && (this.$store.getters['user/isAdmin'] || this.$store.state.user.data.username === this.user.username)
    },
  },
  watch: {
    username () {
      this.getData()
    },
  },
  created () {
    this.getData()
  },
  methods: {
    async getData () {
      try {
        const { data } = await this.$api.get('/users/' + this.$route.params.username)
        this.user = data
      } catch (e) {
        this.apiError(e)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
h1 {
  margin-bottom: 1em;
}
h2 {
  margin-bottom: .5em;
}
</style>
