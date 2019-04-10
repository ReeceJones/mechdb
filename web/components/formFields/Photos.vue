<template>
  <div>

    <div
      v-if="value.length > 0"
      class="photos"
    >
      <draggable
        :list="value"
        class="columns is-multiline"
      >
        <div
          v-for="(url, i) in value"
          :key="i"
          class="column is-one-fifth"
        >
          <div class="card image-card">
            <div class="card-content">
              <img
                :src="uploadUrl + url"
                class="click"
                @click="photoModal = i"
              >
              <button
                class="button"
                @click.prevent="removeItem(i)"
              >
                <b-icon
                  type="is-danger"
                  size="is-small"
                  icon="delete"
                />
              </button>
            </div>
          </div>
        </div>
        <div style="clear: left"/>
      </draggable>
    </div>

    <b-modal
      :active="photoModal >= 0"
      @close="closeModal"
    >
      <p class="image">
        <img :src="uploadUrl + value[photoModal]">
      </p>
    </b-modal>

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
import draggable from 'vuedraggable'

export default {
  components: {
    draggable,
  },
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
      photoModal: -1,
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
    closeModal () {
      this.photoModal = -1
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
.image-card {
  &:hover {
    .button {
      display: inline-block;
    }
  }
  .button {
    display: none;
    position: absolute;
    top: .75em;
    right: .75em;
    padding: 0 0.2em 0 0.7em;
    span {
      margin: 0;
    }
  }
  &:hover {
    cursor: move;
    background: $light;
  }
}
.card-content {
  padding: 1em;
}
.click:hover {
  cursor: pointer;
}
</style>
