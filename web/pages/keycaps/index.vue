<template>
  <div>

    <div
      class="topright"
    >
      <nuxt-link
        v-if="$store.getters['user/isLoggedIn']"
        to="/keycaps/new"
        class="button bit is-primary"
      >
        + NEW KEYCAPS
      </nuxt-link>
      <nuxt-link
        v-else
        to="/login"
        class="button bit is-primary"
      >
        + NEW KEYCAPS
      </nuxt-link>
    </div>

    <h1 class="is-size-4 bit">Keycaps</h1>

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
            :to="'/keycaps/' + props.row.slug"
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
          field="profile"
          label="Profile"
          sortable
        >
          {{ props.row.profile }}
        </b-table-column>
      </template>

    </b-table>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

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
        const { data } = await this.$api.get('/keycaps')
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
