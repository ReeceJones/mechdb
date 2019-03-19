<template>
  <div>

    <KeycapDetails
      v-if="model === 'Keycap'"
      :item="item"
    />

  </div>

</template>

<script>
import KeycapDetails from '@/components/details/Keycap'

export default {
  components: {
    KeycapDetails,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
  },
}
</script>
