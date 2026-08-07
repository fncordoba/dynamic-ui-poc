<template>
  <div v-if="config.enabled !== false" class="glass-panel p-5 rounded-2xl mb-6 shadow-xl">
    <!-- Header & Actions -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
      <div>
        <h3 class="text-base font-bold text-slate-100">{{ config.props?.title || 'Tabla de Datos' }}</h3>
        <p class="text-xs text-slate-400 mt-0.5">
          Componente renderizado dinámicamente según el esquema del rol activo.
        </p>
      </div>

      <!-- Action Buttons enabled for this role -->
      <div v-if="enabledActions.length > 0" class="flex flex-wrap items-center gap-2">
        <ActionButton
          v-for="action in enabledActions"
          :key="action.id"
          :actionConfig="action"
          :globalReadOnly="globalReadOnly"
        />
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto mt-4">
      <table class="w-full text-left text-xs text-slate-300">
        <thead class="bg-slate-900/80 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
          <tr>
            <th
              v-for="col in enabledColumns"
              :key="col.key"
              class="px-4 py-3"
            >
              {{ col.label }}
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-800/60">
          <tr
            v-for="(row, idx) in mockData"
            :key="idx"
            class="hover:bg-slate-800/40 transition-colors"
          >
            <td
              v-for="col in enabledColumns"
              :key="col.key"
              class="px-4 py-3 whitespace-nowrap font-medium"
            >
              <span v-if="col.key === 'status'" :class="['px-2 py-0.5 rounded-full text-[10px] font-bold border', getStatusBadge(row[col.key])]">
                {{ row[col.key] }}
              </span>
              <span v-else-if="col.key === 'amount' || col.key === 'claimed_amount'" class="font-mono text-emerald-400 font-bold">
                {{ row[col.key] }}
              </span>
              <span v-else>
                {{ row[col.key] || '-' }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import ActionButton from './ActionButton.vue'

const props = defineProps({
  config: { type: Object, required: true },
  globalReadOnly: { type: Boolean, default: false }
})

const enabledColumns = computed(() => {
  return (props.config.props?.columns || []).filter(c => c.enabled !== false)
})

const enabledActions = computed(() => {
  return (props.config.actions || []).filter(a => a.enabled !== false)
})

// Sample Mock Data
const mockData = computed(() => {
  const title = (props.config.props?.title || '').toLowerCase()

  if (title.includes('siniestro') || title.includes('reclamo')) {
    return [
      { claim_no: 'CLM-2026-901', member: 'Martín Palermo', type: 'Gastos Médicos', claimed_amount: '$ 45,000 MXN', status: 'APROBADO', date: '2026-08-01' },
      { claim_no: 'CLM-2026-902', member: 'Juan Román Riquelme', type: 'Hospitalización', claimed_amount: '$ 120,500 MXN', status: 'EN REVISIÓN', date: '2026-08-03' },
      { claim_no: 'CLM-2026-903', member: 'Carlos Tevez', type: 'Medicamentos', claimed_amount: '$ 8,400 MXN', status: 'PENDIENTE', date: '2026-08-06' }
    ]
  }

  if (title.includes('certificado')) {
    return [
      { cert_no: 'CERT-8840-X', holder: 'Nexus Tech Solutions Inc.', effective_date: '2026-01-01', status: 'EMITIDO' },
      { cert_no: 'CERT-8841-Y', holder: 'Asociados Co-op', effective_date: '2026-03-15', status: 'EN PROCESO' }
    ]
  }

  // Default Applications
  return [
    { id: 'APP-101', applicant: 'Sofía Martínez', plan: 'Plan Colectivo Integral', amount: '$ 500,000', status: 'COMPLETADO' },
    { id: 'APP-102', applicant: 'Gabriel Milito', plan: 'Plan Senior Plus', amount: '$ 750,000', status: 'EN REVISIÓN' },
    { id: 'APP-103', applicant: 'Lionel Messi', plan: 'Plan Gold Premium', amount: '$ 2,000,000', status: 'APROBADO' }
  ]
})

function getStatusBadge(val) {
  if (!val) return 'bg-slate-800 text-slate-400'
  const v = String(val).toUpperCase()
  if (v.includes('APROBADO') || v.includes('COMPLETADO') || v.includes('EMITIDO')) {
    return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
  }
  if (v.includes('REVISIÓN') || v.includes('PROCESO') || v.includes('PENDIENTE')) {
    return 'bg-amber-500/10 text-amber-400 border-amber-500/30'
  }
  return 'bg-slate-800 text-slate-300 border-slate-700'
}
</script>
