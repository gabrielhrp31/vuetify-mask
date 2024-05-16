<template>
  <div>
    <v-text-field
      v-model="cmpValue"
      v-bind="properties"
      v-on:keypress="keyPress"
      @paste="paste"
      v-on:blur="onBlur"
      ref="input"
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
      // type: String,
      type: [String, Number],
      default: "0"
    },
    valueWhenIsEmpty: {
      type: String,
      default: "" // "0" or "" or null
    },
    valueOptions: {
      type: Object,
      default: function() {
        return {
          min: 0,
          minEvent: "SetValueMin"
        };
      }
    },
    options: {
      type: Object,
      default: function() {
        return {
          locale: "pt-BR",
          prefix: "",
          suffix: "",
          length: 11,
          precision: 2
        };
      }
    },
    // Other v-text-field properties
    properties: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data: () => ({}),
  /*
   v-model="cmpValue": Dessa forma, ao digitar, o valor é atualizado automaticamente no componente pai.
   O valor digitado entra pelo newValue do Set e é emitido para o componente pai.
   the-vue-mask nao funciona corretamente ao incluir valores existentes no componente pai.
  */
  computed: {
    cmpValue: {
      get: function() {
        return this.value !== null && this.value !== ""
          ? this.humanFormat(this.value.toString())
          : this.valueWhenIsEmpty;
      },
      set: function(newValue) {
        this.$emit("input", this.machineFormat(newValue));
      }
    }
  },
  methods: {
    paste(e) {
      let clipboardData = e.clipboardData || window.clipboardData;
      let pastedData = clipboardData.getData("Text");
      if (isNaN(parseFloat(pastedData))) {
        e.preventDefault();
      }
    },
    humanFormat: function(number) {
      if (isNaN(number)) {
        number = "";
      } else {
        // number = Number(number).toLocaleString(this.options.locale, {maximumFractionDigits: 2, minimumFractionDigits: 2, style: 'currency', currency: 'BRL'});
        number = Number(number).toLocaleString(this.options.locale, {
          maximumFractionDigits: this.options.precision,
          minimumFractionDigits: this.options.precision
        });
      }
      return number;
    },
    machineFormat(number) {
      if (number) {
        number = this.cleanNumber(number);
        // Ajustar quantidade de zeros à esquerda
        number = number.padStart(parseInt(this.options.precision) + 1, "0");
        // Incluir ponto na casa correta, conforme a precisão configurada
        number =
          number.substring(
            0,
            number.length - parseInt(this.options.precision)
          ) +
          "." +
          number.substring(
            number.length - parseInt(this.options.precision),
            number.length
          );
        if (isNaN(number)) {
          number = this.valueWhenIsEmpty;
        }
      } else {
        number = this.valueWhenIsEmpty;
      }
      if (this.options.precision === 0) {
        number = this.cleanNumber(number);
      }
      return number;
    },
    keyPress($event) {
      // console.log($event.keyCode); //keyCodes value
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      // if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
      if (keyCode < 48 || keyCode > 57) {
        // 46 is dot
        $event.preventDefault();
      }
      if (this.targetLength() && window.getSelection().type != "Range") {
        $event.preventDefault();
      }
    },
    // Retira todos os caracteres não numéricos e zeros à esquerda
    cleanNumber: function(value) {
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
              }
            } else {
              result = result + arrayValue[i];
            }
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
    targetLength() {
      if (
        Number(this.cleanNumber(this.value).length) >=
        Number(this.options.length)
      ) {
        return true;
      } else {
        return false;
      }
    },
    onBlur() {
      if (
        this.value.length === 0 ||
        parseFloat(this.value) <= this.valueOptions.min
      )
        this.$emit(
          this.valueOptions.minEvent || "SetValueMin",
          this.valueOptions.min
        );

      if (
        this.valueOptions.max &&
        parseFloat(this.value) >= this.valueOptions.max
      )
        this.$emit(
          this.valueOptions.maxEvent || "SetValueMax",
          this.valueOptions.max
        );
    }
  }
};
</script>
