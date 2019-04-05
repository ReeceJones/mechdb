<template>
  <div>
    <nav
      class="navbar is-dark"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <nuxt-link
          to="/"
          class="navbar-item"
        >
          MechDB.net
        </nuxt-link>

        <a
          :class="{ 'is-active': menuActive }"
          role="button"
          class="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          @click="menuActive = !menuActive"
        >
          <span aria-hidden="true"/>
          <span aria-hidden="true"/>
          <span aria-hidden="true"/>
        </a>
      </div>

      <div
        :class="{ 'is-active': menuActive }"
        class="navbar-menu"
      >
        <div class="navbar-start">
          <nuxt-link
            to="/keyboards"
            class="navbar-item bit"
          >
            Keyboards
          </nuxt-link>
          <nuxt-link
            to="/keycaps"
            class="navbar-item bit"
          >
            Keycaps
          </nuxt-link>
          <nuxt-link
            to="/switches"
            class="navbar-item bit"
          >
            Switches
          </nuxt-link>

          <div
            v-if="$store.getters['user/isAdmin']"
            class="navbar-item has-dropdown is-hoverable"
          >
            <a class="navbar-link bit">
              Admin
            </a>
            <div class="navbar-dropdown">
              <nuxt-link
                to="/admin/edits"
                class="navbar-item bit"
              >
                Edits
              </nuxt-link>
            </div>
          </div>
        </div>

        <div
          v-if="!$store.state.user.data.email"
          class="navbar-end"
        >
          <div class="navbar-item">
            <div class="buttons">
              <nuxt-link
                to="/register"
                class="button bit is-primary"
              >
                <strong>SIGN UP</strong>
              </nuxt-link>
              <nuxt-link
                to="/login"
                class="button bit is-light"
              >
                LOGIN
              </nuxt-link>
            </div>
          </div>
        </div>

        <div
          v-else
          class="navbar-end"
        >
          <div class="navbar-item">
            <div class="buttons">
              <nuxt-link
                v-if="$store.state.user.editsPending > 0"
                to="/admin/edits?status=new"
                class="button bit is-rounded is-danger"
              >
                {{ $store.state.user.editsPending }}
              </nuxt-link>
              <nuxt-link
                :to="'/u/' + $store.state.user.data.username"
                class="button bit is-light"
              >
                <b-icon
                  icon="account"
                  size="is-small"
                />
                <strong>MY PROFILE</strong>
              </nuxt-link>
              <button
                class="button bit is-dark is-pulled-right"
                @click="logout"
              >
                SIGN OUT
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <div class="section">
      <nuxt/>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      menuActive: false,
    }
  },
  created () {
    this.$store.commit('user/AUTH_TOKEN')
    this.$router.beforeEach((to, from, next) => {
      if (this.menuActive) {
        this.menuActive = false
      }
      next()
    })
  },
  methods: {
    async logout () {
      if (!confirm('Terminate your session?')) return
      await this.$store.dispatch('user/logout')
      this.$toast.open('You have been successfully signed out')
    },
  },
}
</script>

<style lang="scss" scoped>
.navbar-brand {
  font-family: 'Karmatic Arcade';
  font-size: 1.3em;
  margin-right: .6em;
  position: relative;
  top: -0.1em;
}
.navbar-start a {
  font-size: .9em;
  & .icon {
    font-size: 1.4em;
  }
}
div.section {
  padding-top: 1em;
}
</style>
