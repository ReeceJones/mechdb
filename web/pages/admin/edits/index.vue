<template>
  <div>

    <h1 class="is-size-4 bit">Edits</h1>

    <b-table
      :data="data"
      hoverable
    >
      <template slot-scope="props">
        <b-table-column>
          <nuxt-link
            :to="'/admin/edits/' + props.row._id"
            :class="{ 'is-rejected': props.row.status === 'rejected' }"
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
          by {{ props.row.createdBy.username }}
        </b-table-column>
        <b-table-column
          label="Moderation"
        >
          <template v-if="props.row.status === 'approved'">
            <span class="tag is-success">Approved</span>
            {{ props.row.approvedAt }}
            by {{ props.row.approvedBy.username }}
          </template>
          <template v-else-if="props.row.status === 'rejected'">
            <span class="tag is-danger">Rejected</span>
            {{ props.row.rejectedAt }}
            by {{ props.row.rejectedBy.username }}
          </template>
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
        const { data } = await this.$api.get('/edits')
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
.is-rejected {
  text-decoration: line-through;
}
</style>
