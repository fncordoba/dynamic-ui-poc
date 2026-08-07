<template>
  <div v-if="config.enabled !== false" class="mb-6">
    <h3 v-if="config.props?.title" class="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-3">
      {{ config.props.title }}
    </h3>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <MetricCard
        v-for="child in enabledChildren"
        :key="child.id"
        :config="child"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import MetricCard from './MetricCard.vue'

const props = defineProps({
  config: { type: Object, required: true }
})

const enabledChildren = computed(() => {
  return (props.config.children || []).filter(c => c.enabled !== false)
})
</script>
