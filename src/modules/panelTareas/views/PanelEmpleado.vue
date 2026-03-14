<template>

<div class="panelEmpleado">

  <h1 class="tituloPanelInterpolado">
    Panel de Tareas de <span class="nombreDestacado">{{ usuario }}</span>
  </h1>

  <div class="bloqueEstadoDia">

    <div class="estadoBadge" :class="diaActivo ? 'badge--activo' : 'badge--inactivo'">
      <span v-if="diaActivo">☀️ Día activo, ¡a trabajar!</span>
      <span v-else>🌙 Día finalizado. Buen trabajo.</span>
    </div>

    <button
      v-if="esAdmin"
      class="btnEstadoDia"
      :class="diaActivo ? 'btn--cerrar' : 'btn--abrir'"
      @click="cambiarEstado"
    >
      {{ diaActivo ? "Finalizar día" : "Iniciar día" }}
    </button>

  </div>

  <Resumen
    v-if="mostrarResumen"
    :totalTareas="tareasVisibles.length"
    :diaActivo="diaActivo"
    :totalRecetas="totalRecetas"
    :totalProveedores="totalProveedores"
    :productosSinStock="productosSinStock"
  />

  <div v-if="mostrarAgenda" class="seccion">
    <AgendaDia :tareas="tareasVisibles" />
  </div>

  <div v-if="mostrarTareas" class="seccion">
    <h2 class="tituloSeccion">{{ esAdmin ? "✅ Asignación de tareas" : "✅ Tareas asignadas" }}</h2>
    <FormTarea
      :diaActivo="diaActivo"
      :soloLectura="!esAdmin"
      @agregar="agregarTarea"
      @agregarTarea="agregarTarea"
    />
  </div>

  <div v-if="mostrarKpi && esAdmin" class="seccion">
    <KpiPanel
      :tareas="tareas"
      :diaActivo="diaActivo"
      :totalProductos="totalProductos"
      :totalRecetas="totalRecetas"
      :productosSinStock="productosSinStock"
      :productosConImagen="productosConImagen"
      :totalProveedores="totalProveedores"
      :totalImagenes="totalImagenes"
      :imagenes="imagenes"
    />
  </div>

  <ListaTareas
    v-if="mostrarTareas"
    :tareas="tareasVisibles"
    :soloLectura="!esAdmin"
    @toggleCompletar="toggleCompletar"
    @editar="abrirTarea"
    @eliminar="eliminarTarea"
  />

  <ModalTarea
    v-if="esAdmin"
    :visible="mostrarModal"
    :tarea="tareaSeleccionada"
    @cerrar="cerrarModal"
    @guardar="guardarEdicion"
  />

</div>

</template>

<script>

import Resumen     from "../components/dashboard/Resumen.vue"
import AgendaDia   from "../components/dashboard/AgendaDia.vue"
import KpiPanel    from "../components/dashboard/KpiPanel.vue"
import FormTarea   from "../components/tareas/FormTarea.vue"
import ListaTareas from "../components/tareas/ListaTareas.vue"
import ModalTarea  from "../components/tareas/ModalTarea.vue"
import { listarImagenes } from "../services/falsoBackImagenes.js"
import { listarEstadoTareas, guardarEstadoTareas } from "../services/falsoBackTareas.js"
import { listarStock, listarProveedores } from "@/modules/inventario/services/falsoBackInventario.js"
import { recetas } from "@/modules/inventario/data/recetas.js"

export default{

props:{
usuario:{ type: String, default: "" },
rol:{ type: String, default: "empleado" },
vista:{ type: String, default: "panel" }
},

components:{
Resumen,
AgendaDia,
KpiPanel,
FormTarea,
ListaTareas,
ModalTarea
},

data(){
return{
diaActivo: true,
tareas: [],
mostrarModal: false,
tareaSeleccionada: null,
nextId: 1,
totalRecetas: 0,
totalProductos: 0,
productosSinStock: 0,
productosConImagen: 0,
totalProveedores: 0,
totalImagenes: 0,
imagenes: []
}
},

computed:{
mostrarResumen(){
return this.vista === "panel" || this.vista === "kpi"
},

mostrarAgenda(){
return this.vista === "panel"
},

mostrarTareas(){
return this.vista === "panel" || this.vista === "tareas"
},

mostrarKpi(){
return this.vista === "panel" || this.vista === "kpi"
},

esAdmin(){
return this.rol === "admin"
},

tareasVisibles(){
if(this.esAdmin){
  return this.tareas
}

return this.tareas.filter((tarea) => {
  return String(tarea.asignado || "").trim().toLowerCase() === String(this.usuario || "").trim().toLowerCase()
})
}
},

mounted(){
this.cargarEstado()
this.cargarResumenOperacion()
},

methods:{

cambiarEstado(){
if(!this.esAdmin) return
this.diaActivo = !this.diaActivo
this.persistirEstado()
},

agregarTarea(tareaNueva){
if(!this.esAdmin) return
this.tareas.push({
  id: this.nextId++,
  ...tareaNueva,
  completada: tareaNueva.estado === "completada"
})
this.persistirEstado()
},

toggleCompletar(tarea){
if(!this.esAdmin) return
tarea.completada = !tarea.completada
tarea.estado = tarea.completada ? "completada" : "pendiente"
this.persistirEstado()
},

eliminarTarea(tarea){
if(!this.esAdmin) return
this.tareas = this.tareas.filter(t => t !== tarea)
this.persistirEstado()
},

abrirTarea(tarea){
if(!this.esAdmin) return
this.tareaSeleccionada = tarea
this.mostrarModal = true
},

cerrarModal(){
this.tareaSeleccionada = null
this.mostrarModal = false
},

guardarEdicion(tareaEditada){
if(!this.esAdmin) return
const tareaNormalizada = {
  ...tareaEditada,
  completada: tareaEditada.estado === "completada"
}
const idx = this.tareas.findIndex(t => t.id === tareaEditada.id)
if(idx !== -1) this.tareas[idx] = tareaNormalizada
this.persistirEstado()
this.cerrarModal()
},

cargarEstado(){
const estado = listarEstadoTareas()
this.diaActivo = estado.diaActivo
this.tareas = estado.tareas
this.nextId = estado.nextId
},

persistirEstado(){
const estado = guardarEstadoTareas({
  diaActivo: this.diaActivo,
  tareas: this.tareas,
  nextId: this.nextId
})
this.diaActivo = estado.diaActivo
this.tareas = estado.tareas
this.nextId = estado.nextId
},

cargarResumenOperacion(){
const stock = listarStock()
const proveedores = listarProveedores()
const imagenes = listarImagenes()

this.totalRecetas = recetas.length
this.totalProductos = stock.length
this.productosSinStock = stock.filter(producto => Number(producto.stock) === 0).length
this.productosConImagen = stock.filter(producto => producto.thumbnail_url || producto.cloudinary_url).length
this.totalProveedores = proveedores.length
this.totalImagenes = imagenes.length
this.imagenes = imagenes
}

}

}

</script>

<style scoped>

.panelEmpleado{
padding:24px 20px 28px;
display:flex;
flex-direction:column;
gap:20px;
width:100%;
}

.tituloPanelInterpolado{
font-size:22px;
font-weight:700;
color:#1a3d2e;
margin:0;
}

.nombreDestacado{
color:#e05a00;
}

.bloqueEstadoDia{
display:flex;
align-items:center;
gap:16px;
flex-wrap:wrap;
}

.estadoBadge{
padding:10px 20px;
border-radius:50px;
font-weight:600;
font-size:14px;
}

.badge--activo{
background:#d4f5e5;
color:#1a6b52;
border:2px solid #2d9e74;
}

.badge--inactivo{
background:#f0e8ff;
color:#6b3fa0;
border:2px solid #9b66d0;
}

.btnEstadoDia{
padding:10px 22px;
border:none;
border-radius:50px;
font-weight:700;
font-size:14px;
cursor:pointer;
transition:0.2s;
}

.btn--cerrar{
background:#ff6b6b;
color:white;
}

.btn--cerrar:hover{ background:#e85555; }

.btn--abrir{
background:#2d9e74;
color:white;
}

.btn--abrir:hover{ background:#1a6b52; }

.seccion{
display:flex;
flex-direction:column;
gap:12px;
}

.tituloSeccion{
font-size:16px;
font-weight:700;
color:#1a3d2e;
margin:0;
}

</style>
