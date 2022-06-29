<template>
  <v-menu
    v-model="menu"
    v-bind:close-on-content-click="false"
    v-bind:nudge-right="40"
    transition="scale-transition"
    data-app="true"
    offset-y
    max-width="100%"
  >
    <template v-slot:activator="{}">
      <v-text-field-simplemask
        :value="stringDate"
        @change="input"
        v-bind:label="label"
        v-bind:properties="propertiesComp"
        :color="backgroundColor"
        v-bind:options="optionsComp"
        v-on:click:append="(menu = true), (activeTab = 0)"
        v-on:click:clear="menu = false"
      />
    </template>
    <v-tabs
      dark
      class="elevation-2"
      v-bind:background-color="backgroundColor"
      v-model="activeTab"
    >
      <v-tab v-bind:key="0">
        <v-icon left>mdi-calendar-outline</v-icon>
        {{ options.tabDateTitle }}
      </v-tab>
      <v-tab v-bind:key="1" v-if="time">
        <v-icon left>mdi-calendar-clock</v-icon>
        {{ options.tabTimeTitle }}
      </v-tab>
      <v-tab-item v-bind:key="0">
        <v-card flat style="overflow: auto">
          <v-date-picker
            no-title
            :value="formattedDate"
            @change="changeDate"
            v-bind:locale="options.locale"
          ></v-date-picker>
        </v-card>
      </v-tab-item>
      <v-tab-item v-bind:key="1" v-if="time">
        <v-card flat>
          <v-time-picker
            landscape
            ref="refTimePicker"
            format="24hr"
            :value="formattedHours"
            v-bind:color="backgroundColor"
            v-bind:use-seconds="options.useSeconds"
            @input="changeHour"
            @click:minute="time && !options.useSeconds ? (menu = false) : false"
            @click:second="time && options.useSeconds ? (menu = false) : false"
            v-bind:disabled="formattedHours === null || formattedHours === ''"
          ></v-time-picker>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-menu>
</template>

<script>
import moment from "moment";
import SimpleMask from "./SimpleMask.vue";
const HOUR_FORMAT = "HH:mm";
const HOUR_SECONDS_FORMAT = "HH:mm:ss";
const DATE_FORMAT = "YYYY-MM-DD";

export default {
  model: { prop: "value", event: "input" },
  components: {
    "v-text-field-simplemask": SimpleMask
  },
  props: {
    value: {
      type: [Number, String],
      default: 0
    },
    time: {
      type: Boolean,
      default: false
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
        return {};
      }
    }
  },
  data: () => ({
    stringDate: "",
    menu: false,
    readonly: true,
    activeTab: 0
  }),
  computed: {
    optionsComp() {
      return {
        ...this.options,
        inputMask: this.simpleMask,
        outputMask: this.simpleMask,
        empty: null,
        applyAfter: false,
        alphanumeric: false,
        lowerCase: false
      };
    },
    propertiesComp() {
      return {
        ...this.properties,
        prependIcon: null,
        "prepend-icon": null,
        appendIcon: this.properties?.appendIcon || "mdi-calendar",
        rules: [
          ...(this.properties?.rules || []),
          value => this.validDate(value)
        ]
      };
    },
    backgroundColor() {
      return this.options && this.options?.tabBackgroundColor
        ? this.options.tabBackgroundColor
        : "secondary";
    },
    internalHourMask() {
      return this.options?.useSeconds ? HOUR_SECONDS_FORMAT : HOUR_FORMAT;
    },
    formattedDate() {
      return this.value && moment(new Date(this.value)).isValid()
        ? moment(new Date(this.value)).format(DATE_FORMAT)
        : null;
    },
    formattedHours() {
      return this.value && moment(new Date(this.value)).isValid()
        ? moment(new Date(this.value)).format(this.internalHourMask)
        : null;
    },
    simpleMask() {
      return this.options.inputMask.replace(/([a-zA-Z])/g, "#");
    }
  },
  watch: {
    // When computed.compShow.formattedDate is changed:
    // Open always on date tab and selected hour
    menu() {
      if (!this.menu) {
        this.activeTab = 0;
        if (this.$refs.refTimePicker) {
          this.$refs.refTimePicker.selectingHour = true;
        }
      }
    },
    value(valor) {
      this.stringDate = this.returnStringDate(valor);
    }
  },
  created() {
    this.stringDate = this.returnStringDate(this.value);
  },
  methods: {
    changeDate(value) {
      if (this.activeTab == 0) {
        let momentCurrentDate = moment(new Date(this.value));
        let momentNewDate = moment(
          value + " " + momentCurrentDate.format(this.internalHourMask)
        );
        this.$emit("input", momentNewDate.toDate().getTime());
        if (!this.time) {
          this.menu = false;
        } else {
          this.activeTab = 1;
        }
      }
    },
    changeHour(value) {
      if (this.activeTab == 1) {
        let momentCurrentDate = moment(new Date(this.value));
        let momentNewDate = moment(
          momentCurrentDate.format(DATE_FORMAT) + " " + value
        );
        this.$emit("input", momentNewDate.toDate().getTime());
      }
    },
    input(value) {
      this.stringDate = value;
      if (
        value &&
        typeof value === "string" &&
        value.length === this.simpleMask.length
      ) {
        let momentDate = moment(this.stringDate, this.options.inputMask);
        if (momentDate.isValid()) {
          this.$emit("input", momentDate.toDate().getTime());
        }
      }
    },
    validDate(value) {
      if (value && typeof value === "string") {
        if (value.length != this.simpleMask.length) {
          return this.properties?.incompleteMessage || "Incomplete Date!";
        }
        let momentDate = moment(this.stringDate, this.options.inputMask);
        return (
          momentDate.isValid() ||
          this.properties?.invalidMessage ||
          "Invalid Date!"
        );
      }
      return true;
    },
    returnStringDate(miliDate) {
      let value = "";
      if (miliDate) {
        value = new Date(miliDate);
        value = moment(value).format(this.options.inputMask);
        return value;
      }
    },
    closingControl() {
      if (this.options.closeOnDateClick === true) {
        this.menu = false;
      } else {
        this.activeTab = 1;
      }
    }
  }
};
// Str to milli
// var d = Date.parse(date);
// milli to date
// this.date = new Date(d);
</script>
