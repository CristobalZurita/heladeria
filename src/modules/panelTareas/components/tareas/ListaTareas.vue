<template>

<div class="listaTareasWrapper">

  <div class="filtros">

    <button
      v-for="filtro in filtros"
      :key="filtro.valor"
      class="btnFiltro"
      :class="{ 'filtro--activo': filtroActual === filtro.valor }"
      @click="filtroActual = filtro.valor"
    >
      {{ filtro.icono }} {{ filtro.label }}
    </button>

  </div>

  <p v-show="tareasFiltradas.length === 0" class="sinTareas">
    📋 No hay tareas registradas
  </p>

  <div v-if="!soloLectura && tareasFiltradas.length > 0" class="tablaWrapper">

    <table class="tablaTareas">

      <thead>
        <tr>
          <th>#</th>
          <th>Tarea</th>
          <th>Estado</th>
          <th>Asignado</th>
          <th>Inicio</th>
          <th>Entrega</th>
          <th>Prioridad</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="tarea in tareasFiltradas" :key="tarea.id" :class="{ 'fila--completada': tarea.completada }">
          <td>{{ tarea.id }}</td>
          <td class="celdaNombre">{{ tarea.nombre }}</td>
          <td>
            <span class="estadoBadge" :class="'estado--' + normalizarEstadoClase(tarea.estado)">
              {{ tarea.estado }}
            </span>
          </td>
          <td>{{ tarea.asignado }}</td>
          <td>{{ tarea.fechaInicio }}</td>
          <td>{{ tarea.fechaEntrega }}</td>
          <td>
            <span class="prioridadBadge" :class="'prio--' + tarea.prioridad">
              {{ tarea.prioridad }}
            </span>
          </td>
          <td>
            <div class="accionesTabla">
              <button
                class="btnAccion btnAccion--completar"
                :class="{ 'btnAccion--deshacer': tarea.completada }"
                @click="$emit('toggleCompletar', tarea)"
              >
                {{ tarea.completada ? "↩" : "✓" }}
              </button>
              <button class="btnAccion btnAccion--editar" @click="$emit('editar', tarea)">✏️</button>
              <button class="btnAccion btnAccion--eliminar" @click="$emit('eliminar', tarea)">✕</button>
            </div>
          </td>
        </tr>
      </tbody>

    </table>

  </div>

  <div v-else-if="tareasFiltradas.length > 0" class="lista">

    <TareaCard
      v-for="(tarea, index) in tareasFiltradas"
      :key="tarea.id"
      :tarea="tarea"
      :numero="index + 1"
      :soloLectura="soloLectura"
      @toggleCompletar="$emit('toggleCompletar', $event)"
      @editar="$emit('editar', $event)"
      @eliminar="$emit('eliminar', $event)"
    />

  </div>

</div>

</template>

<script>

import TareaCard from "./TareaCard.vue"

export default{

props:{
tareas:{ type: Array, default: () => [] },
soloLectura:{ type: Boolean, default: false }
},

emits:["toggleCompletar","editar","eliminar"],

components:{
TareaCard
},

data(){
return{
filtroActual: "todas",
filtros:[
  { valor:"todas",     label:"Todas",      icono:"📋" },
  { valor:"pendiente", label:"Pendientes", icono:"🕐" },
  { valor:"en progreso", label:"En progreso", icono:"🛠" },
  { valor:"completada",label:"Completadas",icono:"✅" }
]
}
},

computed:{
tareasFiltradas(){
  if(this.filtroActual === "todas") return this.tareas
  return this.tareas.filter(t => (t.estado || "").toLowerCase() === this.filtroActual)
}
},

methods:{
normalizarEstadoClase(estado){
  return String(estado || "pendiente")
    .trim()
    .toLowerCase()
    .replaceAll(" ", "-")
}
}

}

</script>

<style scoped>

.filtros{
display:flex;
gap:8px;
margin-bottom:16px;
flex-wrap:wrap;
}

.btnFiltro{
padding:7px 16px;
border:2px solid #b6e8d3;
border-radius:50px;
background:white;
color:#2d9e74;
font-size:13px;
font-weight:600;
cursor:pointer;
transition:0.2s;
}

.btnFiltro:hover{
background:#e0f8ed;
}

.filtro--activo{
background:#2d9e74;
color:white;
border-color:#2d9e74;
}

.lista{
display:flex;
flex-direction:column;
gap:8px;
}

.tablaWrapper{
width:100%;
overflow-x:auto;
border:1px solid #d9efe6;
border-radius:18px;
background:white;
box-shadow:0 12px 28px rgba(10,53,37,0.06);
}

.tablaTareas{
width:100%;
border-collapse:collapse;
min-width:860px;
}

.tablaTareas th,
.tablaTareas td{
padding:14px 16px;
text-align:left;
border-bottom:1px solid #edf5f1;
font-size:14px;
color:#214333;
vertical-align:middle;
}

.tablaTareas th{
font-size:12px;
font-weight:800;
letter-spacing:0.12em;
text-transform:uppercase;
color:#557566;
background:#f7fbf8;
}

.tablaTareas tbody tr:hover{
background:#fbfdfb;
}

.fila--completada{
background:#f8fdf9;
}

.celdaNombre{
min-width:240px;
font-weight:700;
}

.estadoBadge,
.prioridadBadge{
display:inline-flex;
align-items:center;
justify-content:center;
padding:5px 11px;
border-radius:999px;
font-size:12px;
font-weight:700;
text-transform:capitalize;
white-space:nowrap;
}

.estado--pendiente{
background:#fff3d0;
color:#a06000;
}

.estado--en-progreso{
background:#dff0ff;
color:#1765a3;
}

.estado--completada{
background:#e0f8ed;
color:#1a6b52;
}

.prio--alta{
background:#ffe0cc;
color:#c04000;
}

.prio--media{
background:#fff3d0;
color:#a06000;
}

.prio--baja{
background:#e0f8ed;
color:#1a6b52;
}

.accionesTabla{
display:flex;
align-items:center;
gap:6px;
}

.btnAccion{
border:none;
cursor:pointer;
border-radius:8px;
padding:6px 10px;
font-size:13px;
transition:0.2s;
}

.btnAccion--completar{
background:#d4f5e5;
color:#1a6b52;
}

.btnAccion--deshacer{
background:#f0e8ff;
color:#6b3fa0;
}

.btnAccion--editar{
background:#fff3d0;
color:#a06000;
}

.btnAccion--eliminar{
background:#fff0f0;
color:#e05a00;
}

.sinTareas{
color:#999;
font-style:italic;
font-size:14px;
padding:12px 0;
}

@media (max-width: 720px){
  .filtros{
    gap:6px;
  }

  .btnFiltro{
    width:100%;
    justify-content:center;
  }
}

</style>
