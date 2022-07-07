<template>
  <div>
    <v-text-field-simplemask mask="XX-XXXX-XXXX-XXX" v-model="value" />
    {{ value }}
  </div>
</template>

<script>
import SimpleMask from "@/components/SimpleMask.vue";

export default {
  components: {
    "v-text-field-simplemask": SimpleMask
  },
  data: () => ({
    value: "23-A568-B953-356", // 1.23 or "1.23" or "" or null
    label: "Simple Mask"
  })
};
</script>
