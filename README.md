# vuetify-mask-with-slots

Mask and input helpers for **Vuetify 2** `v-text-field`, with **slot inheritance** working correctly.

Forked from [juareznasato/vuetify-mask](https://github.com/juareznasato/vuetify-mask) (created by **[Juarez Nasato](https://github.com/juareznasato)**) and merged with [vue-the-mask](https://github.com/vuejs-tips/vue-the-mask) for custom masks. This fork exists to fix **slot inheritance** on Vuetify 2 wrappers — full credit to the original author for the masking foundation.

- **npm:** [vuetify-mask-with-slots](https://www.npmjs.com/package/vuetify-mask-with-slots)
- **GitHub:** [gabrielhrp31/vuetify-mask](https://github.com/gabrielhrp31/vuetify-mask)
- **Demo:** [gabrielhrp31.github.io/vuetify-mask](https://gabrielhrp31.github.io/vuetify-mask/)

> Requires **Vue 2** + **Vuetify 2**. Not compatible with Vue 3 / Vuetify 3.

The live demo picks **EN** or **PT** from the browser language (with a manual toggle), and remembers your choice.

---

## Why this fork

The original [`vuetify-mask@1.1.2`](https://www.npmjs.com/package/vuetify-mask/v/1.1.2) (still `latest` on npm) wraps `v-text-field` **without forwarding slots** — so `append`, `prepend`, and similar content never render. Public report: [issue #33](https://github.com/juareznasato/vuetify-mask/issues/33). This package keeps the masking features and fixes slot inheritance.

---

## Install

```bash
npm i vuetify-mask-with-slots
```

Peer dependencies (install in your app):

```bash
npm i vue@^2 vuetify@^2
# required for date/time components:
npm i moment
# icons used by date pickers:
npm i -D @mdi/font
```

## Register

```js
import Vue from "vue";
import VuetifyMask from "vuetify-mask-with-slots";

Vue.use(VuetifyMask);
```

This registers:

| Component tag | Purpose | `v-model` shape |
| --- | --- | --- |
| `v-text-field-money` | Currency / decimal (locale) | string/number, e.g. `"1234.56"` |
| `v-text-field-percent` | Same engine as money | string/number |
| `v-text-field-integer` | Digits only | string/number |
| `v-text-field-datetimepicker` | Date (+ optional time) | **milliseconds** (number or numeric string) |
| `v-text-field-datetimestringpicker` | Date (+ optional time) | **formatted string** |
| `v-text-field-simplemask` | Custom mask (vue-the-mask) | string |
| `v-text-field-cpf` | Brazilian CPF + validation | string |
| `v-text-field-cnpj` | Brazilian CNPJ + validation | string |
| `v-text-field-cep` | Brazilian CEP | string |
| `v-text-field-dotnumber` | Digits and dots | string |
| `v-text-field-filebase64` | File → Base64 | data URL string |

> Money and Percent both use the same `Decimal` component. Configure with `options` / `properties` (prefix `R$`, suffix `%`, precision, etc.).

---

## Common props

Most components accept:

| Prop | Type | Description |
| --- | --- | --- |
| `value` / `v-model` | varies | Bound value |
| `label` | `String` | Field label *(Money/Percent: put `label` inside `properties`)* |
| `properties` | `Object` | Forwarded to Vuetify `v-text-field` |
| `options` | `Object` | Mask / behavior options (see each component) |

### `properties`

Any [v-text-field](https://v2.vuetifyjs.com/en/components/text-fields/) prop. Prefer camelCase:

```vue
:properties="{
  outlined: true,
  clearable: true,
  prefix: 'R$',
  backgroundColor: 'red'
}"
```

Kebab-case keys also work: `'single-line': true`.

### Slots & events

Components that wrap `v-text-field` forward **slots** and most **listeners** (click, focus, etc.). Use the same slot names as Vuetify 2 (`append`, `prepend`, `label`, …).

---

## Components

### Money / Percent

`v-text-field-money` and `v-text-field-percent` share the same implementation.

**Props**

| Prop | Default | Description |
| --- | --- | --- |
| `options.locale` | `'pt-BR'` | `Intl` locale for display |
| `options.length` | `11` | Max digit count (excluding decimal point) |
| `options.precision` | `2` | Decimal places |
| `valueWhenIsEmpty` | `''` | Emitted when the field is cleared (`''`, `'0'`, or `null`) |
| `valueOptions.min` | `0` | On blur, if value ≤ min, emits `SetValueMin` (does **not** auto-clamp) |
| `valueOptions.max` | — | On blur, if value ≥ max, emits `SetValueMax` |

```vue
<template>
  <v-text-field-money
    v-model="value"
    :properties="{
      label: 'Money',
      prefix: 'R$',
      outlined: true,
      clearable: true
    }"
    :options="{
      locale: 'pt-BR',
      length: 11,
      precision: 2
    }"
    value-when-is-empty=""
  />
</template>

<script>
export default {
  data: () => ({
    value: "123456789.00" // number or string; empty: "" or null
  })
};
</script>
```

```vue
<v-text-field-percent
  v-model="value"
  :properties="{ label: 'Percent', suffix: '%', clearable: true }"
  :options="{ locale: 'pt-BR', length: 5, precision: 2 }"
/>
```

---

### Integer

```vue
<v-text-field-integer
  v-model="value"
  label="Integer"
  :properties="{ outlined: true, clearable: true }"
  :options="{
    inputMask: '#########',
    outputMask: '#########',
    empty: null,
    applyAfter: false
  }"
/>
```

| Option | Default | Description |
| --- | --- | --- |
| `inputMask` | `'#########'` | Display mask (`#` = digit) |
| `outputMask` | `'#########'` | Value written to `v-model` |
| `empty` | `''` | Value when cleared |
| `applyAfter` | `false` | If `true`, emit only when mask is complete |

---

### DateTimePicker (milliseconds)

`v-model` is a Unix timestamp in **ms** (`number` or numeric `string`, e.g. `1558220700000` or `"1558220700000"`).

```vue
<v-text-field-datetimepicker
  v-model="value"
  label="Date & time"
  :time="true"
  :properties="{
    outlined: true,
    clearable: true,
    appendIcon: 'mdi-av-timer'
  }"
  :options="{
    inputMask: 'DD/MM/YYYY HH:mm',
    locale: 'pt-BR',
    tabDateTitle: 'Date',
    tabTimeTitle: 'Time',
    closeOnDateClick: false,
    useSeconds: false
  }"
/>
```

| Option / prop | Description |
| --- | --- |
| `time` | `Boolean` — show time tab |
| `options.inputMask` | Moment format for display / typing (default fallback: `DD/MM/YYYY HH:mm`) |
| `options.locale` | Date picker locale |
| `options.useSeconds` | Include seconds in time |
| `options.closeOnDateClick` | Close menu after picking a date |

Requires **moment** and **@mdi/font** (or another MDI setup) in the host app.

---

### DateTimeStringPicker (formatted string)

Same UI as above, but `v-model` is a **string** matching `options.inputMask`.

```vue
<v-text-field-datetimestringpicker
  v-model="value"
  label="Date"
  :properties="{ outlined: true }"
  :options="{
    inputMask: 'YYYY-MM-DD',
    locale: 'pt-BR',
    tabDateTitle: 'Date',
    tabTimeTitle: 'Time'
  }"
/>
```

```js
data: () => ({ value: "2024-05-16" })
```

---

### SimpleMask (credit card, phone, custom)

Based on **vue-the-mask**. Uses `$attrs` (not `properties`).

```vue
<!-- Credit card -->
<v-text-field-simplemask
  v-model="card"
  label="Credit card"
  mask="#### #### #### ####"
/>

<!-- Phone (BR) -->
<v-text-field-simplemask
  v-model="phone"
  label="Phone"
  mask="(##) #####-####"
/>

<!-- Keep mask characters in v-model -->
<v-text-field-simplemask
  v-model="code"
  label="Code"
  mask="XX-XXXX-XXXX-XXX"
  masked
/>
```

| Prop | Default | Description |
| --- | --- | --- |
| `mask` | *(required)* | Mask pattern |
| `masked` | `false` | `true` → `v-model` keeps mask literals |
| `tokens` | vue-the-mask defaults | Custom token map |

**Default tokens**

```js
{
  '#': { pattern: /\d/ },
  'X': { pattern: /[0-9a-zA-Z]/ },
  'S': { pattern: /[a-zA-Z]/ },
  'A': { pattern: /[a-zA-Z]/, transform: v => v.toLocaleUpperCase() },
  'a': { pattern: /[a-zA-Z]/, transform: v => v.toLocaleLowerCase() },
  '!': { escape: true }
}
```

Custom tokens example:

```vue
<v-text-field-simplemask mask="FFFFFF" :tokens="hexTokens" />
```

```js
hexTokens: {
  F: {
    pattern: /[0-9a-fA-F]/,
    transform: v => v.toLocaleUpperCase()
  }
}
```

---

### CPF / CNPJ / CEP

```vue
<v-text-field-cpf
  v-model="cpf"
  label="CPF"
  :properties="{ outlined: true, clearable: true }"
  :options="{
    outputMask: '###########',
    empty: null,
    applyAfter: true
  }"
/>

<v-text-field-cnpj
  v-model="cnpj"
  label="CNPJ"
  :properties="{ outlined: true, clearable: true }"
  :options="{
    outputMask: '##############',
    empty: null,
    applyAfter: true
  }"
/>

<v-text-field-cep
  v-model="cep"
  label="CEP"
  :properties="{ outlined: true, clearable: true }"
  :options="{
    outputMask: '########',
    empty: null,
    applyAfter: true
  }"
/>
```

With `applyAfter: true`, CPF/CNPJ validate check digits when the mask is complete. Invalid values are cleared.

---

### DotNumber

Accepts digits and `.` only.

```vue
<v-text-field-dotnumber
  v-model="value"
  label="Version / dotted number"
  :properties="{ clearable: true }"
  :options="{ length: 20, empty: null, applyAfter: false }"
/>
```

---

### FileBase64

Picks a file and stores a Base64 data URL in `v-model`. Emits `fileName` with the original file name.

```vue
<v-text-field-filebase64
  v-model="value"
  label="Select image"
  :properties="{
    outlined: true,
    appendIcon: 'mdi-message-image-outline'
  }"
  :options="{ acceptFile: 'image/*' }"
  @fileName="fileName = $event"
/>
```

`acceptFile` examples: `image/*`, `application/pdf`, `image/jpeg,image/png,application/pdf`.

---

## Local development

```bash
npm install
npm run serve   # demo on http://localhost:8081
npm run build   # build demo
npm run lint
```

---

## Changelog

### 2.4.8

- Documentation rewrite aligned with the real API (components, peers, options, examples)
- Clearer package description on npm
- Demo with EN/PT i18n (browser language first, manual toggle); origin story and credits on the demo site

### 2.4.7

- Migrate demo tooling from Vue CLI 4 to Vite (fixes most `npm audit` issues in the repo)
- Production dependencies audit clean (`npm audit --omit=dev`)
- Declare `vue`, `vuetify`, and `moment` as peer dependencies; remove unused `v-money`
- Publish only library files (no demo / trash)
- Fix CPF validation crash (`ReferenceError` on `rev`)
- Fix `DateTimePicker` so numeric string timestamps work and no longer wipe `v-model` on format failure
- Safer `$listeners` handling on Integer / CPF / CNPJ / CEP / DotNumber

### 2.4.6

- Previous stable release on npm

---

## License

MIT
