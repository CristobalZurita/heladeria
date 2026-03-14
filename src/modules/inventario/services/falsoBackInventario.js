import { productos } from "../data/productos.js"
import { proveedores as proveedoresBase } from "../data/proveedores.js"

const STORAGE_KEY_STOCK = "bosque_helado_stock"
const STORAGE_KEY_PROVEEDORES = "bosque_helado_proveedores"
const MARCADORES_IMAGEN_LEGACY = [
  "galeria-frutos",
  "galeria-lacteos",
  "galeria-aplicacion",
  "galeria-proceso",
  "materias-primas-raw",
  "materias-primas.jpg",
  "materias-primas-nueva",
  "insumo-frambuesa",
  "insumo-lacteo",
  "insumo-cacao"
]

function clonarLista(lista) {
  return JSON.parse(JSON.stringify(lista))
}

function cargarLista(key) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function guardarLista(key, lista) {
  localStorage.setItem(key, JSON.stringify(lista))
  return lista
}

function tieneValor(valor) {
  if (Array.isArray(valor)) return valor.length > 0
  if (typeof valor === "string") return valor.trim() !== ""
  return valor !== undefined && valor !== null
}

function esImagenLegacyProducto(valor) {
  const texto = String(valor || "").toLowerCase()
  if (texto === "") return false
  return MARCADORES_IMAGEN_LEGACY.some((item) => texto.includes(item))
}

function fusionarConFallback(actual, fallback) {
  const combinado = { ...fallback }

  Object.keys(actual).forEach((key) => {
    const valorActual = actual[key]
    if ((key === "cloudinary_url" || key === "thumbnail_url") && esImagenLegacyProducto(valorActual)) {
      combinado[key] = fallback[key]
      return
    }

    combinado[key] = tieneValor(valorActual) ? valorActual : fallback[key]
  })

  return combinado
}

function normalizarProducto(producto) {
  const stock = Number(producto?.stock)
  const alergenos = Array.isArray(producto?.alergenos)
    ? producto.alergenos.map((item) => String(item).trim()).filter(Boolean)
    : []

  return {
    nombre: String(producto?.nombre || "").trim(),
    stock: Number.isFinite(stock) ? stock : 0,
    unidad: String(producto?.unidad || "u").trim() || "u",
    categoria: String(producto?.categoria || "").trim(),
    alergenos: alergenos.length > 0 ? alergenos : ["no aplica"],
    cloudinary_url: String(producto?.cloudinary_url || ""),
    thumbnail_url: String(producto?.thumbnail_url || "")
  }
}

function normalizarProveedor(proveedor) {
  const tiempo = Number(proveedor?.tiempo)

  return {
    nombre: String(proveedor?.nombre || "").trim(),
    telefono: String(proveedor?.telefono || "").trim(),
    tiempo: Number.isFinite(tiempo) ? tiempo : 0,
    unidad: String(proveedor?.unidad || "dias").trim() || "dias",
    direccion: String(proveedor?.direccion || "").trim(),
    productos: String(proveedor?.productos || "").trim(),
    cloudinary_url: String(proveedor?.cloudinary_url || ""),
    thumbnail_url: String(proveedor?.thumbnail_url || "")
  }
}

function combinarListasPorNombre(listaGuardada, fallback, normalizador) {
  const guardadaNormalizada = Array.isArray(listaGuardada)
    ? listaGuardada.map((item) => normalizador(item)).filter((item) => item.nombre !== "")
    : []

  const fallbackNormalizada = clonarLista(fallback)
    .map((item) => normalizador(item))
    .filter((item) => item.nombre !== "")

  const fallbackPorNombre = new Map(
    fallbackNormalizada.map((item) => [item.nombre.toLowerCase(), item])
  )

  const combinada = guardadaNormalizada.map((item) => {
    const fallbackItem = fallbackPorNombre.get(item.nombre.toLowerCase())
    return fallbackItem ? fusionarConFallback(item, fallbackItem) : item
  })

  const nombresGuardados = new Set(
    combinada.map((item) => item.nombre.toLowerCase())
  )

  const faltantes = fallbackNormalizada
    .filter((item) => !nombresGuardados.has(item.nombre.toLowerCase()))

  return [...combinada, ...faltantes]
}

function obtenerListaNormalizada(key, fallback, normalizador) {
  const guardada = cargarLista(key)
  const guardadaNormalizada = Array.isArray(guardada)
    ? guardada.map((item) => normalizador(item)).filter((item) => item.nombre !== "")
    : []

  const normalizada = Array.isArray(guardada)
    ? combinarListasPorNombre(guardadaNormalizada, fallback, normalizador)
    : clonarLista(fallback).map((item) => normalizador(item)).filter((item) => item.nombre !== "")

  if (!Array.isArray(guardada) || JSON.stringify(normalizada) !== JSON.stringify(guardadaNormalizada)) {
    guardarLista(key, normalizada)
  }

  return normalizada
}

export function listarStock() {
  return obtenerListaNormalizada(STORAGE_KEY_STOCK, productos, normalizarProducto)
}

export function guardarStock(lista) {
  const normalizada = Array.isArray(lista)
    ? lista.map((item) => normalizarProducto(item)).filter((item) => item.nombre !== "")
    : []

  return guardarLista(STORAGE_KEY_STOCK, normalizada)
}

export function listarProveedores() {
  return obtenerListaNormalizada(STORAGE_KEY_PROVEEDORES, proveedoresBase, normalizarProveedor)
}

export function guardarProveedores(lista) {
  const normalizada = Array.isArray(lista)
    ? lista.map((item) => normalizarProveedor(item)).filter((item) => item.nombre !== "")
    : []

  return guardarLista(STORAGE_KEY_PROVEEDORES, normalizada)
}
