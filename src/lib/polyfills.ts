// src/lib/polyfills.ts
import { Temporal as TemporalPolyfill } from "@js-temporal/polyfill"

declare global {
  // Adiciona a tipagem correta para o objeto global
  var Temporal: typeof TemporalPolyfill | undefined
}

if (!globalThis.Temporal) {
  globalThis.Temporal = TemporalPolyfill
}

export {}
