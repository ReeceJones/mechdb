<template>
  <div
    v-if="item"
    class="container"
  >

    <div
      v-if="$store.getters['user/isLoggedIn']"
      class="topright"
    >
      <nuxt-link
        :to="'/keyboards/edit?slug=' + item.slug"
        class="button bit"
      >
        <b-icon
          icon="pencil"
          size="is-small"
        />
        EDIT
      </nuxt-link>
      <button
        class="button bit is-danger"
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

    <KeyboardDetails :item="item"/>

  </div>
</template>

<script>
import KeyboardDetails from '@/components/details/Keyboard'

export default {
  components: {
    KeyboardDetails,
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
        const { data } = await this.$api.get('/keyboards/' + this.$route.params.slug)
        this.item = data
      } catch (e) {
        this.apiError(e)
      }
    },
    async deleteItem () {
      if (!confirm('Delete ?')) return
      try {
        const { data } = await this.$api.delete('/edits/Keyboard/' + this.item._id)
        if (data.deleted === 1) {
          this.$toast.open('Keyboard deleted')
        }
        this.$router.push('/keyboards')
      } catch (e) {
        this.apiError(e)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
