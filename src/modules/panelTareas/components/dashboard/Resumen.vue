<template>

<div class="resumen">

  <h3 class="tituloResumen">📊 Resumen del turno</h3>

  <div class="tarjetasGrid">

    <div
      v-for="(tarjeta, i) in tarjetas"
      :key="i"
      class="tarjeta"
      :style="{ borderTopColor: tarjeta.color }"
    >
      <span class="tarjetaIcono">{{ tarjeta.icono }}</span>
      <div class="tarjetaInfo">
        <span class="tarjetaValor" :style="{ color: tarjeta.color }">{{ tarjeta.valor }}</span>
        <span class="tarjetaLabel">{{ tarjeta.label }}</span>
      </div>
    </div>

  </div>

</div>

</template>

<script>

export default{

props:{
totalTareas:{
  type: Number,
  default: 0
},
diaActivo:{
  type: Boolean,
  default: true
}
},

// ── COMPUTED ───────────────────────────────────────
computed:{
tarjetas(){
  return[
    {
      icono: "✅",
      valor: this.totalTareas,
      label: "Tareas registradas",
      color: "#2d9e74"
    },
    {
      icono: "🍦",
      valor: "4",
      label: "Sabores del día",
      color: "#9b66d0"
    },
    {
      icono: "📦",
      valor: "3",
      label: "Proveedores activos",
      color: "#f5a623"
    },
    {
      icono: this.diaActivo ? "☀️" : "🌙",
      valor: this.diaActivo ? "Activo" : "Cerrado",
      label: "Estado del turno",
      color: this.diaActivo ? "#2d9e74" : "#9b66d0"
    }
  ]
}
}

}

</script>

<style scoped>

/* ── CONTENEDOR ── */
.resumen{
background:white;
border-radius:14px;
padding:20px 22px;
box-shadow:0 2px 12px rgba(29,107,82,0.08);
border:1px solid #b6e8d3;
}

/* ── TÍTULO ── */
.tituloResumen{
font-size:15px;
font-weight:700;
color:#1a3d2e;
margin-bottom:16px;
}

/* ── GRID TARJETAS ── */
.tarjetasGrid{
display:grid;
grid-template-columns:repeat(auto-fit, minmax(130px, 1fr));
gap:12px;
}

.tarjeta{
background:#f9fffe;
border-radius:12px;
padding:16px 14px;
border-top:4px solid #2d9e74;
display:flex;
align-items:center;
gap:12px;
box-shadow:0 1px 6px rgba(0,0,0,0.05);
transition:0.2s;
}

.tarjeta:hover{
transform:translateY(-2px);
box-shadow:0 4px 14px rgba(29,107,82,0.12);
}

.tarjetaIcono{
font-size:22px;
}

.tarjetaInfo{
display:flex;
flex-direction:column;
}

.tarjetaValor{
font-size:22px;
font-weight:800;
line-height:1;
}

.tarjetaLabel{
font-size:11px;
color:#888;
margin-top:3px;
}

</style>
