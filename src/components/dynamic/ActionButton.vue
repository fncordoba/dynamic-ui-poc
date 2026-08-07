<template>
  <button
    v-if="actionConfig.enabled !== false"
    :disabled="isReadOnly"
    @click="handleAction"
    :class="[
      'px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 flex items-center gap-1.5 shadow-sm',
      variantClasses,
      isReadOnly ? 'opacity-40 cursor-not-allowed filter grayscale' : 'hover:scale-[1.02] active:scale-[0.98]'
    ]"
    :title="isReadOnly ? 'Acción restringida (Perfil en Modo Lectura)' : ''"
  >
    <span v-if="isReadOnly" class="text-[10px] bg-slate-900/60 px-1 py-0.2 rounded border border-slate-700">🔒 Read-Only</span>
    <span>{{ actionConfig.label }}</span>
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  actionConfig: { type: Object, required: true },
  globalReadOnly: { type: Boolean, default: false }
})

const emit = defineEmits(['trigger'])

const isReadOnly = computed(() => {
  return props.globalReadOnly || props.actionConfig.readOnly === true
})

const variantClasses = computed(() => {
  switch (props.actionConfig.variant) {
    case 'primary':
      return 'bg-indigo-600 hover:bg-indigo-500 text-white border border-indigo-400/30'
    case 'success':
      return 'bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-400/30'
    case 'danger':
      return 'bg-rose-600 hover:bg-rose-500 text-white border border-rose-400/30'
    case 'secondary':
    default:
      return 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
  }
})

function handleAction() {
  if (isReadOnly.value) return
  alert(`⚡ Accion Ejecutada: [${props.actionConfig.action || props.actionConfig.label}] en base al Schema!`)
  emit('trigger', props.actionConfig)
}
</script>
