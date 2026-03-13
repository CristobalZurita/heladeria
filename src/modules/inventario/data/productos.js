import fotoFrutos from "../../../assets/landing/galeria-frutos.jpg"
import fotoLacteos from "../../../assets/landing/galeria-lacteos.jpg"
import fotoMateriasPrimas from "../../../assets/landing/materias-primas-raw.jpg"

const familiaFrutos = {
  cloudinary_url: fotoFrutos,
  thumbnail_url: fotoFrutos
}

const familiaLacteos = {
  cloudinary_url: fotoLacteos,
  thumbnail_url: fotoLacteos
}

const familiaMateriasPrimas = {
  cloudinary_url: fotoMateriasPrimas,
  thumbnail_url: fotoMateriasPrimas
}

export const productos = [
  { nombre: "Frambuesa", stock: 24, unidad: "kg", categoria: "fruta", alergenos: ["no aplica"], ...familiaFrutos },
  { nombre: "Frutilla", stock: 18, unidad: "kg", categoria: "fruta", alergenos: ["no aplica"], ...familiaFrutos },
  { nombre: "Mango", stock: 14, unidad: "kg", categoria: "fruta", alergenos: ["no aplica"], ...familiaFrutos },
  { nombre: "Maracuya", stock: 0, unidad: "kg", categoria: "fruta", alergenos: ["no aplica"], ...familiaFrutos },
  { nombre: "Leche de coco", stock: 32, unidad: "L", categoria: "vegano", alergenos: ["no aplica"], ...familiaMateriasPrimas },
  { nombre: "Crema Vegana", stock: 20, unidad: "L", categoria: "vegano", alergenos: ["no aplica"], ...familiaMateriasPrimas },
  { nombre: "Base neutra vegana", stock: 11, unidad: "kg", categoria: "vegano", alergenos: ["no aplica"], ...familiaMateriasPrimas },
  { nombre: "Cacao amargo", stock: 16, unidad: "kg", categoria: "cremoso", alergenos: ["contiene frutos secos"], ...familiaMateriasPrimas },
  { nombre: "Chocolate cobertura", stock: 12, unidad: "kg", categoria: "cremoso", alergenos: ["contiene lactosa"], ...familiaMateriasPrimas },
  { nombre: "Leche Entera", stock: 64, unidad: "L", categoria: "cremoso", alergenos: ["contiene lactosa"], ...familiaLacteos },
  { nombre: "Crema", stock: 38, unidad: "L", categoria: "cremoso", alergenos: ["contiene lactosa"], ...familiaLacteos },
  { nombre: "Pasta de Vainilla", stock: 3, unidad: "kg", categoria: "cremoso", alergenos: ["no aplica"], ...familiaMateriasPrimas }
]
