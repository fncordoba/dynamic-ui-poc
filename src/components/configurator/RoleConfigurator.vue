<template>
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
    <!-- Left Column: Visual Checkbox Configurator -->
    <div class="lg:col-span-7 glass-panel p-6 rounded-2xl shadow-xl">
      <div class="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
        <div>
          <h2 class="text-lg font-extrabold text-slate-100 flex items-center gap-2">
            <span>⚙️</span>
            <span>Configurador Visual de Esquema</span>
          </h2>
          <p class="text-xs text-slate-400 mt-1">
            Seleccioná un rol y ajustá los permisos visuales. Cada toggle actualiza la estructura JSON en vivo.
          </p>
        </div>

        <button
          @click="createNewRole"
          class="px-3 py-1.5 bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 border border-indigo-500/40 rounded-lg text-xs font-semibold transition"
        >
          + Nuevo Rol Custom
        </button>
      </div>

      <!-- Active Role Selector -->
      <div class="mb-6 bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-3">
        <div class="flex items-center justify-between">
          <label class="text-xs font-bold text-slate-300 uppercase tracking-wider">Rol a Editar:</label>
          <span class="text-[10px] px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono font-bold">
            ID: {{ editableRole.id }}
          </span>
        </div>

        <select
          :value="activeRoleId"
          @change="$emit('select-role', $event.target.value)"
          class="w-full bg-slate-950 text-slate-100 border border-slate-700 rounded-lg px-3 py-2 text-xs font-medium focus:outline-none focus:border-indigo-500"
        >
          <option v-for="r in Object.values(roles)" :key="r.id" :value="r.id">
            {{ r.name }} ({{ r.id }})
          </option>
        </select>

        <div>
          <label class="block text-[11px] font-semibold text-slate-400 mb-1">Nombre del Rol:</label>
          <input
            v-model="editableRole.name"
            type="text"
            class="w-full bg-slate-950 text-slate-100 border border-slate-800 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-indigo-500"
          />
        </div>

        <!-- Global Read-Only Toggle -->
        <div class="pt-2 flex items-center justify-between border-t border-slate-800/80">
          <div>
            <span class="text-xs font-bold text-slate-200">Modo Solo Lectura Global (Read-Only)</span>
            <p class="text-[11px] text-slate-400">Inhabilita o restringe todos los formularios y acciones de mutación.</p>
          </div>
          <label class="toggle-switch">
            <input type="checkbox" v-model="editableRole.readOnly" />
            <span class="slider"></span>
          </label>
        </div>
      </div>

      <!-- Visual Tree: Tabs & Views Checkboxes -->
      <div class="space-y-4">
        <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400">Estructura de Menú y Componentes</h3>

        <div
          v-for="tab in editableRole.tabs"
          :key="tab.id"
          :class="[
            'p-4 rounded-xl border transition-all',
            tab.enabled !== false ? 'bg-slate-900/60 border-slate-700/80' : 'bg-slate-950/40 border-slate-900 opacity-60'
          ]"
        >
          <!-- Tab Header Toggle -->
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <input
                type="checkbox"
                :id="`tab-${tab.id}`"
                v-model="tab.enabled"
                class="w-4 h-4 rounded border-slate-700 bg-slate-950 text-indigo-600 focus:ring-indigo-500"
              />
              <label :for="`tab-${tab.id}`" class="text-sm font-bold text-slate-100 cursor-pointer">
                📌 Tab: {{ tab.label }}
              </label>
            </div>
            <span :class="['text-[10px] font-bold px-2 py-0.5 rounded', tab.enabled !== false ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400']">
              {{ tab.enabled !== false ? 'VISIBLE' : 'OCULTO' }}
            </span>
          </div>

          <!-- Views inside tab -->
          <div v-if="tab.enabled !== false && tab.views?.length > 0" class="mt-4 pl-6 space-y-4 border-l-2 border-indigo-500/20">
            <div
              v-for="view in tab.views"
              :key="view.id"
              class="bg-slate-950/80 p-3 rounded-lg border border-slate-800 space-y-3"
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <input
                    type="checkbox"
                    :id="`view-${view.id}`"
                    v-model="view.enabled"
                    class="w-3.5 h-3.5 rounded border-slate-700 bg-slate-900 text-indigo-600"
                  />
                  <label :for="`view-${view.id}`" class="text-xs font-semibold text-slate-200 cursor-pointer">
                    🧩 Widget: <span class="text-indigo-300">{{ view.props?.title || view.id }}</span>
                    <span class="text-[10px] text-slate-500 font-mono">({{ view.type }})</span>
                  </label>
                </div>
              </div>

              <!-- Columns customization if DataTable -->
              <div v-if="view.enabled !== false && view.props?.columns" class="pl-4 pt-2 border-t border-slate-800/80">
                <span class="text-[11px] font-bold text-slate-400 block mb-1">Columnas Visibles:</span>
                <div class="flex flex-wrap gap-3">
                  <label
                    v-for="col in view.props.columns"
                    :key="col.key"
                    class="flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer bg-slate-900 px-2 py-1 rounded border border-slate-800"
                  >
                    <input type="checkbox" v-model="col.enabled" class="rounded border-slate-700 text-indigo-500" />
                    <span>{{ col.label }}</span>
                  </label>
                </div>
              </div>

              <!-- Actions customization -->
              <div v-if="view.enabled !== false && view.actions?.length > 0" class="pl-4 pt-2 border-t border-slate-800/80 space-y-2">
                <span class="text-[11px] font-bold text-slate-400 block">Botones de Acción:</span>
                <div v-for="act in view.actions" :key="act.id" class="flex items-center justify-between bg-slate-900 px-2.5 py-1.5 rounded border border-slate-800 text-xs">
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" v-model="act.enabled" class="rounded border-slate-700 text-indigo-500" />
                    <span class="font-medium text-slate-200">{{ act.label }}</span>
                  </label>

                  <label v-if="act.enabled !== false" class="flex items-center gap-1.5 text-[10px] text-amber-300 font-medium">
                    <input type="checkbox" v-model="act.readOnly" class="rounded border-slate-700 text-amber-500" />
                    <span>Read-Only</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Save Role Actions -->
      <div class="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
        <span class="text-xs text-slate-400">Los cambios guardados persistirán localmente y en el backend PHP.</span>
        <button
          @click="saveCurrentRole"
          class="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition shadow-lg shadow-indigo-600/20 flex items-center gap-2"
        >
          <span>💾 Guardar Esquema de Rol</span>
        </button>
      </div>
    </div>

    <!-- Right Column: Real-time Live JSON Schema Inspector -->
    <div class="lg:col-span-5 space-y-4">
      <div class="glass-panel p-5 rounded-2xl shadow-xl sticky top-4">
        <div class="flex items-center justify-between pb-3 border-b border-slate-800">
          <h3 class="text-sm font-bold text-slate-200 flex items-center gap-2">
            <span>📄</span>
            <span>JSON Schema Generado en Vivo</span>
          </h3>
          <span class="text-[10px] bg-slate-900 border border-slate-700 px-2 py-0.5 rounded font-mono text-emerald-400">
            Live Reactive JSON
          </span>
        </div>

        <p class="text-xs text-slate-400 my-3">
          Este es el esquema declarativo exacto que el servidor o frontend consume para estructurar la vista:
        </p>

        <div class="bg-slate-950 p-4 rounded-xl border border-slate-800 max-h-[600px] overflow-y-auto font-mono text-[11px] text-indigo-300">
          <pre><code>{{ JSON.stringify(editableRole, null, 2) }}</code></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  roles: { type: Object, required: true },
  activeRoleId: { type: String, required: true }
})

const emit = defineEmits(['select-role', 'save-role', 'create-role'])

const editableRole = ref(JSON.parse(JSON.stringify(props.roles[props.activeRoleId] || {})))

watch(
  () => props.activeRoleId,
  (newId) => {
    if (props.roles[newId]) {
      editableRole.value = JSON.parse(JSON.stringify(props.roles[newId]))
    }
  },
  { deep: true, immediate: true }
)

function createNewRole() {
  const newId = 'role_' + Date.now()
  const template = {
    id: newId,
    name: 'Nuevo Rol Personalizado',
    description: 'Rol creado desde el configurador visual.',
    readOnly: false,
    tabs: JSON.parse(JSON.stringify(props.roles['super_admin']?.tabs || []))
  }
  emit('create-role', template)
}

function saveCurrentRole() {
  emit('save-role', editableRole.value)
  alert(`✅ Esquema del Rol "${editableRole.value.name}" guardado exitosamente!`)
}
</script>
