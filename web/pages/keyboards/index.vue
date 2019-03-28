<template>
  <div>

    <div
      v-if="$store.getters['user/isLoggedIn']"
      class="topright"
    >
      <nuxt-link
        to="/keyboards/new"
        class="button bit is-primary"
      >
        + NEW KEYBOARD
      </nuxt-link>
    </div>

    <h1 class="is-size-4 bit">Keyboards</h1>

    <b-table
      :data="data"
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

    </b-table>

  </div>
</template>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'

import options from '@/assets/configuration/options'

export default {
  data () {
    return {
      data: [],
    }
  },
  created () {
    this.getItems()
  },
  methods: {
    async getItems () {
      try {
        const { data } = await this.$api.get('/keyboards')
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
