<template>
  <div>
    <v-text-field
      v-model="cmpValue"
      v-bind:label="label"
      v-bind="properties"
      v-bind:maxlength="options.length"
      v-on:keypress="keyPress"
      @paste.stop="paste"
      v-on="cmpListeners"
      ref="ref"
    >
      <template v-for="(_, name) in $scopedSlots" v-slot:[name]="slotData">
        <slot :name="name" v-bind="slotData" />
      </template>
      <template v-for="(_, someOtherName) in $slots" v-slot:[someOtherName]>
        <slot :name="someOtherName" />
      </template>
    </v-text-field>
  </div>
</template>

<script>
export default {
  model: { prop: "value", event: "input" },
  props: {
    value: {
      type: [String, Number],
      default: ""
    },
    label: {
      type: String,
      default: ""
    },
    properties: {
      type: Object,
      default: function() {
        return {};
      }
    },
    options: {
      type: Object,
      default: function() {
        return {
          length: 10,
          empty: "",
          applyAfter: false
        };
      }
    }
  },
  data: () => ({}),
  /*
   v-model="cmpValue": Dessa forma, ao digitar, o valor é atualizado automaticamente no componente pai.
   O valor digitado entra pelo newValue do Set é emitido para o componente pai, retorna pelo get e pára.
  */
  computed: {
    cmpListeners() {
      const listeners = { ...this.$listeners };
      delete listeners.input;
      return listeners;
    },
    cmpValue: {
      get: function() {
        return this.humanFormat(this.value);
      },
      set: function(newValue) {
        this.$emit("input", this.machineFormat(newValue));
      }
    }
  },
  watch: {},
  methods: {
    paste: function(e) {
      e.preventDefault();
      const clipboardData = e.clipboardData || window.clipboardData;
      if (!clipboardData) return;
      const pastedData =
        clipboardData.getData("text/plain") ||
        clipboardData.getData("Text") ||
        "";
      const valor = this.machineFormat(pastedData);
      if (valor === this.value) return;
      this.$emit("input", valor);
    },
    humanFormat: function(value) {
      if (value !== null && value !== undefined && value !== "") {
        return this.formatValue(value);
      }
      return this.options.empty == null ? "" : this.options.empty;
    },

    machineFormat(value) {
      if (value) {
        value = this.formatValue(value);
        if (value === "") {
          return this.options.empty;
        }
        // Apply the mask only after filling
        if (this.options.applyAfter) {
          if (value.length !== this.options.length) {
            // Keep partial value so paste/typing is not wiped to empty/null
            return value;
          }
          this.$emit("masked");
        }
      } else {
        value = this.options.empty;
      }
      return value;
    },

    formatValue: function(value) {
      return value;
    },

    keyPress($event) {
      // console.log($event.keyCode); //keyCodes value
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        // if (keyCode < 48 || keyCode > 57) {
        // 46 is dot
        $event.preventDefault();
      }
    },

    clearValue: function(value) {
      let result = "";
      if (value) {
        let arrayValue = value.toString().split("");
        for (var i = 0; i < arrayValue.length; i++) {
          if (this.isInteger(arrayValue[i])) {
            result = result + arrayValue[i];
          }
        }
      }
      return result;
    },

    isInteger(value) {
      let result = false;
      if (Number.isInteger(parseInt(value))) {
        result = true;
      }
      return result;
    },

    focus() {
      setTimeout(() => {
        this.$refs.ref.focus();
      }, 500);
    }
  }
};
</script>
