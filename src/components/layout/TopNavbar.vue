<template>
  <nav class="bg-slate-900/90 border-b border-slate-800 px-6 py-2 flex items-center justify-between">
    <!-- Brand / Logo -->
    <div class="flex items-center gap-3">
      <div class="bg-indigo-600 font-extrabold text-white text-xs px-2.5 py-1 rounded-lg tracking-wider">
        KOLTIN
      </div>
      <span class="text-xs text-slate-400 font-medium hidden sm:inline">Dynamic UI Engine</span>
    </div>

    <!-- Dynamic Tabs Rendered From Role Schema -->
    <div v-if="enabledTabs.length > 0" class="flex items-center gap-1">
      <button
        v-for="tab in enabledTabs"
        :key="tab.id"
        @click="$emit('select-tab', tab.id)"
        :class="[
          'px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border',
          activeTabId === tab.id
            ? 'bg-indigo-600/20 text-indigo-300 border-indigo-500/40 shadow-sm'
            : 'text-slate-400 hover:text-slate-200 border-transparent hover:bg-slate-800/40'
        ]"
      >
        <span>{{ getTabIcon(tab.id) }}</span>
        <span>{{ tab.label }}</span>
        <span class="text-[9px] bg-slate-800 text-slate-400 px-1.5 py-0.2 rounded-full">
          {{ tab.views?.filter(v => v.enabled !== false).length || 0 }}
        </span>
      </button>
    </div>
    <div v-else class="text-xs text-amber-400 font-medium py-1">
      ⚠️ Este rol no tiene ningún Tab de navegación habilitado.
    </div>

    <!-- Mode Badge -->
    <div class="text-xs text-slate-400 flex items-center gap-2">
      <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
      <span class="font-mono text-[11px]">Schema Engine v1.0</span>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  tabs: { type: Array, default: () => [] },
  activeTabId: { type: String, default: '' }
})

defineEmits(['select-tab'])

const enabledTabs = computed(() => {
  return props.tabs.filter(t => t.enabled !== false)
})

function getTabIcon(id) {
  switch (id) {
    case 'aplicaciones': return '📱'
    case 'siniestros': return '🛡️'
    case 'certificados': return '📜'
    case 'usuarios': return '👥'
    default: return '📁'
  }
}
</script>
