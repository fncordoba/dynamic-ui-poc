<template>
  <div class="bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border-b border-indigo-500/20 px-6 py-3 flex flex-col md:flex-row md:items-center justify-between gap-4">
    <div class="flex items-center gap-3">
      <div class="p-2 bg-indigo-600/20 rounded-lg text-indigo-400 border border-indigo-500/30 text-lg">
        🎭
      </div>
      <div>
        <div class="flex items-center gap-2">
          <span class="text-xs uppercase tracking-wider text-indigo-400 font-bold">Simulador de Rol Activo:</span>
          <span v-if="activeRole?.readOnly" class="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30 font-bold">
            🔒 READ-ONLY MODE
          </span>
        </div>
        <h1 class="text-sm font-extrabold text-white flex items-center gap-2">
          <span>{{ activeRole?.name }}</span>
          <span class="text-xs text-slate-400 font-normal">({{ activeRole?.id }})</span>
        </h1>
      </div>
    </div>

    <!-- Quick Role Switcher Buttons -->
    <div class="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
      <button
        v-for="r in Object.values(roles)"
        :key="r.id"
        @click="$emit('select-role', r.id)"
        :class="[
          'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap border',
          r.id === activeRole?.id
            ? 'bg-indigo-600 text-white border-indigo-400 shadow-md shadow-indigo-600/20 scale-[1.02]'
            : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border-slate-800'
        ]"
      >
        {{ r.name }}
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  roles: { type: Object, required: true },
  activeRole: { type: Object, default: () => ({}) }
})

defineEmits(['select-role'])
</script>
