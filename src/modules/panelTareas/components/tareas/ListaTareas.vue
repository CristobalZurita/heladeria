<template>

<div class="listaTareasWrapper">

  <!-- Filtros -->
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

  <!-- Sin tareas: v-show -->
  <p v-show="tareasFiltradas.length === 0" class="sinTareas">
    📋 No hay tareas registradas
  </p>

  <!-- Lista: v-for con TareaCard -->
  <div class="lista" v-show="tareasFiltradas.length > 0">

    <TareaCard
      v-for="(tarea, index) in tareasFiltradas"
      :key="tarea.id"
      :tarea="tarea"
      :numero="index + 1"
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
tareas:{ type: Array, default: () => [] }
},

emits:["toggleCompletar","editar","eliminar"],

components:{
TareaCard
},

// ── DATOS ──────────────────────────────────────────
data(){
return{
filtroActual: "todas",
filtros:[
  { valor:"todas",     label:"Todas",      icono:"📋" },
  { valor:"pendiente", label:"Pendientes", icono:"🕐" },
  { valor:"completada",label:"Completadas",icono:"✅" }
]
}
},

// ── COMPUTED ───────────────────────────────────────
computed:{
tareasFiltradas(){
  if(this.filtroActual === "todas") return this.tareas
  if(this.filtroActual === "completada") return this.tareas.filter(t => t.completada)
  return this.tareas.filter(t => !t.completada)
}
}

}

</script>

<style scoped>

/* ── FILTROS ── */
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

/* ── LISTA ── */
.lista{
display:flex;
flex-direction:column;
gap:8px;
}

/* ── VACÍO ── */
.sinTareas{
color:#999;
font-style:italic;
font-size:14px;
padding:12px 0;
}

</style>
