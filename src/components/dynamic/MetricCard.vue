<template>
  <div v-if="config.enabled !== false" class="glass-card p-4 rounded-xl flex flex-col justify-between">
    <div class="flex items-center justify-between text-xs text-slate-400 font-medium">
      <span>{{ config.props?.label || 'Métrica' }}</span>
      <span :class="['px-1.5 py-0.5 rounded text-[10px] font-bold', colorBadgeClass]">
        {{ config.props?.trend || '' }}
      </span>
    </div>
    <div class="mt-2 text-2xl font-extrabold text-white tracking-tight">
      {{ config.props?.value || '0' }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  config: { type: Object, required: true }
})

const colorBadgeClass = computed(() => {
  const c = props.config.props?.color
  if (c === 'emerald') return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
  if (c === 'amber') return 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
  if (c === 'blue') return 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
  return 'bg-slate-700/30 text-slate-300'
})
</script>
