<template>
  <v-app class="showcase">
    <div class="showcase__glow showcase__glow--a" aria-hidden="true" />
    <div class="showcase__glow showcase__glow--b" aria-hidden="true" />
    <div class="showcase__grid" aria-hidden="true" />

    <header class="hero">
      <nav class="hero__nav">
        <span class="hero__brand">vuetify-mask</span>
        <div class="hero__links">
          <a
            class="hero__link"
            href="https://www.npmjs.com/package/vuetify-mask-with-slots"
            target="_blank"
            rel="noopener"
            >npm</a
          >
          <a
            class="hero__link"
            href="https://github.com/gabrielhrp31/vuetify-mask"
            target="_blank"
            rel="noopener"
            >GitHub</a
          >
        </div>
      </nav>

      <div class="hero__content">
        <p class="hero__eyebrow">Vue 2 · Vuetify 2 · slots</p>
        <h1 class="hero__title">
          Máscaras que<br />
          <span class="hero__title-accent">respeitam seus slots</span>
        </h1>
        <p class="hero__lead">
          Demo ao vivo do pacote
          <strong>vuetify-mask-with-slots</strong> — money, datas, CPF/CNPJ,
          máscaras custom e mais.
        </p>
        <div class="hero__cta">
          <a class="btn btn--primary" href="#examples">Ver exemplos</a>
          <code class="btn btn--ghost">npm i vuetify-mask-with-slots</code>
        </div>
      </div>
    </header>

    <main id="examples" class="examples">
      <div class="examples__intro">
        <h2>Exemplos interativos</h2>
        <p>Digite nos campos — o <code>v-model</code> atualiza em tempo real.</p>
      </div>

      <div class="examples__grid">
        <demo-card
          title="Money"
          tag="decimal"
          hint="Locale pt-BR, prefixo R$"
          :value="money"
          delay="40ms"
        >
          <v-text-field-money
            v-model="money"
            :properties="{
              label: 'Valor',
              prefix: 'R$',
              outlined: true,
              clearable: true,
              dense: true
            }"
            :options="{ locale: 'pt-BR', length: 11, precision: 2 }"
          />
        </demo-card>

        <demo-card
          title="Percent"
          tag="decimal"
          hint="Mesmo motor do money, com sufixo %"
          :value="percent"
          delay="80ms"
        >
          <v-text-field-percent
            v-model="percent"
            :properties="{
              label: 'Percentual',
              suffix: '%',
              outlined: true,
              clearable: true,
              dense: true
            }"
            :options="{ locale: 'pt-BR', length: 5, precision: 2 }"
          />
        </demo-card>

        <demo-card
          title="Integer"
          tag="digits"
          :value="integer"
          delay="120ms"
        >
          <v-text-field-integer
            v-model="integer"
            label="Inteiro"
            :properties="{ outlined: true, clearable: true, dense: true }"
            :options="{
              inputMask: '#########',
              outputMask: '#########',
              empty: null
            }"
          />
        </demo-card>

        <demo-card
          title="Credit card"
          tag="simplemask"
          :value="card"
          delay="160ms"
        >
          <v-text-field-simplemask
            v-model="card"
            label="Cartão"
            mask="#### #### #### ####"
            outlined
            dense
            clearable
          />
        </demo-card>

        <demo-card
          title="Phone"
          tag="simplemask"
          hint="Máscara BR celular"
          :value="phone"
          delay="200ms"
        >
          <v-text-field-simplemask
            v-model="phone"
            label="Telefone"
            mask="(##) #####-####"
            outlined
            dense
            clearable
          />
        </demo-card>

        <demo-card
          title="Custom mask"
          tag="simplemask"
          hint="Tokens X e # · masked"
          :value="customMask"
          delay="240ms"
        >
          <v-text-field-simplemask
            v-model="customMask"
            label="Código"
            mask="XX-XXXX-XXXX-XXX"
            masked
            outlined
            dense
            clearable
          />
        </demo-card>

        <demo-card
          title="CPF"
          tag="br"
          hint="Valida dígitos com applyAfter"
          :value="cpf"
          delay="280ms"
        >
          <v-text-field-cpf
            v-model="cpf"
            label="CPF"
            :properties="{ outlined: true, clearable: true, dense: true }"
            :options="{
              outputMask: '###########',
              empty: null,
              applyAfter: true
            }"
          />
        </demo-card>

        <demo-card
          title="CNPJ"
          tag="br"
          :value="cnpj"
          delay="320ms"
        >
          <v-text-field-cnpj
            v-model="cnpj"
            label="CNPJ"
            :properties="{ outlined: true, clearable: true, dense: true }"
            :options="{
              outputMask: '##############',
              empty: null,
              applyAfter: true
            }"
          />
        </demo-card>

        <demo-card title="CEP" tag="br" :value="cep" delay="360ms">
          <v-text-field-cep
            v-model="cep"
            label="CEP"
            :properties="{ outlined: true, clearable: true, dense: true }"
            :options="{
              outputMask: '########',
              empty: null,
              applyAfter: true
            }"
          />
        </demo-card>

        <demo-card
          title="Dot number"
          tag="digits"
          hint="Apenas números e ponto"
          :value="dotNumber"
          delay="400ms"
        >
          <v-text-field-dotnumber
            v-model="dotNumber"
            label="Com pontos"
            :properties="{ outlined: true, clearable: true, dense: true }"
            :options="{ length: 20, empty: null }"
          />
        </demo-card>

        <demo-card
          title="DateTime (ms)"
          tag="date"
          hint="v-model em milissegundos"
          :value="dateMs"
          delay="440ms"
        >
          <v-text-field-datetimepicker
            v-model="dateMs"
            label="Data e hora"
            :time="true"
            :properties="{
              outlined: true,
              dense: true,
              clearable: true,
              appendIcon: 'mdi-calendar-clock'
            }"
            :options="{
              inputMask: 'DD/MM/YYYY HH:mm',
              locale: 'pt-BR',
              tabDateTitle: 'Data',
              tabTimeTitle: 'Hora',
              useSeconds: false
            }"
          />
        </demo-card>

        <demo-card
          title="DateTime (string)"
          tag="date"
          hint="v-model formatado"
          :value="dateStr"
          delay="480ms"
        >
          <v-text-field-datetimestringpicker
            v-model="dateStr"
            label="Data string"
            :properties="{
              outlined: true,
              dense: true,
              clearable: true,
              appendIcon: 'mdi-calendar'
            }"
            :options="{
              inputMask: 'YYYY-MM-DD',
              locale: 'pt-BR',
              tabDateTitle: 'Data',
              tabTimeTitle: 'Hora'
            }"
          />
        </demo-card>

        <demo-card
          title="File → Base64"
          tag="file"
          hint="Selecione uma imagem"
          :value="filePreview"
          delay="520ms"
        >
          <v-text-field-filebase64
            v-model="fileBase64"
            label="Arquivo"
            :properties="{
              outlined: true,
              dense: true,
              appendIcon: 'mdi-image-outline'
            }"
            :options="{ acceptFile: 'image/*' }"
            @fileName="fileName = $event"
          />
          <p v-if="fileName" class="file-name">{{ fileName }}</p>
        </demo-card>

        <demo-card
          title="Slot append"
          tag="slots"
          hint="Botão no slot append do simplemask"
          :value="slotMask"
          delay="560ms"
        >
          <v-text-field-simplemask
            v-model="slotMask"
            label="Busca mascarada"
            mask="XX-XXXX-XXXX-XXX"
            outlined
            dense
          >
            <template v-slot:append>
              <v-btn icon small color="primary" @click="onSearch">
                <v-icon small>mdi-magnify</v-icon>
              </v-btn>
            </template>
          </v-text-field-simplemask>
        </demo-card>
      </div>
    </main>

    <footer class="footer">
      <p>
        <strong>vuetify-mask-with-slots</strong> · MIT ·
        <a href="https://github.com/gabrielhrp31/vuetify-mask" target="_blank"
          >gabrielhrp31</a
        >
      </p>
    </footer>

    <v-snackbar v-model="snack" timeout="2200" color="primary" bottom>
      {{ snackText }}
    </v-snackbar>
  </v-app>
</template>

<script>
import DemoCard from "@/demo/DemoCard.vue";

export default {
  name: "App",
  components: { DemoCard },
  data: () => ({
    money: "1234.56",
    percent: "12.34",
    integer: "123456789",
    card: "4111111111111111",
    phone: "11999998888",
    customMask: "23A568B953356",
    cpf: "",
    cnpj: "",
    cep: "01310100",
    dotNumber: "1.2.3",
    dateMs: Date.now(),
    dateStr: "2026-09-21",
    fileBase64: "",
    fileName: "",
    slotMask: "23A568B953356",
    snack: false,
    snackText: ""
  }),
  computed: {
    filePreview() {
      if (!this.fileBase64) return "";
      return this.fileBase64.slice(0, 48) + "…";
    }
  },
  methods: {
    onSearch() {
      this.snackText = `Buscando: ${this.slotMask || "(vazio)"}`;
      this.snack = true;
    }
  }
};
</script>

<style>
:root {
  --bg: #0f1419;
  --surface: #1a222d;
  --text: #e7ecf3;
  --muted: #8b9bb0;
  --accent: #3ecf8e;
  --accent-2: #5b9fd4;
  --font-display: "Sora", system-ui, sans-serif;
  --font-body: "IBM Plex Sans", system-ui, sans-serif;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-body);
}

.showcase {
  background: transparent !important;
  font-family: var(--font-body);
}

.showcase .v-application--wrap {
  min-height: 100vh;
  background: transparent;
}

.showcase__glow {
  position: fixed;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
  z-index: 0;
  opacity: 0.45;
  animation: float-glow 12s ease-in-out infinite alternate;
}

.showcase__glow--a {
  top: -8rem;
  right: -4rem;
  width: 28rem;
  height: 28rem;
  background: radial-gradient(circle, #3ecf8e55, transparent 70%);
}

.showcase__glow--b {
  bottom: 10%;
  left: -6rem;
  width: 24rem;
  height: 24rem;
  background: radial-gradient(circle, #5b9fd455, transparent 70%);
  animation-delay: -4s;
}

.showcase__grid {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  opacity: 0.18;
  background-image: linear-gradient(
      rgba(148, 178, 210, 0.08) 1px,
      transparent 1px
    ),
    linear-gradient(90deg, rgba(148, 178, 210, 0.08) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(ellipse at center, black 20%, transparent 75%);
}

.hero,
.examples,
.footer {
  position: relative;
  z-index: 1;
}

.hero {
  max-width: 1100px;
  margin: 0 auto;
  padding: 1.5rem 1.5rem 3.5rem;
}

.hero__nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 3.5rem;
  opacity: 0;
  animation: rise-in 0.6s ease forwards;
}

.hero__brand {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.15rem;
  letter-spacing: -0.02em;
}

.hero__links {
  display: flex;
  gap: 1rem;
}

.hero__link {
  color: var(--muted);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.hero__link:hover {
  color: var(--accent);
}

.hero__content {
  max-width: 40rem;
  opacity: 0;
  animation: rise-in 0.75s ease 0.12s forwards;
}

.hero__eyebrow {
  margin: 0 0 0.85rem;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent-2);
}

.hero__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(2.2rem, 5vw, 3.4rem);
  font-weight: 700;
  line-height: 1.12;
  letter-spacing: -0.03em;
}

.hero__title-accent {
  background: linear-gradient(110deg, var(--accent) 0%, var(--accent-2) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hero__lead {
  margin: 1.15rem 0 0;
  font-size: 1.05rem;
  line-height: 1.55;
  color: var(--muted);
}

.hero__lead strong {
  color: var(--text);
  font-weight: 600;
}

.hero__cta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.75rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.7rem 1.15rem;
  border-radius: 999px;
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  border: 1px solid transparent;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}

.btn--primary {
  color: #0f1419;
  background: var(--accent);
  box-shadow: 0 8px 24px rgba(62, 207, 142, 0.25);
}

.btn--primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(62, 207, 142, 0.35);
}

.btn--ghost {
  color: var(--muted);
  background: rgba(26, 34, 45, 0.8);
  border-color: rgba(148, 178, 210, 0.2);
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 0.82rem;
}

.examples {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1.5rem 4rem;
}

.examples__intro {
  margin-bottom: 1.75rem;
  opacity: 0;
  animation: rise-in 0.7s ease 0.2s forwards;
}

.examples__intro h2 {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.45rem;
  font-weight: 600;
}

.examples__intro p {
  margin: 0.4rem 0 0;
  color: var(--muted);
}

.examples__intro code {
  color: var(--accent-2);
}

.examples__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.15rem;
}

.examples__grid > :nth-child(11),
.examples__grid > :nth-child(12) {
  grid-column: 1 / -1;
}

@media (min-width: 900px) {
  .examples__grid > :nth-child(11),
  .examples__grid > :nth-child(12) {
    grid-column: span 2;
  }
}

.file-name {
  margin: 0.35rem 0 0;
  font-size: 0.78rem;
  color: var(--muted);
}

.footer {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1.5rem 2.5rem;
  color: var(--muted);
  font-size: 0.85rem;
}

.footer a {
  color: var(--accent);
  text-decoration: none;
}

.footer a:hover {
  text-decoration: underline;
}

/* Vuetify fields on dark cards */
.demo-card .v-text-field--outlined fieldset {
  border-color: rgba(148, 178, 210, 0.28) !important;
}

.demo-card .v-label,
.demo-card .v-text-field__prefix,
.demo-card .v-text-field__suffix {
  color: var(--muted) !important;
}

.demo-card .v-input input {
  color: var(--text) !important;
}

@keyframes rise-in {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float-glow {
  from {
    transform: translate(0, 0) scale(1);
  }
  to {
    transform: translate(-20px, 24px) scale(1.08);
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
