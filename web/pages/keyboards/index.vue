<template>
  <div class="container">

    <div
      class="topright"
    >
      <nuxt-link
        v-if="$store.getters['user/isLoggedIn']"
        to="/keyboards/new"
        class="button bit"
      >
        + NEW KEYBOARD
      </nuxt-link>
      <nuxt-link
        v-else
        to="/login"
        class="button bit"
      >
        + NEW KEYBOARD
      </nuxt-link>
    </div>

    <h1 class="title bit">Keyboards</h1>

    <SearchKeyboard :nb-results="data.length"/>

    <b-table
      :data="data"
      :paginated="true"
      :pagination-simple="true"
      :per-page="20"
      hoverable
    >
      <template slot-scope="props">
        <b-table-column>
          <nuxt-link
            v-if="props.row.photos && props.row.photos.length > 0"
            :to="'/keyboards/' + props.row.slug"
            :style="photoBackground(props.row.photos)"
            class="photo"
          />
        </b-table-column>
        <b-table-column
          field="name"
          label="Name"
          sortable
        >
          <nuxt-link
            :to="'/keyboards/' + props.row.slug"
          >
            {{ props.row.name }}
          </nuxt-link>
        </b-table-column>
        <b-table-column
          field="manufacturer"
          label="Manufacturer"
          sortable
        >
          <span v-if="props.row.manufacturer">
            {{ props.row.manufacturer.name }}
          </span>
        </b-table-column>
        <b-table-column
          field="size"
          label="Size"
          sortable
        >
          {{ keyboardSize(props.row.size) }}
        </b-table-column>
        <b-table-column
          field="price"
          label="Price range (USD)"
          sortable
        >
          {{ props.row.price }}
        </b-table-column>
      </template>
      <template slot="empty">
        <EmptyTable/>
      </template>

    </b-table>

  </div>
</template>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'

import options from '@/assets/configuration/options'

import SearchKeyboard from '@/components/search/Keyboard'

export default {
  components: {
    SearchKeyboard,
  },
  data () {
    return {
      data: [],
    }
  },
  watch: {
    '$route.query': {
      deep: true,
      handler () {
        this.getItems()
      },
    },
  },
  created () {
    this.getItems()
  },
  methods: {
    async getItems () {
      try {
        const { data } = await this.$api.get('/keyboards', {
          params: this.$route.query,
        })
        this.data = data
      } catch (e) {
        this.apiError(e)
      }
    },
    keyboardSize (value) {
      const option = _.find(options.keyboardSizes, { value })
      return option ? option.label : null
    },
    photoBackground (photos) {
      if (photos && photos.length > 0) {
        return {
          'background-image': `url(${process.env.uploadUrl + photos[0]})`
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
h1 {
  margin-bottom: .8em;
}
a.photo {
  display: inline-block;
  width: 100px;
  height: 75px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
