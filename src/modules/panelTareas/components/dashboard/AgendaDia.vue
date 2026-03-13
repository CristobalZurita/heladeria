<template>

<div class="agendaDia">

  <h3 class="tituloAgenda">📅 Agenda del día — <span class="fechaHoy">{{ fechaFormateada }}</span></h3>

  <p v-show="bloques.length === 0" class="sinBloques">No hay bloques agendados para hoy.</p>

  <ul class="listaBloques" v-show="bloques.length > 0">
    <li
      v-for="(bloque, i) in bloques"
      :key="i"
      class="bloqueHora"
      :class="{ 'bloque--pasado': bloque.pasado }"
    >
      <span class="hora">{{ bloque.hora }}</span>
      <span class="descripcion">{{ bloque.descripcion }}</span>
      <span v-if="bloque.pasado" class="badgePasado">✓</span>
    </li>
  </ul>

</div>

</template>

<script>

export default{

props:{
tareas:{
  type: Array,
  default: () => []
}
},

// ── DATOS ──────────────────────────────────────────
data(){
return{
bloques:[
  { hora:"08:00", descripcion:"Apertura y limpieza de equipos", pasado: true },
  { hora:"09:00", descripcion:"Preparación de bases veganas", pasado: true },
  { hora:"11:00", descripcion:"Control de stock en cámara fría", pasado: false },
  { hora:"13:00", descripcion:"Atención al público — turno medio día", pasado: false },
  { hora:"16:00", descripcion:"Recepción de insumos proveedor", pasado: false },
  { hora:"18:00", descripcion:"Cierre y limpieza final", pasado: false }
]
}
},

// ── COMPUTED ───────────────────────────────────────
computed:{
fechaFormateada(){
  return new Date().toLocaleDateString("es-CL",{
    weekday:"long", year:"numeric", month:"long", day:"numeric"
  })
}
}

}

</script>

<style scoped>

/* ── CONTENEDOR ── */
.agendaDia{
background:white;
border-radius:14px;
padding:20px 22px;
box-shadow:0 2px 12px rgba(29,107,82,0.08);
border:1px solid #b6e8d3;
}

/* ── TÍTULO ── */
.tituloAgenda{
font-size:15px;
font-weight:700;
color:#1a3d2e;
margin-bottom:16px;
}

.fechaHoy{
color:#2d9e74;
font-weight:600;
text-transform:capitalize;
}

/* ── LISTA ── */
.listaBloques{
list-style:none;
padding:0;
display:flex;
flex-direction:column;
gap:8px;
}

.bloqueHora{
display:flex;
align-items:center;
gap:12px;
padding:10px 14px;
border-radius:10px;
background:#f4fdf8;
border-left:4px solid #2d9e74;
transition:0.2s;
}

.bloqueHora:hover{
background:#e0f8ed;
}

.bloque--pasado{
opacity:0.55;
border-left-color:#b6e8d3;
}

.hora{
font-weight:700;
font-size:13px;
color:#2d9e74;
min-width:48px;
}

.descripcion{
flex:1;
font-size:14px;
color:#2a3d2e;
}

.badgePasado{
font-size:12px;
color:#2d9e74;
font-weight:700;
background:#d4f5e5;
padding:2px 8px;
border-radius:50px;
}

.sinBloques{
color:#999;
font-style:italic;
font-size:14px;
}

</style>
