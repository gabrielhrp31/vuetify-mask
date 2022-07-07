# vuetify-mask

## Project
vuetify-mask is a component for working with some of the main types of masks in the v-text-field.
I forked package from [juareznasato](https://github.com/juareznasato/vuetify-mask) to solve component without slot inheritance problem and in V3 merged with useful [VueTheMask](https://github.com/vuejs-tips/vue-the-mask).

[comment]: <> (## Links)
[comment]: <> ([See Demo here]&#40;https://rzfpe.csb.app/&#41;.  )

[comment]: <> ([GitHub]&#40;https://github.com/juareznasato/vuetify-mask&#41;.  )

[comment]: <> ([npm]&#40;https://www.npmjs.com/package/vuetify-mask&#41;.)

## Dependencies
- vuejs  
- vuetify ($ npm install vuetify --save)  
- moment ($ npm install moment --save)
- material design icon ($ npm install @mdi/font -D --save)

## Install
```
$ npm i vuetify-mask-with-slots --save
```

## Register
1- In main.js add this:  
```js
import Vue from "vue";  
import VuetifyMask from "vuetify-mask";  
Vue.use(VuetifyMask);  
export default VuetifyMask;
```


## Properties (v-bind:properties)
You can add any v-text-field property  
[v-text-field properties](https://vuetifyjs.com/en/components/text-fields/#text-fields).  

Properties that have hyphens (single-line, background-color...) should be changed as follows:  
```vue
v-bind:properties="{  
    singleLine: true,  
    backgroundColor: 'red'  
}"  
```

or  
```vue
v-bind:properties="{  
    'single-line': true,  
    'background-color': 'red'  
}"  
```

## Options (v-bind:options)
| Option | Component | Default | Description |
| ------------ | ------------ | ------------ | ------------ |
| inputMask | Money, Percent, Integer, DateTime  | | mask that will be applied in the v-text-field |
| outputMask | Money, Percent, Integer,, CPF, CNPJ, CEP | | mask that will be applied in the v-model |
| empty | Money, Percent, Integer, DateTime, CPF, CNPJ, CEP, DotNumber | "" | Value in v-model when v-text-field is empty. Can be null, "" or other|
| applyAfter | Integer, CPF, CNPJ, CEP, DotNumber| | The value is masked only after all typing |
| alphanumeric  | false | |
| lowerCase | false | |
| acceptFile| FileBase64 | image/* | Sets the file type to convert to base64 |


## Events
All events documented in vuetify2 docs including slots events

## How to use

### - Money (v-text-field-money)
```vue
<template>
  <div>
    <v-text-field-money
      v-model="value"
      v-bind:label="label"
      v-bind:properties="{
        prefix: 'R$',
        readonly: false,
        disabled: false,
        outlined: false,
        clearable: true,
        placeholder: ' ',
      }"
      v-bind:options="{
        locale: 'pt-BR',
        length: 11,
        precision: 6,
        empty: null,
      }"
    />
  </div>
</template>
<script>
export default {
  data: () => ({
    value: "123456789.00",    // 123456789.00 or "123456789.00" or "" or null
    label: "Money",
    disabled: false,
  }),
};
</script>
```

### - Percent  (v-text-field-percent)
```vue
<template>
  <div>
    <v-text-field-percent
      v-model="value"
      v-bind:label="label"
      v-bind:properties="{
        suffix: '%',
        readonly: false,
        disabled: false,
        outlined: false,
        clearable: true,
        placeholder: '',
      }"
      v-bind:options="{
        locale: 'pt-BR',
        length: 3,
        precision: 2,
        empty: null,
      }"
    />
  </div>
</template>
<script>
export default {
  data: () => ({
    value: "12.34",        // 12.34 or "12.34" or "" or null
    label: "Percent",
    focus: false,
  }),
};
</script>

```

### - Integer  (v-text-field-integer)
```vue
<template>
  <div>
    <v-text-field-integer
      v-model="value"
      v-bind:label="label"
      v-bind:properties="{
        readonly: false,
        disabled: false,
        outlined: false,
        clearable: true,
        placeholder: '',
      }"
      v-bind:options="{
        inputMask: '#########',
        outputMask: '#########',
        empty: null,
        applyAfter: false,
      }"
      v-bind:focus="focus"
      v-on:focus="focus = false"
    />
  </div>
</template>
<script>
export default {
  data: () => ({
    value: "123456789", // 123456789 or "123456789" or "" or null
    label: "Integer",
    focus: false,
  }),
};
</script>
```

### - DateTime  (v-text-field-datetime)
&nbsp; works in milliseconds
```vue
<template>
  <div>
    <v-text-field-datetime
      v-model="value"
      v-bind:label="label"
      v-bind:properties="{
        readonly: false,
        disabled: false,
        outlined: false,
        clearable: true,
        placeholder: 'YYYY-MM-DD HH:mm:ss',
        'prepend-icon': 'mdi-calendar',
      }"
      v-bind:options="{
        inputMask: 'YYYY-MM-DD HH:mm:ss',
        empty: null,
      }"
      v-bind:focus="focus"
      v-on:focus="focus = false"
    />
  </div>
</template>
<script>
export default {
  data: () => ({
    value: "1595386800000",    // Milliseconds
    label: "DateTime",
    focus: false,
  }),
};
</script>
```
### - DateTimePicker  (v-text-field-datetimepicker)
&nbsp; works in milliseconds
```vue
<template>
  <div>
    <v-text-field-datetimepicker
      v-model="value"
      label="Date Time"
      v-bind:properties="{
        backgroundColor: '#EEE9E9',
        clearable: false,
        outlined: true,
        prependIcon: 'mdi-calendar',
        appendIcon: 'mdi-av-timer',
      }"
      v-bind:options="{
        tabDateTitle: 'Date',
        tabTimeTitle: 'Time',
        tabBackgroundColor: 'green',
        locale: 'en-US',
        format: 'YYYY-MM-DD',
        closeOnDateClick: false,
        useSeconds: false,
      }"
    />
  </div>
</template>
<script>
export default {
  data: () => ({
    value: 1558220700000,
  }),
};
</script>
```

### - Credit Card  (v-text-field-simplemask)
```vue
<template>
  <div>
    <v-text-field-simplemask
      v-model="value"
      v-bind:label="label"
			mask='#### #### #### ####'
      v-bind:focus="focus"
      v-on:focus="focus = false"
    />
  </div>
</template>
<script>
export default {
  data: () => ({
    value: "1234432112344321",
    label: "Credit Card",
    focus: false,
  }),
};
</script>
```

### - Phone Number  (v-text-field-simplemask)
```vue
<template>
  <div>
    <v-text-field-simplemask
      v-model="value"
      v-bind:label="label"
			mask='(##) #####-####',
      v-bind:focus="focus"
      v-on:focus="focus = false"
    />
  </div>
</template>

<script>
export default {
  data: () => ({
    value: "99999999999",
    label: "Phone Number",
    focus: false,
  }),
};
</script>
```

### - Simple Mask  (v-text-field-simplemask)
&nbsp; You can create your masks.
```vue
<template>
  <div>
    <v-text-field-simplemask
      v-model="value"
      v-bind:label="label"
			mask: 'XX-XXXX-XXXX-XXX',
			masked
      v-bind:focus="focus"
      v-on:focus="focus = false"
    />
  </div>
</template>
<script>
export default {
  data: () => ({
    value: "23-A568-B953-356", // "23-A568-B953-356" or "" or null
    label: "Simple Mask",
    focus: false,
  }),
};
</script>
```

### - Files  (v-text-field-filebase64)
&nbsp;Convert files to base 64.
```vue
<template>
  <div>
    <v-text-field-filebase64
      v-model="value"
      v-bind:label="label"
      v-bind:properties="{
        outlined: true,
        placeholder: ' ',
        appendIcon:'mdi-message-image-outline',
      }"
      v-bind:options="{
        acceptFile:'image/*',
      }"
      v-on:fileName="fileName = $event"
    />
  </div>
</template>

<script>
export default {
  data: () => ({
    value:"",
    fileName: "",
    label: "Select Image",
  }),
};
</script>

Other acceptFile options:
acceptFile:'image/*'
acceptFile:'application/pdf'
acceptFile:'image/jpeg,image/gif,image/png,application/pdf'
acceptFile:'image/jpeg,image/gif,image/png,application/pdf,image/x-eps'
```

### - DotNumber  (v-text-field-dotnumber)
&nbsp;Accept only dot and numbers.
```vue
<template>
  <div>
    <v-text-field-dotnumber
      v-model="value"
      v-bind:label="label"
      v-bind:properties="{
        readonly: false,
        disabled: false,
        outlined: false,
        clearable: true,
        placeholder: '',
      }"
      v-bind:options="{
        length: 20,
        empty: null,
        applyAfter: false,
      }"
    />
  </div>
</template>
<script>
export default {
  data: () => ({
    value: "1.23.456.789", // "" or null
    label: "Only Dot and Number",
  }),
};
</script>
```


### - CPF  (v-text-field-cpf)
&nbsp;brazilian mask
```vue
<template>
  <div>
    <v-text-field-cpf
      v-model="value"
      v-bind:label="label"
      v-bind:properties="{
        readonly: false,
        disabled: false,
        outlined: true,
        clearable: true,
        placeholder: '',
      }"
      v-bind:options="{
        outputMask: '###########',
        empty: null,
        applyAfter: true,
      }"
      v-bind:focus="focus"
      v-on:focus="focus = false"
    />
  </div>
</template>
<script>
export default {
  data: () => ({
    value: "97702036028", // 97702036028 or "97702036028" or "" or null
    label: "CPF (Brazilian mask)",
    focus: false,
  }),
};
</script>
```

### - CNPJ  (v-text-field-cnpj)
&nbsp;brazilian mask
```vue
<template>
  <div>
    <v-text-field-cnpj
      v-model="value"
      v-bind:label="label"
      v-bind:properties="{
        disabled: false,
        outlined: true,
        clearable: true,
        placeholder: '',
      }"
      v-bind:options="{
        outputMask: '##############',
        empty: null,
        applyAfter: true,
      }"
      v-bind:focus="focus"
      v-on:focus="focus = false"
    />
  </div>
</template>
<script>
export default {
  data: () => ({
    value: "50703512000192", // 50703512000192 or "50703512000192" or "" or null
    label: "CNPJ (Brazilian mask)",
    focus: false,
  }),
};
</script>
```

### - CEP  (v-text-field-cep)
&nbsp;brazilian mask
```vue
<template>
  <div>
    <v-text-field-cep
      v-model="value"
      v-bind:label="label"
      v-bind:properties="{
        disabled: false,
        outlined: true,
        clearable: true,
        placeholder: '',
      }"
      v-bind:options="{
        outputMask: '########',
        empty: null,
        applyAfter: true,
      }"
      v-bind:focus="focus"
      v-on:focus="focus = false"
    />
  </div>
</template>

<script>
export default {
  data: () => ({
    value: "82515260", // 82515260 or "82515260" or "" or null
    label: "CEP (Brazilian mask)",
    focus: false,
  }),
};
</script>
```

### - SimpleMask Tokens  (v-text-field-simplemask)
```javascript
'#': {pattern: /\d/},
'X': {pattern: /[0-9a-zA-Z]/},
'S': {pattern: /[a-zA-Z]/},
'A': {pattern: /[a-zA-Z]/, transform: v => v.toLocaleUpperCase()},
'a': {pattern: /[a-zA-Z]/, transform: v => v.toLocaleLowerCase()},
'!': {escape: true}
```
You can customize using property tokens of v-text-field-simplemask 

```html
<v-text-field-simplemask mask="FFFFFF" :tokens="hexTokens" />
```

```javascript
hexTokens: {
  F: {
    pattern: /[0-9a-fA-F]/,
    transform: v => v.toLocaleUpperCase()
  }
}
```