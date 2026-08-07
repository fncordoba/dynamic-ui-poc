// Auto-Discovery: Importa automáticamente todos los componentes .vue de /components/dynamic/
const modules = import.meta.glob('../components/dynamic/*.vue', { eager: true })

export const COMPONENT_REGISTRY = {}

for (const path in modules) {
  // Extrae el nombre del archivo (ej: 'DataTable' de '../components/dynamic/DataTable.vue')
  const componentName = path.split('/').pop().replace('.vue', '')
  COMPONENT_REGISTRY[componentName] = modules[path].default
}

console.log('✨ [ComponentRegistry] Componentes descubiertos automáticamente:', Object.keys(COMPONENT_REGISTRY))
