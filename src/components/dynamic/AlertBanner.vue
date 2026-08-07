<template>
  <div v-if="config.enabled !== false" :class="['p-3.5 rounded-xl text-xs flex items-center gap-3 mb-5 border shadow-sm', typeClasses]">
    <span class="text-base">📢</span>
    <div class="font-medium">
      {{ config.props?.message || 'Aviso del sistema' }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  config: { type: Object, required: true }
})

const typeClasses = computed(() => {
  const t = props.config.props?.type
  if (t === 'warning') return 'bg-amber-950/40 text-amber-200 border-amber-500/30'
  if (t === 'info') return 'bg-indigo-950/40 text-indigo-200 border-indigo-500/30'
  if (t === 'danger') return 'bg-rose-950/40 text-rose-200 border-rose-500/30'
  return 'bg-slate-900 text-slate-200 border-slate-700'
})
</script>
