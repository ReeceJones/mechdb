<template>
  <div>

    <div
      v-if="value.length > 0"
      class="photos"
    >
      <div
        v-for="(url, i) in value"
        :key="i"
        class="item"
        @click="removeItem(i)"
      >
        <img
          v-if="url.match(/^data:/)"
          :src="url"
        >
        <img
          v-else
          :src="uploadUrl + url"
        >
      </div>
      <div style="clear: left"/>
    </div>

    <div
      v-else
      class="empty"
    >
      No photo
    </div>

    <b-field class="file">

      <b-upload
        v-model="uploaded"
        accept="image/png, image/jpeg"
        multiple
        @input="upload"
      >
        <a class="button bit is-light is-small">
          <b-icon icon="upload"/>
          <span>UPLOAD</span>
        </a>
      </b-upload>

    </b-field>

    <b-loading
      :is-full-page="false"
      :active="isLoading"
    />

  </div>
</template>

<script>
import async from 'async'

export default {
  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },
  data () {
    return {
      uploaded: [],
      isLoading: false,
    }
  },
  methods: {
    upload (files) {
      let urls = []
      this.isLoading = true

      async.each(files, (file, cb) => {
        const reader = new FileReader()
        reader.onload = () => {
          urls.push(reader.result)
          cb()
        }
        reader.onerror = cb
        reader.readAsDataURL(file)
      }, (err) => {
        if (err) {
          this.$toast.open({
            duration: 5000,
            message: `Something wrong happened during the file selection`,
            position: 'is-bottom',
            type: 'is-danger',
          })
        }
        if (urls.length > 0) {
          const value = JSON.parse(JSON.stringify(this.value)).concat(urls)
          this.$emit('input', value)
        }
        this.uploaded.splice(0)
        this.isLoading = false
      })
    },
    removeItem (index) {
      if (!confirm('Remove ?')) return
      let value = JSON.parse(JSON.stringify(this.value))
      value.splice(index, 1)
      this.$emit('input', value)
    },
  },
}
</script>

<style lang="scss" scoped>
.photos {
  .item {
    width: 120px;
    height: 120px;
    padding: 6px;
    border-radius: 2px;
    background: whitesmoke;
    float: left;
    margin-right: 5px;
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    img {
      max-height: 100%;
    }
  }
}
div.empty {
  color: #999;
  font-style: italic;
  padding-bottom: 2em;
}
</style>
