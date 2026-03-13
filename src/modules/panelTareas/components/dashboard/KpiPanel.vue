<template>

<section class="kpiPanel">

  <h3 class="tituloKpi">📈 KPI de la tienda</h3>

  <div class="metricas">
    <article class="metricaCard">
      <p class="metricaLabel">Cumplimiento</p>
      <p class="metricaValor">{{ cumplimiento }}%</p>
    </article>
    <article class="metricaCard">
      <p class="metricaLabel">Tareas completadas</p>
      <p class="metricaValor">{{ tareasCompletadas }}</p>
    </article>
    <article class="metricaCard">
      <p class="metricaLabel">Tareas pendientes</p>
      <p class="metricaValor">{{ tareasPendientes }}</p>
    </article>
    <article class="metricaCard">
      <p class="metricaLabel">Estado del turno</p>
      <p class="metricaValor">{{ diaActivo ? "Activo" : "Cerrado" }}</p>
    </article>
  </div>

  <div class="grafico">
    <div v-for="barra in barras" :key="barra.id" class="filaBarra">
      <span class="barraLabel">{{ barra.label }}</span>
      <div class="track">
        <div class="fill" :style="{ width: barra.porcentaje + '%', background: barra.color }"></div>
      </div>
      <span class="barraValor">{{ barra.valor }}</span>
    </div>
  </div>

</section>

</template>

<script>

export default{

props:{
tareas:{ type: Array, default: () => [] },
diaActivo:{ type: Boolean, default: true }
},

computed:{
tareasCompletadas(){
  return this.tareas.filter(t => t.completada).length
},

tareasPendientes(){
  return this.tareas.filter(t => !t.completada).length
},

cumplimiento(){
  if(this.tareas.length === 0) return 0
  return Math.round((this.tareasCompletadas / this.tareas.length) * 100)
},

barras(){
  const total = this.tareas.length || 1
  const completadasPorc = Math.round((this.tareasCompletadas / total) * 100)
  const pendientesPorc = Math.round((this.tareasPendientes / total) * 100)
  return[
    {
      id: "cumplimiento",
      label: "Cumplimiento operativo",
      porcentaje: this.cumplimiento,
      valor: this.cumplimiento + "%",
      color: "#2d9e74"
    },
    {
      id: "completadas",
      label: "Tareas completadas",
      porcentaje: completadasPorc,
      valor: this.tareasCompletadas,
      color: "#1f7a5c"
    },
    {
      id: "pendientes",
      label: "Tareas pendientes",
      porcentaje: pendientesPorc,
      valor: this.tareasPendientes,
      color: "#f5a623"
    }
  ]
}
}

}

</script>

<style scoped>

.kpiPanel{
background:white;
border-radius:14px;
padding:20px 22px;
box-shadow:0 2px 12px rgba(29,107,82,0.08);
border:1px solid #b6e8d3;
display:flex;
flex-direction:column;
gap:16px;
}

.tituloKpi{
font-size:15px;
font-weight:700;
margin:0;
color:#1a3d2e;
}

.metricas{
display:grid;
grid-template-columns:repeat(auto-fit,minmax(150px,1fr));
gap:10px;
}

.metricaCard{
background:#f9fffe;
border:1px solid #dcf4e9;
border-radius:12px;
padding:12px;
}

.metricaLabel{
margin:0 0 4px;
font-size:12px;
color:#5a766b;
}

.metricaValor{
margin:0;
font-size:22px;
font-weight:800;
color:#1a6b52;
line-height:1.1;
}

.grafico{
display:flex;
flex-direction:column;
gap:10px;
}

.filaBarra{
display:grid;
grid-template-columns:minmax(130px, 190px) 1fr 44px;
align-items:center;
gap:10px;
}

.barraLabel{
font-size:12px;
font-weight:600;
color:#355648;
}

.track{
height:12px;
border-radius:999px;
background:#edf7f1;
overflow:hidden;
}

.fill{
height:100%;
border-radius:999px;
transition:width 0.3s ease;
}

.barraValor{
text-align:right;
font-size:12px;
font-weight:700;
color:#244d3d;
}

@media (max-width: 720px){
  .filaBarra{
    grid-template-columns:1fr;
    gap:6px;
  }

  .barraValor{
    text-align:left;
  }
}

</style>
