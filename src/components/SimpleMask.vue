<template>
  <v-text-field
    type="text"
    v-mask="config"
    :value="display"
    @input="onInput"
    ref="ref"
    v-bind="$attrs"
    v-on="cmpListeners"
  >
    <template v-for="(_, name) in $scopedSlots" v-slot:[name]="slotData">
      <slot :name="name" v-bind="slotData" />
    </template>
    <template v-for="(_, someOtherName) in $slots" v-slot:[someOtherName]>
      <slot :name="someOtherName" />
    </template>
  </v-text-field>
</template>

<script>
import { mask, tokens } from "vue-the-mask";
import masker from "vue-the-mask/src/masker.js";

export default {
  props: {
    value: [String, Number],
    mask: {
      type: [String, Array],
      required: true
    },
    masked: {
      // by default emits the value unformatted, change to true to format with the mask
      type: Boolean,
      default: false // raw
    },
    tokens: {
      type: Object,
      default: () => tokens
    }
  },
  directives: { mask },
  data() {
    return {
      lastValue: null //
    };
  },
  watch: {
    masked() {
      this.refresh(this.display);
    }
  },
  computed: {
    cmpListeners() {
      let listeners = {};
      Object.assign(listeners, this.$listeners);
      delete listeners.input;
      return listeners;
    },
    config() {
      return {
        mask: this.mask,
        tokens: this.tokens,
        masked: this.masked
      };
    },
    display() {
      return masker(this.value, this.mask, true, this.tokens);
    }
  },
  mounted() {
    var value = masker(this.value, this.mask, this.masked, this.tokens);
    if (value != this.value) {
      this.$emit("input", value);
    }
  },
  methods: {
    onInput(value) {
      this.refresh(value);
    },
    paste: function(e) {
      let clipboardData = e.clipboardData || window.clipboardData;
      let pastedData = clipboardData.getData("Text");
      let newValue = this.refresh(pastedData);
      if (newValue === this.value) {
        e.preventDefault();
        return;
      }
      this.$emit("input", newValue);
    },
    refresh(newValue) {
      var value = masker(newValue, this.mask, this.masked, this.tokens);
      if (value !== this.lastValue) {
        this.lastValue = value;
        this.$emit("input", value);
      }
    }
  }
  // model: { prop: "value", event: "input" },
  // props: {
  //   value: {
  //     type: [String, Number],
  //     default: ""
  //   },
  //   label: {
  //     type: String,
  //     default: ""
  //   },
  //   tokens: {
  //     type: Object,
  //     default: () => tokens
  //   },
  //   properties: {
  //     type: Object,
  //     default: function() {
  //       return {};
  //     }
  //   },
  //   options: {
  //     type: Object,
  //     default: function() {
  //       return {
  //         inputMask: "#########",
  //         outputMask: "#########",
  //         empty: "", // v-model value when v-text-field is empty. You can use "0" or "" or null or other.
  //         applyAfter: true, // Apply the mask only after filling
  //         alphanumeric: false,
  //         lowerCase: false
  //       };
  //     }
  //   }
  // },
  // data: () => ({}),
  // /*
  //  v-model="cmpValue": Dessa forma, ao digitar, o valor é atualizado automaticamente no componente pai.
  //  O valor digitado entra pelo newValue do Set é emitido para o componente pai, retorna pelo get e pára.
  // */
  // computed: {
  //   cmpListeners() {
  //     let lis = { ...this.$listeners };
  //     delete lis.input;
  //     return lis;
  //   },
  //   cmpValue: {
  //     get: function() {
  //       return this.value;
  //       // return this.humanFormat(this.value);
  //     },
  //     set: function(newValue) {
  //       // this.$emit("input", this.machineFormat(newValue));
  //       this.$emit("input", newValue);
  //     }
  //   }
  // },
  // watch: {},
  // methods: {
  //   emitInput(valor) {
  //     console.log(valor);
  //   },
  //   paste: function(e) {
  //     let clipboardData = e.clipboardData || window.clipboardData;
  //     let pastedData = clipboardData.getData("Text");
  //     let valor = this.machineFormat(pastedData);
  //     if (valor === this.value) {
  //       e.preventDefault();
  //       return;
  //     }
  //     this.$emit("input", valor);
  //   },
  //   humanFormat: function(value) {
  //     if (value) {
  //       value = this.formatValue(value, this.options.inputMask);
  //     } else {
  //       value = this.options.empty;
  //     }
  //     return value;
  //   },
  //   machineFormat(value) {
  //     if (value) {
  //       value = this.formatValue(value, this.options.outputMask);
  //       if (value === "") {
  //         value = this.options.empty;
  //       }
  //       // UpperCase or LowerCase
  //       if (this.options.lowerCase) {
  //         value = value ? value.toLowerCase() : value;
  //       } else {
  //         value = value ? value.toUpperCase() : value;
  //       }
  //       // Apply the mask only after filling
  //       if (this.options.applyAfter) {
  //         if (value.length !== this.options.outputMask.length) {
  //           value = this.options.empty;
  //         } else {
  //           // Event sended after filling the mask
  //           this.$emit("masked");
  //         }
  //       }
  //     } else {
  //       value = this.options.empty;
  //     }
  //     return value;
  //   },

  //   formatValue: function(value, mask) {
  //     return this.formatDefault(value, mask);
  //   },

  //   formatDefault: function(value, mask) {
  //     value = this.clearValue(value);
  //     let result = "";
  //     let count = 0;
  //     if (value) {
  //       let arrayValue = value.toString().split("");
  //       let arrayMask = mask.toString().split("");
  //       for (var i = 0; i < arrayMask.length; i++) {
  //         if (i < arrayValue.length + count) {
  //           if (arrayMask[i] === "#") {
  //             result = result + arrayValue[i - count];
  //           } else {
  //             result = result + arrayMask[i];
  //             count++;
  //           }
  //         }
  //       }
  //     }
  //     return result;
  //   },

  //   keyPress($event) {
  //     if (!this.options.alphanumeric) {
  //       // console.log($event.keyCode); //keyCodes value
  //       let keyCode = $event.keyCode ? $event.keyCode : $event.which;
  //       // if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
  //       if (keyCode < 48 || keyCode > 57) {
  //         // 46 is dot
  //         $event.preventDefault();
  //       }
  //     }
  //   },

  //   clearValue: function(value) {
  //     let result = "";
  //     if (value) {
  //       let arrayValue = value.toString().split("");
  //       for (var i = 0; i < arrayValue.length; i++) {
  //         if (this.isValid(arrayValue[i])) {
  //           result = result + arrayValue[i];
  //         }
  //       }
  //     }
  //     return result;
  //   },

  //   isValid(value) {
  //     if (this.options.alphanumeric) {
  //       return this.isAlphaNumeric(value);
  //     } else {
  //       return this.isInteger(value);
  //     }
  //   },

  //   isInteger(value) {
  //     let result = false;
  //     if (Number.isInteger(parseInt(value))) {
  //       result = true;
  //     }
  //     return result;
  //   },

  //   isAlphaNumeric(value) {
  //     let letterNumber = /^[0-9a-zA-Z]+$/;
  //     if (value.match(letterNumber)) {
  //       return true;
  //     }
  //     return false;
  //   },

  //   focus() {
  //     setTimeout(() => {
  //       this.$refs.ref.focus();
  //     }, 500);
  //   }
  // }
};
</script>
