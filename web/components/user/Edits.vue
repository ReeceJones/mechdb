<template>
  <div>
    <b-table
      :data="data"
      :paginated="true"
      :per-page="50"
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
          {{ props.row.createdAt | date }}
        </b-table-column>
        <b-table-column
          label="Moderation"
        >
          <template v-if="props.row.status === 'approved'">
            <span class="tag is-success">Approved</span>
            {{ props.row.approvedAt | date }}
            <span v-if="props.row.approvedBy">by {{ props.row.approvedBy.username }}</span>
          </template>
          <template v-else-if="props.row.status === 'rejected'">
            <span class="tag is-danger">Rejected</span>
            {{ props.row.rejectedAt | date }}
            <span v-if="props.row.rejectedBy">by {{ props.row.rejectedBy.username }}</span>
          </template>
        </b-table-column>
      </template>
      <template slot="empty">
        <EmptyTable/>
      </template>

    </b-table>
  </div>
</template>

<script>
export default {
  props: {
    username: {
      type: String,
      default: () => null,
    },
  },
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
        const { data } = await this.$api.get('/edits/u/' + this.username)
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
</style>
