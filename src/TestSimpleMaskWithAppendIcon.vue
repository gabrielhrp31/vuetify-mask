<template>
  <div>
    <v-text-field-simplemask
      v-model="value"
      v-bind:label="label"
      mask="XX-XXXX-XXXX-XXX"
      @click:append="alert"
    />
    v-model:
    {{
      value !== null && value !== ""
        ? value
        : value === null
        ? "null"
        : value === ""
        ? "''"
        : ""
    }}
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
  }),
  methods: {
    alert() {
      alert("aaaaaaaaaa");
    }
  }
};
</script>
