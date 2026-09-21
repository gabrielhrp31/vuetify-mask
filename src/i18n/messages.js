export const DEFAULT_LOCALE = "en";

export const messages = {
  en: {
    meta: {
      title: "vuetify-mask — demos",
      description:
        "Live demo of vuetify-mask-with-slots — Vuetify 2 text-field masks with working slots."
    },
    nav: {
      story: "Story",
      examples: "Examples",
      demo: "Demo"
    },
    hero: {
      eyebrow: "Vue 2 · Vuetify 2 · slots",
      titleBefore: "Masks that",
      titleAccent: "respect your slots",
      leadBefore: "Live demo of",
      leadAfter:
        "— money, dates, CPF/CNPJ, custom masks, and more.",
      ctaExamples: "See examples",
      ctaStory: "The story"
    },
    story: {
      eyebrow: "Why this package exists",
      title: "It started with a production bug",
      p1:
        'A while back, when I was leading frontend at R2DA Tecnologia, we used the original <a href="https://www.npmjs.com/package/vuetify-mask/v/1.1.2" target="_blank" rel="noopener"><code>vuetify-mask@1.1.2</code></a> package by <a href="https://github.com/juareznasato" target="_blank" rel="noopener">Juarez Nasato</a> — a solid foundation for masks on Vuetify 2. The components wrap <code>v-text-field</code>, but <strong>do not forward slots</strong>: in the published code (still <code>latest</code> on npm), the template closes the field without <code>$slots</code> / <code>$scopedSlots</code>. Append, prepend, custom labels, and similar slots simply never showed up.',
      p2:
        'That was not just our impression. Issue <a href="https://github.com/juareznasato/vuetify-mask/issues/33" target="_blank" rel="noopener">#33 — Using slots</a> on the original repo describes the exact same problem (still open), with others confirming.',
      p3:
        "That is how <strong>vuetify-mask-with-slots</strong> was born: a fork of Juarez's work — with full credit to the original author — to keep the masks and make slot inheritance actually work on Vuetify 2. The project sat idle for a while; with help from AI agents, I finished the docs, demo, and publish.",
      proofOriginal: "Original · Juarez Nasato",
      proofOriginalHint: "author of vuetify-mask",
      proofNpm: "npm · vuetify-mask@1.1.2",
      proofNpmHint: "version without slot forwarding",
      proofIssue: "GitHub · issue #33",
      proofIssueHint: "public bug report"
    },
    examples: {
      title: "Interactive examples",
      subtitle: "Type in the fields — the v-model updates in real time.",
      moneyHint: "pt-BR locale, R$ prefix",
      moneyLabel: "Amount",
      percentHint: "Same engine as money, with % suffix",
      percentLabel: "Percent",
      integerLabel: "Integer",
      cardLabel: "Card",
      phoneHint: "Brazilian mobile mask",
      phoneLabel: "Phone",
      customHint: "X and # tokens · masked",
      customLabel: "Code",
      cpfHint: "Validates check digits with applyAfter",
      dotHint: "Digits and dots only",
      dotLabel: "Dotted value",
      dateMsHint: "v-model in milliseconds",
      dateMsLabel: "Date & time",
      dateStrHint: "Formatted string v-model",
      dateStrLabel: "Date string",
      tabDate: "Date",
      tabTime: "Time",
      fileHint: "Pick an image",
      fileLabel: "File",
      slotHint: "Missing in vuetify-mask@1.1.2 — works here",
      slotLabel: "Masked search",
      searching: "Searching:"
    },
    footer: {
      maintainedBy: "maintained by",
      forkOf: "fork of",
      by: "by"
    }
  },
  pt: {
    meta: {
      title: "vuetify-mask — demos",
      description:
        "Demo ao vivo do vuetify-mask-with-slots — máscaras para Vuetify 2 com slots."
    },
    nav: {
      story: "História",
      examples: "Exemplos",
      demo: "Demo"
    },
    hero: {
      eyebrow: "Vue 2 · Vuetify 2 · slots",
      titleBefore: "Máscaras que",
      titleAccent: "respeitam seus slots",
      leadBefore: "Demo ao vivo do",
      leadAfter:
        "— money, datas, CPF/CNPJ, máscaras custom e mais.",
      ctaExamples: "Ver exemplos",
      ctaStory: "A história"
    },
    story: {
      eyebrow: "Por que este pacote existe",
      title: "Nasceu de um bug em produção",
      p1:
        'Há um tempo atrás, quando liderava o frontend na R2DA Tecnologia, usávamos o pacote original <a href="https://www.npmjs.com/package/vuetify-mask/v/1.1.2" target="_blank" rel="noopener"><code>vuetify-mask@1.1.2</code></a> criado por <a href="https://github.com/juareznasato" target="_blank" rel="noopener">Juarez Nasato</a> — ótima base de máscaras para Vuetify 2. Os componentes encapsulam o <code>v-text-field</code>, mas <strong>não encaminham slots</strong>: no código publicado (<code>latest</code> no npm até hoje), o template fecha o campo sem <code>$slots</code> / <code>$scopedSlots</code>. Append, prepend, label custom e afins simplesmente não apareciam.',
      p2:
        'Isso não era só impressão nossa. A issue <a href="https://github.com/juareznasato/vuetify-mask/issues/33" target="_blank" rel="noopener">#33 — Using slots</a> no repositório original descreve exatamente o mesmo problema (ainda aberta), com outras pessoas confirmando.',
      p3:
        "Foi daí que nasceu o <strong>vuetify-mask-with-slots</strong>: um fork do trabalho do Juarez — com todo o crédito ao autor original — para manter as máscaras e fazer a herança de slots funcionar de verdade no Vuetify 2. O projeto ficou um tempo parado; com ajuda de agentes de IA, finalizei a documentação, a demo e a publicação.",
      proofOriginal: "Original · Juarez Nasato",
      proofOriginalHint: "autor do vuetify-mask",
      proofNpm: "npm · vuetify-mask@1.1.2",
      proofNpmHint: "versão sem forward de slots",
      proofIssue: "GitHub · issue #33",
      proofIssueHint: "relato público do bug"
    },
    examples: {
      title: "Exemplos interativos",
      subtitle: "Digite nos campos — o v-model atualiza em tempo real.",
      moneyHint: "Locale pt-BR, prefixo R$",
      moneyLabel: "Valor",
      percentHint: "Mesmo motor do money, com sufixo %",
      percentLabel: "Percentual",
      integerLabel: "Inteiro",
      cardLabel: "Cartão",
      phoneHint: "Máscara BR celular",
      phoneLabel: "Telefone",
      customHint: "Tokens X e # · masked",
      customLabel: "Código",
      cpfHint: "Valida dígitos com applyAfter",
      dotHint: "Apenas números e ponto",
      dotLabel: "Com pontos",
      dateMsHint: "v-model em milissegundos",
      dateMsLabel: "Data e hora",
      dateStrHint: "v-model formatado",
      dateStrLabel: "Data string",
      tabDate: "Data",
      tabTime: "Hora",
      fileHint: "Selecione uma imagem",
      fileLabel: "Arquivo",
      slotHint: "No vuetify-mask@1.1.2 isso não aparecia — aqui funciona",
      slotLabel: "Busca mascarada",
      searching: "Buscando:"
    },
    footer: {
      maintainedBy: "mantido por",
      forkOf: "fork de",
      by: "por"
    }
  }
};

export function getMessage(locale, path) {
  const dict = messages[locale] || messages[DEFAULT_LOCALE];
  return path.split(".").reduce((acc, key) => (acc ? acc[key] : undefined), dict);
}
