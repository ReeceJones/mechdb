<template>
  <form @submit.prevent="saveData">
    <Form
      :is-loading="isLoading"
      title="New Keyboard"
      @save="saveData"
    />
  </form>
</template>

<script>
import Form from '@/components/forms/Keyboard.vue'

export default {
  components: {
    Form,
  },
  data () {
    return {
      isLoading: false,
    }
  },
  methods: {
    async saveData (saveData) {
      if (this.isLoading) return

      this.isLoading = true
      try {
        const { data } = await this.$api.post('/edits/Keyboard', saveData)
        this.$toast.open('Keyboard created')
        this.$router.go(-1)
      } catch (e) {
        this.apiError(e)
      }
      this.isLoading = false
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
