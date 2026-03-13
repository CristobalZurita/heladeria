<template>

<section class="kpiPanel">

  <div class="encabezadoKpi">
    <div>
      <p class="kpiEyebrow">KPI operativo</p>
      <h3 class="tituloKpi">Tablero directo listo para demo comercial</h3>
      <p class="textoKpi">
        El panel abre con inventario, tareas, proveedores, recetas e imagenes ya cargadas
        para revisar resultado operativo sin ingresar datos a mano.
      </p>
    </div>

    <span class="estadoTurno" :class="diaActivo ? 'estadoTurno--activo' : 'estadoTurno--cerrado'">
      {{ diaActivo ? "Turno activo" : "Turno cerrado" }}
    </span>
  </div>

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
      <p class="metricaLabel">Productos sin stock</p>
      <p class="metricaValor">{{ productosSinStock }}</p>
    </article>
    <article class="metricaCard">
      <p class="metricaLabel">Proveedores activos</p>
      <p class="metricaValor">{{ totalProveedores }}</p>
    </article>
    <article class="metricaCard">
      <p class="metricaLabel">Imagenes cargadas</p>
      <p class="metricaValor">{{ totalImagenes }}</p>
    </article>
    <article class="metricaCard">
      <p class="metricaLabel">Recetas base</p>
      <p class="metricaValor">{{ totalRecetas }}</p>
    </article>
  </div>

  <div class="graficosGrid">
    <article class="panelGrafico">
      <div class="panelGraficoHead">
        <div>
          <p class="panelEyebrow">Cumplimiento del turno</p>
          <h4 class="panelTitulo">Estado directo de ejecucion</h4>
        </div>
      </div>

      <div class="donaWrap">
        <div class="donaGrafico" :style="{ background: donaCumplimiento }">
          <div class="donaCentro">
            <strong>{{ cumplimiento }}%</strong>
            <span>completado</span>
          </div>
        </div>

        <div class="donaLeyenda">
          <article v-for="estado in estadosTareas" :key="estado.id" class="leyendaItem">
            <span class="leyendaColor" :style="{ background: estado.color }"></span>
            <div>
              <strong>{{ estado.valor }}</strong>
              <p>{{ estado.label }}</p>
            </div>
          </article>
        </div>
      </div>
    </article>

    <article class="panelGrafico">
      <div class="panelGraficoHead">
        <div>
          <p class="panelEyebrow">Prioridades activas</p>
          <h4 class="panelTitulo">Carga de tareas por urgencia</h4>
        </div>
      </div>

      <div class="columnChart">
        <article v-for="item in prioridadesTareas" :key="item.id" class="columnItem">
          <div class="columnTrack">
            <span class="columnFill" :style="{ height: item.altura + '%', background: item.color }"></span>
          </div>
          <strong>{{ item.valor }}</strong>
          <p>{{ item.label }}</p>
        </article>
      </div>
    </article>

    <article class="panelGrafico">
      <div class="panelGraficoHead">
        <div>
          <p class="panelEyebrow">Actividad de 3 meses</p>
          <h4 class="panelTitulo">Biblioteca visual precargada</h4>
        </div>
      </div>

      <div class="columnChart columnChart--mensual">
        <article v-for="item in actividadMensual" :key="item.id" class="columnItem">
          <div class="columnTrack">
            <span class="columnFill" :style="{ height: item.altura + '%', background: item.color }"></span>
          </div>
          <strong>{{ item.valor }}</strong>
          <p>{{ item.label }}</p>
        </article>
      </div>

      <p class="panelNota">La demo ya carga enero, febrero y marzo para revisar flujo sin rellenar planillas manuales.</p>
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
diaActivo:{ type: Boolean, default: true },
totalProductos:{ type: Number, default: 0 },
totalRecetas:{ type: Number, default: 0 },
productosSinStock:{ type: Number, default: 0 },
productosConImagen:{ type: Number, default: 0 },
totalProveedores:{ type: Number, default: 0 },
totalImagenes:{ type: Number, default: 0 },
imagenes:{ type: Array, default: () => [] }
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

stockDisponible(){
  return Math.max(this.totalProductos - this.productosSinStock, 0)
},

disponibilidadStock(){
  if(this.totalProductos === 0) return 0
  return Math.round((this.stockDisponible / this.totalProductos) * 100)
},

coberturaVisual(){
  if(this.totalProductos === 0) return 0
  return Math.round((this.productosConImagen / this.totalProductos) * 100)
},

donAcento(){
  return this.diaActivo ? "#2d9e74" : "#7a8b84"
},

donaCumplimiento(){
  return `conic-gradient(${this.donAcento} 0 ${this.cumplimiento}%, #ffd166 ${this.cumplimiento}% 100%)`
},

estadosTareas(){
  return[
    {
      id: "completadas",
      label: "Tareas completadas",
      valor: this.tareasCompletadas,
      color: this.donAcento
    },
    {
      id: "pendientes",
      label: "Tareas pendientes",
      valor: this.tareasPendientes,
      color: "#ffd166"
    }
  ]
},

prioridadesTareas(){
  const prioridades = [
    {
      id: "alta",
      label: "Alta",
      valor: this.tareas.filter(tarea => tarea.prioridad === "alta").length,
      color: "#c5522c"
    },
    {
      id: "media",
      label: "Media",
      valor: this.tareas.filter(tarea => tarea.prioridad === "media").length,
      color: "#e0a340"
    },
    {
      id: "baja",
      label: "Baja",
      valor: this.tareas.filter(tarea => tarea.prioridad === "baja").length,
      color: "#2d9e74"
    }
  ]

  const maximo = Math.max(...prioridades.map(item => item.valor), 1)

  return prioridades.map((item) => ({
    ...item,
    altura: item.valor > 0 ? Math.max(Math.round((item.valor / maximo) * 100), 18) : 0
  }))
},

actividadMensual(){
  const formateador = new Intl.DateTimeFormat("es-CL", { month: "short" })
  const meses = []

  for(let offset = 2; offset >= 0; offset -= 1){
    const base = new Date()
    base.setDate(1)
    base.setMonth(base.getMonth() - offset)

    meses.push({
      id: `${base.getFullYear()}-${String(base.getMonth() + 1).padStart(2, "0")}`,
      label: formateador.format(base).replace(".", "")
    })
  }

  const conteoPorMes = this.imagenes.reduce((acum, imagen) => {
    const fecha = new Date(imagen.fecha)
    if(Number.isNaN(fecha.getTime())) return acum

    const id = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, "0")}`
    acum[id] = (acum[id] || 0) + 1
    return acum
  }, {})

  const maximo = Math.max(
    ...meses.map((mes) => conteoPorMes[mes.id] || 0),
    1
  )

  return meses.map((mes) => {
    const valor = conteoPorMes[mes.id] || 0

    return {
      ...mes,
      valor,
      color: "#1f7a5c",
      altura: valor > 0 ? Math.max(Math.round((valor / maximo) * 100), 18) : 0
    }
  })
},

barras(){
  return[
    {
      id: "cumplimiento",
      label: "Cumplimiento operativo",
      porcentaje: this.cumplimiento,
      valor: this.cumplimiento + "%",
      color: "#2d9e74"
    },
    {
      id: "stock",
      label: "Stock disponible",
      porcentaje: this.disponibilidadStock,
      valor: this.stockDisponible + "/" + this.totalProductos,
      color: "#1f7a5c"
    },
    {
      id: "visuales",
      label: "Productos con imagen",
      porcentaje: this.coberturaVisual,
      valor: this.productosConImagen + "/" + this.totalProductos,
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
padding:22px 24px;
box-shadow:0 2px 12px rgba(29,107,82,0.08);
border:1px solid #b6e8d3;
display:flex;
flex-direction:column;
gap:18px;
}

.encabezadoKpi{
display:flex;
justify-content:space-between;
align-items:flex-start;
gap:14px;
flex-wrap:wrap;
}

.kpiEyebrow{
margin:0 0 6px;
font-size:12px;
font-weight:800;
letter-spacing:0.14em;
text-transform:uppercase;
color:#557566;
}

.tituloKpi{
font-size:20px;
font-weight:700;
margin:0;
color:#1a3d2e;
}

.textoKpi{
margin:8px 0 0;
font-size:14px;
line-height:1.5;
color:#476457;
max-width:740px;
}

.estadoTurno{
display:inline-flex;
align-items:center;
padding:9px 14px;
border-radius:999px;
font-size:12px;
font-weight:800;
white-space:nowrap;
}

.estadoTurno--activo{
background:#e9f8f1;
color:#1f7a5c;
}

.estadoTurno--cerrado{
background:#f2f4f3;
color:#54655f;
}

.metricas{
display:grid;
grid-template-columns:repeat(auto-fit,minmax(150px,1fr));
gap:12px;
}

.metricaCard{
background:#f9fffe;
border:1px solid #dcf4e9;
border-radius:12px;
padding:14px 15px;
}

.metricaLabel{
margin:0 0 6px;
font-size:12px;
color:#5a766b;
font-weight:700;
}

.metricaValor{
margin:0;
font-size:24px;
font-weight:800;
color:#1a6b52;
line-height:1.1;
}

.graficosGrid{
display:grid;
grid-template-columns:repeat(3,minmax(0,1fr));
gap:14px;
}

.panelGrafico{
background:#f9fffe;
border:1px solid #dcf4e9;
border-radius:14px;
padding:16px;
display:flex;
flex-direction:column;
gap:14px;
}

.panelGraficoHead{
display:flex;
justify-content:space-between;
align-items:flex-start;
gap:10px;
}

.panelEyebrow{
margin:0 0 4px;
font-size:11px;
font-weight:800;
letter-spacing:0.12em;
text-transform:uppercase;
color:#6a8579;
}

.panelTitulo{
margin:0;
font-size:16px;
font-weight:700;
color:#1a3d2e;
}

.panelNota{
margin:0;
font-size:12px;
line-height:1.45;
color:#5b776b;
}

.donaWrap{
display:grid;
grid-template-columns:minmax(0, 170px) 1fr;
align-items:center;
gap:16px;
}

.donaGrafico{
width:170px;
height:170px;
border-radius:50%;
display:grid;
place-items:center;
margin:0 auto;
}

.donaCentro{
width:112px;
height:112px;
border-radius:50%;
background:white;
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
box-shadow:inset 0 0 0 1px #d9ebe3;
}

.donaCentro strong{
font-size:28px;
line-height:1;
color:#1a3d2e;
}

.donaCentro span{
margin-top:6px;
font-size:12px;
font-weight:700;
color:#557566;
text-transform:uppercase;
letter-spacing:0.08em;
}

.donaLeyenda{
display:flex;
flex-direction:column;
gap:10px;
}

.leyendaItem{
display:flex;
align-items:center;
gap:10px;
}

.leyendaColor{
width:12px;
height:12px;
border-radius:50%;
flex:none;
}

.leyendaItem strong{
display:block;
font-size:20px;
line-height:1;
color:#1a3d2e;
}

.leyendaItem p{
margin:4px 0 0;
font-size:12px;
color:#5a766b;
}

.columnChart{
display:grid;
grid-template-columns:repeat(3,minmax(0,1fr));
gap:12px;
min-height:208px;
align-items:end;
}

.columnItem{
display:flex;
flex-direction:column;
align-items:center;
gap:8px;
}

.columnTrack{
width:100%;
height:150px;
border-radius:14px;
background:linear-gradient(180deg,#eef8f2 0%, #f8fcfa 100%);
display:flex;
align-items:flex-end;
justify-content:center;
padding:10px;
}

.columnFill{
display:block;
width:100%;
max-width:54px;
border-radius:12px 12px 6px 6px;
transition:height 0.3s ease;
box-shadow:0 12px 22px rgba(31,122,92,0.15);
}

.columnItem strong{
font-size:22px;
line-height:1;
color:#1a3d2e;
}

.columnItem p{
margin:0;
font-size:12px;
font-weight:700;
color:#5a766b;
text-align:center;
}

.columnChart--mensual .columnFill{
background:#1f7a5c;
}

.grafico{
display:flex;
flex-direction:column;
gap:12px;
padding-top:2px;
}

.filaBarra{
display:grid;
grid-template-columns:minmax(130px, 190px) 1fr 72px;
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

@media (max-width: 1040px){
  .graficosGrid{
    grid-template-columns:1fr;
  }
}

@media (max-width: 720px){
  .kpiPanel{
    padding:18px;
  }

  .tituloKpi{
    font-size:18px;
  }

  .textoKpi{
    font-size:13px;
  }

  .donaWrap{
    grid-template-columns:1fr;
  }

  .donaGrafico{
    width:150px;
    height:150px;
  }

  .donaCentro{
    width:100px;
    height:100px;
  }

  .filaBarra{
    grid-template-columns:1fr;
    gap:6px;
  }

  .barraValor{
    text-align:left;
  }
}

</style>
