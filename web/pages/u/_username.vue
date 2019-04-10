<template>
  <div
    v-if="user"
    class="container"
  >

    <div
      v-if="$store.getters['user/isAdmin']"
      class="topright"
    >
      <template v-if="$store.getters['user/isSuperAdmin']">
        <button
          v-if="user.isAdmin"
          class="button is-success is-outlined"
          @click="isAdminUpdate(false)"
        >
          <b-icon
            icon="check"
            size="is-small"
          />
          Admin
        </button>
        <button
          v-else
          class="button is-light"
          @click="isAdminUpdate(true)"
        >
          <b-icon
            icon="close"
            size="is-small"
          />
          Admin
        </button>
      </template>
      <button
        v-if="user.isVerified"
        class="button is-success is-outlined"
        @click="isVerifiedUpdate(false)"
      >
        <b-icon
          icon="check"
          size="is-small"
        />
        Verified
      </button>
      <button
        v-else
        class="button is-light"
        @click="isVerifiedUpdate(true)"
      >
        <b-icon
          icon="close"
          size="is-small"
        />
        Verified
      </button>
    </div>

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
        VERIFIED USER
      </span>
      <div 
        class="tags has-addons"
        style="display: inline-flex">
        <span class="tag is-primary">
          REPUTATION
        </span>
        <span class="tag is-light">
          <strong> {{ user.reputation }} </strong>
        </span>
      </div>
    </h1>

    <template v-if="canSeeHistory">
      <h2 class="bit">History</h2>
      <UserEdits :username="user.username"/>
    </template>

  </div>
</template>

<script>
import UserEdits from '@/components/user/Edits'

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
    async isVerifiedUpdate (isVerified) {
      try {
        const { data } = await this.$api.post('/users/' + this.$route.params.username + '/verify', { isVerified })
        this.user.isVerified = data.isVerified
      } catch (e) {
        this.apiError(e)
      }
    },
    async isAdminUpdate (isAdmin) {
      try {
        const { data } = await this.$api.post('/users/' + this.$route.params.username + '/admin', { isAdmin })
        this.user.isAdmin = data.isAdmin
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
span.tag {
  font-family: 'PT Sans Caption';
  letter-spacing: normal;
  position: relative;
  top: -.4em;
  font-size: .4em;
}
</style>
