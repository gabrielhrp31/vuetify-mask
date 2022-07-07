<template>
  <div>
    <v-text-field-simplemask
      v-model="value"
      v-bind:label="label"
      mask="#### #### #### ####"
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
    value: "1234432112344321",
    label: "Credit Card"
  })
};
</script>
