<template>
  <div class="min-h-screen bg-slate-950 flex flex-col">
    <!-- Main Top Mode Toggle Header -->
    <header class="bg-slate-900 border-b border-slate-800 px-6 py-3 flex items-center justify-between shadow-md">
      <div class="flex items-center gap-3">
        <span class="text-xl">🚀</span>
        <div>
          <h1 class="text-sm font-extrabold text-white tracking-tight">Dynamic UI Architecture PoC</h1>
          <p class="text-[11px] text-slate-400">Declarative Schema-Driven UI & Role-Based Layout Generator</p>
        </div>
      </div>

      <!-- Mode Switcher Tabs -->
      <div class="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
        <button
          @click="appMode = 'user_portal'"
          :class="[
            'px-4 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-2',
            appMode === 'user_portal'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          ]"
        >
          <span>👁️ Portal Usuario (Dynamic View)</span>
        </button>
        <button
          @click="appMode = 'admin_configurator'"
          :class="[
            'px-4 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-2',
            appMode === 'admin_configurator'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          ]"
        >
          <span>⚙️ Configurador de Roles (Admin)</span>
        </button>
      </div>
    </header>

    <!-- Role Switcher & Impersonation Bar -->
    <RoleSwitcher
      :roles="roles"
      :activeRole="activeRole"
      @select-role="handleSelectRole"
    />

    <!-- Main Content Body -->
    <main class="flex-1 p-6">
      <!-- MODE 1: ADMIN CONFIGURATOR -->
      <div v-if="appMode === 'admin_configurator'">
        <RoleConfigurator
          :roles="roles"
          :activeRoleId="activeRoleId"
          @select-role="handleSelectRole"
          @save-role="handleSaveRole"
          @create-role="handleCreateRole"
        />
      </div>

      <!-- MODE 2: DYNAMIC USER PORTAL VIEW -->
      <div v-else class="space-y-6">
        <!-- Top Navbar with Dynamic Tabs -->
        <TopNavbar
          :tabs="activeRole?.tabs || []"
          :activeTabId="activeTabId"
          @select-tab="handleSelectTab"
        />

        <!-- Read-Only Mode Banner if Active -->
        <div v-if="activeRole?.readOnly" class="bg-amber-950/40 border border-amber-500/30 p-3.5 rounded-xl text-xs text-amber-200 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span>🔒</span>
            <span><strong>Modo Solo Lectura Activado:</strong> El esquema de este rol inhabilita el envío de formularios y las acciones de mutación.</span>
          </div>
          <span class="text-[10px] bg-amber-500/20 px-2 py-0.5 rounded font-mono font-bold">READ_ONLY: TRUE</span>
        </div>

        <!-- Rendered Views for Active Tab -->
        <div v-if="activeTabViews.length > 0" class="space-y-6">
          <DynamicRenderer
            v-for="view in activeTabViews"
            :key="view.id"
            :viewConfig="view"
            :globalReadOnly="activeRole?.readOnly || false"
          />
        </div>
        <div v-else class="glass-panel p-12 text-center rounded-2xl">
          <div class="text-3xl mb-2">🚫</div>
          <h3 class="text-base font-bold text-slate-200">No hay vistas habilitadas</h3>
          <p class="text-xs text-slate-400 mt-1 max-w-md mx-auto">
            El tab seleccionado no posee ningún widget habilitado en el esquema actual. Cambiá de tab o habilitalos desde el Configurador.
          </p>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-slate-900/60 border-t border-slate-800/80 px-6 py-3 text-center text-xs text-slate-500">
      Proof of Concept • Dynamic Schema-Driven Frontend Architecture
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { fetchRoles, saveRole } from './services/schemaService.js'
import RoleSwitcher from './components/layout/RoleSwitcher.vue'
import TopNavbar from './components/layout/TopNavbar.vue'
import RoleConfigurator from './components/configurator/RoleConfigurator.vue'
import DynamicRenderer from './components/dynamic/DynamicRenderer.vue'

const appMode = ref('user_portal') // 'user_portal' or 'admin_configurator'
const roles = ref({})
const activeRoleId = ref('super_admin')
const activeTabId = ref('aplicaciones')

const activeRole = computed(() => {
  return roles.value[activeRoleId.value] || null
})

const activeTab = computed(() => {
  if (!activeRole.value?.tabs) return null
  return activeRole.value.tabs.find(t => t.id === activeTabId.value && t.enabled !== false) || null
})

const activeTabViews = computed(() => {
  if (!activeTab.value?.views) return []
  return activeTab.value.views.filter(v => v.enabled !== false)
})

onMounted(async () => {
  roles.value = await fetchRoles()
  syncDefaultTab()
})

function syncDefaultTab() {
  if (activeRole.value?.tabs) {
    const firstEnabled = activeRole.value.tabs.find(t => t.enabled !== false)
    if (firstEnabled) {
      activeTabId.value = firstEnabled.id
    }
  }
}

function handleSelectRole(roleId) {
  activeRoleId.value = roleId
  syncDefaultTab()
}

function handleSelectTab(tabId) {
  activeTabId.value = tabId
}

async function handleSaveRole(updatedRole) {
  roles.value[updatedRole.id] = updatedRole
  await saveRole(updatedRole)
}

async function handleCreateRole(newRole) {
  roles.value[newRole.id] = newRole
  activeRoleId.value = newRole.id
  await saveRole(newRole)
  syncDefaultTab()
}
</script>
