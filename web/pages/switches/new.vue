<template>
  <form @submit.prevent="saveData">
    <Form
      :is-loading="isLoading"
      title="New Switch"
      @save="saveData"
    />
  </form>
</template>

<script>
import Form from '@/components/forms/Switch.vue'

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
        const { data } = await this.$api.post('/edits/Switch', saveData)
        if (this.$store.getters['user/isNotVerified']) {
          this.$router.push('/edits/pending?id=' + data.edit._id)
        } else {
          this.$toast.open('Switch created')
          this.$router.push('/switches/' + data.instance.slug)
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
