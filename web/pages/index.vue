<template>
  <div class="container">
    <!-- 1ST ROW -->
    <div class="columns">
      <div class="column is-two-thirds about">
        <h2 class="is-size-6 bit">Hello World!</h2>
        <p>
          <strong>MechDB</strong> is a centralized, community driven and moderated database of all mechanical keyboard related information.
          <br>
          <nuxt-link
            to="/about"
            class="button is-small is-light bit"
          >
            LEARN MORE
          </nuxt-link>
        </p>
        <p>
          <em><nuxt-link to="/register">Sign up</nuxt-link> to contribute or <a href="#">join our Discord server</a>.</em>
        </p>
      </div>
      <div 
        v-if="!this.$store.getters['user/isLoggedIn']"
        class="column"
      >
        <div class="card">
          <div class="card-content list-block">
            <HomeSignup/>
          </div>
        </div>
      </div>
    </div>

    <div class="menu">
      <span class="menu-title">
        BROWSE:
      </span>
      <nuxt-link to="/keyboards">
        KEYBOARDS
      </nuxt-link>
      <nuxt-link to="/keycaps">
        KEYCAPS
      </nuxt-link>
      <nuxt-link to="/switches">
        SWITCHES
      </nuxt-link>
    </div>

    <!-- 2ND ROW -->
    <div class="columns">
      <div class="column is-one-third">
        <HomeContributors/>
        <br>
        <span style="font-size: .6em">* this block is not functional yet, pending users' rep</span>
      </div>
      <div class="column">
        <h2 class="is-size-5 bit">Latest additions</h2>
        <div class="columns">
          <div class="column list-block">
            <h2 class="is-size-7 bit">Keyboards</h2>
            <nuxt-link
              v-for="item in keyboards"
              :key="'keyboard' + item._id"
              :to="'/keyboards/' + item.slug"
            >
              {{ item.name }}
            </nuxt-link>
          </div>
          <div class="column list-block">
            <h2 class="is-size-7 bit">Keycaps</h2>
            <nuxt-link
              v-for="item in keycaps"
              :key="'keycap' + item._id"
              :to="'/keycaps/' + item.slug"
            >
              {{ item.name }}
            </nuxt-link>
          </div>
          <div class="column list-block">
            <h2 class="is-size-7 bit">Switches</h2>
            <nuxt-link
              v-for="item in switches"
              :key="item._id"
              :to="'/switches/' + item.slug"
            >
              {{ item.name }}
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HomeContributors from '@/components/home/Contributors.vue'
import HomeSignup from '@/components/home/Signup.vue'

export default {
  components: {
    HomeContributors,
    HomeSignup,
  },
  data () {
    return {
      activeTab: null,
      keyboards: [],
      keycaps: [],
      switches: [],
    }
  },
  async created () {
    try {
      const { data } = await this.$api.get('/home')
      this.keyboards = data.keyboards
      this.keycaps = data.keycaps
      this.switches = data.switches
    } catch (e) {
      this.apiError(e)
    }
  },
}
</script>

<style lang="scss" scoped>
@import "~bulma/sass/utilities/initial-variables";

.container {
  @media only screen and (min-width: $desktop) {
    padding-top: 1em;
  }
}
.list-block {
  h2 {
    margin-bottom: .5em;
  }
  a {
    display: block;
    padding: .25em 0;
    border-bottom: dotted 1px $light;
    &:last-child {
      border-bottom: none;
    }
  }
}
.about {
  h2 {
    margin-bottom: 1em;
    @media only screen and (min-width: $tablet) {
      margin-top: 1.5em;
    }
  }
  .button {
    margin-top: .75em;
  }
  p {
    margin-bottom: 1em;
    text-align: justify;
    &:last-child {
      margin-bottom: 0;
    }
  }
}
h2.is-size-5 {
  margin-bottom: 1em;
}
.menu {
  border-top: 1px solid $light;
  border-bottom: 1px solid $light;
  padding: 2em 0;
  margin: 2em 0 3em;
  border-top: 1px solid $light;
  border-bottom: 1px solid $light;
  text-align: center;
  .menu-title, a {
    margin: 0 1.3em;
  }
  .menu-title {
    text-decoration: none;
    opacity: .3;
    margin-left: 0;
  }
  a {
    color: inherit;
    text-decoration: underline;
  }

  @media only screen and (max-width: $tablet) {
    padding: 1.5em 0 3em;
    margin: 0;
    border-top: none;
    border-bottom: none;
    .menu-title, a {
      margin: 0 .5em;
    }
  }
}
</style>
