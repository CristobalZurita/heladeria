import { usuariosDemo } from "../data/usuariosDemo.js"

const STORAGE_KEY_USUARIOS = "bosque_helado_usuarios"
const STORAGE_KEY_SESION = "bosque_helado_sesion"

function cargarDesdeStorage(key) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function guardarEnStorage(key, valor) {
  localStorage.setItem(key, JSON.stringify(valor))
  return valor
}

function normalizarUsuario(usuario) {
  return {
    nombre: String(usuario?.nombre || "").trim(),
    usuario: String(usuario?.usuario || "").trim().toLowerCase(),
    clave: String(usuario?.clave || "").trim(),
    rol: usuario?.rol === "admin" ? "admin" : "empleado"
  }
}

function sanitizarUsuario(usuario) {
  const normalizado = normalizarUsuario(usuario)
  return {
    nombre: normalizado.nombre,
    usuario: normalizado.usuario,
    rol: normalizado.rol
  }
}

function combinarUsuarios(guardados, base) {
  const usuariosGuardados = Array.isArray(guardados)
    ? guardados.map((item) => normalizarUsuario(item)).filter((item) => item.usuario !== "")
    : []

  const existentes = new Set(usuariosGuardados.map((item) => item.usuario))

  base
    .map((item) => normalizarUsuario(item))
    .filter((item) => item.usuario !== "")
    .forEach((item) => {
      if (!existentes.has(item.usuario)) {
        usuariosGuardados.push(item)
        existentes.add(item.usuario)
      }
    })

  return usuariosGuardados
}

function listarUsuariosInternos() {
  const guardados = cargarDesdeStorage(STORAGE_KEY_USUARIOS)
  const usuarios = combinarUsuarios(guardados, usuariosDemo)
  guardarEnStorage(STORAGE_KEY_USUARIOS, usuarios)
  return usuarios
}

function guardarUsuariosInternos(lista) {
  const normalizada = Array.isArray(lista)
    ? lista.map((item) => normalizarUsuario(item)).filter((item) => item.usuario !== "")
    : []

  return guardarEnStorage(STORAGE_KEY_USUARIOS, normalizada)
}

function guardarSesion(usuario) {
  const sesion = sanitizarUsuario(usuario)
  guardarEnStorage(STORAGE_KEY_SESION, sesion)
  return sesion
}

export function listarCuentasDemo() {
  return usuariosDemo.map((item) => ({
    nombre: item.nombre,
    usuario: item.usuario,
    clave: item.clave,
    rol: item.rol
  }))
}

export function obtenerSesionActiva() {
  const sesionGuardada = cargarDesdeStorage(STORAGE_KEY_SESION)
  if (!sesionGuardada?.usuario) {
    return null
  }

  const usuario = listarUsuariosInternos().find(
    (item) => item.usuario === String(sesionGuardada.usuario).trim().toLowerCase()
  )

  if (!usuario) {
    localStorage.removeItem(STORAGE_KEY_SESION)
    return null
  }

  return guardarSesion(usuario)
}

export function iniciarSesion({ usuario, clave }) {
  const usuarioNormalizado = String(usuario || "").trim().toLowerCase()
  const claveNormalizada = String(clave || "").trim()

  if (usuarioNormalizado === "" || claveNormalizada === "") {
    return {
      ok: false,
      mensaje: "Completa usuario y clave para entrar."
    }
  }

  const cuenta = listarUsuariosInternos().find((item) => item.usuario === usuarioNormalizado)

  if (!cuenta || cuenta.clave !== claveNormalizada) {
    return {
      ok: false,
      mensaje: "Usuario o clave incorrectos."
    }
  }

  return {
    ok: true,
    sesion: guardarSesion(cuenta)
  }
}

export function registrarUsuario({ nombre, usuario, clave }) {
  const nombreNormalizado = String(nombre || "").trim()
  const usuarioNormalizado = String(usuario || "").trim().toLowerCase()
  const claveNormalizada = String(clave || "").trim()

  if (nombreNormalizado === "" || usuarioNormalizado === "" || claveNormalizada === "") {
    return {
      ok: false,
      mensaje: "Completa nombre, usuario y clave para crear la cuenta."
    }
  }

  const usuarios = listarUsuariosInternos()

  if (usuarios.some((item) => item.usuario === usuarioNormalizado)) {
    return {
      ok: false,
      mensaje: "Ese usuario ya existe."
    }
  }

  const nuevoUsuario = normalizarUsuario({
    nombre: nombreNormalizado,
    usuario: usuarioNormalizado,
    clave: claveNormalizada,
    rol: "empleado"
  })

  guardarUsuariosInternos([...usuarios, nuevoUsuario])

  return {
    ok: true,
    sesion: guardarSesion(nuevoUsuario)
  }
}

export function cerrarSesionActiva() {
  localStorage.removeItem(STORAGE_KEY_SESION)
}
