<template>
  <div v-if="viewConfig && viewConfig.enabled !== false">
    <component
      :is="resolvedComponent"
      v-if="resolvedComponent"
      :config="viewConfig"
      :globalReadOnly="globalReadOnly"
    />
    <div v-else class="p-4 bg-rose-950/30 border border-rose-800/40 rounded-xl text-xs text-rose-300">
      ⚠️ Componente no registrado en Registry: <code>{{ viewConfig.type }}</code>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { COMPONENT_REGISTRY } from '../../registry/componentRegistry.js'

const props = defineProps({
  viewConfig: { type: Object, required: true },
  globalReadOnly: { type: Boolean, default: false }
})

const resolvedComponent = computed(() => {
  return COMPONENT_REGISTRY[props.viewConfig.type] || null
})
</script>
