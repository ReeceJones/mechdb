<template>
  <div>
    <h1 class="is-size-4 bit">{{ item.name }}</h1>

    <div class="description mb">
      {{ item.description }}
    </div>

    <div class="sidebar is-pulled-right">

      <div
        v-if="item.photos.length > 0"
        class="sidebar-photos"
      >
        <img :src="uploadUrl + item.photos[0]">
        <span class="is-size-7 label">
          <b-icon
            icon="image-filter"
            size="is-small"
          />
          {{ item.photos.length }} photo{{ item.photos.length > 1 ? 's' : '' }}
        </span>
      </div>

      <div
        v-if="hasSpecs"
        class="sidebar-specs"
      >
        <h4 class="bit">
          SPECS
        </h4>
        <table class="table specs is-narrow is-fullwidth">
          <tbody>
            <tr v-if="item.profile">
              <td>Profile :</td>
              <td>{{ item.profile }}</td>
            </tr>
            <tr v-if="item.manufacturer">
              <td>Manufacturer :</td>
              <td>
                <nuxt-link
                  :to="'/manufacturers/' + item.manufacturer.slug"
                >
                  {{ item.manufacturer.name }}
                </nuxt-link>
              </td>
            </tr>
            <tr v-if="item.brand">
              <td>Brand :</td>
              <td>
                <nuxt-link
                  :to="'/brands/' + item.brand.slug"
                >
                  {{ item.brand.name }}
                </nuxt-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>

    <div
      v-if="item.text"
      class="quill-content"
      v-html="item.text"
    />

    <div style="clear: both"/>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    hasSpecs () {
      return this.item.profile || this.item.manufacturer || this.item.brand
    },
  },
}
</script>
