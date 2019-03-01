<template>
  <form @submit.prevent="create">
    <b-field>
      <b-input
        ref="input"
        v-model="name"
        placeholder="Enter a name"
        expanded
      />
      <p class="control">
        <button
          type="submit"
          class="button bit is-primary"
        >
          CREATE
        </button>
      </p>
    </b-field>
  </form>
</template>

<script>
export default {
  data () {
    return {
      name: '',
    }
  },
  mounted () {
    this.$refs.input.$el.getElementsByTagName('input')[0].focus()
    this.name = this.$parent.$parent.name
  },
  methods: {
    async create () {
      try {
        const { data } = await this.$api.post('manufacturers', {
          name: this.name,
        })
        this.$toast.open('Manufacturer created')
        this.$emit('add', data)
        this.$emit('close')
      } catch (error) {
        throw error
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.button {
  font-size: inherit;
}
</style>
