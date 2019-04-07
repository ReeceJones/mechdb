<script>
export default {
  data () {
    return {
      data: [],
    }
  },
  watch: {
    '$route.query': {
      deep: true,
      handler () {
        this.getItems()
      },
    },
  },
  created () {
    this.getItems()
  },
  methods: {
    async getItems () {
      try {
        const { data } = await this.$api.get(this.endpoint, {
          params: this.$route.query,
        })
        this.data = data
      } catch (e) {
        this.apiError(e)
      }
    },
    photoBackground (photos) {
      if (photos && photos.length > 0) {
        return {
          'background-image': `url(${process.env.uploadUrl + photos[0]})`
        }
      }
    },
  },
}
</script>
