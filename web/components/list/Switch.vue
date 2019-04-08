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
            :to="'/switches/' + props.row.slug"
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
            :to="'/switches/' + props.row.slug"
          >
            {{ props.row.name }}
          </nuxt-link>
        </b-table-column>
        <b-table-column
          field="type"
          label="Type"
          sortable
        >
          {{ props.row.type }}
        </b-table-column>
        <b-table-column
          field="actuationForce"
          label="Actuation Force"
          sortable
        >
          <span v-if="props.row.actuationForce">
            {{ props.row.actuationForce }}g
          </span>
        </b-table-column>
        <b-table-column
          field="manufacturer"
          label="Manufacturer"
          sortable
        >
          <span v-if="props.row.manufacturer">
            {{ props.row.manufacturer.name }}
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
import SearchForm from '@/components/search/Switch'

export default {
  components: {
    SearchForm,
  },
  mixins: [mixin],
  data () {
    return {
      endpoint: '/switches',
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
