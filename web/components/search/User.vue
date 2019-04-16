<template>
  <div class="search-form">

    <div class="columns">
      <div class="column is-narrow">

        <OptionsField
          v-model="searchFields.isVerified"
          label="Verified"
          size="is-small"
          checkbox
        />

      </div>
      <div class="column is-narrow">

        <OptionsField
          v-model="searchFields.isAdmin"
          label="Admin"
          size="is-small"
          checkbox
        />

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
import options from '@/assets/configuration/options'

import mixin from './_mixin'
import OptionsField from '@/components/formFields/Options'

export default {
  components: {
    OptionsField,
  },
  mixins: [mixin],
  data () {
    return {
      options,
    }
  },
  watch: {
    searchFields: {
      deep: true,
      handler () {
        this.search()
      },
    },
  },
  created () {
    this.initSearchFields({
      isAdmin: null,
      isVerified: null,
    })
  },
}
</script>
