<template>
  <article class="demo-card" :style="{ '--delay': delay }">
    <header class="demo-card__head">
      <span class="demo-card__tag">{{ tag }}</span>
      <h3 class="demo-card__title">{{ title }}</h3>
      <p v-if="hint" class="demo-card__hint">{{ hint }}</p>
    </header>
    <div class="demo-card__body">
      <slot />
    </div>
    <footer class="demo-card__foot">
      <span class="demo-card__label">v-model</span>
      <code class="demo-card__value">{{ formatted }}</code>
    </footer>
  </article>
</template>

<script>
export default {
  name: "DemoCard",
  props: {
    title: { type: String, required: true },
    tag: { type: String, default: "field" },
    hint: { type: String, default: "" },
    value: { default: null },
    delay: { type: String, default: "0ms" }
  },
  computed: {
    formatted() {
      if (this.value === null) return "null";
      if (this.value === undefined) return "undefined";
      if (this.value === "") return '""';
      if (typeof this.value === "object") return JSON.stringify(this.value);
      return String(this.value);
    }
  }
};
</script>

<style scoped>
.demo-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.25rem 1.35rem 1.1rem;
  border-radius: 18px;
  background: linear-gradient(
    160deg,
    rgba(32, 42, 56, 0.92) 0%,
    rgba(22, 29, 40, 0.88) 100%
  );
  border: 1px solid rgba(148, 178, 210, 0.14);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.28);
  backdrop-filter: blur(10px);
  opacity: 0;
  transform: translateY(18px);
  animation: rise-in 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  animation-delay: var(--delay);
  transition: border-color 0.25s ease, transform 0.25s ease,
    box-shadow 0.25s ease;
}

.demo-card:hover {
  border-color: rgba(62, 207, 142, 0.35);
  transform: translateY(-3px);
  box-shadow: 0 22px 48px rgba(0, 0, 0, 0.35);
}

.demo-card__tag {
  display: inline-block;
  margin-bottom: 0.45rem;
  padding: 0.15rem 0.55rem;
  border-radius: 999px;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #0f1419;
  background: #3ecf8e;
}

.demo-card__title {
  margin: 0;
  font-family: Sora, sans-serif;
  font-size: 1.05rem;
  font-weight: 600;
  color: #eef3f8;
}

.demo-card__hint {
  margin: 0.35rem 0 0;
  font-size: 0.82rem;
  line-height: 1.4;
  color: #8b9bb0;
}

.demo-card__body {
  flex: 1;
}

.demo-card__foot {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding-top: 0.75rem;
  border-top: 1px solid rgba(148, 178, 210, 0.12);
}

.demo-card__label {
  flex-shrink: 0;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #5b9fd4;
}

.demo-card__value {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: "IBM Plex Sans", ui-monospace, monospace;
  font-size: 0.82rem;
  color: #c9d6e5;
}

@keyframes rise-in {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
