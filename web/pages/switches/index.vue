<template>
  <div class="container">

    <div
      class="topright"
    >
      <nuxt-link
        v-if="$store.getters['user/isLoggedIn']"
        to="/switches/new"
        class="button bit"
      >
        + NEW SWITCH
      </nuxt-link>
      <nuxt-link
        v-else
        to="/login"
        class="button bit"
      >
        + NEW SWITCH
      </nuxt-link>
    </div>

    <h1 class="title bit">Switches</h1>

    <ListSwitch/>

  </div>
</template>

<script>
import ListSwitch from '@/components/list/Switch'

export default {
  components: {
    ListSwitch,
  },
}
</script>

<style lang="scss" scoped>
h1 {
  margin-bottom: .8em;
}
</style>
