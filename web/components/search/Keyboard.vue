<template>
  <div
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
            label="Size"
            custom-class="is-small"
          >
            <b-select
              v-model="searchFields.size"
              placeholder="Any"
              size="is-small"
            >
              <option :value="null">
                Any
              </option>
              <option
                v-for="option in options.keyboardSizes"
                :key="option.value"
                :value="option.value"
              >
                {{ option.label }}
              </option>
            </b-select>
          </b-field>

        </div>
        <div class="column">

          <b-field
            label="Price range"
            custom-class="is-small"
          >
            <b-select
              v-model="searchFields.price"
              placeholder="Any"
              size="is-small"
            >
              <option :value="null">
                Any
              </option>
              <option
                v-for="option in options.keyboardPrices"
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
        <div class="column">

          <b-field
            label="Interface"
            custom-class="is-small"
          >
            <b-select
              v-model="searchFields.interface"
              placeholder="Any"
              size="is-small"
            >
              <option :value="null">
                Any
              </option>
              <option
                v-for="option in options.keyboardInterfaces"
                :key="option"
                :value="option"
              >
                {{ option }}
              </option>
            </b-select>
          </b-field>

        </div>
      </div>
      <div class="columns">
        <div class="column">

          <b-field
            label="Keys Layout"
            custom-class="is-small"
          >
            <b-select
              v-model="searchFields.keysLayout"
              placeholder="Any"
              size="is-small"
            >
              <option :value="null">
                Any
              </option>
              <option
                v-for="option in options.keysLayouts"
                :key="option.value"
                :value="option.value"
              >
                {{ option.label }}
              </option>
            </b-select>
          </b-field>

        </div>
        <div class="column">

          <b-field
            label="Layout"
            custom-class="is-small"
          >
            <b-select
              v-model="searchFields.layout"
              placeholder="Any"
              size="is-small"
            >
              <option :value="null">
                Any
              </option>
              <option
                v-for="option in options.layouts"
                :key="option.value"
                :value="option.value"
              >
                {{ option.label }}
              </option>
            </b-select>
          </b-field>

        </div>
        <div class="column">

          <b-field
            label="Default Keycaps"
            custom-class="is-small"
          >
            <b-select
              v-model="searchFields.keycaps"
              placeholder="Any"
              size="is-small"
            >
              <option :value="null">
                Any
              </option>
              <option
                v-for="option in options.keyboardKeycaps"
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
            label="Firmware"
            custom-class="is-small"
          >
            <b-select
              v-model="searchFields.firmware"
              placeholder="Any"
              size="is-small"
            >
              <option :value="null">
                Any
              </option>
              <option
                v-for="option in options.keyboardFirmwares"
                :key="option"
                :value="option"
              >
                {{ option }}
              </option>
            </b-select>
          </b-field>

        </div>
      </div>
      <div class="columns">
        <div class="column">

          <OptionsField
            v-model="searchFields.bluetooth"
            label="Bluetooth"
            size="is-small"
            checkbox
          />

        </div>
        <div class="column">

          <OptionsField
            v-model="searchFields.hotswappable"
            label="Hotswappable"
            size="is-small"
            checkbox
          />

        </div>
        <div class="column">

          <OptionsField
            v-model="searchFields.backlighting"
            label="Backlighting"
            size="is-small"
            checkbox
          />

        </div>
        <div class="column"/>
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
import _ from 'lodash'

import options from '@/assets/configuration/options'

import OptionsField from '@/components/formFields/Options'

const defaultFields = {
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
      showFields: false,
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
  methods: {
    search () {
      this.$router.push({ query: this.searchQuery })
      this.showFields = false
    },
    reset () {
      this.searchFields = JSON.parse(JSON.stringify(defaultFields))
      this.search()
    },
  },
}
</script>
