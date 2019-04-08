<template>
  <div class="container">

    <div
      class="topright"
    >
      <nuxt-link
        v-if="$store.getters['user/isLoggedIn']"
        to="/keycaps/new"
        class="button bit"
      >
        + NEW KEYCAPS
      </nuxt-link>
      <nuxt-link
        v-else
        to="/login"
        class="button bit"
      >
        + NEW KEYCAPS
      </nuxt-link>
    </div>

    <h1 class="title bit">Keycaps</h1>

    <ListKeycap/>

  </div>
</template>

<script>
import ListKeycap from '@/components/list/Keycap'

export default {
  components: {
    ListKeycap,
  },
}
</script>

<style lang="scss" scoped>
h1 {
  margin-bottom: .8em;
}
</style>
