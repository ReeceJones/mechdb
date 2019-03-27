<template>
  <div>
    <b-field :label="label">
      <div class="field has-addons">
        <b-radio-button
          v-for="option in allOptions"
          v-model="localValue"
          :native-value="option.value"
          :key="option.value"
          @click.native.prevent="checkValue(option.value)"
        >
          {{ option.label }}
        </b-radio-button>
        <button
          v-if="allowOther"
          :class="{ 'is-light': isOther }"
          class="button"
          @click.prevent="selectOther"
        >
          Other
        </button>
        <b-input
          v-if="isOther"
          v-model="localValue"
          style="margin-left: 1em; width: 360px"
        />
      </div>
    </b-field>
  </div>
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
      type: [String, Number, Boolean],
      default: () => null,
    },
    allowOther: {
      type: Boolean,
      default: () => false,
    },
    checkbox: {
      type: Boolean,
      default: () => false,
    },
  },
  data () {
    return {
      isOther: false,
      localValue: null,
    }
  },
  computed: {
    allOptions () {
      if (this.checkbox) {
        return [
          {
            value: true,
            label: 'Yes',
          },
          {
            value: false,
            label: 'No',
          },
        ]
      }
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
    localValue () {
      this.$emit('input', this.localValue)
    },
  },
  created () {
    this.getLocalValue()
  },
  methods: {
    getLocalValue () {
      this.localValue = JSON.parse(JSON.stringify(this.value))
      if (!this.checkbox && this.allowOther && this.value) {
        this.isOther = (this.options.indexOf(this.localValue) === -1)
      }
    },
    checkValue (value) {
      if (this.localValue !== value) {
        this.localValue = value
        this.isOther = false
      } else {
        this.localValue = null
      }
    },
    selectOther () {
      if (!this.isOther) {
        this.localValue = null
      }
      this.isOther = !this.isOther
    },
  },
}
</script>

<style lang="scss" scoped>
.field.has-addons {
  margin-bottom: 0.75rem;
}
button.button {
  // margin-left: 1em;
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
}
</style>
