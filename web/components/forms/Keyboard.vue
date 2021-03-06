<template>
  <div
    v-if="data"
    class="container"
  >

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

    <UserNotVerified/>

    <div class="columns">
      <div class="column mandatory-field">

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

    <b-field
      label="Photos"
    />

    <PhotosField v-model="data.photos" />

    <h2 class="bit">Text</h2>

    <div
      v-quill:myQuillEditor="quillOpts"
      :content="data.text"
      class="quill-editor"
      @change="data.text = $event.html"
    />

    <h2 class="bit">Specs</h2>

    <AutocompleteMultiField
      v-model="data.switches"
      dataset="Switch"
      label="Switch options"
    />

    <OptionsField
      :options="options.keyboardKeycaps"
      v-model="data.keycaps"
      label="Default Keycaps"
      allow-other
    />

    <b-field label="Cable">
      <b-input v-model="data.cable"/>
    </b-field>

    <b-field label="PCB">
      <b-input v-model="data.pcb"/>
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

    <div class="columns">
      <div class="column">

        <OptionsField
          :options="options.keyboardProgrammable"
          v-model="data.programmable"
          label="Programmable"
        />

      </div>
      <div class="column">

        <OptionsField
          v-model="data.simultaneousInput"
          label="Simultaneous Key Input"
          checkbox
        />

      </div>
    </div>

    <div class="columns">
      <div class="column">

        <OptionsField
          v-model="data.bluetooth"
          label="Bluetooth"
          checkbox
        />

      </div>
      <div class="column">

        <OptionsField
          v-model="data.hotswappable"
          label="Hotswappable"
          checkbox
        />

      </div>
    </div>

    <div class="columns">
      <div class="column is-narrow">

        <OptionsField
          v-model="data.backlighting"
          label="Backlighting"
          checkbox
        />

      </div>
      <div
        v-show="data.backlighting"
        class="column"
      >

        <OptionsField
          v-model="data.rgb"
          label="RGB"
          checkbox
        />

      </div>
    </div>

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
      :type="{'is-danger': errors.has('angle')}"
      :message="errors.first('angle') || 'In degrees (°), numbers only.'"
      label="Slope/Typing Angle"
    >
      <b-input
        v-validate="'decimal:1'"
        v-model="data.angle"
        name="angle"
      />
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

    <b-field label="Units made">
      <b-input v-model="data.unitsMade"/>
    </b-field>


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
import options from '@/assets/configuration/options'

import mixin from './_mixin'
import AutocompleteField from '@/components/formFields/Autocomplete'
import AutocompleteMultiField from '@/components/formFields/AutocompleteMulti'
import OptionsField from '@/components/formFields/Options'
import PhotosField from '@/components/formFields/Photos'

export default {
  components: {
    AutocompleteField,
    AutocompleteMultiField,
    OptionsField,
    PhotosField,
  },
  mixins: [mixin],
  data () {
    return {
      options,
    }
  },
  created () {
    this.initData({
      name: '',
      text: '',
      photos: [],
      manufacturer: null,
      size: '',
      price: '',
      // specs
      switches: [],
      keycaps: '',
      cable: '',
      pcb: '',
      firmware: '',
      interface: '',
      dimensions: '',
      weight: '',
      // features
      programmable: null,
      simultaneousInput: null,
      bluetooth: null,
      hotswappable: null,
      backlighting: null,
      rgb: null,
      // layout
      keysLayout: null,
      layout: null,
      spacebarSize: null,
      // design
      usbPassthrough: null,
      angle: '',
      // manufacturing
      caseMaterial: null,
      plateMaterial: null,
      unitsMade: '',
      // purchase
      availability: null,
    })
  },
}
</script>

<style lang="scss" scoped>
h1 {
  margin-bottom: 1.4em;
}
h2 {
  margin: 2em 0 1em;
  font-size: 1.1em;
  background: $dark-medium;
  color: #fff;
  padding: .8em .6em;
}
p.control {
  top: -.5em;
}
</style>
