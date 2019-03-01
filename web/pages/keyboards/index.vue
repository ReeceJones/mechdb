<template>
  <div>
    <nuxt-link
      v-if="$store.getters['user/isAdmin']"
      to="/keyboards/new"
      class="button bit is-info is-large is-pulled-right"
    >
      + NEW KEYBOARD
    </nuxt-link>

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
          {{ props.row.manufacturer }}
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

import boardSizes from '@/assets/configuration/boardSizes'

export default {
  data () {
    return {
      boardSizes,
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
h1 {
  margin-bottom: .8em;
}
div.description {
  padding-bottom: 1em;
}
</style>
