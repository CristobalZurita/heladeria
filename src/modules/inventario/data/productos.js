function imagenPexels(base) {
  return {
    cloudinary_url: `${base}&w=1200&h=900&fit=crop&auto=compress`,
    thumbnail_url: `${base}&w=360&h=360&fit=crop&auto=compress`
  }
}

function imagenDirecta(url) {
  return {
    cloudinary_url: url,
    thumbnail_url: url
  }
}

const fotoFrambuesa = imagenDirecta("https://i1.pickpik.com/photos/802/532/47/berry-close-up-raspberry-red-0667472b56486d4d3a585ff382e2309f.jpg")
const fotoFrutilla = imagenPexels("https://images.pexels.com/photos/72590/strawberry-sweet-red-delicious-72590.jpeg?cs=srgb&dl=pexels-pixabay-72590.jpg&fm=jpg")
const fotoMango = imagenPexels("https://images.pexels.com/photos/7156058/pexels-photo-7156058.jpeg?cs=srgb&dl=pexels-gustavo-fring-7156058.jpg&fm=jpg")
const fotoMaracuya = imagenPexels("https://images.pexels.com/photos/7195238/pexels-photo-7195238.jpeg?cs=srgb&dl=pexels-shvets-production-7195238.jpg&fm=jpg")
const fotoLecheCoco = imagenPexels("https://images.pexels.com/photos/4294735/pexels-photo-4294735.jpeg?cs=srgb&dl=pexels-tijana-drndarski-449691-4294735.jpg&fm=jpg")
const fotoLecheEntera = imagenPexels("https://images.pexels.com/photos/16748187/pexels-photo-16748187.jpeg?cs=srgb&dl=pexels-khatia-kulishvili-556991354-16748187.jpg&fm=jpg")
const fotoCrema = imagenPexels("https://images.pexels.com/photos/5908003/pexels-photo-5908003.jpeg?cs=srgb&dl=pexels-katerina-holmes-5908003.jpg&fm=jpg")
const fotoCacao = imagenPexels("https://images.pexels.com/photos/33662910/pexels-photo-33662910.jpeg?cs=srgb&dl=pexels-aaron-h-ch-2154832500-33662910.jpg&fm=jpg")
const fotoChocolate = imagenPexels("https://images.pexels.com/photos/4113347/pexels-photo-4113347.jpeg?cs=srgb&dl=pexels-alleksana-4113347.jpg&fm=jpg")
const fotoVainilla = imagenPexels("https://images.pexels.com/photos/14381803/pexels-photo-14381803.jpeg?cs=srgb&dl=pexels-qwirkiandco-14381803.jpg&fm=jpg")

export const productos = [
  { nombre: "Frambuesa", stock: 24, unidad: "kg", categoria: "fruta", alergenos: ["no aplica"], ...fotoFrambuesa },
  { nombre: "Frutilla", stock: 18, unidad: "kg", categoria: "fruta", alergenos: ["no aplica"], ...fotoFrutilla },
  { nombre: "Mango", stock: 14, unidad: "kg", categoria: "fruta", alergenos: ["no aplica"], ...fotoMango },
  { nombre: "Maracuya", stock: 0, unidad: "kg", categoria: "fruta", alergenos: ["no aplica"], ...fotoMaracuya },
  { nombre: "Leche de coco", stock: 32, unidad: "L", categoria: "vegano", alergenos: ["no aplica"], ...fotoLecheCoco },
  { nombre: "Crema Vegana", stock: 20, unidad: "L", categoria: "vegano", alergenos: ["no aplica"], ...fotoLecheCoco },
  { nombre: "Base neutra vegana", stock: 11, unidad: "kg", categoria: "vegano", alergenos: ["no aplica"], ...fotoLecheCoco },
  { nombre: "Cacao amargo", stock: 16, unidad: "kg", categoria: "cremoso", alergenos: ["contiene frutos secos"], ...fotoCacao },
  { nombre: "Chocolate cobertura", stock: 12, unidad: "kg", categoria: "cremoso", alergenos: ["contiene lactosa"], ...fotoChocolate },
  { nombre: "Leche Entera", stock: 64, unidad: "L", categoria: "cremoso", alergenos: ["contiene lactosa"], ...fotoLecheEntera },
  { nombre: "Crema", stock: 38, unidad: "L", categoria: "cremoso", alergenos: ["contiene lactosa"], ...fotoCrema },
  { nombre: "Pasta de Vainilla", stock: 3, unidad: "kg", categoria: "cremoso", alergenos: ["no aplica"], ...fotoVainilla }
]
