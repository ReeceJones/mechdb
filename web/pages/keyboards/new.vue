<template>
  <div>
    <Form
      title="New Keyboard"
      @save="saveData"
    />
  </div>
</template>

<script>
import Form from '@/components/forms/Keyboard.vue'

export default {
  components: {
    Form,
  },
  methods: {
    async saveData (saveData) {
      try {
        const { data } = await this.$api.post('/keyboards', saveData)
        this.$toast.open('Keyboard created')
        this.$router.push('/keyboards/' + data.slug)
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
