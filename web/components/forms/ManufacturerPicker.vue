<template>
  <b-field label="Manufacturer">
    <b-autocomplete
      ref="autocomplete"
      v-model="name"
      :data="optionsByName"
      field="name"
      @select="option => $emit('select', option.id)"
    >
      <template slot="header">
        <a @click="addOption">
          <span> Add new... </span>
        </a>
      </template>
    </b-autocomplete>
  </b-field>
</template>

<script>
import ManufacturerModalAdd from '@/components/modals/ManufacturerAdd'

export default {
  props: {
    value: {
      type: Number,
      default: () => null,
    },
  },
  data () {
    return {
      name: '',
      options: [],
    }
  },
  computed: {
    optionsByName () {
      return this.options.filter(i => {
        return i.name.toLowerCase().indexOf(this.name.toLowerCase()) >= 0
      })
    },
  },
  watch: {
    value () {
      this.setName()
    },
  },
  async created () {
    await this.getOptions()
    this.setName()
  },
  methods: {
    async setName () {
      if (!this.value) {
        return
      }
      const item = this.options.find(o => o.id === this.value)
      if (item) {
        this.name = item.name
      }
    },
    async getOptions () {
      try {
        const { data } = await this.$api.get('manufacturers')
        this.options = data
      } catch (error) {
        throw error
      }
    },
    addOption () {
      this.$modal.open({
        parent: this,
        component: ManufacturerModalAdd,
        events: {
          add: (item) => {
            this.options.push(item)
            this.$emit('select', item.id)
            this.name = item.name
          },
        },
      })
    },
  }
}
</script>
