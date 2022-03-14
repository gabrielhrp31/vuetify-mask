import Decimal from "./src/components/Decimal.vue";
import Integer from "./src/components/Integer.vue";
import DateTime from "./src/components/DateTime.vue";
import DateTimePicker from "./src/components/DateTimePicker.vue";
import SimpleMask from "./src/components/SimpleMask.vue";
import Cpf from "./src/components/Cpf.vue";
import Cnpj from "./src/components/Cnpj.vue";
import Cep from "./src/components/Cep.vue";
import FileBase64 from "./src/components/FileBase64.vue";
import DotNumber from "./src/components/DotNumber.vue";

function install(Vue) {
  Vue.component("v-text-field-money", Decimal);
  Vue.component("v-text-field-percent", Decimal);
  Vue.component("v-text-field-integer", Integer);
  Vue.component("v-text-field-datetime", DateTime);
  Vue.component("v-text-field-datetimepicker", DateTimePicker);
  Vue.component("v-text-field-simplemask", SimpleMask);
  Vue.component("v-text-field-cpf", Cpf);
  Vue.component("v-text-field-cnpj", Cnpj);
  Vue.component("v-text-field-cep", Cep);
  Vue.component("v-text-field-filebase64", FileBase64);
  Vue.component("v-text-field-dotnumber", DotNumber);
}

export default install;
