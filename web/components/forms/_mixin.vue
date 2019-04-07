<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Edit',
    },
    values: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      defaultData: null,
      data: null,
      quillOpts: {
        modules: {
          toolbar: [
            [{ 'header': [false, 2, 3, 4] }],
            ['bold', 'italic', 'underline', 'strike', 'code'],
            [{ 'list': 'bullet'}, { 'list': 'ordered' }],
            ['link', 'blockquote'],
          ],
        },
      },
    }
  },
  watch: {
    values () {
      this.getData()
    },
  },
  methods: {
    initData (defaultData) {
      this.defaultData = defaultData
      this.getData()
    },
    getData () {
      this.data = JSON.parse(JSON.stringify(this.defaultData))

      if (this.values) {
        Object.keys(this.defaultData).forEach(key => {
          if (this.values[key] !== undefined) {
            this.data[key] = this.values[key]
          }
        })
      }
    },
    async save () {
      const isValid = await this.$validator.validateAll()
      if (isValid) {
        this.$emit('save', this.data)
      } else {
        this.$toast.open({
          message: 'There has been errors while validating the form. Please check all the fields highlighted in red.',
          type: 'is-danger',
          position: 'is-bottom',
        })
      }
    },
  },
}
</script>
