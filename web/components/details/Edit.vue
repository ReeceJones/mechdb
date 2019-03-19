<template>
  <div>

    <KeyboardDetails
      v-if="model === 'Keyboard'"
      :item="item"
    />

    <KeycapDetails
      v-else-if="model === 'Keycap'"
      :item="item"
    />

    <SwitchDetails
      v-else-if="model === 'Switch'"
      :item="item"
    />

  </div>

</template>

<script>
import KeyboardDetails from '@/components/details/Keyboard'
import KeycapDetails from '@/components/details/Keycap'
import SwitchDetails from '@/components/details/Switch'

export default {
  components: {
    KeyboardDetails,
    KeycapDetails,
    SwitchDetails,
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
