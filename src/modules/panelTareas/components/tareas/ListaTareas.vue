<template>


<div>

<p v-show="tareas.length === 0">
No hay tareas registradas
</p>

<TareaCard
v-for="(tarea,index) in tareas"
:key="index"
:tarea="tarea"
:index="index"
@eliminar="$emit('eliminar',index)"
@abrir="$emit('abrir',$event)"
/>

</div>

</template>

<script>

import TareaCard from "./TareaCard.vue"

export default{

props:["tareas"],

components:{
TareaCard
}

}

</script>

<style scoped>

.card{
padding:20px;
border-radius:10px;
color:white;
margin:15px 0;
}

.verde{
background:#2f6f67;
}

.naranja{
background:#f15a2b;
}

.morado{
background:#7b7bbd;
}

</style>