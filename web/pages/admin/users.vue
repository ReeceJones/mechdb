<template>
  <div>

    <h1 class="is-size-4 bit">Users</h1>

    <SearchUser :nb-results="data.length"/>

    <b-table
      :data="data"
      :paginated="true"
      :per-page="100"
      hoverable
    >
      <template slot-scope="props">
        <b-table-column
          field="username"
          label="Username"
          sortable
        >
          <nuxt-link
            :to="'/u/' + props.row.username"
            :class="{ 'is-admin': props.row.isAdmin }"
          >
            {{ props.row.username }}
          </nuxt-link>
          <b-icon
            v-if="props.row.isAdmin"
            icon="star"
            size="is-small"
            class="has-text-primary"
            title="Admin"
          />
          <b-icon
            v-if="props.row.isVerified"
            icon="check"
            size="is-small"
            class="has-text-primary"
            title="Verified user"
          />
        </b-table-column>
        <b-table-column
          field="reputation"
          label="Rep"
          sortable
        >
          {{ props.row.reputation }}
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

import SearchUser from '@/components/search/User'

export default {
  components: {
    SearchUser,
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
        const { data } = await this.$api.get('/users', {
          params: this.$route.query,
        })
        this.data = data
      } catch (e) {
        this.apiError(e)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import "~bulma/sass/utilities/initial-variables";

h1 {
  margin-bottom: .8em;
}
.is-admin {
  font-weight: bold;
}
</style>
