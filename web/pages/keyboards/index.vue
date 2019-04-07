<template>
  <div class="container">

    <div
      class="topright"
    >
      <nuxt-link
        v-if="$store.getters['user/isLoggedIn']"
        to="/keyboards/new"
        class="button bit"
      >
        + NEW KEYBOARD
      </nuxt-link>
      <nuxt-link
        v-else
        to="/login"
        class="button bit"
      >
        + NEW KEYBOARD
      </nuxt-link>
    </div>

    <h1 class="title bit">Keyboards</h1>

    <ListKeyboard/>

  </div>
</template>

<script>
import ListKeyboard from '@/components/list/Keyboard'

export default {
  components: {
    ListKeyboard,
  },
}
</script>

<style lang="scss" scoped>
h1 {
  margin-bottom: .8em;
}
</style>
