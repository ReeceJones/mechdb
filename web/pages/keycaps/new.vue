<template>
  <form @submit.prevent="saveData">
    <Form
      :is-loading="isLoading"
      title="New Keycaps"
      @save="saveData"
    />
  </form>
</template>

<script>
import Form from '@/components/forms/Keycap.vue'

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
        const { data } = await this.$api.post('/edits/Keycap', saveData)
        if (this.$store.getters['user/isNotVerified']) {
          this.$router.push('/edits/pending?id=' + data.edit._id)
        } else {
          this.$toast.open('Keycap created')
          this.$router.push('/keycaps/' + data.instance.slug)
        }
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
