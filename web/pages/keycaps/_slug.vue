<template>
  <div v-if="item">

    <div
      v-if="$store.getters['user/isLoggedIn']"
      class="topright"
    >
      <nuxt-link
        :to="'/keycaps/edit?slug=' + item.slug"
        class="button bit"
      >
        <b-icon
          icon="pencil"
          size="is-small"
        />
        EDIT
      </nuxt-link>
      <button
        v-if="!$store.getters['user/isNotVerified']"
        class="button bit"
        @click.prevent="deleteItem"
      >
        <b-icon
          icon="delete"
          size="is-small"
        />
        DELETE
      </button>
    </div>
    <div
      v-else
      class="topright"
    >
      <nuxt-link
        to="/login"
        class="button bit"
      >
        <b-icon
          icon="pencil"
          size="is-small"
        />
        EDIT
      </nuxt-link>
    </div>

    <KeycapDetails :item="item"/>

  </div>
</template>

<script>
import KeycapDetails from '@/components/details/Keycap'

export default {
  components: {
    KeycapDetails,
  },
  data () {
    return {
      item: null,
    }
  },
  watch: {
    '$route.params.slug' () {
      this.getData()
    },
  },
  created () {
    this.getData()
  },
  methods: {
    async getData () {
      try {
        const { data } = await this.$api.get('/keycaps/' + this.$route.params.slug)
        this.item = data
      } catch (e) {
        this.apiError(e)
      }
    },
    async deleteItem () {
      if (!confirm('Delete ?')) return
      try {
        const { data } = await this.$api.delete('/edits/Keycap/' + this.item._id)
        if (data.deleted === 1) {
          this.$toast.open('Keycaps deleted')
        }
        this.$router.push('/keycaps')
      } catch (e) {
        this.apiError(e)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
