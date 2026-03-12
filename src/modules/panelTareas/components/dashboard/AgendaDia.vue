<template>

<aside class="agenda">

<h3 class="titulo">Agenda del día</h3>

<!-- Hora actual -->

<div class="bloque">

<p class="subtitulo">🕒 Hora actual</p>
<p class="hora">{{ hora }}</p>

</div>

<!-- Tareas del día -->

<div class="bloque">

<p class="subtitulo">📋 Tareas del día</p>

<p v-if="tareasOrdenadas.length === 0" class="sinTareas">
No tienes tareas agregadas hoy
</p>

<ul v-else class="lista">

<li
v-for="(tarea,index) in tareasOrdenadas"
:key="index"
:class="estadoTarea(tarea)"
>
<span class="horario">
{{ tarea.inicio }} - {{ tarea.fin }}
</span>

<span class="nombre">
{{ tarea.nombre }}
</span>

<div v-if="estadoTarea(tarea) === 'activa'" class="timeline">

<div
class="progreso"
:style="{ width: progresoTarea(tarea) + '%' }"
></div>

</div>

</li>

</ul>

</div>

</aside>

</template>

<script>

export default{

props:[
"hora",
"tareas"
],

methods:{

estadoTarea(tarea){

const ahora = this.hora.substring(0,5)

if(ahora >= tarea.inicio && ahora <= tarea.fin){
return "activa"
}

if(ahora > tarea.fin){
return "finalizada"
}

return "pendiente"

},

progresoTarea(tarea){

const ahora = this.hora.substring(0,5)

const inicio = tarea.inicio.split(":")
const fin = tarea.fin.split(":")
const actual = ahora.split(":")

const inicioMin = parseInt(inicio[0])*60 + parseInt(inicio[1])
const finMin = parseInt(fin[0])*60 + parseInt(fin[1])
const actualMin = parseInt(actual[0])*60 + parseInt(actual[1])

const duracion = finMin - inicioMin
const progreso = actualMin - inicioMin

return Math.min(100, Math.max(0, (progreso / duracion) * 100))

}

},
computed:{

tareasOrdenadas(){

if(!this.tareas) return []

return [...this.tareas].sort((a,b)=>{
return a.inicio.localeCompare(b.inicio)
})

}

}

}

</script>

<style scoped>

.agenda{
background:#e6f2f2;
padding:20px;
display:flex;
flex-direction:column;
gap:15px;
}

.titulo{
font-size:18px;
font-weight:600;
}

.bloque{
background:white;
padding:15px;
border-radius:10px;
box-shadow:0 2px 6px rgba(0,0,0,0.05);
}

.subtitulo{
font-weight:600;
margin-bottom:10px;
}

.hora{
font-size:18px;
font-weight:600;
color:#1f8a70;
}

.lista{
padding-left:0;
list-style:none;
}

.lista li{
display:flex;
flex-direction:column;
margin-bottom:8px;
}

.horario{
font-size:12px;
opacity:0.8;
}

.nombre{
font-weight:500;
}

.sinTareas{
font-size:14px;
opacity:0.7;
}

.lista li{
display:flex;
flex-direction:column;
margin-bottom:8px;
padding:8px;
border-radius:8px;
}

/* tarea actual */

.activa{
background:#dff7ea;
border-left:4px solid #1f8a70;
font-weight:600;
}

/* tarea futura */

.pendiente{
opacity:0.8;
}

/* tarea pasada */

.finalizada{
opacity:0.5;
text-decoration:line-through;
}

.timeline{
width:100%;
height:6px;
background:#e0e0e0;
border-radius:4px;
margin-top:6px;
overflow:hidden;
}

.progreso{
height:100%;
background:#1f8a70;
transition:width 0.5s;
}

</style>