<template>
  <div v-if="item">

    <div
      v-if="$store.getters['user/isAdmin']"
      class="topright"
    >
      <nuxt-link
        :to="'/keycaps/edit?slug=' + item.slug"
        class="button bit is-primary"
      >
        EDIT
      </nuxt-link>
      <button
        class="button bit is-danger"
        @click.prevent="deleteItem"
      >
        DELETE
      </button>
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
        const { data } = await this.$api.delete('/edits/Keycap/' + this.item.id)
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
