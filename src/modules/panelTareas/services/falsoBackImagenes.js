const STORAGE_KEY = "bosque_helado_imagenes"
const ALMACEN_LOCAL_BASE = "almacen_local"

function cargarDesdeStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function guardarEnStorage(lista) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lista))
}

function leerComoDataUrl(archivo) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result || ""))
    reader.onerror = () => reject(new Error("No se pudo leer el archivo"))
    reader.readAsDataURL(archivo)
  })
}

function crearThumbnail(dataUrl, max = 260) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      const ratio = Math.min(max / img.width, max / img.height, 1)
      const width = Math.round(img.width * ratio)
      const height = Math.round(img.height * ratio)
      const canvas = document.createElement("canvas")
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext("2d")
      if (!ctx) {
        reject(new Error("No se pudo crear thumbnail"))
        return
      }
      ctx.drawImage(img, 0, 0, width, height)
      resolve(canvas.toDataURL("image/webp", 0.82))
    }
    img.onerror = () => reject(new Error("No se pudo procesar imagen"))
    img.src = dataUrl
  })
}

function normalizarDestinoCarpeta(carpeta) {
  return String(carpeta || "inventario")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9/_-]/g, "")
}

function construirCarpetaCloudinary(carpeta) {
  const destino = normalizarDestinoCarpeta(carpeta)
  return `${ALMACEN_LOCAL_BASE}/${destino}`
}

async function subirLocal(archivo, carpeta) {
  const dataUrl = await leerComoDataUrl(archivo)
  const thumbnail = await crearThumbnail(dataUrl)
  return {
    cloudinary_url: dataUrl,
    thumbnail_url: thumbnail,
    public_id: null,
    carpeta_cloudinary: construirCarpetaCloudinary(carpeta)
  }
}

export function getModoImagenes() {
  return "local"
}

export function listarImagenes() {
  return cargarDesdeStorage()
}

export async function subirImagenes(archivos, carpeta) {
  const actuales = cargarDesdeStorage()
  const nuevas = []
  const destino = normalizarDestinoCarpeta(carpeta)

  for (const archivo of archivos) {
    const subida = await subirLocal(archivo, destino)

    nuevas.push({
      id: `${Date.now()}_${Math.random().toString(16).slice(2)}`,
      nombre: archivo.name,
      tipo: archivo.type,
      peso: archivo.size,
      carpeta: destino,
      carpeta_cloudinary: subida.carpeta_cloudinary,
      fecha: new Date().toISOString(),
      cloudinary_url: subida.cloudinary_url,
      thumbnail_url: subida.thumbnail_url,
      public_id: subida.public_id
    })
  }

  const combinado = [...nuevas, ...actuales]
  guardarEnStorage(combinado)
  return nuevas
}

export function eliminarImagen(id) {
  const actual = cargarDesdeStorage()
  const actualizado = actual.filter((item) => item.id !== id)
  guardarEnStorage(actualizado)
  return actualizado
}
