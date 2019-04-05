<template>
  <div class="search-form">

    <div class="columns">
      <div class="column is-narrow">

        <b-field label="Dataset">
          <b-select
            v-model="searchFields.instanceModel"
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
            v-model="searchFields.status"
            placeholder="Any"
          >
            <option :value="null">Any</option>
            <option value="new">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </b-select>
        </b-field>

      </div>
      <div class="column">
        <div class="is-size-7 nb-results horizontal">
          <button
            v-if="hasFilters"
            class="button is-info is-small is-rounded"
            @click="reset"
          >
            <b-icon
              icon="refresh"
              size="is-small"
            />
            Reset filters
          </button>
          {{ nbResults > 1 ? nbResults + ' results' : nbResults + ' result' }}
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import _ from 'lodash'

import options from '@/assets/configuration/options'

import OptionsField from '@/components/formFields/Options'

const defaultFields = {
  instanceModel: null,
  status: null,
}

export default {
  components: {
    OptionsField,
  },
  props: {
    nbResults: {
      type: Number,
      default: () => null,
    },
  },
  data () {
    const searchFields = {
      ...JSON.parse(JSON.stringify(defaultFields)),
      ..._.mapValues(this.$route.query, value => {
        if (value === 'true') return true
        if (value === 'false') return false
        return value
      })
    }
    return {
      searchFields,
      options,
    }
  },
  computed: {
    searchQuery () {
      return _.pickBy(this.searchFields, i => i !== null)
    },
    hasFilters () {
      return Object.keys(this.searchQuery).length
    },
  },
  watch: {
    searchFields: {
      deep: true,
      handler () {
        this.search()
      },
    },
  },
  methods: {
    search () {
      this.$router.push({ query: this.searchQuery })
    },
    reset () {
      this.searchFields = JSON.parse(JSON.stringify(defaultFields))
      this.search()
    },
  },
}
</script>
