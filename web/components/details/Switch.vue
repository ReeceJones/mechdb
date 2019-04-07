<template>
  <div class="page-details">

    <h1 class="title bit">{{ item.name }}</h1>

    <h2 class="subtitle">
      <span v-if="item.type">{{ item.type }}</span> switch
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

            <tr v-if="item.stemType || item.housingColor || item.stemColor || item.actuationForce || item.bottomOutForce || item.travelLength">
              <th colspan="2">Specs</th>
            </tr>

            <tr v-if="item.stemType">
              <td>Stem Type:</td>
              <td>
                {{ item.stemType }}
              </td>
            </tr>
            <tr v-if="item.housingColor">
              <td>Housing Color:</td>
              <td>
                {{ item.housingColor }}
              </td>
            </tr>
            <tr v-if="item.stemColor">
              <td>Stem Color:</td>
              <td>
                {{ item.stemColor }}
              </td>
            </tr>
            <tr v-if="item.actuationForce">
              <td>Actuation Force:</td>
              <td>
                {{ item.actuationForce }}
              </td>
            </tr>
            <tr v-if="item.bottomOutForce">
              <td>Bottom Out Force:</td>
              <td>
                {{ item.bottomOutForce }}
              </td>
            </tr>
            <tr v-if="item.travelLength">
              <td>Travel Length:</td>
              <td>
                {{ item.travelLength }}
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
