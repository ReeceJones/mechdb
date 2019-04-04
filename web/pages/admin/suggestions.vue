<template>
  <div>

    <h1 class="is-size-4 bit">Suggestions</h1>

    <b-table
      :data="data"
      hoverable
    >
      <template slot-scope="props">
        <b-table-column>
          <nuxt-link
            :to="'/edits/' + props.row._id"
          >
            <b-icon
              v-if="props.row.type === 'add'"
              icon="plus-circle-outline"
              size="is-small"
            />
            <b-icon
              v-else-if="props.row.type === 'edit'"
              icon="circle-edit-outline"
              size="is-small"
            />
            <b-icon
              v-if="props.row.type === 'delete'"
              icon="close-circle-outline"
              size="is-small"
            />
            {{ instanceName(props.row) }}
          </nuxt-link>
        </b-table-column>
        <b-table-column
          field="instanceModel"
          label="Dataset"
          sortable
        >
          {{ props.row.instanceModel }}
        </b-table-column>
        <b-table-column
          field="createdAt"
          label="Created"
          sortable
        >
          {{ props.row.createdAt }}
        </b-table-column>
        <b-table-column
          field="createdById"
          label="Author"
          sortable
        >
          {{ props.row.createdBy.username }}
        </b-table-column>
      </template>
      <template slot="empty">
        <EmptyTable/>
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
        const { data } = await this.$api.get('/edits/suggestions')
        this.data = data
      } catch (e) {
        this.apiError(e)
      }
    },
    instanceName (row) {
      try {
        if (row.type === 'add') {
          return row.after.name
        } else {
          return row.before.name
        }
      } catch (e) {
        console.error(e)
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
