<template>
  <div>
    <v-menu
      v-model="menu"
      v-bind:close-on-content-click="false"
      v-bind:nudge-right="40"
      transition="scale-transition"
      data-app="true"
      offset-y
      max-width="100%"
    >
      <template v-slot:activator="{ on }">
        <v-text-field-simplemask
          :value="stringDate"
          @input="input"
          v-bind:label="label"
          v-bind:properties="propertiesComp"
          :color="backgroundColor"
          v-bind:options="optionsComp"
          v-on:click:append="(menu = true), (activeTab = 1)"
          v-on:click:clear="menu = false"
          v-on="on"
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
              v-model="modDate"
              v-on:change="closingControl(), emit()"
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
              v-model="modTime"
              v-bind:color="backgroundColor"
              v-bind:use-seconds="options.useSeconds"
              v-on:change="(menu = false), emit()"
              v-bind:disabled="formattedDate === null || formattedDate === ''"
            ></v-time-picker>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-menu>
  </div>
</template>

<script>
import moment from "moment";
import SimpleMask from "@/components/SimpleMask.vue";

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
      default: "Label"
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
    modDate: "",
    modTime: "00:00",
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
    formattedDate() {
      return this.value && moment(new Date(this.value)).isValid()
        ? moment(new Date(this.value)).format("YYYY-MM-DD")
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
    }
  },
  created() {
    this.stringDate = this.returnStringDate(this.value);
  },
  updated() {
    this.stringDate = this.returnStringDate(this.value);
  },
  methods: {
    input(value) {
      this.stringDate = value;
      if (
        value &&
        typeof value === "string" &&
        value.length === this.simpleMask.length
      ) {
        let momentDate = moment(this.stringDate, this.options.inputMask);
        if (momentDate.isValid()) {
          this.$emit("input", momentDate.toDate().valueOf());
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
    emit() {
      this.$emit("input", this.stringToMillisecond(this.modDate, this.modTime));
    },
    stringToMillisecond: function(date, time) {
      return Date.parse(date + " " + time);
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
