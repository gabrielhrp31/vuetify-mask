<template>
  <v-container>
    <v-row>
      <v-col cols="12" lg="4">
        <v-text-field-datetimestringpicker
          v-model="value4"
          label="Data Hora"
          v-bind:properties="{
            clearable: false,
            outlined: true,
            appendIcon: 'mdi-av-timer'
          }"
          v-bind:options="{
            tabDateTitle: 'Data',
            tabTimeTitle: 'Hora',
            tabBackgroundColor: 'green',
            locale: 'pt-BR',
            inputMask: 'YYYY-MM-DD',
            outputMask: '##########',
            closeOnDateClick: false,
            useSeconds: false
          }"
        />
        v-model: {{ value4 }} (string date)
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="4">
        <v-text-field-datetimepicker
          v-model="value1"
          label="Data Hora"
          v-bind:properties="{
            clearable: false,
            outlined: true,
            appendIcon: 'mdi-av-timer'
          }"
          v-bind:options="{
            tabDateTitle: 'Data',
            tabTimeTitle: 'Hora',
            tabBackgroundColor: 'green',
            locale: 'pt-BR',
            inputMask: 'YYYY-MM-DD',
            outputMask: '##########',
            closeOnDateClick: false,
            useSeconds: false
          }"
        />
        v-model: {{ value1 }} (milliseconds)
      </v-col>
      <v-col cols="12" lg="4">
        <v-text-field-datetimepicker
          v-model="value2"
          label="Date Time Picker"
          v-bind:properties="{
            backgroundColor: '#EEE9E9',
            clearable: false,
            outlined: false,
            prependIcon: 'mdi-calendar',
            appendIcon: ''
          }"
          time
          v-bind:options="{
            tabDateTitle: 'Date',
            tabTimeTitle: 'Time',
            tabBackgroundColor: 'blue',
            locale: 'pt-BR',
            inputMask: 'DD/MM/YYYY HH:mm:ss',
            outputMask: '##########',
            closeOnDateClick: false,
            useSeconds: false
          }"
        />
        v-model: {{ value2 }} (milliseconds)
      </v-col>
      <v-col cols="12" lg="4">
        <v-text-field-datetimepicker
          v-model="value3"
          label="Date Time Picker"
          v-bind:properties="{
            backgroundColor: '',
            clearable: false,
            outlined: false,
            prependIcon: '',
            appendIcon: ''
          }"
          v-bind:options="{
            tabDateTitle: 'Date',
            tabTimeTitle: 'Time',
            tabBackgroundColor: 'red',
            locale: 'pt-BR',
            inputMask: 'DD/MM/YYYY',
            outputMask: '##################',
            closeOnDateClick: false,
            useSeconds: true
          }"
        />
        v-model: {{ value3 }} (milliseconds)
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DateTimePicker from "@/components/DateTimePicker.vue";
import DateTimeStringPicker from "@/components/DateTimeStringPicker.vue";

export default {
  name: "app",
  components: {
    "v-text-field-datetimepicker": DateTimePicker,
    "v-text-field-datetimestringpicker": DateTimeStringPicker
  },
  data: () => ({
    value1: 1558220700000,

    value2: 1558220700000,
    value3: 1558220710000,
    value4: "2000-01-31"
  }),
  mounted() {
    setTimeout(() => {
      this.value4 = null;
    }, 1000);
  },
  methods: {}
};
</script>
