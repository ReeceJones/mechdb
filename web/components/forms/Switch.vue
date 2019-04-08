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

    <div class="columns">
      <div class="column">

        <OptionsField
          :options="options.switchTypes"
          v-model="data.type"
          label="Type"
        />

      </div>
      <div class="column">

        <OptionsField
          :options="options.stemTypes"
          v-model="data.stemType"
          label="Stem Types"
        />

      </div>
    </div>

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

        <b-field label="Housing Color">
          <b-input v-model="data.housingColor"/>
        </b-field>

      </div>
      <div class="column">

        <b-field label="Stem Color">
          <b-input v-model="data.stemColor"/>
        </b-field>

      </div>
    </div>

    <div class="columns">
      <div class="column">

        <b-field
          :type="{'is-danger': errors.has('actuationForce')}"
          :message="errors.first('actuationForce')"
          label="Actuation Force (g)"
        >
          <b-input
            v-validate="'numeric'"
            v-model="data.actuationForce"
            name="actuationForce"
          />
        </b-field>

      </div>
      <div class="column">

        <b-field
          :type="{'is-danger': errors.has('bottomOutForce')}"
          :message="errors.first('bottomOutForce')"
          label="Bottom Out Force (g)"
        >
          <b-input
            v-validate="'numeric'"
            v-model="data.bottomOutForce"
            name="bottomOutForce"
          />
        </b-field>

      </div>
      <div class="column">

        <b-field
          :type="{'is-danger': errors.has('travelLength')}"
          :message="errors.first('travelLength')"
          label="Travel Length (mm)"
        >
          <b-input
            v-validate="'decimal:1'"
            v-model="data.travelLength"
            name="travelLength"
          />
        </b-field>

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
import OptionsField from '@/components/formFields/Options'
import PhotosField from '@/components/formFields/Photos'

export default {
  components: {
    AutocompleteField,
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
      type: null,
      stemType: null,
      // specs
      housingColor: '',
      stemColor: '',
      actuationForce: '',
      bottomOutForce: '',
      travelLength: '',
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
