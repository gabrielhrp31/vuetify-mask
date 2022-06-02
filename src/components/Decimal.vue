<template>
  <div>
    <v-text-field
      v-model="cmpValue"
      v-bind:label="label"
      v-bind="properties"
      v-bind:maxlength="options.length + options.precision"
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
          locale: "pt-BR",
          length: 11,
          precision: 2,
          empty: null
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
    cmpListeners(){
      delete this.$listeners.input;
      return this.$listeners;
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
      let clipboardData = e.clipboardData || window.clipboardData;
      let pastedData = clipboardData.getData("Text");
      let length = this.options.length + this.options.precision - 1;
      let valor = this.machineFormat(pastedData.substring(0, length));
      if (valor === this.value) {
        e.preventDefault();
        return;
      }
      this.$emit("input", valor);
    },
    humanFormat: function(value) {
      if (value || value === 0) {
        value = Number(value).toLocaleString(this.options.locale, {
          maximumFractionDigits: this.options.precision,
          minimumFractionDigits: this.options.precision
        });
      } else {
        value = this.options.empty;
      }
      return value;
    },
    machineFormat(value) {
      if (value) {
        value = this.clearNumber(value);
        // Ajustar quantidade de zeros à esquerda
        value = value.padStart(parseInt(this.options.precision) + 1, "0");
        // Incluir ponto na casa correta, conforme a precisão configurada
        value =
          value.substring(0, value.length - parseInt(this.options.precision)) +
          "." +
          value.substring(
            value.length - parseInt(this.options.precision),
            value.length
          );
        if (value === "") {
          value = this.options.empty;
        }
      } else {
        value = this.options.empty;
      }
      return value;
    },

    // Retira todos os caracteres não numéricos e zeros à esquerda
    clearNumber: function(value) {
      let result = "";
      if (value) {
        let flag = false;
        let arrayValue = value.toString().split("");
        for (var i = 0; i < arrayValue.length; i++) {
          if (this.isInteger(arrayValue[i])) {
            if (!flag) {
              // Retirar zeros à esquerda
              if (arrayValue[i] !== "0") {
                result = result + arrayValue[i];
                flag = true;
              } else {
                // Permitir zero quando valor igual a zero - Tipo 3 (Money or Percent)
                if (Number(value) === 0) {
                  result = result + arrayValue[i];
                }
              }
            } else {
              result = result + arrayValue[i];
            }
          }
        }
      }
      return result;
    },

    keyPress($event) {
      // console.log($event.keyCode); //keyCodes value
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      // if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
      if (keyCode < 48 || keyCode > 57) {
        // 46 is dot
        $event.preventDefault();
      }
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
