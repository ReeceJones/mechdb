<template>
  <div v-if="item">

    <div
      v-if="$store.getters['user/isLoggedIn']"
      class="topright"
    >
      <nuxt-link
        :to="'/switches/edit?slug=' + item.slug"
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

    <SwitchDetails :item="item"/>

  </div>
</template>

<script>
import SwitchDetails from '@/components/details/Switch'

export default {
  components: {
    SwitchDetails,
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
        const { data } = await this.$api.get('/switches/' + this.$route.params.slug)
        this.item = data
      } catch (e) {
        this.apiError(e)
      }
    },
    async deleteItem () {
      if (!confirm('Delete ?')) return
      try {
        const { data } = await this.$api.delete('/edits/Switch/' + this.item._id)
        if (data.deleted === 1) {
          this.$toast.open('Switches deleted')
        }
        this.$router.push('/switches')
      } catch (e) {
        this.apiError(e)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
