<template>

<div class="card" :class="tarea.color">

<label class="contenido">

<input
type="checkbox"
v-model="tarea.completada"
/>

<div class="textoTarea">

<span class="horario">
{{ tarea.inicio }} - {{ tarea.fin }}
</span>

<span :class="{ tachado: tarea.completada }">
{{ index + 1 }}. {{ tarea.nombre }}
</span>

</div>

</label>


<div class="acciones">

<button
class="btnAbrir"
@click="$emit('abrir', tarea)"
>
Abrir
</button>

<button
v-if="tarea.completada"
class="btnEliminar"
@click="$emit('eliminar')"
>
Eliminar
</button>

</div>
</div>


</template>

<script>

export default{
props:["tarea","index"]
}

</script>

<style scoped>

.card{
display:flex;
justify-content:space-between;
align-items:center;
padding:18px;
border-radius:12px;
color:white;
margin:15px 0;
font-weight:500;
}

/* colores de tareas */

.verde{
background:#2f6f67;
}

.naranja{
background:#f15a2b;
}

.morado{
background:#7b7bbd;
}

.contenido{
display:flex;
align-items:center;
gap:10px;
}

.tachado{
text-decoration:line-through;
opacity:0.7;
}

/* botón eliminar */

.btnEliminar{
background:rgba(0,0,0,0.2);
color:white;
border:none;
padding:6px 14px;
border-radius:20px;
font-size:13px;
cursor:pointer;
transition:all 0.2s ease;
}

.btnEliminar:hover{
background:rgba(0,0,0,0.35);
}

.acciones{
display:flex;
gap:10px;
}

.btnAbrir{
background:white;
color:#1f8a70;
border:none;
padding:6px 12px;
border-radius:8px;
cursor:pointer;
font-size:13px;
font-weight:500;
}

.btnAbrir:hover{
background:#f2f2f2;
}

.textoTarea{
display:flex;
flex-direction:column;
}

.horario{
font-size:12px;
opacity:0.85;
}

</style>