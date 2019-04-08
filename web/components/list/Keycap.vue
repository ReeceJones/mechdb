<template>
  <div>

    <SearchForm :nb-results="data.length"/>

    <b-table
      :data="data"
      :paginated="true"
      :pagination-simple="true"
      :per-page="20"
      hoverable
    >
      <template slot-scope="props">
        <b-table-column
          key="photo"
          :width="10"
          centered
        >
          <nuxt-link
            v-if="props.row.photos && props.row.photos.length > 0"
            :to="'/keycaps/' + props.row.slug"
            :style="photoBackground(props.row.photos)"
            class="photo"
          />
        </b-table-column>
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
          field="profile"
          label="Profile"
          sortable
        >
          {{ props.row.profile }}
        </b-table-column>
        <b-table-column
          field="material"
          label="Material"
          sortable
        >
          {{ props.row.material }}
          <template v-if="props.row.printMethod && props.row.printMethod !== 'None'">
            ({{ props.row.printMethod }})
          </template>
        </b-table-column>
        <b-table-column
          field="designer"
          label="Designer"
          sortable
        >
          <span v-if="props.row.designer">
            {{ props.row.designer.name }}
          </span>
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

import options from '@/assets/configuration/options'

import mixin from './_mixin'
import SearchForm from '@/components/search/Keycap'

export default {
  components: {
    SearchForm,
  },
  mixins: [mixin],
  data () {
    return {
      endpoint: '/keycaps',
    }
  },
}
</script>

<style lang="scss" scoped>
a.photo {
  display: inline-block;
  width: 100px;
  height: 75px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
