<template>

<div class="layout">

<Sidebar />

<!-- PANEL PRINCIPAL -->
<main class="panel">

<HeaderPanel
:heladero="usuario"
:hora="hora"
/>

<h1>Panel de Tareas de {{ usuario }}</h1>

<div class="estadoDia">

<button
class="botonEstado"
@click="cambiarEstado"
:class="diaActivo ? 'btnRojo' : 'btnVerde'"
>
{{ diaActivo ? "Finalizar día" : "Iniciar día" }}
</button>

<p v-if="diaActivo" class="mensajeActivo">
☀️ Día activo, ¡a trabajar!
</p>

<p v-else class="mensajeFinalizado">
🌙 Día finalizado. Buen trabajo.
</p>

</div>

<Resumen
:total="tareas.length"
:completadas="tareasCompletadas"
:pendientes="tareasPendientes"
:porcentaje="porcentajeProgreso"
/>


<FormTarea @agregar="agregarTarea"/>
<h2 class="tituloTareas">Tareas asignadas</h2>

<ListaTareas
:tareas="tareas"
@eliminar="eliminarTarea"
@abrir="abrirTarea"
/>

</main>

<AgendaDia
:hora="hora"
:tareas="tareas"
/>

</div>

<ModalTarea
:visible="mostrarModal"
:tarea="tareaSeleccionada"
:instrucciones="instrucciones"
@cerrar="mostrarModal=false"
/>

</template>

<script>

import HeaderPanel from "../layout/HeaderPanel.vue"
import Sidebar from "../layout/Sidebar.vue"

import AgendaDia from "../components/dashboard/AgendaDia.vue"
import Resumen from "../components/dashboard/Resumen.vue"

import FormTarea from "../components/tareas/FormTarea.vue"
import ListaTareas from "../components/tareas/ListaTareas.vue"
import ModalTarea from "../components/tareas/ModalTarea.vue"

export default{

components:{
HeaderPanel,
LogoBosque,
FormTarea,
ListaTareas,
Resumen,
ModalTarea,
AgendaDia,
Sidebar
},

data(){
return{

usuario:"Camila",

hora:new Date().toLocaleTimeString(),

diaActivo:true,

tareas:[],

tareaSeleccionada:null,
instrucciones:[],
mostrarModal:false

}
},

mounted(){

setInterval(()=>{
this.hora = new Date().toLocaleTimeString()
},1000)

},

computed:{

tareasCompletadas(){
return this.tareas.filter(t => t.completada).length
},

tareasPendientes(){
return this.tareas.length - this.tareasCompletadas
},

porcentajeProgreso(){

if(this.tareas.length === 0){
return 0
}

return Math.round((this.tareasCompletadas / this.tareas.length) * 100)

}

},

methods:{

cambiarEstado(){
this.diaActivo = !this.diaActivo
},

agregarTarea(tarea){

const colores = ["verde","naranja","morado"]

const colorRandom = colores[Math.floor(Math.random()*colores.length)]

this.tareas.push({
nombre:tarea.nombre,
inicio:tarea.inicio,
fin:tarea.fin,
completada:false,
color:colorRandom
})

},

eliminarTarea(index){
this.tareas.splice(index,1)
},

async abrirTarea(tarea){

this.tareaSeleccionada = tarea
this.mostrarModal = true

try{

const res = await fetch("http://localhost:3000/instrucciones/" + tarea.nombre)

const data = await res.json()

this.instrucciones = data

}catch(error){

console.error("Error cargando instrucciones", error)

}

}

}


}

</script>


<style scoped>


.layout{
display:grid;
grid-template-columns:250px 1fr 280px;
height:100vh;
font-family:Arial;
}


/* PANEL */

.panel{
padding:30px;
background:#f5f5f5;
}

/* AGENDA */

.agenda{
background:#e6f2f2;
padding:20px;
}

/* BOTONES */

.botonEstado{
border:none;
padding:10px 20px;
border-radius:25px;
color:white;
cursor:pointer;
}

.btnRojo{
background:#f05252;
}

.btnVerde{
background:#1f8a70;
}

/* MENSAJES */

.mensajeActivo{
background:#e6f6ec;
color:#1b7f4f;
padding:10px 18px;
border-radius:30px;
}

.mensajeFinalizado{
background:#f0e6ff;
color:#6a3dc9;
padding:10px 18px;
border-radius:30px;
}


.tituloTareas{
margin-top:25px;
margin-bottom:10px;
font-size:20px;
font-weight:600;
color:#333;
}


</style>