<template>
  <div class="page-details">

    <h1 class="title bit">{{ item.name }}</h1>

    <h2 class="subtitle">
      <span v-if="size">{{ size.label }}</span> keyboard
      <span v-if="item.manufacturer">
        manufactured by {{ item.manufacturer.name }}
      </span>
    </h2>

    <div class="purchase">

      <span
        v-if="item.availability !== null"
        :class="availabilityClass(item.availability)"
        class="tag is-light bit availability"
      >
        {{ optionLabel('availability', item.availability) }}
      </span>
      <span
        v-if="item.price"
        class="tag"
      >
        $ {{ item.price }}
      </span>

    </div>

    <div
      v-if="item.photos.length > 0"
      class="photos has-text-centered"
    >
      <img
        :src="uploadUrl + item.photos[0]"
        @click="photoModal = 0"
      >
      <div
        v-if="item.photos.length > 1"
        class="columns is-mobile"
      >
        <div
          v-for="(photo, i) in item.photos"
          v-show="i > 0"
          :key="photo"
          class="column"
        >
          <img
            :src="uploadUrl + photo"
            @click="photoModal = i"
          >
        </div>
      </div>
    </div>

    <b-modal
      :active="photoModal >= 0"
      @close="closeModal"
    >
      <div class="nb-count">
        {{ photoModal + 1 }}/{{ item.photos.length }}
      </div>

      <p class="image">
        <img :src="uploadUrl + item.photos[photoModal]">
      </p>
      <br>
      <div class="has-text-centered nav-icons">
        <b-icon
          icon="arrow-left-drop-circle-outline"
          size="is-medium"
          @click.native="moveModal(-1)"
        />
        <b-icon
          icon="arrow-right-drop-circle-outline"
          size="is-medium"
          @click.native="moveModal(1)"
        />
      </div>
    </b-modal>

    <div class="columns">
      <div
        v-if="item.text"
        class="quill-content column is-two-thirds-tablet is-three-quarters-widescreen"
        v-html="item.text"
      />
      <div class="column  ">
        <table class="table is-narrow details is-fullwidth">
          <tbody>

            <tr v-if="item.switches.length || item.keycaps || item.cable || item.pcb || item.firmware || item.interface || item.dimensions || item.weight">
              <th colspan="2">Specs</th>
            </tr>

            <tr v-if="item.switches.length">
              <td>Switch options:</td>
              <td>
                <div
                  v-for="sw in item.switches"
                  :key="sw._id"
                >
                  <nuxt-link :to="'/switches/' + sw.slug">
                    {{ sw.name }}
                  </nuxt-link>
                </div>
              </td>
            </tr>
            <tr v-if="item.keycaps">
              <td>Default Keycaps:</td>
              <td>
                {{ item.keycaps }}
              </td>
            </tr>
            <tr v-if="item.cable">
              <td>Cable:</td>
              <td>
                {{ item.cable }}
              </td>
            </tr>
            <tr v-if="item.pcb">
              <td>PCB:</td>
              <td>
                {{ item.pcb }}
              </td>
            </tr>
            <tr v-if="item.firmware">
              <td>Firmware:</td>
              <td>
                {{ item.firmware }}
              </td>
            </tr>
            <tr v-if="item.interface">
              <td>Interface:</td>
              <td>
                {{ item.interface }}
              </td>
            </tr>
            <tr v-if="item.dimensions">
              <td>Dimensions:</td>
              <td>
                {{ item.dimensions }}
              </td>
            </tr>
            <tr v-if="item.weight">
              <td>Weight:</td>
              <td>
                {{ item.weight }}
              </td>
            </tr>

            <tr v-if="item.programmable !== null || item.simultaneousInput !== null || item.bluetooth !== null || item.hotswappable !== null || item.backlighting !== null || item.rgb !== null">
              <th colspan="2">Features</th>
            </tr>

            <tr v-if="item.programmable !== null">
              <td>Programmable:</td>
              <td>
                {{ item.programmable }}
              </td>
            </tr>
            <tr v-if="item.simultaneousInput !== null">
              <td>Simultaneous Key Input:</td>
              <td>
                {{ item.simultaneousInput ? 'Yes' : 'No' }}
              </td>
            </tr>
            <tr v-if="item.bluetooth !== null">
              <td>Bluetooth:</td>
              <td>
                {{ item.bluetooth ? 'Yes' : 'No' }}
              </td>
            </tr>
            <tr v-if="item.hotswappable !== null">
              <td>Hotswappable:</td>
              <td>
                {{ item.hotswappable ? 'Yes' : 'No' }}
              </td>
            </tr>
            <tr v-if="item.backlighting !== null">
              <td>Backlighting:</td>
              <td>
                {{ item.backlighting ? 'Yes' : 'No' }}
              </td>
            </tr>
            <tr v-if="item.rgb !== null">
              <td>RGB:</td>
              <td>
                {{ item.rgb ? 'Yes' : 'No' }}
              </td>
            </tr>

            <tr v-if="item.keysLayout !== null || item.layout !== null || item.spacebarSize !== null">
              <th colspan="2">Layout</th>
            </tr>

            <tr v-if="item.keysLayout !== null">
              <td>Keys Layout:</td>
              <td>
                {{ optionLabel('keysLayouts', item.keysLayout) }}
              </td>
            </tr>
            <tr v-if="item.layout !== null">
              <td>Layout:</td>
              <td>
                {{ optionLabel('layouts', item.layout) }}
              </td>
            </tr>
            <tr v-if="item.spacebarSize !== null">
              <td>Spacebar size:</td>
              <td>
                {{ item.spacebarSize }}
              </td>
            </tr>

            <tr v-if="item.angle !== null || item.usbPassthrough !== null">
              <th colspan="2">Design</th>
            </tr>

            <tr v-if="item.angle !== null">
              <td>Slope/Typing Angle:</td>
              <td>
                {{ item.angle }}°
              </td>
            </tr>
            <tr v-if="item.usbPassthrough !== null">
              <td>USB Passthrough:</td>
              <td>
                {{ item.usbPassthrough ? 'Yes' : 'No' }}
              </td>
            </tr>

            <tr v-if="item.caseMaterial !== null || item.plateMaterial !== null || item.unitsMade">
              <th colspan="2">Manufacturing Details</th>
            </tr>

            <tr v-if="item.caseMaterial !== null">
              <td>Case Material:</td>
              <td>
                {{ item.caseMaterial }}
              </td>
            </tr>
            <tr v-if="item.plateMaterial !== null">
              <td>Plate Material:</td>
              <td>
                {{ item.plateMaterial }}
              </td>
            </tr>
            <tr v-if="item.unitsMade">
              <td>Units made:</td>
              <td>
                {{ item.unitsMade }}
              </td>
            </tr>

          </tbody>
        </table>
      </div>

    </div>


    <div style="clear: both"/>
  </div>
</template>

<script>
import _ from 'lodash'

import options from '@/assets/configuration/options'

export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data () {
    return {
      photoModal: -1,
      photosModalActive: false,
    }
  },
  computed: {
    size () {
      return _.find(options.keyboardSizes, { value: this.item.size})
    },
  },
  mounted () {
    window.addEventListener('keyup', this.keyupHandler)
  },
  beforeDestroy () {
    window.removeEventListener('keyup', this.keyupHandler)
  },
  methods: {
    availabilityClass (value) {
      switch (value) {
        case 'available': return 'is-success'
        case 'IC': return 'is-info'
        case 'GB': return 'is-success'
        case 'GBend': return 'is-warning'
        case 'end': return 'is-warning'
        default: return null
      }
    },
    optionLabel (opt, value) {
      if (!options[opt]) return null
      const option = _.find(options[opt], { value })
      return option ? option.label : null
    },
    closeModal () {
      this.photoModal = -1
    },
    moveModal (direction) {
      const value = this.photoModal + direction
      if (value >= 0 && value < this.item.photos.length) {
        this.photoModal = value;
      }
    },
    keyupHandler (event) {
      if (this.photoModal < 0) return

      if (event.keyCode === 37 && this.photoModal > 0) {
        this.photoModal--
      } else if (event.keyCode === 39 && this.photoModal < (this.item.photos.length - 1)) {
        this.photoModal++
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.nav-icons {
  position: fixed;
  top: 50%;
  left: 0;
  margin-top: -20px;
  color: #fff;
  width: 100%;
  .icon {
    font-size: 40px;
    position: absolute;
    cursor: pointer;
    &:first-child {
      left: 1em;
    }
    &:last-child {
      right: 1em;
    }
  }
}
.nb-count {
  text-align: center;
  font-weight: bold;
  color: $light;
  font-size: .8em;
  padding-bottom: 1em;
}
</style>
