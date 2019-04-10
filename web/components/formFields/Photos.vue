<template>
  <div>

    <div
      v-if="value.length > 0"
      class="photos"
    >
      <!-- <div
        v-for="(url, i) in value"
        :key="i"
        class="item"
        @click="removeItem(i)"
      >
        <img :src="uploadUrl + url">
      </div> -->
      <div class="columns is-multiline">
        <div
          v-for="(url, i) in value"
          :key="i"
          class="column is-one-fifth"
        >
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">
                {{ url }}
              </p>
              <div 
                class="card-header-icon"
                @click="removeItem(i)"
              >
                <b-icon 
                  type="is-danger"
                  size="is-small"
                  icon="delete"
                />
              </div>
            </header>
            <div class="card-content">
              <img :src="uploadUrl + url">
            </div>
          </div>
        </div>
        <div style="clear: left"/>
      </div>
    </div>

    <br>


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
      let updatedValue = JSON.parse(JSON.stringify(this.value))
      this.isLoading = true

      async.each(files, (file, cb) => {
        const reader = new FileReader()
        reader.onload = async () => {
          try {
            const photo = reader.result
            const { data } = await this.$api.post('upload', {
              data: photo
            })
            updatedValue.push(data.filename)
            cb()
          } catch (err) {
            cb(err)
          }
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
        this.$emit('input', updatedValue)
        this.isLoading = false
      })
    },
    removeItem (index) {
      if (!confirm('Remove ?')) return
      let updatedValue = JSON.parse(JSON.stringify(this.value))
      updatedValue.splice(index, 1)
      this.$emit('input', updatedValue)
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
    background: $light;
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
</style>
