<template>
  <b-field :label="label">
    <no-ssr>
      <b-taginput
        v-model="localValue"
        :data="filteredOptions"
        :allow-new="true"
        :loading="isLoading"
        autocomplete
        attached
        field="name"
        @add="addOption"
        @typing="getFilteredOptions"
      />
    </no-ssr>
  </b-field>
</template>

<script>
import _ from 'lodash'

export default {
  props: {
    dataset: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: () => null,
    },
    value: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      allowNew: false,
      filteredOptions: [],
      isLoading: false,
      options: [],
      localValue: [],
    }
  },
  watch: {
    localValue () {
      const value = this.localValue.map(i => i._id)
      if (!_.isEqual(value, this.value)) {
        this.$emit('input', value)
      }
    },
    value () {
      this.getLocalValue()
    },
  },
  async created () {
    this.isLoading = true
    try {
      const { data } = await this.$api.get('/autocomplete/' + this.dataset)
      this.options = data
    } catch (e) {
      this.apiError(e)
    }
    this.isLoading = false
    this.getLocalValue()
  },
  methods: {
    getLocalValue () {
      if (this.isLoading) return
      const localValue = this.value.map(_id =>  _.find(this.options, { _id }))
      this.localValue = _.compact(localValue)
    },
    getFilteredOptions (text) {
      this.filteredOptions = this.options.filter((option) => {
        return option.name
          .toString()
          .toLowerCase()
          .indexOf(text.toLowerCase()) >= 0
      })
    },
    async addOption (name) {
      if (typeof name !== 'string') return
      this.localValue.pop()
      this.isLoading = true
      try {
        const { data } = await this.$api.post('/autocomplete/' + this.dataset, { name })
        this.localValue.push(data)
        this.options.push(data)
      } catch (e) {
        this.apiError(e)
      }
      this.isLoading = false
    },
  },
}
</script>
