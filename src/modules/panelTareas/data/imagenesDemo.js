import fotoFrutos from "../../../assets/landing/galeria-frutos.jpg"
import fotoLacteos from "../../../assets/landing/galeria-lacteos.jpg"
import fotoAplicacion from "../../../assets/landing/galeria-aplicacion.jpg"
import fotoMateriasPrimas from "../../../assets/landing/materias-primas-raw.jpg"

export const imagenesDemo = [
  {
    id: "demo_img_enero_frutos",
    nombre: "frutos-temporada-enero.jpg",
    tipo: "image/jpeg",
    peso: 412000,
    carpeta: "inventario",
    carpeta_cloudinary: "almacen_local/inventario",
    fecha: "2026-01-12T10:15:00.000Z",
    cloudinary_url: fotoFrutos,
    thumbnail_url: fotoFrutos,
    public_id: null
  },
  {
    id: "demo_img_febrero_lacteos",
    nombre: "bases-lacteas-febrero.jpg",
    tipo: "image/jpeg",
    peso: 436000,
    carpeta: "inventario",
    carpeta_cloudinary: "almacen_local/inventario",
    fecha: "2026-02-05T14:40:00.000Z",
    cloudinary_url: fotoLacteos,
    thumbnail_url: fotoLacteos,
    public_id: null
  },
  {
    id: "demo_img_febrero_catalogo",
    nombre: "catalogo-temporada-febrero.jpg",
    tipo: "image/jpeg",
    peso: 458000,
    carpeta: "sabores",
    carpeta_cloudinary: "almacen_local/sabores",
    fecha: "2026-02-24T16:10:00.000Z",
    cloudinary_url: fotoAplicacion,
    thumbnail_url: fotoAplicacion,
    public_id: null
  },
  {
    id: "demo_img_marzo_materias",
    nombre: "materias-primas-marzo.jpg",
    tipo: "image/jpeg",
    peso: 441000,
    carpeta: "inventario",
    carpeta_cloudinary: "almacen_local/inventario",
    fecha: "2026-03-04T09:35:00.000Z",
    cloudinary_url: fotoMateriasPrimas,
    thumbnail_url: fotoMateriasPrimas,
    public_id: null
  }
]
