<template>
  <div v-if="item">

    <a
      v-if="$store.getters['user/isAdmin']"
      href=""
      class="button bit is-danger is-large is-pulled-right mr"
      @click.prevent="deleteItem"
    >
      DELETE
    </a>

    <nuxt-link
      v-if="$store.getters['user/isAdmin']"
      :to="'/keyboards/edit?slug=' + item.slug"
      class="button bit is-info is-large is-pulled-right mr"
    >
      EDIT
    </nuxt-link>

    <h1 class="is-size-4 bit">{{ item.name }}</h1>

    <div v-if="item.description">{{ item.description }}</div>

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
        <table class="table specs is-size-7 is-narrow is-fullwidth">
          <tbody>
            <tr v-if="boardSize">
              <td>Size :</td>
              <td>{{ boardSize }}</td>
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

    <div
      v-if="item.text"
      class="quill-content"
      v-html="item.text"
    />

  </div>
</template>

<script>
import boardSizes from '@/assets/configuration/boardSizes'

export default {
  data () {
    return {
      item: null,
    }
  },
  computed: {
    boardSize () {
      return boardSizes[this.item.size] || null
    },
    hasSpecs () {
      return this.item.size || this.item.manufacturer || this.item.brand
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
        const { data } = await this.$api.get('/keyboards/' + this.$route.params.slug)
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
        const { data } = await this.$api.delete('/keyboards/' + this.item.id)
        if (data.deleted === 1) {
          this.$toast.open('Keyboard deleted')
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
.sidebar {
  width: 200px;
  h4 {
    font-size: .8em;
    opacity: .9;
    padding-bottom: .3em;
  }
}
.sidebar-photos {
  margin-bottom: 1.5em;
  background: whitesmoke;
  padding: 3px;
  border-radius: 2px;
  cursor: pointer;
  & > img {
    width: 100%;
  }
  span.label {
    display: block;
    text-align: center;
    .icon {
      margin-right: .2em;
    }
  }
}
.sidebar-specs {
  margin-bottom: 1.5em;
}
table.specs td {
  border: none;
  padding-left: 0;
}
.quill-content {
  margin-top: 1.5em;
}
</style>
