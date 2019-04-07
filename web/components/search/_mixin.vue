<script>
import _ from 'lodash'

export default {
  props: {
    nbResults: {
      type: Number,
      default: () => null,
    },
  },
  data () {
    return {
      defaultFields: null,
      searchFields: null,
      showFields: false,
    }
  },
  computed: {
    searchQuery () {
      return _.pickBy(this.searchFields, i => i !== null)
    },
    hasFilters () {
      return Object.keys(this.searchQuery).length
    },
  },
  methods: {
    search () {
      this.$router.push({ query: this.searchQuery })
      this.showFields = false
    },
    reset () {
      this.searchFields = JSON.parse(JSON.stringify(this.defaultFields))
      this.search()
    },
    initSearchFields (defaultFields) {
      this.defaultFields = defaultFields
      const searchFields = {
        ...JSON.parse(JSON.stringify(defaultFields)),
        ..._.mapValues(this.$route.query, value => {
          if (value === 'true') return true
          if (value === 'false') return false
          return value
        })
      }
      this.searchFields = searchFields
    },
  },
}
</script>
