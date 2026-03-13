import { estadoTareasDemo } from "../data/estadoTareasDemo.js"

const STORAGE_KEY = "bosque_helado_tareas"

function cargarDesdeStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function normalizarTarea(tarea, index = 0) {
  const prioridad = ["baja", "media", "alta"].includes(tarea?.prioridad)
    ? tarea.prioridad
    : "media"
  const id = Number(tarea?.id)

  return {
    id: Number.isFinite(id) && id > 0 ? id : index + 1,
    nombre: String(tarea?.nombre || "").trim(),
    prioridad,
    completada: Boolean(tarea?.completada)
  }
}

function normalizarEstado(estado) {
  const tareas = Array.isArray(estado?.tareas)
    ? estado.tareas
        .map((tarea, index) => normalizarTarea(tarea, index))
        .filter((tarea) => tarea.nombre !== "")
    : []

  const maxId = tareas.reduce((mayor, tarea) => Math.max(mayor, tarea.id), 0)
  const nextId = Number(estado?.nextId)

  return {
    diaActivo: typeof estado?.diaActivo === "boolean" ? estado.diaActivo : true,
    tareas,
    nextId: Number.isFinite(nextId) && nextId > maxId ? nextId : maxId + 1
  }
}

function combinarTareas(baseGuardada, fallback) {
  const guardado = normalizarEstado(baseGuardada)
  const demo = normalizarEstado(fallback)
  const nombresGuardados = new Set(
    guardado.tareas.map((tarea) => tarea.nombre.toLowerCase())
  )

  const faltantes = demo.tareas.filter(
    (tarea) => !nombresGuardados.has(tarea.nombre.toLowerCase())
  )

  return normalizarEstado({
    diaActivo: guardado.diaActivo,
    tareas: [...guardado.tareas, ...faltantes],
    nextId: Math.max(guardado.nextId, demo.nextId, guardado.tareas.length + faltantes.length + 1)
  })
}

export function listarEstadoTareas() {
  const guardado = cargarDesdeStorage()
  const normalizado = guardado
    ? combinarTareas(guardado, estadoTareasDemo)
    : normalizarEstado(estadoTareasDemo)

  localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizado))
  return normalizado
}

export function guardarEstadoTareas(estado) {
  const normalizado = normalizarEstado(estado)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizado))
  return normalizado
}
