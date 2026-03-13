<template>

<aside class="sidebar">

<div class="tituloLogo">
<LogoBosque modo="claro"/>
<span>Bosque Helado</span>
</div>

<ul class="menu">
<li
  v-for="item in menuItems"
  :key="item.id"
  :class="{ activo: vistaActiva === item.id }"
  @click="$emit('cambiarVista', item.id)"
>
  {{ item.icono }} {{ item.label }}
</li>
</ul>

</aside>

</template>

<script>

import LogoBosque from "./LogoBosque.vue"

export default{

props:["vistaActiva"],

emits:["cambiarVista"],

components:{
LogoBosque
},

data(){
return{
menuItems:[
{ id:"panel", label:"Panel", icono:"🏠" },
{ id:"tareas", label:"Tareas", icono:"✅" },
{ id:"kpi", label:"KPI", icono:"📈" },
{ id:"imagenes", label:"Imagenes", icono:"🖼" },
{ id:"stock", label:"Inventario", icono:"📦" },
{ id:"proveedores", label:"Proveedores", icono:"🤝" }
]
}
}

}

</script>

<style scoped>

.sidebar{
background:linear-gradient(180deg,#1a6b52,#0e3d2e);
color:white;
padding:28px 16px;
height:100%;
min-height:100vh;
width:160px;
flex-shrink:0;
}

.tituloLogo{
display:flex;
align-items:center;
gap:10px;
margin-bottom:36px;
font-weight:700;
font-size:14px;
color:#FFD166;
}

.menu{
list-style:none;
padding:0;
margin:0;
}

.menu li{
margin:6px 0;
cursor:pointer;
padding:10px 12px;
border-radius:8px;
transition:0.2s;
font-size:13px;
color:#c8edd9;
}

.menu li:hover{
background:rgba(255,255,255,0.15);
color:#fff;
}

.menu li.activo{
background:rgba(255,209,102,0.25);
color:#FFD166;
font-weight:600;
}

</style>
