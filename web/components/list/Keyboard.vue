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
            :to="'/keyboards/' + props.row.slug"
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
            :to="'/keyboards/' + props.row.slug"
          >
            {{ props.row.name }}
          </nuxt-link>
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
        <b-table-column
          field="size"
          label="Size"
          sortable
        >
          {{ keyboardSize(props.row.size) }}
        </b-table-column>
        <b-table-column
          field="price"
          label="Price range (USD)"
          sortable
        >
          {{ props.row.price }}
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
import SearchForm from '@/components/search/Keyboard'

export default {
  components: {
    SearchForm,
  },
  mixins: [mixin],
  data () {
    return {
      endpoint: '/keyboards',
    }
  },
  methods: {
    keyboardSize (value) {
      const option = _.find(options.keyboardSizes, { value })
      return option ? option.label : null
    },
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
