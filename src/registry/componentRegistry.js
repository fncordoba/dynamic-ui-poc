// Registramos explícitamente los componentes de Widgets para evitar dependencias circulares con DynamicRenderer
import DataTable from '../components/dynamic/DataTable.vue'
import MetricCardGroup from '../components/dynamic/MetricCardGroup.vue'
import AlertBanner from '../components/dynamic/AlertBanner.vue'
import UserForm from '../components/dynamic/UserForm.vue'

export const COMPONENT_REGISTRY = {
  DataTable,
  MetricCardGroup,
  AlertBanner,
  UserForm
}

console.log('✨ [ComponentRegistry] Registrados:', Object.keys(COMPONENT_REGISTRY))
