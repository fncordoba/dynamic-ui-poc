import defaultRolesData from '../../backend/storage/roles.json'

const API_BASE = '/api/roles'

export async function fetchRoles() {
  try {
    const res = await fetch(API_BASE)
    if (res.ok) {
      const data = await res.json()
      if (data.status === 'success' && data.data.length > 0) {
        const rolesMap = {}
        data.data.forEach(r => { rolesMap[r.id] = r })
        return rolesMap
      }
    }
  } catch (err) {
    console.warn('PHP API offline or unreachable, using local storage/fallback:', err)
  }

  // Fallback to localStorage or default dataset
  const saved = localStorage.getItem('koltin_poc_roles')
  if (saved) {
    try {
      return JSON.parse(saved)
    } catch (e) {
      console.error('Error parsing local storage roles:', e)
    }
  }

  return defaultRolesData
}

export async function saveRole(roleData) {
  // Sync to localStorage
  const currentRoles = await fetchRoles()
  currentRoles[roleData.id] = roleData
  localStorage.setItem('koltin_poc_roles', JSON.stringify(currentRoles))

  try {
    const res = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(roleData)
    })
    if (res.ok) {
      return await res.json()
    }
  } catch (err) {
    console.warn('API save skipped, stored in LocalStorage:', err)
  }

  return { status: 'success', role: roleData }
}
