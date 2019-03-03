<template>
  <div v-if="item">

    <div
      v-if="$store.getters['user/isAdmin']"
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

    <h1 class="is-size-4 bit">{{ item.name }}</h1>

    <div class="description mb">
      {{ item.description }}
    </div>

    <div class="sidebar is-pulled-right">

      <div
        v-if="item.photos.length > 0"
        class="sidebar-photos"
      >
        <img :src="uploadUrl + item.photos[0]">
        <span class="is-size-7 label">
          <b-icon
            icon="image-filter"
            size="is-small"
          />
          {{ item.photos.length }} photo{{ item.photos.length > 1 ? 's' : '' }}
        </span>
      </div>

      <div
        v-if="hasSpecs"
        class="sidebar-specs"
      >
        <h4 class="bit">
          SPECS
        </h4>
        <table class="table specs is-narrow is-fullwidth">
          <tbody>
            <tr v-if="item.type">
              <td>Type :</td>
              <td>{{ item.type }}</td>
            </tr>
            <tr v-if="item.manufacturer">
              <td>Manufacturer :</td>
              <td>
                <nuxt-link
                  :to="'/manufacturers/' + item.manufacturer.slug"
                >
                  {{ item.manufacturer.name }}
                </nuxt-link>
              </td>
            </tr>
            <tr v-if="item.brand">
              <td>Brand :</td>
              <td>
                <nuxt-link
                  :to="'/brands/' + item.brand.slug"
                >
                  {{ item.brand.name }}
                </nuxt-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      item: null,
    }
  },
  computed: {
    hasSpecs () {
      return this.item.type || this.item.manufacturer || this.item.brand
    },
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
      } catch (error) {
        if (error.response && error.response.status === 401) {
          throw new Error('Bad credentials')
        }
        throw error
      }
    },
    async deleteItem () {
      if (!confirm('Delete ?')) return
      try {
        const { data } = await this.$api.delete('/switches/' + this.item.id)
        if (data.deleted === 1) {
          this.$toast.open('Switches deleted')
        }
        this.$router.go(-1)
      } catch (error) {
        if (error.response && error.response.status === 401) {
          throw new Error('Bad credentials')
        }
        throw error
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
