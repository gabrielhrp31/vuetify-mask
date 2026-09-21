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
          <div class="lang-switch" role="group" :aria-label="localeLabel">
            <button
              type="button"
              class="lang-switch__btn"
              :class="{ 'is-active': locale === 'en' }"
              @click="setLocale('en')"
            >
              EN
            </button>
            <button
              type="button"
              class="lang-switch__btn"
              :class="{ 'is-active': locale === 'pt' }"
              @click="setLocale('pt')"
            >
              PT
            </button>
          </div>
        </div>
      </nav>

      <div class="hero__content">
        <p class="hero__eyebrow">{{ t("hero.eyebrow") }}</p>
        <h1 class="hero__title">
          {{ t("hero.titleBefore") }}<br />
          <span class="hero__title-accent">{{ t("hero.titleAccent") }}</span>
        </h1>
        <p class="hero__lead">
          {{ t("hero.leadBefore") }}
          <strong>vuetify-mask-with-slots</strong>
          {{ t("hero.leadAfter") }}
        </p>
        <div class="hero__cta">
          <a class="btn btn--primary" href="#examples">{{
            t("hero.ctaExamples")
          }}</a>
          <a class="btn btn--ghost-link" href="#story">{{
            t("hero.ctaStory")
          }}</a>
          <code class="btn btn--ghost">npm i vuetify-mask-with-slots</code>
        </div>
      </div>
    </header>

    <section id="story" class="story">
      <div class="story__inner">
        <p class="story__eyebrow">{{ t("story.eyebrow") }}</p>
        <h2 class="story__title">{{ t("story.title") }}</h2>
        <div class="story__body">
          <p v-html="t('story.p1')" />
          <p v-html="t('story.p2')" />
          <p v-html="t('story.p3')" />
        </div>
        <ul class="story__proofs">
          <li>
            <a
              href="https://github.com/juareznasato/vuetify-mask"
              target="_blank"
              rel="noopener"
              >{{ t("story.proofOriginal") }}</a
            >
            <span>{{ t("story.proofOriginalHint") }}</span>
          </li>
          <li>
            <a
              href="https://www.npmjs.com/package/vuetify-mask/v/1.1.2"
              target="_blank"
              rel="noopener"
              >{{ t("story.proofNpm") }}</a
            >
            <span>{{ t("story.proofNpmHint") }}</span>
          </li>
          <li>
            <a
              href="https://github.com/juareznasato/vuetify-mask/issues/33"
              target="_blank"
              rel="noopener"
              >{{ t("story.proofIssue") }}</a
            >
            <span>{{ t("story.proofIssueHint") }}</span>
          </li>
        </ul>
      </div>
    </section>

    <main id="examples" class="examples">
      <div class="examples__intro">
        <h2>{{ t("examples.title") }}</h2>
        <p>{{ t("examples.subtitle") }}</p>
      </div>

      <div class="examples__grid">
        <demo-card
          title="Money"
          tag="decimal"
          :hint="t('examples.moneyHint')"
          :value="money"
          delay="40ms"
        >
          <v-text-field-money
            v-model="money"
            :properties="{
              label: t('examples.moneyLabel'),
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
          :hint="t('examples.percentHint')"
          :value="percent"
          delay="80ms"
        >
          <v-text-field-percent
            v-model="percent"
            :properties="{
              label: t('examples.percentLabel'),
              suffix: '%',
              outlined: true,
              clearable: true,
              dense: true
            }"
            :options="{ locale: 'pt-BR', length: 5, precision: 2 }"
          />
        </demo-card>

        <demo-card title="Integer" tag="digits" :value="integer" delay="120ms">
          <v-text-field-integer
            v-model="integer"
            :label="t('examples.integerLabel')"
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
            :label="t('examples.cardLabel')"
            mask="#### #### #### ####"
            outlined
            dense
            clearable
          />
        </demo-card>

        <demo-card
          title="Phone"
          tag="simplemask"
          :hint="t('examples.phoneHint')"
          :value="phone"
          delay="200ms"
        >
          <v-text-field-simplemask
            v-model="phone"
            :label="t('examples.phoneLabel')"
            mask="(##) #####-####"
            outlined
            dense
            clearable
          />
        </demo-card>

        <demo-card
          title="Custom mask"
          tag="simplemask"
          :hint="t('examples.customHint')"
          :value="customMask"
          delay="240ms"
        >
          <v-text-field-simplemask
            v-model="customMask"
            :label="t('examples.customLabel')"
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
          :hint="t('examples.cpfHint')"
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

        <demo-card title="CNPJ" tag="br" :value="cnpj" delay="320ms">
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
          :hint="t('examples.dotHint')"
          :value="dotNumber"
          delay="400ms"
        >
          <v-text-field-dotnumber
            v-model="dotNumber"
            :label="t('examples.dotLabel')"
            :properties="{ outlined: true, clearable: true, dense: true }"
            :options="{ length: 20, empty: null }"
          />
        </demo-card>

        <demo-card
          title="DateTime (ms)"
          tag="date"
          :hint="t('examples.dateMsHint')"
          :value="dateMs"
          delay="440ms"
        >
          <v-text-field-datetimepicker
            v-model="dateMs"
            :label="t('examples.dateMsLabel')"
            :time="true"
            :properties="{
              outlined: true,
              dense: true,
              clearable: true,
              appendIcon: 'mdi-calendar-clock'
            }"
            :options="{
              inputMask: 'DD/MM/YYYY HH:mm',
              locale: datePickerLocale,
              tabDateTitle: t('examples.tabDate'),
              tabTimeTitle: t('examples.tabTime'),
              useSeconds: false
            }"
          />
        </demo-card>

        <demo-card
          title="DateTime (string)"
          tag="date"
          :hint="t('examples.dateStrHint')"
          :value="dateStr"
          delay="480ms"
        >
          <v-text-field-datetimestringpicker
            v-model="dateStr"
            :label="t('examples.dateStrLabel')"
            :properties="{
              outlined: true,
              dense: true,
              clearable: true,
              appendIcon: 'mdi-calendar'
            }"
            :options="{
              inputMask: 'YYYY-MM-DD',
              locale: datePickerLocale,
              tabDateTitle: t('examples.tabDate'),
              tabTimeTitle: t('examples.tabTime')
            }"
          />
        </demo-card>

        <demo-card
          title="File → Base64"
          tag="file"
          :hint="t('examples.fileHint')"
          :value="filePreview"
          delay="520ms"
        >
          <v-text-field-filebase64
            v-model="fileBase64"
            :label="t('examples.fileLabel')"
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
          id="slot-demo"
          title="Slot append"
          tag="slots"
          :hint="t('examples.slotHint')"
          :value="slotMask"
          delay="560ms"
        >
          <v-text-field-simplemask
            v-model="slotMask"
            :label="t('examples.slotLabel')"
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
        {{ t("footer.maintainedBy") }}
        <a href="https://github.com/gabrielhrp31" target="_blank" rel="noopener"
          >gabrielhrp31</a
        >
        · {{ t("footer.forkOf") }}
        <a
          href="https://github.com/juareznasato/vuetify-mask"
          target="_blank"
          rel="noopener"
          >vuetify-mask</a
        >
        {{ t("footer.by") }}
        <a href="https://github.com/juareznasato" target="_blank" rel="noopener"
          >Juarez Nasato</a
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
import {
  DEFAULT_LOCALE,
  getMessage,
  messages
} from "@/i18n/messages.js";

const STORAGE_KEY = "vuetify-mask-locale";

function resolveInitialLocale() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && messages[saved]) return saved;
  } catch (e) {
    /* ignore */
  }
  return DEFAULT_LOCALE;
}

export default {
  name: "App",
  components: { DemoCard },
  data: () => ({
    locale: resolveInitialLocale(),
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
    },
    datePickerLocale() {
      return this.locale === "pt" ? "pt-BR" : "en-US";
    },
    localeLabel() {
      return this.locale === "pt" ? "Idioma" : "Language";
    }
  },
  watch: {
    locale: {
      immediate: true,
      handler(value) {
        this.applyDocumentLocale(value);
      }
    }
  },
  methods: {
    t(path) {
      return (
        getMessage(this.locale, path) ||
        getMessage(DEFAULT_LOCALE, path) ||
        path
      );
    },
    setLocale(locale) {
      if (!messages[locale]) return;
      this.locale = locale;
      try {
        localStorage.setItem(STORAGE_KEY, locale);
      } catch (e) {
        /* ignore */
      }
    },
    applyDocumentLocale(locale) {
      const htmlLang = locale === "pt" ? "pt-BR" : "en";
      document.documentElement.lang = htmlLang;
      document.title = this.t("meta.title");
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute("content", this.t("meta.description"));
    },
    onSearch() {
      this.snackText = `${this.t("examples.searching")} ${this.slotMask ||
        "(empty)"}`;
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
.story,
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
  align-items: center;
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

.lang-switch {
  display: inline-flex;
  padding: 0.15rem;
  border-radius: 999px;
  border: 1px solid rgba(148, 178, 210, 0.22);
  background: rgba(26, 34, 45, 0.85);
}

.lang-switch__btn {
  border: 0;
  background: transparent;
  color: var(--muted);
  font: inherit;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  padding: 0.35rem 0.55rem;
  border-radius: 999px;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
}

.lang-switch__btn.is-active {
  background: var(--accent);
  color: #0f1419;
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
  color: #0f1419 !important;
  background: var(--accent);
  box-shadow: 0 8px 24px rgba(62, 207, 142, 0.25);
}

.btn--primary:hover {
  color: #0f1419 !important;
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

.btn--ghost-link {
  color: var(--text) !important;
  background: transparent;
  border-color: rgba(148, 178, 210, 0.28);
}

.btn--ghost-link:hover {
  border-color: var(--accent);
  color: var(--accent) !important;
}

.story {
  max-width: 1100px;
  margin: 0 auto 3rem;
  padding: 0 1.5rem;
}

.story__inner {
  padding: 1.75rem 1.85rem 1.85rem;
  border-radius: 20px;
  background: linear-gradient(
    155deg,
    rgba(26, 34, 45, 0.95) 0%,
    rgba(18, 24, 33, 0.92) 100%
  );
  border: 1px solid rgba(148, 178, 210, 0.16);
  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.28);
  opacity: 0;
  animation: rise-in 0.75s ease 0.18s forwards;
}

.story__eyebrow {
  margin: 0 0 0.55rem;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent);
}

.story__title {
  margin: 0 0 1.1rem;
  font-family: var(--font-display);
  font-size: clamp(1.35rem, 2.5vw, 1.75rem);
  font-weight: 600;
  letter-spacing: -0.02em;
}

.story__body {
  display: grid;
  gap: 0.85rem;
  max-width: 46rem;
}

.story__body p {
  margin: 0;
  font-size: 0.98rem;
  line-height: 1.65;
  color: var(--muted);
}

.story__body strong {
  color: var(--text);
  font-weight: 600;
}

.story__body a {
  color: var(--accent-2);
  text-decoration: none;
}

.story__body a:hover {
  color: var(--accent);
  text-decoration: underline;
}

.story__body code {
  font-size: 0.88em;
  color: #c9d6e5;
}

.story__proofs {
  list-style: none;
  display: grid;
  gap: 0.65rem;
  margin: 1.4rem 0 0;
  padding: 1.15rem 0 0;
  border-top: 1px solid rgba(148, 178, 210, 0.14);
}

@media (min-width: 720px) {
  .story__proofs {
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }
}

.story__proofs li {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.story__proofs a {
  color: var(--accent);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
}

.story__proofs a:hover {
  text-decoration: underline;
}

.story__proofs span {
  font-size: 0.78rem;
  color: var(--muted);
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
