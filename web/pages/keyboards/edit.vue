<template>
  <form @submit.prevent="saveData">
    <Form
      :values="item"
      :is-loading="isLoading"
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
      item: null,
    }
  },
  watch: {
    '$route.query.slug' () {
      this.getData()
    },
  },
  created () {
    this.getData()
  },
  methods: {
    async getData () {
      try {
        const { data } = await this.$api.get('/keyboards/edit/' + this.$route.query.slug)
        this.item = data
      } catch (e) {
        this.apiError(e)
      }
    },
    async saveData (updateData) {
      if (this.isLoading) return

      this.isLoading = true
      try {
        const { data } = await this.$api.post('/edits/Keyboard/' + this.item._id, updateData)
        if (this.$store.getters['user/isNotVerified']) {
          this.$router.push('/edits/pending?id=' + data.edit._id)
        } else {
          this.$toast.open('Changes saved')
          this.$router.push('/keyboards/' + data.instance.slug)
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
