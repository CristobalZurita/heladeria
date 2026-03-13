<template>

<div class="panelEmpleado">

  <!-- AE1 REQ 1: Interpolación -->
  <h1 class="tituloPanelInterpolado">
    Panel de Tareas de <span class="nombreDestacado">{{ usuario }}</span>
  </h1>

  <!-- AE1 REQ 2 + 3: Estado del día -->
  <div class="bloqueEstadoDia">

    <div class="estadoBadge" :class="diaActivo ? 'badge--activo' : 'badge--inactivo'">
      <span v-if="diaActivo">☀️ Día activo, ¡a trabajar!</span>
      <span v-else>🌙 Día finalizado. Buen trabajo.</span>
    </div>

    <button
      class="btnEstadoDia"
      :class="diaActivo ? 'btn--cerrar' : 'btn--abrir'"
      @click="cambiarEstado"
    >
      {{ diaActivo ? "Finalizar día" : "Iniciar día" }}
    </button>

  </div>

  <Resumen v-if="mostrarResumen" :totalTareas="tareas.length" :diaActivo="diaActivo" />

  <div v-if="mostrarAgenda" class="seccion">
    <AgendaDia :tareas="tareas" />
  </div>

  <!-- AE1 REQ 4: FormTarea usa @submit.prevent + v-model internamente -->
  <div v-if="mostrarTareas" class="seccion">
    <h2 class="tituloSeccion">✅ Tareas del turno</h2>
    <FormTarea :diaActivo="diaActivo" @agregar="agregarTarea" @agregarTarea="agregarTarea" />
  </div>

  <div v-if="mostrarKpi" class="seccion">
    <KpiPanel :tareas="tareas" :diaActivo="diaActivo" />
  </div>

  <!-- AE1 REQ 5 + 6: ListaTareas usa v-for y v-show -->
  <ListaTareas
    v-if="mostrarTareas"
    :tareas="tareas"
    @toggleCompletar="toggleCompletar"
    @editar="abrirTarea"
    @eliminar="eliminarTarea"
  />

  <!-- AE1 REQ 7: ModalTarea usa @keyup.enter modificador -->
  <ModalTarea
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

export default{

props:{
usuario:{ type: String, default: "" },
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
nextId: 1
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
}
},

methods:{

cambiarEstado(){
this.diaActivo = !this.diaActivo
},

agregarTarea({ nombre, prioridad }){
this.tareas.push({
  id: this.nextId++,
  nombre,
  prioridad,
  completada: false
})
},

toggleCompletar(tarea){
tarea.completada = !tarea.completada
},

eliminarTarea(tarea){
this.tareas = this.tareas.filter(t => t !== tarea)
},

abrirTarea(tarea){
this.tareaSeleccionada = tarea
this.mostrarModal = true
},

cerrarModal(){
this.tareaSeleccionada = null
this.mostrarModal = false
},

guardarEdicion(tareaEditada){
const idx = this.tareas.findIndex(t => t.id === tareaEditada.id)
if(idx !== -1) this.tareas[idx] = { ...tareaEditada }
this.cerrarModal()
}

}

}

</script>

<style scoped>

.panelEmpleado{
padding:28px 32px;
display:flex;
flex-direction:column;
gap:20px;
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
