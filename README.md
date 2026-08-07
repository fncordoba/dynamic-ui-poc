# 🚀 Koltin Dynamic UI Schema & Role Configurator PoC

An enterprise-grade **Declarative Schema-Driven UI Engine** & **Visual Role Configurator** built with **Vue 3**, **Vite**, **Tailwind CSS**, and **PHP**.

This project demonstrates a modern frontend architecture that completely eliminates hardcoded `if (user.hasRole(...))` conditionals and ternary operators across component views. The UI (Tabs, Navigation, Metric Cards, Tables, Column Visibility, Action Buttons, Forms, and Read-Only states) is dynamically rendered from a reactive **JSON UI Schema** that can be visually constructed and edited in real-time by Admins or Product Managers.

---

## 🌟 Key Architectural Highlights

* **Zero `v-if="hasRole"` Spaghetti**: The UI layout engine (`DynamicRenderer.vue`) recursively iterates over node trees. If a node is disabled (`enabled: false`), it is completely omitted from rendering.
* **Visual Role Configurator**: Interactive visual tree with checkboxes and toggle switches to configure Tabs, Widgets, Table Columns, Actions, and Read-Only permissions.
* **Real-time Reactive JSON Schema Inspector**: Live side-by-side JSON inspector that compiles and visualizes schema changes instantly.
* **Global & Action-level Read-Only Mode**: Instant enforcement of `readOnly` state on forms, inputs, and mutation buttons.
* **Role Impersonation Simulator**: Header bar to switch active roles (`Super Admin`, `Sales Agent`, `External Auditor`, Custom Roles) in 1-click to test dynamic rendering live.
* **Component Registry & Auto-Discovery**: Scalable component mapping bridging JSON type strings to Vue 3 components.

---

## 📸 Screenshots & Previews

### 1. Super Admin View (Full Access & All Tabs)
![Super Admin View](https://raw.githubusercontent.com/fncordoba/dynamic-ui-poc/main/docs/screenshots/super_admin.png)

### 2. Ejecutivo de Ventas (Restricted Tabs & Hidden Columns)
![Sales Agent View](https://raw.githubusercontent.com/fncordoba/dynamic-ui-poc/main/docs/screenshots/sales_agent.png)

### 3. Visual Role Configurator & Live JSON Inspector
![Admin Configurator](https://raw.githubusercontent.com/fncordoba/dynamic-ui-poc/main/docs/screenshots/configurator.png)

---

## 📁 Repository Structure

```
dynamic-ui-poc/
├── backend/
│   ├── api.php                  # PHP REST API for role schema persistence
│   └── storage/
│       └── roles.json           # JSON Database of active role schemas
├── index.html                   # HTML Entry Point with modern typography
├── package.json                 # Project dependencies & scripts
├── vite.config.js               # Vite bundler configuration
└── src/
    ├── App.vue                  # Main shell & dual-mode switcher
    ├── main.js                  # Vue 3 bootstrap entry point
    ├── style.css                # Glassmorphism & dark design system
    ├── services/
    │   └── schemaService.js     # API & LocalStorage sync service
    ├── registry/
    │   └── componentRegistry.js # Map of node types to Vue components
    └── components/
        ├── dynamic/
        │   ├── DynamicRenderer.vue # Core recursive schema renderer
        │   ├── DataTable.vue       # Dynamic table with column/action filtering
        │   ├── MetricCardGroup.vue # Metrics container
        │   ├── MetricCard.vue      # Individual metric widget
        │   ├── ActionButton.vue    # Button with Read-Only lock support
        │   ├── AlertBanner.vue     # Dynamic alert banner
        │   └── UserForm.vue        # User form with inputs
        ├── configurator/
        │   └── RoleConfigurator.vue # Visual tree & live JSON inspector
        └── layout/
            ├── TopNavbar.vue        # Schema-driven navigation tabs
            └── RoleSwitcher.vue     # Role impersonation simulator
```

---

## ⚙️ Quick Start & Local Setup

### Prerequisites
* Node.js v18+ & npm
* (Optional) PHP 8.1+ to test the backend API endpoint

### 1. Clone the repository
```bash
git clone git@github.com:fncordoba/dynamic-ui-poc.git
cd dynamic-ui-poc
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```

Open your browser and navigate to **`http://localhost:5173/`**.

---

## 🛠️ How It Works (The 4-Step Lifecycle)

1. **Write standard Vue 3 Widgets**: Create UI components in `src/components/dynamic/` (e.g. `DataTable.vue`, `MetricCardGroup.vue`). Components accept a `config` object prop and do not contain role logic.
2. **Register in ComponentRegistry**: Register the component in `src/registry/componentRegistry.js`.
3. **Configure in Admin UI**: Check/uncheck tabs, views, columns, and actions in the Visual Configurator. It automatically updates the active JSON schema.
4. **Dynamic Renderer**: `DynamicRenderer.vue` resolves the component name dynamically using `<component :is="resolvedComponent" :config="viewConfig" />`.

---

## 📄 License

MIT License. Created for demonstration & architectural evaluation purposes.
