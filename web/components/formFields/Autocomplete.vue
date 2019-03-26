<template>
  <b-field :label="label">
    <no-ssr>
      <b-autocomplete
        v-model="localValue"
        :data="filteredOptions"
        :keep-first="true"
        :open-on-focus="true"
        field="name"
        @select="selectOption"
        @blur="onBlur"
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
      type: String,
      default: () => '',
    },
  },
  data() {
    return {
      isLoading: false,
      options: [],
      localValue: '',
    }
  },
  computed: {
    filteredOptions () {
      return this.options.filter((option) => {
        return option.name
          .toString()
          .toLowerCase()
          .indexOf(this.localValue.toLowerCase()) >= 0
      })
    },
  },
  watch: {
    value () {
      this.getLocalValue()
    },
  },
  async created () {
    this.isLoading = true
    try {
      const { data } = await this.$api.get('/autocomplete/' + this.dataset)
      this.options = _.sortBy(data, o => o.name.toLowerCase())
    } catch (e) {
      this.apiError(e)
    }
    this.isLoading = false
    this.getLocalValue()
  },
  methods: {
    getLocalValue () {
      const option = _.find(this.options, { _id: this.value })
      this.localValue = option ? option.name : ''
    },
    onBlur () {
      const option = _.find(this.options, { name: this.localValue })
      if (option) {
        this.$emit('input', option._id)
      } else {
        this.addOption()
      }
    },
    async addOption () {
      if (!this.localValue) return

      if (!confirm(`${this.dataset} "${this.localValue}" does not exist. Do you want to create it ?`)) {
        this.$emit('input', null)
        this.localValue = ''
        return
      }

      this.isLoading = true
      try {
        const { data } = await this.$api.post('/autocomplete/' + this.dataset, {
          name: this.localValue,
        })
        this.options.unshift(data)
        this.$emit('input', data._id)
      } catch (e) {
        this.apiError(e)
      }
      this.isLoading = false
    },
    async selectOption (option) {
      const id = option !== null ? option._id : null
      this.$emit('input', id)
    },
  },
}
</script>
