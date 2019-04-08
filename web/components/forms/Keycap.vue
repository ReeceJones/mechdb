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
          v-model="data.designer"
          dataset="Designer"
          label="Designer"
        />

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
      :options="options.keycapProfile"
      v-model="data.profile"
      label="Profile"
      allow-other
    />

    <OptionsField
      :options="options.stemTypes"
      v-model="data.stemType"
      label="Stem type"
      allow-other
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

    <div class="columns">
      <div class="column">

        <OptionsField
          :options="options.keycapMaterial"
          v-model="data.material"
          label="Material"
          allow-other
        />

      </div>
      <div class="column">

        <OptionsField
          v-model="data.sidePrint"
          label="Side print"
          checkbox
        />

      </div>
      <div class="column">

        <OptionsField
          v-model="data.backlighting"
          label="Backlighting"
          checkbox
        />

      </div>
    </div>

    <OptionsField
      :options="options.keycapPrintMethods"
      v-model="data.printMethod"
      label="Print Method"
      allow-other
    />

    <b-field label="Available Kits">
      <b-message type="is-warning">TODO</b-message>
    </b-field>

    <h2 class="bit">Design</h2>

    <div class="columns">
      <div class="column">

        <AutocompleteMultiField
          v-model="data.baseColors"
          dataset="Color"
          label="Base colors"
        />

      </div>
      <div class="column">

        <AutocompleteMultiField
          v-model="data.textColors"
          dataset="Color"
          label="Text colors"
        />

      </div>
    </div>

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
      designer: null,
      manufacturer: null,
      profile: null,
      stemType: null,
      // specs
      material: null,
      printMethod: null,
      sidePrint: null,
      backlighting: null,
      kits: [],
      // design
      baseColors: [],
      textColors: [],
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
