<template>
<div class="appRoot">

  <LandingPage v-if="mostrarLanding" @entrar="entrarAlSistema" />

  <AccesoPanel
    v-else-if="!sesionActiva"
    @autenticado="manejarSesion"
    @volverLanding="volverALanding"
  />

  <div v-else class="appLayout">

    <Sidebar :vistaActiva="vistaActual" :rol="rolUsuario" @cambiarVista="cambiarVista" />

    <div class="mainPanel">
      <div class="mainPanelShell">

        <HeaderPanel
          :heladero="usuario"
          :rol="rolUsuario"
          @volverLanding="volverALanding"
          @switchPerfil="switchPerfil"
          @cerrarSesion="cerrarSesion"
        />

        <main class="contenido">
          <div class="contenidoShell">

            <PanelEmpleado v-if="vistaActual === 'panel'" :usuario="usuario" :rol="rolUsuario" vista="panel" />
            <PanelEmpleado v-else-if="vistaActual === 'tareas'" :usuario="usuario" :rol="rolUsuario" vista="tareas" />
            <PanelEmpleado v-else-if="vistaActual === 'kpi'" :usuario="usuario" :rol="rolUsuario" vista="kpi" />
            <GestorImagenes v-else-if="vistaActual === 'imagenes'" />
            <Stock v-else-if="vistaActual === 'stock'" />
            <Proveedores v-else-if="vistaActual === 'proveedores'" />

          </div>
        </main>

      </div>
    </div>

  </div>

</div>

</template>

<script>

import Sidebar from "./modules/panelTareas/layout/Sidebar.vue"
import HeaderPanel from "./modules/panelTareas/layout/HeaderPanel.vue"
import PanelEmpleado from "./modules/panelTareas/views/PanelEmpleado.vue"
import LandingPage from "./modules/panelTareas/views/LandingPage.vue"
import AccesoPanel from "./modules/panelTareas/views/AccesoPanel.vue"
import GestorImagenes from "./modules/panelTareas/views/GestorImagenes.vue"
import Stock from "./modules/inventario/views/Stock.vue"
import Proveedores from "./modules/inventario/views/Proveedores.vue"
import { cerrarSesionActiva, obtenerSesionActiva } from "./modules/panelTareas/services/falsoBackUsuarios.js"
import { listarEstadoTareas } from "./modules/panelTareas/services/falsoBackTareas.js"

function normalizarNombre(nombre = "") {
  return String(nombre).trim().toLowerCase()
}

function crearPerfilEmpleado(nombre) {
  const nombreLimpio = String(nombre || "").trim()
  return {
    nombre: nombreLimpio,
    usuario: normalizarNombre(nombreLimpio).replaceAll(" ", "."),
    rol: "empleado"
  }
}

function construirPerfilesDemo(sesion = null) {
  const perfiles = []
  const empleadosAgregados = new Set()
  const estadoTareas = listarEstadoTareas()
  const adminBase = {
    nombre: "Administrador Bosque Helado",
    usuario: "admin",
    rol: "admin"
  }

  perfiles.push(sesion?.rol === "admin" ? { ...sesion } : adminBase)

  if (sesion?.rol === "empleado" && sesion?.nombre) {
    const perfilSesion = crearPerfilEmpleado(sesion.nombre)
    perfiles.push(perfilSesion)
    empleadosAgregados.add(normalizarNombre(perfilSesion.nombre))
  }

  estadoTareas.tareas.forEach((tarea) => {
    const nombreAsignado = String(tarea?.asignado || "").trim()
    const claveNombre = normalizarNombre(nombreAsignado)

    if (nombreAsignado === "" || empleadosAgregados.has(claveNombre)) {
      return
    }

    perfiles.push(crearPerfilEmpleado(nombreAsignado))
    empleadosAgregados.add(claveNombre)
  })

  return perfiles
}

export default {

components:{
Sidebar,
HeaderPanel,
PanelEmpleado,
LandingPage,
AccesoPanel,
GestorImagenes,
Stock,
Proveedores
},

data() {
  const sesion = obtenerSesionActiva()

  return {
    usuario: sesion?.nombre || "Valentina Torres",
    rolUsuario: sesion?.rol || "empleado",
    vistaActual: "panel",
    mostrarLanding: true,
    sesionActiva: sesion,
    perfilActivo: sesion,
    perfilesDemo: sesion ? construirPerfilesDemo(sesion) : []
  }
},

methods:{
entrarAlSistema(vista = "panel") {
  this.vistaActual = vista
  this.mostrarLanding = false
  const sesion = obtenerSesionActiva()
  if (sesion) {
    this.aplicarSesion(sesion)
  }
},

manejarSesion(sesion) {
  this.aplicarSesion(sesion)
},

aplicarSesion(sesion) {
  this.sesionActiva = sesion
  this.perfilesDemo = construirPerfilesDemo(sesion)
  this.aplicarPerfil(sesion)
},

aplicarPerfil(perfil) {
  this.perfilActivo = perfil
  this.usuario = perfil.nombre
  this.rolUsuario = perfil.rol
  if (!this.esVistaPermitida(this.vistaActual)) {
    this.vistaActual = "panel"
  }
},

switchPerfil() {
  if (!this.sesionActiva) {
    return
  }

  if (this.perfilesDemo.length === 0) {
    this.perfilesDemo = construirPerfilesDemo(this.sesionActiva)
  }

  const indiceActual = this.perfilesDemo.findIndex((perfil) => {
    return perfil.rol === this.rolUsuario && normalizarNombre(perfil.nombre) === normalizarNombre(this.usuario)
  })

  const siguienteIndice = indiceActual >= 0
    ? (indiceActual + 1) % this.perfilesDemo.length
    : 0

  this.aplicarPerfil(this.perfilesDemo[siguienteIndice])
},

esVistaPermitida(vista) {
  const vistasAdmin = ["panel", "tareas", "kpi", "imagenes", "stock", "proveedores"]
  const vistasEmpleado = ["panel", "tareas"]
  const permitidas = this.rolUsuario === "admin" ? vistasAdmin : vistasEmpleado
  return permitidas.includes(vista)
},

cambiarVista(vista) {
  if (this.esVistaPermitida(vista)) {
    this.vistaActual = vista
  }
},

cerrarSesion() {
  cerrarSesionActiva()
  this.sesionActiva = null
  this.perfilActivo = null
  this.perfilesDemo = []
  this.usuario = "Valentina Torres"
  this.rolUsuario = "empleado"
  this.vistaActual = "panel"
},

volverALanding() {
  this.vistaActual = "panel"
  this.mostrarLanding = true
}
}

}

</script>

<style>

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

:root{
--site-max-width: calc(1640px + 40rem);
--dashboard-max-width: calc(var(--site-max-width) + 40rem);
--site-gutter-desktop: 36px;
--site-gutter-mobile: 20px;
}

.appRoot{
min-height:100vh;
}

.appLayout{
display:flex;
min-height:100vh;
}

.mainPanel{
flex:1;
display:flex;
flex-direction:column;
overflow:hidden;
min-width:0;
padding:0 18px 18px 0;
}

.mainPanelShell{
width:min(var(--dashboard-max-width, calc(1640px + 80rem)), 100%);
min-width:0;
margin:0 auto;
display:flex;
flex-direction:column;
flex:1;
}

.contenido{
flex:1;
overflow-y:auto;
background:#f4fdf8;
border-radius:0 0 22px 22px;
}

.contenidoShell{
width:100%;
}

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

@media (max-width: 720px){
  .mainPanel{
    padding:0;
  }

  .contenido{
    border-radius:0;
  }
}

</style>
