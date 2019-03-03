<template>
  <div>
    <Form
      title="New Switch"
      @save="saveData"
    />
  </div>
</template>

<script>
import Form from '@/components/forms/Switch.vue'

export default {
  components: {
    Form,
  },
  methods: {
    async saveData (saveData) {
      try {
        const { data } = await this.$api.post('/switches', saveData)
        this.$toast.open('Switch created')
        this.$router.push('/switches/' + data.slug)
      } catch (error) {
        if (error.response && error.response.status === 401) {
          throw new Error('Bad credentials')
        }
        throw error
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
