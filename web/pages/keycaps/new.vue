<template>
  <div>
    <Form
      title="New Keycaps"
      @save="saveData"
    />
  </div>
</template>

<script>
import Form from '@/components/forms/Keycap.vue'

export default {
  components: {
    Form,
  },
  methods: {
    async saveData (saveData) {
      try {
        const { data } = await this.$api.post('/keycaps', saveData)
        this.$toast.open('Keycaps created')
        this.$router.push('/keycaps/' + data.slug)
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
