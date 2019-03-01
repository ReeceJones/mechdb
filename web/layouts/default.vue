<template>
  <div>
    <nav
      class="navbar"
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
            to="/search"
            class="navbar-item"
          >
            <b-icon
              icon="magnify"
              size="is-small"
            />
          </nuxt-link>
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

          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link bit">
              More
            </a>

            <div class="navbar-dropdown">
              <nuxt-link
                to="/gallery"
                class="navbar-item bit"
              >
                Gallery
              </nuxt-link>
              <hr class="navbar-divider">
              <nuxt-link
                to="/contribute"
                class="navbar-item bit"
              >
                Contribute
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
                to="/profile"
                class="button bit is-light"
              >
                <b-icon
                  icon="account"
                  size="is-small"
                />
                <strong>MY PROFILE</strong>
              </nuxt-link>
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
</style>
