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
          {{ boardSizes[props.row.size] || null }}
        </b-table-column>
      </template>

    </b-table>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import options from '@/assets/configuration/options'

export default {
  data () {
    return {
      boardSizes: options.boardSizes,
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
  },
}
</script>

<style lang="scss" scoped>
h1 {
  margin-bottom: .8em;
}
</style>
