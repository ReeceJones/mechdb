<template>
  <div>

    <h1 class="is-size-4 bit">Edits</h1>

    <b-checkbox v-model="newOnly">
      Show pending only
    </b-checkbox>

    <b-table
      :data="filteredData"
      hoverable
    >
      <template slot-scope="props">
        <b-table-column
          field="id"
          sortable
        >
          <nuxt-link
            :to="'/admin/edits/' + props.row.id"
          >
            See changes
          </nuxt-link>
        </b-table-column>
        <b-table-column
          field="status"
          label="Status"
          sortable
        >
          <template v-if="props.row.status === 'new'">
            <span class="tag is-light">Pending</span>
          </template>
          <template v-else-if="props.row.status === 'approved'">
            <span class="tag is-success">Approved</span>
            by {{ props.row.approvedBy.username }}
          </template>
          <template v-else-if="props.row.status === 'rejected'">
            <span class="tag is-success">Rejected</span>
            by {{ props.row.rejectedBy.username }}
          </template>
        </b-table-column>
        <b-table-column
          field="createdAt"
          label="Created"
          sortable
        >
          {{ props.row.createdAt }}
        </b-table-column>
        <b-table-column
          field="type"
          label="Type"
          sortable
        >
          {{ props.row.type }}
        </b-table-column>
        <b-table-column
          field="createdBy"
          label="Author"
          sortable
        >
          {{ props.row.createdBy.username }}
        </b-table-column>
        <b-table-column
          field="modelName"
          label="Dataset"
          sortable
        >
          {{ props.row.modelName }}
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
      newOnly: true,
    }
  },
  computed: {
    filteredData () {
      if (this.newOnly) return this.data.filter(item => item.status === 'new')
      return this.data
    },
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
  },
}
</script>

<style lang="scss" scoped>
h1 {
  margin-bottom: .8em;
}
</style>
