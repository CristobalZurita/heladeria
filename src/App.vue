<template>
<div class="appRoot">

  <LandingPage v-if="mostrarLanding" @entrar="entrarAlSistema" />

  <div v-else class="appLayout">

    <!-- Sidebar -->
    <Sidebar :vistaActiva="vistaActual" @cambiarVista="vistaActual = $event" />

    <!-- Panel principal -->
    <div class="mainPanel">

      <!-- Header -->
      <HeaderPanel :heladero="usuario" @volverLanding="volverALanding" />

      <!-- Contenido dinámico según vista -->
      <main class="contenido">

        <PanelEmpleado v-if="vistaActual === 'panel'" :usuario="usuario" vista="panel" />
        <PanelEmpleado v-else-if="vistaActual === 'tareas'" :usuario="usuario" vista="tareas" />
        <PanelEmpleado v-else-if="vistaActual === 'kpi'" :usuario="usuario" vista="kpi" />
        <GestorImagenes v-else-if="vistaActual === 'imagenes'" />
        <Stock        v-else-if="vistaActual === 'stock'" />
        <Proveedores  v-else-if="vistaActual === 'proveedores'" />

      </main>

    </div>

  </div>

</div>

</template>

<script>

import Sidebar       from "./modules/panelTareas/layout/Sidebar.vue"
import HeaderPanel   from "./modules/panelTareas/layout/HeaderPanel.vue"
import PanelEmpleado from "./modules/panelTareas/views/PanelEmpleado.vue"
import LandingPage   from "./modules/panelTareas/views/LandingPage.vue"
import GestorImagenes from "./modules/panelTareas/views/GestorImagenes.vue"
import Stock         from "./modules/inventario/views/Stock.vue"
import Proveedores   from "./modules/inventario/views/Proveedores.vue"

export default{

components:{
Sidebar,
HeaderPanel,
PanelEmpleado,
LandingPage,
GestorImagenes,
Stock,
Proveedores
},

// ── DATOS GLOBALES ────────────────────────────────
data(){
return{
usuario: "Valentina Torres",
vistaActual: "panel",
mostrarLanding: true
}
},

methods:{
entrarAlSistema(vista = "panel"){
this.vistaActual = vista
this.mostrarLanding = false
},

volverALanding(){
this.vistaActual = "panel"
this.mostrarLanding = true
}
}

}

</script>

<style>

/* ── RESET GLOBAL ── */
*{
box-sizing:border-box;
margin:0;
padding:0;
}

body{
font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
background:#f4fdf8;
color:#1a3d2e;
}

.appRoot{
min-height:100vh;
}

/* ── LAYOUT PRINCIPAL ── */
.appLayout{
display:flex;
min-height:100vh;
}

.mainPanel{
flex:1;
display:flex;
flex-direction:column;
overflow:hidden;
}

.contenido{
flex:1;
overflow-y:auto;
background:#f4fdf8;
}

/* ── SCROLLBAR ── */
::-webkit-scrollbar{
width:6px;
}

::-webkit-scrollbar-track{
background:#f0f0f0;
}

::-webkit-scrollbar-thumb{
background:#b6e8d3;
border-radius:10px;
}

::-webkit-scrollbar-thumb:hover{
background:#2d9e74;
}

</style>
