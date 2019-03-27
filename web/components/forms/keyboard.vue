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

        <AutocompleteField
          v-model="data.manufacturer"
          dataset="Manufacturer"
          label="Manufacturer"
        />

      </div>
    </div>

    <OptionsField
      :options="options.keyboardSizes"
      v-model="data.size"
      label="Size"
    />

    <OptionsField
      :options="options.keyboardPrices"
      v-model="data.price"
      label="Price range (USD)"
    />

    <h2 class="bit">Photos</h2>

    <PhotosField v-model="data.photos" />

    <h2 class="bit">Specs</h2>

    <AutocompleteMultiField
      v-model="data.switches"
      dataset="Switch"
      label="Switch options"
    />

    <b-field
      label="Keycaps"
      type="is-warning"
    >
      <b-input/>
    </b-field>

    <b-field label="Cable">
      <b-input v-model="data.cable"/>
    </b-field>

    <b-field
      label="PCB"
      type="is-warning"
    >
      <b-input/>
    </b-field>

    <OptionsField
      :options="options.keyboardFirmwares"
      v-model="data.firmware"
      label="Firmware"
      allow-other
    />

    <OptionsField
      :options="options.keyboardInterfaces"
      v-model="data.interface"
      label="Interface"
      allow-other
    />

    <div class="columns">
      <div class="column">
        <b-field label="Dimensions">
          <b-input v-model="data.dimensions"/>
        </b-field>
      </div>
      <div class="column">
        <b-field label="Weight">
          <b-input v-model="data.weight"/>
        </b-field>
      </div>
    </div>

    <h2 class="bit">Features</h2>

    <OptionsField
      :options="options.keyboardProgrammable"
      v-model="data.programmable"
      label="Programmable"
    />

    <OptionsField
      v-model="data.bluetooth"
      label="Bluetooth"
      checkbox
    />

    <b-field
      label="Lighting"
      type="is-warning"
    >
      <b-input/>
    </b-field>

    <OptionsField
      v-model="data.hotswappable"
      label="Hotswappable"
      checkbox
    />

    <OptionsField
      v-model="data.simultaneousInput"
      label="Simultaneous Key Input"
      checkbox
    />

    <h2 class="bit">Layout</h2>

    <OptionsField
      :options="options.keysLayouts"
      v-model="data.keysLayout"
      label="Keys Layout"
    />

    <OptionsField
      :options="options.layouts"
      v-model="data.layout"
      label="Layout"
    />

    <OptionsField
      :options="options.spacebarSizes"
      v-model="data.spacebarSize"
      label="Spacebar size"
      allow-other
    />

    <h2 class="bit">Design</h2>

    <b-field
      label="Colors"
      type="is-warning"
    >
      <b-input/>
    </b-field>

    <b-field
      label="Slope/Typing Angle"
      type="is-warning"
    >
      <b-input/>
    </b-field>

    <OptionsField
      v-model="data.usbPassthrough"
      label="USB Passthrough"
      checkbox
    />

    <h2 class="bit">Manufacturing Details</h2>

    <OptionsField
      :options="options.caseMaterials"
      v-model="data.caseMaterial"
      label="Case Material"
      allow-other
    />

    <OptionsField
      :options="options.plateMaterials"
      v-model="data.plateMaterial"
      label="Plate Material"
      allow-other
    />

    <b-field
      label="Units Made"
      type="is-warning"
    >
      <b-input/>
    </b-field>

    <h2 class="bit">Text</h2>

    <div
      v-quill:myQuillEditor="quillOpts"
      :content="data.text"
      class="quill-editor"
      @change="onEditorChange($event)"
    />

    <h2 class="bit">Purchase</h2>

    <OptionsField
      :options="options.availability"
      v-model="data.availability"
      label="Availability"
    />

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

import options from '@/assets/configuration/options'

import AutocompleteField from '@/components/formFields/Autocomplete'
import AutocompleteMultiField from '@/components/formFields/AutocompleteMulti'
import OptionsField from '@/components/formFields/Options'
import PhotosField from '@/components/formFields/Photos'

const defaultData = {
  name: '',
  text: '',
  photos: [],
  manufacturer: null,
  size: '',
  price: '',
  // specs
  switches: [],
  cable: '',
  firmware: '',
  interface: '',
  dimensions: '',
  weight: '',
  // features
  programmable: '',
  bluetooth: null,
  hotswappable: null,
  simultaneousInput: null,
  // layout
  keysLayout: '',
  layout: '',
  spacebarSize: '',
  // design
  usbPassthrough: null,
  // manufacturing
  caseMaterial: '',
  plateMaterial: '',
  // purchase
  availability: '',
}

export default {
  components: {
    AutocompleteField,
    AutocompleteMultiField,
    OptionsField,
    PhotosField,
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
      options,
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
  async created () {
    this.getData()
  },
  methods: {
    getData () {
      this.data = JSON.parse(JSON.stringify(defaultData))

      if (this.values) {
        Object.keys(defaultData).forEach(key => {
          if (this.values[key] !== undefined) {
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
  background: $dark;
  color: #fff;
  padding: .8em .6em;
}
p.control {
  top: -.5em;
}
</style>
