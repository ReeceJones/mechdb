<template>
  <div class="page-details">

    <h1 class="title bit">{{ item.name }}</h1>

    <h2 class="title-labels">
      <b-tag
        v-if="item.availability !== null"
        :type="availabilityClass(item.availability)"
      >
        {{ optionLabel('availability', item.availability) }}
      </b-tag>
      <b-taglist
        v-if="item.designer"
        attached
      >
        <b-tag type="is-light">Designer:</b-tag>
        <b-tag type="is-info">{{ item.designer.name }}</b-tag>
      </b-taglist>
      <b-taglist
        v-if="item.manufacturer"
        attached
      >
        <b-tag type="is-light">Manufacturer:</b-tag>
        <b-tag type="is-info">{{ item.manufacturer.name }}</b-tag>
      </b-taglist>
    </h2>

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

            <tr v-if="item.profile">
              <td>Profile:</td>
              <td>
                {{ item.profile }}
              </td>
            </tr>
            <tr v-if="item.designer">
              <td>Designer:</td>
              <td>
                {{ item.designer.name }}
              </td>
            </tr>
            <tr v-if="item.manufacturer">
              <td>Manufacturer:</td>
              <td>
                {{ item.manufacturer.name }}
              </td>
            </tr>

            <tr v-if="item.stemType || item.material || item.printMethod || item.sidePrint || item.backlighting || item.kits.length">
              <th colspan="2">Specs</th>
            </tr>
            <tr v-if="item.stemType">
              <td>Stem Type:</td>
              <td>
                {{ item.stemType }}
              </td>
            </tr>
            <tr v-if="item.material">
              <td>Material:</td>
              <td>
                {{ item.material }}
              </td>
            </tr>
            <tr v-if="item.printMethod">
              <td>Print Method:</td>
              <td>
                {{ item.printMethod }}
              </td>
            </tr>
            <tr v-if="item.sidePrint">
              <td>Side Print:</td>
              <td>
                {{ item.sidePrint }}
              </td>
            </tr>
            <tr v-if="item.backlighting">
              <td>Backlighting:</td>
              <td>
                {{ item.backlighting }}
              </td>
            </tr>
            <tr v-if="item.kits.length">
              <td>Available Kits:</td>
              <td>
                <span
                  v-for="(kit, i) in item.kits"
                  :key="'kit' + i"
                >
                  {{ kit }}<template v-if="i < item.kits.length -1">, </template>
                </span>
              </td>
            </tr>

            <tr v-if="item.baseColors.length > 0 || item.textColors.length > 0">
              <th colspan="2">Design</th>
            </tr>
            <tr v-if="item.baseColors.length > 0">
              <td>Base Colors:</td>
              <td>
                <span
                  v-for="(color, i) in item.baseColors"
                  :key="'baseColor' + i"
                >
                  {{ color.name }}<template v-if="i < item.baseColors.length -1">, </template>
                </span>
              </td>
            </tr>
            <tr v-if="item.textColors.length > 0">
              <td>Text Colors:</td>
              <td>
                <span
                  v-for="(color, i) in item.textColors"
                  :key="'textColor' + i"
                >
                  {{ color.name }}<template v-if="i < item.textColors.length -1">, </template>
                </span>
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
