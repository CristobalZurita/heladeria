<template>

<div class="tareaCard" :class="{ 'card--completada': tarea.completada }">

  <div class="cardIzq">
    <span class="numTarea">#{{ numero }}</span>
    <span class="textoTarea" :style="{ textDecoration: tarea.completada ? 'line-through' : 'none' }">
      {{ tarea.nombre }}
    </span>
  </div>

  <div class="cardDer">

    <!-- Badge prioridad -->
    <span class="prioridadBadge" :class="'prio--' + tarea.prioridad">
      {{ tarea.prioridad }}
    </span>

    <!-- Botón completar -->
    <button
      class="btnCompletar"
      :class="tarea.completada ? 'btn--deshacer' : 'btn--completar'"
      @click="$emit('toggleCompletar', tarea)"
      :title="tarea.completada ? 'Deshacer' : 'Completar'"
    >
      {{ tarea.completada ? "↩" : "✓" }}
    </button>

    <!-- Botón editar -->
    <button class="btnEditar" @click="$emit('editar', tarea)" title="Editar">✏️</button>

    <!-- Botón eliminar -->
    <button class="btnEliminar" @click="$emit('eliminar', tarea)" title="Eliminar">✕</button>

  </div>

</div>

</template>

<script>

export default{

props:{
tarea:{ type: Object, required: true },
numero:{ type: Number, required: true }
},

emits:["toggleCompletar","editar","eliminar"]

}

</script>

<style scoped>

/* ── CARD ── */
.tareaCard{
display:flex;
justify-content:space-between;
align-items:center;
gap:12px;
background:white;
border:1px solid #b6e8d3;
border-radius:12px;
padding:12px 16px;
transition:0.2s;
box-shadow:0 1px 6px rgba(0,0,0,0.04);
}

.tareaCard:hover{
background:#f0fdf7;
box-shadow:0 3px 12px rgba(29,107,82,0.09);
}

.card--completada{
background:#f8fdf9;
border-color:#d4f5e5;
opacity:0.75;
}

/* ── IZQUIERDA ── */
.cardIzq{
display:flex;
align-items:center;
gap:10px;
flex:1;
min-width:0;
}

.numTarea{
font-weight:800;
font-size:12px;
color:#b6e8d3;
min-width:28px;
}

.textoTarea{
font-size:14px;
color:#1a3d2e;
word-break:break-word;
}

/* ── DERECHA ── */
.cardDer{
display:flex;
align-items:center;
gap:6px;
flex-shrink:0;
}

/* ── PRIORIDAD BADGE ── */
.prioridadBadge{
padding:3px 10px;
border-radius:50px;
font-size:11px;
font-weight:700;
text-transform:capitalize;
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

/* ── BOTONES ── */
.btnCompletar,
.btnDeshacer,
.btnEditar,
.btnEliminar{
border:none;
cursor:pointer;
border-radius:7px;
padding:5px 9px;
font-size:13px;
transition:0.2s;
}

.btn--completar{
background:#d4f5e5;
color:#1a6b52;
}

.btn--completar:hover{
background:#2d9e74;
color:white;
}

.btn--deshacer{
background:#f0e8ff;
color:#6b3fa0;
}

.btn--deshacer:hover{
background:#9b66d0;
color:white;
}

.btnEditar{
background:#fff3d0;
color:#a06000;
}

.btnEditar:hover{
background:#f5a623;
color:white;
}

.btnEliminar{
background:#fff0f0;
color:#e05a00;
}

.btnEliminar:hover{
background:#e05a00;
color:white;
}

</style>
