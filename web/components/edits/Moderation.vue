<template>
  <div class="topright">
    <template v-if="$store.getters['user/isAdmin'] && item && item.status === 'new'">
      <button
        class="button bit is-success"
        @click.prevent="approve"
      >
        <b-icon icon="check"/>
        APPROVE
      </button>
      <button
        class="button bit is-danger"
        @click.prevent="reject"
      >
        <b-icon icon="close"/>
        REJECT
      </button>
    </template>
    <button
      class="button bit is-light"
      @click.prevent="$router.go(-1)"
    >
      BACK
    </button>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => null,
    },
  },
  methods: {
    async approve () {
      if (!confirm('Approve these changes ? This operation is irreversible')) return
      try {
        const { data } = await this.$api.post('/edits/' + this.item._id + '/approve')
        this.$emit('update')
      } catch (e) {
        this.apiError(e)
      }
    },
    async reject () {
      if (!confirm('Reject these changes ? This operation is irreversible')) return
      try {
        const { data } = await this.$api.post('/edits/' + this.item._id + '/reject')
        this.$emit('update')
      } catch (e) {
        this.apiError(e)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
