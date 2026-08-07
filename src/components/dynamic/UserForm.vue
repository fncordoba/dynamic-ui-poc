<template>
  <div v-if="config.enabled !== false" class="glass-panel p-5 rounded-2xl mb-6 shadow-xl">
    <h3 class="text-base font-bold text-slate-100 mb-1">{{ config.props?.title || 'Formulario de Usuario' }}</h3>
    <p class="text-xs text-slate-400 mb-4">Modo de edición con control estricto de permisos y solo lectura.</p>

    <form @submit.prevent class="space-y-4 max-w-xl">
      <div>
        <label class="block text-xs font-semibold text-slate-300 mb-1">Nombre Completo</label>
        <input
          type="text"
          value="Alejandro Sabella"
          :disabled="globalReadOnly"
          class="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-100 focus:outline-none focus:border-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>

      <div>
        <label class="block text-xs font-semibold text-slate-300 mb-1">Correo Electrónico</label>
        <input
          type="email"
          value="a.sabella@example.com"
          :disabled="globalReadOnly"
          class="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-100 focus:outline-none focus:border-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>

      <div v-if="enabledActions.length > 0" class="pt-2 flex items-center gap-2">
        <ActionButton
          v-for="action in enabledActions"
          :key="action.id"
          :actionConfig="action"
          :globalReadOnly="globalReadOnly"
        />
      </div>
    </form>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import ActionButton from './ActionButton.vue'

const props = defineProps({
  config: { type: Object, required: true },
  globalReadOnly: { type: Boolean, default: false }
})

const enabledActions = computed(() => {
  return (props.config.actions || []).filter(a => a.enabled !== false)
})
</script>
