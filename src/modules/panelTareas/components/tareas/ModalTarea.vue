<template>

<div v-if="visible" class="modalOverlay">

<div class="modal">

<h2>Instrucciones</h2>

<h3>{{ tarea?.nombre }}</h3>

<ul>
<li v-for="(paso,index) in instrucciones" :key="index">
{{ paso }}
</li>
</ul>

<button class="btnCerrar" @click="$emit('cerrar')">
Cerrar
</button>

</div>

</div>

</template>

<script>

export default{

props:[
"visible",
"tarea",
"instrucciones"
]

}

</script>

<style scoped>

.modalOverlay{
position:fixed;
top:0;
left:0;
width:100%;
height:100%;
background:rgba(0,0,0,0.4);
display:flex;
justify-content:center;
align-items:center;
}

.modal{
background:white;
padding:30px;
border-radius:12px;
width:400px;
max-width:90%;
max-height:70vh;
overflow:auto;
box-shadow:0 10px 30px rgba(0,0,0,0.2);
}

.btnCerrar{
margin-top:20px;
background:#1f8a70;
color:white;
border:none;
padding:10px 18px;
border-radius:8px;
cursor:pointer;
}

</style>