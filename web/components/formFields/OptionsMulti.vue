<template>
  <b-field :label="label">
    <div class="buttons">
      <button
        v-for="option in allOptions"
        :key="option.value"
        :class="{ 'is-primary': localValue.indexOf(option.value) !== -1 }"
        class="button"
        @click.prevent="checkValue(option.value)"
      >
        <b-icon
          :icon="localValue.indexOf(option.value) === -1 ? 'checkbox-blank-outline' : 'checkbox-marked-outline'"
          size="is-small"
        />
        {{ option.label }}
      </button>
    </div>
  </b-field>
</template>

<script>
import _ from 'lodash'

export default {
  props: {
    label: {
      type: String,
      default: () => null,
    },
    options: {
      type: Array,
      default: () => [],
    },
    value: {
      type: Array,
      default: () => null,
    },
  },
  data () {
    return {
      localValue: [],
    }
  },
  computed: {
    allOptions () {
      if (this.options.length === 0) return []
      if (typeof this.options[0] === 'string') {
        return this.options.map(option => ({
          value: option,
          label: option,
        }))
      }
      return this.options
    },
  },
  watch: {
    value () {
      this.getLocalValue()
    },
    localValue: {
      deep: true,
      handler () {
        this.$emit('input', this.localValue)
      },
    },
  },
  created () {
    this.getLocalValue()
  },
  methods: {
    getLocalValue () {
      const value = JSON.parse(JSON.stringify(this.value))
      if (!_.isEqual(value, this.localValue)) {
        this.localValue = value
      }
    },
    checkValue (value) {
      const index = this.localValue.indexOf(value)
      if (index === -1) {
        this.localValue.push(value)
      } else {
        this.localValue.splice(index, 1)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
button {
  margin-right: 1em !important;
}
</style>
