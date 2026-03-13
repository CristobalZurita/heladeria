<script setup>
import { ref } from "vue"
import TablaStock from "../components/stock/tablaStock.vue"
import { productos } from "@/modules/inventario/data/productos.js"
import { alergenos } from "@/modules/inventario/data/alergenos.js"
import { categoria } from "@/modules/inventario/data/categoria.js"
import DragDropImagenes from "@/modules/panelTareas/components/imagenes/DragDropImagenes.vue"

const nombreEncargado = ref("Valentina Torres")
const tiendaAbierta = ref(true)
const stock = ref([...productos])

const mostrarModal = ref(false)
const nombreProducto = ref("")
const nombreCategoria = ref("")
const alergenosSeleccionados = ref([])
const cantidadStock = ref("")
const cantidadUnidad = ref("")
const errorFormulario = ref("")
const productoAEditar = ref(null)
const cloudinary_url = ref("")
const thumbnail_url = ref("")

function toggleTienda() {
  tiendaAbierta.value = !tiendaAbierta.value
}

function abrirModal() {
  if (!tiendaAbierta.value) {
    return
  }
  mostrarModal.value = true
}

function cerrarModal() {
  limpiarFormulario()
  mostrarModal.value = false
}

function limpiarFormulario() {
  productoAEditar.value = null
  nombreProducto.value = ""
  nombreCategoria.value = ""
  alergenosSeleccionados.value = []
  cantidadStock.value = ""
  cantidadUnidad.value = ""
  cloudinary_url.value = ""
  thumbnail_url.value = ""
  errorFormulario.value = ""
}

function asignarImagenProducto(cargadas) {
  if (!Array.isArray(cargadas) || cargadas.length === 0) {
    return
  }
  cloudinary_url.value = cargadas[0].cloudinary_url || ""
  thumbnail_url.value = cargadas[0].thumbnail_url || cargadas[0].cloudinary_url || ""
}

function agregarProducto() {
  if (!tiendaAbierta.value) {
    errorFormulario.value = "La tienda esta cerrada: inventario bloqueado"
    return
  }

  if (
    nombreProducto.value === "" ||
    nombreCategoria.value === "" ||
    cantidadStock.value === "" ||
    cantidadUnidad.value === "" ||
    alergenosSeleccionados.value.length === 0
  ) {
    errorFormulario.value = "Todos los campos son obligatorios"
    return
  }

  if (productoAEditar.value) {
    productoAEditar.value.nombre = nombreProducto.value
    productoAEditar.value.categoria = nombreCategoria.value
    productoAEditar.value.alergenos = [...alergenosSeleccionados.value]
    productoAEditar.value.stock = Number(cantidadStock.value)
    productoAEditar.value.unidad = cantidadUnidad.value
    productoAEditar.value.cloudinary_url = cloudinary_url.value
    productoAEditar.value.thumbnail_url = thumbnail_url.value
  } else {
    stock.value.push({
      nombre: nombreProducto.value,
      categoria: nombreCategoria.value,
      alergenos: [...alergenosSeleccionados.value],
      stock: Number(cantidadStock.value),
      unidad: cantidadUnidad.value,
      cloudinary_url: cloudinary_url.value,
      thumbnail_url: thumbnail_url.value
    })
  }

  cerrarModal()
}

function manejarAlergeno(alergeno) {
  if (alergeno === "no aplica") {
    alergenosSeleccionados.value = ["no aplica"]
    return
  }

  alergenosSeleccionados.value = alergenosSeleccionados.value.filter((a) => a !== "no aplica")
}

function editarProducto(producto) {
  if (!tiendaAbierta.value) {
    return
  }

  productoAEditar.value = producto
  nombreProducto.value = producto.nombre
  nombreCategoria.value = producto.categoria
  alergenosSeleccionados.value = [...producto.alergenos]
  cantidadStock.value = producto.stock
  cantidadUnidad.value = producto.unidad
  cloudinary_url.value = producto.cloudinary_url || ""
  thumbnail_url.value = producto.thumbnail_url || producto.cloudinary_url || ""
  errorFormulario.value = ""
  mostrarModal.value = true
}

function eliminarProducto(producto) {
  if (!tiendaAbierta.value) {
    return
  }
  stock.value = stock.value.filter((p) => p !== producto)
}
</script>

<template>
  <section class="vistaStock">
    <div class="stockHeader">
      <h2 class="tituloStock">
        📦 Inventario de <span class="nombreTienda">"Bosque Helado"</span> - Encargado:
        <span class="nombreEncargado">{{ nombreEncargado }}</span>
      </h2>

      <button class="btnEstadoTienda" :class="tiendaAbierta ? 'btn--cerrar' : 'btn--abrir'" @click="toggleTienda">
        {{ tiendaAbierta ? "Cerrar Tienda" : "Abrir Tienda" }}
      </button>
    </div>

    <p class="estadoOperacion" :class="tiendaAbierta ? 'estado--abierto' : 'estado--cerrado'">
      <span v-if="tiendaAbierta">🟢 Tienda Operativa - Ingresando Stock</span>
      <span v-else>🔴 Tienda Cerrada - Inventario Bloqueado</span>
    </p>

    <div class="accionesBarra">
      <button class="btnNuevoProducto" :disabled="!tiendaAbierta" @click="abrirModal">➕ Agregar producto</button>
    </div>

    <p v-show="stock.length === 0" class="inventarioVacio">El inventario esta vacio</p>

    <TablaStock
      v-show="stock.length > 0"
      :productos="stock"
      :tiendaAbierta="tiendaAbierta"
      @editar="editarProducto"
      @eliminar="eliminarProducto"
    />

    <div v-if="mostrarModal" class="modalOverlay" @click.self="cerrarModal">
      <div class="modal">
        <h3 class="tituloModal">{{ productoAEditar ? "✏️ Editar producto" : "➕ Nuevo producto" }}</h3>

        <label class="labelModal">Nombre del producto</label>
        <input v-model="nombreProducto" class="inputStock" placeholder="Nombre producto" />

        <label class="labelModal">Cantidad en stock</label>
        <input v-model="cantidadStock" type="number" class="inputStock" placeholder="Cantidad" />

        <label class="labelModal">Unidad</label>
        <select v-model="cantidadUnidad" class="selectStock">
          <option disabled value="">Selecciona una unidad</option>
          <option value="kg">kg</option>
          <option value="L">L</option>
          <option value="u">u</option>
        </select>

        <label class="labelModal">Categoria</label>
        <select v-model="nombreCategoria" class="selectStock">
          <option disabled value="">Categoria</option>
          <option v-for="cat in categoria" :key="cat" :value="cat">
            {{ cat }}
          </option>
        </select>

        <label class="labelModal">Alergenos</label>
        <div class="bloqueAlergenos">
          <label v-for="alergeno in alergenos" :key="alergeno" class="checkAlergeno">
            <input
              v-model="alergenosSeleccionados"
              type="checkbox"
              :value="alergeno"
              @change="manejarAlergeno(alergeno)"
            />
            {{ alergeno }}
          </label>
        </div>

        <label class="labelModal">Imagen del producto</label>

        <div v-if="cloudinary_url" class="previewImagen">
          <img :src="thumbnail_url || cloudinary_url" alt="Imagen de producto cargada" />
        </div>

        <DragDropImagenes
          :multiple="false"
          carpetaDestino="inventario"
          texto="Arrastra imagen del producto aqui"
          boton="Cargar imagen"
          @cargadas="asignarImagenProducto"
          @error="errorFormulario = $event"
        />

        <p v-if="errorFormulario" class="errorForm">{{ errorFormulario }}</p>

        <div class="modalBotones">
          <button class="btnGuardar" @click="agregarProducto">💾 Guardar</button>
          <button class="btnCancelar" @click="cerrarModal">Cancelar</button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.vistaStock {
  padding: 28px 32px;
}

.stockHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.tituloStock {
  margin: 0;
  font-size: 19px;
  font-weight: 700;
  color: #1a3d2e;
}

.nombreTienda {
  color: #2d9e74;
}

.nombreEncargado {
  color: #e05a00;
}

.btnEstadoTienda {
  border: none;
  border-radius: 999px;
  padding: 10px 18px;
  color: white;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: 0.2s;
}

.btn--cerrar {
  background: #f15a5a;
}

.btn--cerrar:hover {
  background: #d94a4a;
}

.btn--abrir {
  background: #1a6b52;
}

.btn--abrir:hover {
  background: #14503e;
}

.estadoOperacion {
  margin: 14px 0 16px;
  border-radius: 12px;
  padding: 10px 14px;
  font-size: 14px;
  font-weight: 600;
}

.estado--abierto {
  background: #e4f7ee;
  color: #1a6b52;
  border: 1px solid #b6e8d3;
}

.estado--cerrado {
  background: #ffe9e9;
  color: #b43f3f;
  border: 1px solid #f4bcbc;
}

.accionesBarra {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 14px;
}

.btnNuevoProducto {
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  background: linear-gradient(135deg, #ffd166, #f5a623);
  color: #1a3d2e;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: 0.2s;
}

.btnNuevoProducto:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(245, 166, 35, 0.35);
}

.btnNuevoProducto:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.inventarioVacio {
  margin-top: 16px;
  color: #5d6f67;
  font-style: italic;
}

.modalOverlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 120;
  padding: 18px;
}

.modal {
  width: 100%;
  max-width: 460px;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.tituloModal {
  margin: 0 0 4px;
  font-size: 17px;
  color: #1a3d2e;
}

.labelModal {
  font-size: 13px;
  font-weight: 600;
  color: #2d9e74;
}

.inputStock,
.selectStock {
  width: 100%;
  border: 2px solid #b6e8d3;
  border-radius: 10px;
  padding: 10px 14px;
  font-size: 14px;
  outline: none;
  background: #f9fffe;
  color: #1a3d2e;
  transition: 0.2s;
}

.inputStock:focus,
.selectStock:focus {
  border-color: #2d9e74;
  background: #fff;
}

.bloqueAlergenos {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 12px;
}

.checkAlergeno {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 13px;
  color: #1a3d2e;
  padding: 6px 10px;
  border-radius: 20px;
  border: 1px solid #d6eee3;
  background: #f7fcfa;
}

.errorForm {
  color: #e05a00;
  font-size: 13px;
  margin: 2px 0 0;
  font-weight: 600;
}

.previewImagen {
  border: 1px solid #d8ede4;
  border-radius: 10px;
  background: #f8fdfb;
  padding: 8px;
}

.previewImagen img {
  width: 100%;
  max-height: 180px;
  object-fit: cover;
  border-radius: 8px;
  display: block;
}

.modalBotones {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 6px;
}

.btnGuardar,
.btnCancelar {
  border: none;
  border-radius: 10px;
  padding: 9px 15px;
  cursor: pointer;
  font-weight: 700;
  font-size: 13px;
}

.btnGuardar {
  background: #2d9e74;
  color: #fff;
}

.btnGuardar:hover {
  background: #1a6b52;
}

.btnCancelar {
  background: #ececec;
  color: #333;
}

.btnCancelar:hover {
  background: #dcdcdc;
}
</style>
