<template>
  <div>

    <div
      v-if="$store.getters['user/isAdmin']"
      class="topright"
    >
      <nuxt-link
        to="/switches/new"
        class="button bit is-primary"
      >
        + NEW SWITCH
      </nuxt-link>
    </div>

    <h1 class="is-size-4 bit">Switches</h1>

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
            :to="'/switches/' + props.row.slug"
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
          field="type"
          label="Type"
          sortable
        >
          {{ props.row.type }}
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
        const { data } = await this.$api.get('/switches')
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
