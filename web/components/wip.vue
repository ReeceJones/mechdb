<template>
  <div class="notification is-warning">
    <b-icon
      icon="alert"
      size="is-large"
    />
    <span class="is-size-2">
      WORK IN PROGRESS !
    </span>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
@import "~bulma/sass/utilities/initial-variables";

.notification.is-warning {
  font-family: 'Karmatic Arcade';
  margin-top: 3em;
  padding-top: 2.2em;
  padding-bottom: 2em;
  text-align: center;
  span {
    opacity: .5;
  }
  span.is-size-2 {
    letter-spacing: .1em;
    position: relative;
    top: -.2em;
    left: .4em;
  }
  @media only screen and (max-width: $desktop) {
    span.is-size-2 {
      font-size: 1.7em !important;
    }
    .mdi-48px.mdi:before {
      font-size: 2.2em !important;
    }
  }
}
</style>
