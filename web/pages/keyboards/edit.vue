<template>
  <div>
    <Form
      :values="item"
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
  data () {
    return {
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
        const { data } = await this.$api.get('/keyboards/' + this.$route.query.slug)
        this.item = data
      } catch (error) {
        if (error.response && error.response.status === 401) {
          throw new Error('Bad credentials')
        }
        throw error
      }
    },
    async saveData (updateData) {
      try {
        const { data } = await this.$api.post('/keyboards/' + this.item.id, updateData)
        this.$toast.open('Changes saved')
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
