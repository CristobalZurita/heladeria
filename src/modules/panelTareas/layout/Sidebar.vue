<template>

<aside class="sidebar">

<div class="tituloLogo">
<LogoBosque modo="claro"/>
<span>Bosque Helado</span>
</div>

<ul class="menu">
<li>Panel</li>
<li>Tareas</li>
<li>Inventario</li>
<li>Configuración</li>
</ul>

</aside>

</template>

<script>

import LogoBosque from "./LogoBosque.vue"

export default{

components:{
LogoBosque
}

}

</script>

<style scoped>

.sidebar{
background:linear-gradient(180deg,#1f8a70,#145a4a);
color:white;
padding:20px;
height:100%;
}

.tituloLogo{
display:flex;
align-items:center;
gap:10px;
margin-bottom:30px;
font-weight:600;
}

.menu{
list-style:none;
padding:0;
}

.menu li{
margin:12px 0;
cursor:pointer;
padding:8px 10px;
border-radius:6px;
transition:0.2s;
}

.menu li:hover{
background:rgba(255,255,255,0.15);
}

</style>