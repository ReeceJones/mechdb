<template>
  <div>

    <button
      class="button bit is-light is-large is-pulled-right"
      @click.prevent="$router.go(-1)"
    >
      CANCEL
    </button>

    <button
      class="button bit is-primary is-large is-pulled-right mr"
      @click.prevent="save"
    >
      SAVE
    </button>

    <h1 class="is-size-4 bit">{{ title }}</h1>

    <b-tabs type="is-boxed">
      <b-tab-item
        label="Configuration"
        icon="settings"
      >

        <div class="columns">
          <div class="column">

            <b-field label="Name">
              <b-input v-model="data.name"/>
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

        <!-- <b-field label="Size">
          <b-select
            v-model="data.size"
            placeholder="Select a size"
          >
            <option
              v-for="(name, id) in sizes"
              :value="id"
              :key="id"
            >
              {{ name }}
            </option>
          </b-select>
        </b-field> -->

        <!--
        <b-field label="Brand">
          <b-select
            v-model="data.brandId"
            placeholder="Select a brand"
          >
            <option
              v-for="item in brands"
              :value="item.id"
              :key="item.id"
            >
              {{ item.name }}
            </option>
          </b-select>
        </b-field>
        <p class="control">
          <button
            class="button is-light is-small bit"
            @click.prevent="addBrand"
          >
            + Add
          </button>
        </p>
        -->

      </b-tab-item>
      <b-tab-item
        label="Text"
        icon="text-subject"
      >

        <div
          v-quill:myQuillEditor="quillOpts"
          :content="data.text"
          class="quill-editor"
          @change="onEditorChange($event)"
        />

      </b-tab-item>
      <b-tab-item
        label="Photos"
        icon="image-filter"
      >

        <PhotosUpload v-model="data.photos" />

      </b-tab-item>
    </b-tabs>

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

import BrandModalAdd from '@/components/modals/BrandAdd'
import ManufacturerPicker from '@/components/forms/ManufacturerPicker'
import PhotosUpload from '@/components/forms/PhotosUpload'

const defaultData = {
  name: '',
  description: '',
  text: '',
  size: null,
  brandId: null,
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
      default: 'Edit Keyboard',
    },
    values: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      brands: [],
      data: JSON.parse(JSON.stringify(defaultData)),
      manufacturerName: '',
      manufacturers: [],
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
    await this.getOptions()
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
    async getOptions () {
      try {
        const { data: brandsData } = await this.$api.get('brands')
        this.brands = brandsData
        const { data: manufacturersData } = await this.$api.get('manufacturers')
        this.manufacturers = manufacturersData
      } catch (error) {
        throw error
      }
    },
    addBrand () {
      this.$modal.open({
        parent: this,
        component: BrandModalAdd,
        events: {
          add: (item) => {
            this.brands.push(item)
            this.data.brandId = item.id
          },
        },
      })
    },
    onEditorChange($event) {
      this.data.text = $event.html
    },
    save () {
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
p.control {
  top: -.5em;
}
</style>
