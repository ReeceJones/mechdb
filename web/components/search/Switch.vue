<template>
  <div
    v-if="searchFields"
    :class="{ 'show-fields': showFields }"
    class="search-form"
  >

    <div v-if="!showFields">
      <span
        v-if="nbResults !== null"
        class="is-size-7 is-pulled-right nb-results"
      >
        {{ nbResults > 1 ? `${nbResults} results` : `${nbResults} result` }}
      </span>
      <div class="tags has-addons">
        <span
          :class="hasFilters ? 'is-info' : 'is-light'"
          class="tag"
          @click="showFields = true"
        >
          <b-icon
            icon="filter"
            size="is-small"
          />
          Filters
          <template v-if="hasFilters">
            ({{ hasFilters }})
          </template>
        </span>
        <span
          v-if="hasFilters"
          class="tag is-light"
          @click="reset"
        >
          <b-icon
            icon="refresh"
            size="is-small"
          />
          reset
        </span>
      </div>
    </div>


    <div
      v-if="showFields"
      class="fields"
    >
      <div class="columns">
        <div class="column">

          <b-field
            label="Type"
            custom-class="is-small"
          >
            <b-select
              v-model="searchFields.type"
              placeholder="Any"
              size="is-small"
            >
              <option :value="null">
                Any
              </option>
              <option
                v-for="option in options.switchTypes"
                :key="option"
                :value="option"
              >
                {{ option }}
              </option>
            </b-select>
          </b-field>

        </div>
        <div class="column">

          <b-field
            label="Stem Type"
            custom-class="is-small"
          >
            <b-select
              v-model="searchFields.stemType"
              placeholder="Any"
              size="is-small"
            >
              <option :value="null">
                Any
              </option>
              <option
                v-for="option in options.switchStemTypes"
                :key="option"
                :value="option"
              >
                {{ option }}
              </option>
            </b-select>
          </b-field>

        </div>
        <div class="column">

          <b-field
            label="Availability"
            custom-class="is-small"
          >
            <b-select
              v-model="searchFields.availability"
              placeholder="Any"
              size="is-small"
            >
              <option :value="null">
                Any
              </option>
              <option
                v-for="option in options.availability"
                :key="option.value"
                :value="option.value"
              >
                {{ option.label }}
              </option>
            </b-select>
          </b-field>

        </div>
      </div>

      <button
        class="button is-info"
        @click="search"
      >
        Save
      </button>
      <button
        class="button is-pulled-right"
        @click="reset"
      >
        <b-icon
          icon="refresh"
          size="is-small"
        />
        Reset
      </button>

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
  created () {
    this.initSearchFields({
      size: null,
      price: null,
      availability: null,
      interface: null,
      keysLayout: null,
      layout: null,
      keycaps: null,
      firmware: null,
      bluetooth: null,
      hotswappable: null,
      backlighting: null,
    })
  },
}
</script>
