<template>
  <div>

    <div class="topright">
      <button
        v-if="data.status !== 'approved'"
        class="button bit is-success"
        @click.prevent=""
      >
        <b-icon icon="check"/>
        APPROVE
      </button>
      <button
        v-if="data.status !== 'rejected'"
        class="button bit is-danger"
        @click.prevent=""
      >
        <b-icon icon="close"/>
        REJECT
      </button>
      <button
        class="button bit is-light"
        @click.prevent="$router.go(-1)"
      >
        CANCEL
      </button>
    </div>

    <h1 class="is-size-4 bit">Review changes</h1>

    <b-message
      v-if="data.status === 'approved'"
      type="is-success"
    >
      Changes have been approved <strong>{{ data.approvedAt }}</strong> by <strong>user #{{ data.approvedBy }}</strong>
    </b-message>

    <b-message
      v-if="data.status === 'rejected'"
      type="is-warning"
    >
      Changes have been rejected <strong>{{ data.rejectedAt }}</strong> by <strong>user #{{ data.rejectedBy }}</strong>
    </b-message>

    <pre>data => {{ data }}</pre>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      data: {},
    }
  },
  created () {
    this.getItems()
  },
  methods: {
    async getItems () {
      try {
        const { data } = await this.$api.get('/edits/' + this.$route.params.id)
        this.data = data
      } catch (e) {
        this.apiError(e)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
h1 {
  margin-bottom: .8em;
}
</style>
