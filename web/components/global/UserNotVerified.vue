<template>
  <b-message
    v-if="!hideMessage"
    type="is-info"
  >
    All the changes you are about to make <strong>will be validated before being effective</strong>.
    <br>
    Only verified users can edit the website instantly.
    <br>
    <a
      class="button is-small is-info"
      @click.prevent="$toast.open('This page has not been published yet')"
    >
      Learn More
    </a>
    <a
      class="button is-small is-text"
      @click.prevent="neverShowAgain"
    >
      Never show this message again
    </a>
  </b-message>
</template>

<script>
import store from 'store'

export default {
  data () {
    return {
      hideMessage: !this.$store.getters['user/isNotVerified'] || !!store.get('hideUserNotVerifiedMessage'),
    }
  },
  methods: {
    neverShowAgain () {
      if (!confirm('Hide this message forever?')) return
      store.set('hideUserNotVerifiedMessage', true)
      this.hideMessage = true
    },
  },
}
</script>

<style lang="scss" scoped>
.button {
  margin-top: .5em;
}
</style>
