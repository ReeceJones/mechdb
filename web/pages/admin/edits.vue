<template>
  <div>

    <h1 class="is-size-4 bit">Edits</h1>

    <div class="columns">
      <div class="column is-narrow">

        <b-field label="Dataset">
          <b-select
            v-model="search.instanceModel"
            placeholder="Any"
          >
            <option :value="null">Any</option>
            <option value="Keyboard">Keyboard</option>
            <option value="Keycap">Keycap</option>
            <option value="Switch">Switch</option>
            <option value="Manufacturer">Manufacturer</option>
          </b-select>
        </b-field>

      </div>
      <div class="column is-narrow">

        <b-field label="Status">
          <b-select
            v-model="search.status"
            placeholder="Any"
          >
            <option :value="null">Any</option>
            <option value="new">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </b-select>
        </b-field>

      </div>
      <div class="column is-size-7 items-count">
        {{ data.length > 1 ? data.length + ' results' : data.length + ' result' }}
      </div>
    </div>

    <b-table
      :data="data"
      :paginated="true"
      :per-page="25"
      hoverable
    >
      <template slot-scope="props">
        <b-table-column>
          <nuxt-link
            :to="'/edits/' + props.row._id"
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
          <span v-if="props.row.createdBy">by {{ props.row.createdBy.username }}</span>
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
import _ from 'lodash'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      data: [],
      search: {
        instanceModel: null,
        status: null,
      },
    }
  },
  watch: {
    search: {
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
        const params = _.pickBy(this.search, i => i !== null)
        const { data } = await this.$api.get('/edits', { params })
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
@import "~bulma/sass/utilities/initial-variables";

h1 {
  margin-bottom: .8em;
}
.is-rejected {
  text-decoration: line-through;
}
@media only screen and (min-width: $tablet) {
  .items-count {
    text-align: right;
    padding-top: 5em;
  }
}
</style>
