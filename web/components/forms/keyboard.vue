<template>
  <div>

    <div class="topright">
      <button
        class="button bit is-primary"
        @click.prevent="save"
      >
        SAVE
      </button>
      <button
        class="button bit is-light"
        @click.prevent="$router.go(-1)"
      >
        CANCEL
      </button>
    </div>

    <h1 class="is-size-4 bit">{{ title }}</h1>

    <div class="columns">
      <div class="column">

        <b-field
          :type="{'is-danger': errors.has('name')}"
          :message="errors.first('name')"
          label="Name"
        >
          <b-input
            v-validate="'required'"
            v-model="data.name"
            name="name"
          />
        </b-field>

      </div>
      <div class="column">

        <ManufacturerPicker
          :value="data.manufacturerId"
          @select="data.manufacturerId = $event"
        />

      </div>
    </div>

    <b-field label="Description">
      <textarea
        v-model="data.description"
        class="textarea"
        placeholder="Enter a short description here"
        rows="3"
      />
    </b-field>

    <b-field label="Size"/>
    <b-field>
      <b-radio-button
        v-for="(name, id) in sizes"
        v-model="data.size"
        :native-value="id"
        :key="id"
      >
        {{ name }}
      </b-radio-button>
    </b-field>

    <h2 class="bit">Text</h2>

    <div
      v-quill:myQuillEditor="quillOpts"
      :content="data.text"
      class="quill-editor"
      @change="onEditorChange($event)"
    />

    <h2 class="bit">Photos</h2>

    <PhotosUpload v-model="data.photos" />

    <br>
    <br>

    <button
      class="button bit is-primary is-large mr"
      @click.prevent="save"
    >
      SAVE
    </button>

    <button
      class="button bit is-light is-large"
      @click.prevent="$router.go(-1)"
    >
      CANCEL
    </button>

  </div>
</template>

<script>
import _ from 'lodash'
import async from 'async'

import sizes from '@/assets/configuration/boardSizes'

import ManufacturerPicker from '@/components/forms/ManufacturerPicker'
import PhotosUpload from '@/components/forms/PhotosUpload'

const defaultData = {
  name: '',
  description: '',
  text: '',
  size: null,
  manufacturerId: null,
  photos: [],
}

export default {
  components: {
    ManufacturerPicker,
    PhotosUpload,
  },
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
      data: JSON.parse(JSON.stringify(defaultData)),
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
      sizes,
    }
  },
  watch: {
    values () {
      this.getData()
    },
  },
  async created () {
    this.getData()
  },
  methods: {
    getData () {
      this.data = JSON.parse(JSON.stringify(defaultData))

      if (this.values) {
        Object.keys(defaultData).forEach(key => {
          if (this.values[key]) {
            this.data[key] = this.values[key]
          }
        })
      }
    },
    onEditorChange($event) {
      this.data.text = $event.html
    },
    async save () {
      const isValid = await this.$validator.validateAll()
      if (!isValid) return

      const loadingComponent = this.$loading.open()

      async.each(this.data.photos, async (photo, cb) => {
        if (!photo.match(/^data:/)) return cb()

        const { data } = await this.$api.post('upload', {
          data: photo
        })
        const index = this.data.photos.indexOf(photo)
        if (index >= 0) {
          this.data.photos.splice(index, 1, data.filename)
        }
        cb()
      }, () => {
        loadingComponent.close()
        this.$emit('save', this.data)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
h1 {
  margin-bottom: 1em;
}
h2 {
  margin: 2em 0 1em;
  opacity: .8;
  font-size: 1.1em;
  background: whitesmoke;
  padding: .3em .5em;
}
p.control {
  top: -.5em;
}
</style>
