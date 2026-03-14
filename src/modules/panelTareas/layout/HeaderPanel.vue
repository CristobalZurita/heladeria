<template>

<header class="header">

<div class="infoHeladeria">

<LogoBosque/>

<div class="textoHeladeria">
<h2>🍃 Bosque Helado</h2>
<p>{{ rol === "admin" ? "Panel de administración" : "Panel de empleados" }}</p>
</div>

</div>

<div class="infoUsuario">

<button class="btnVolver" @click="$emit('volverLanding')">↩ Volver al landing</button>
<button class="btnSwitch" @click="$emit('switchPerfil')">⇄ SWITCH</button>
<button class="btnSesion" @click="$emit('cerrarSesion')">Salir</button>

<div class="bloque">
<span class="label">{{ rol === "admin" ? "Administrador" : "Empleado" }}</span>
<span class="usuario">🍦 {{ heladero }}</span>
</div>

</div>

</header>

</template>

<script>

import LogoBosque from "./LogoBosque.vue"

export default{

props:["heladero","rol"],
emits:["volverLanding","switchPerfil","cerrarSesion"],

components:{
LogoBosque
}

}

</script>

<style scoped>

.header{
display:flex;
justify-content:space-between;
align-items:center;
padding:18px 22px;
background:linear-gradient(90deg,#1a6b52,#2d9e74);
border-bottom:3px solid #FFD166;
border-radius:0 0 18px 18px;
}

.infoHeladeria{
display:flex;
align-items:center;
gap:12px;
}

.textoHeladeria h2{
margin:0;
font-size:20px;
font-weight:700;
color:#fff;
}

.textoHeladeria p{
margin:0;
font-size:13px;
color:#b6e8d3;
}

.infoUsuario{
display:flex;
align-items:center;
gap:12px;
flex-wrap:wrap;
justify-content:flex-end;
}

.btnVolver,
.btnSwitch,
.btnSesion{
padding:8px 14px;
border-radius:10px;
font-size:12px;
font-weight:700;
cursor:pointer;
transition:0.2s;
}

.btnVolver{
border:1px solid rgba(255,255,255,0.45);
background:rgba(255,255,255,0.12);
color:white;
}

.btnVolver:hover{
background:rgba(255,255,255,0.2);
}

.btnSwitch{
border:1px solid rgba(255,209,102,0.55);
background:#FFD166;
color:#194030;
}

.btnSwitch:hover{
background:#ffe09a;
}

.btnSesion{
border:1px solid rgba(255,255,255,0.38);
background:rgba(10,36,28,0.18);
color:#f4fdf8;
}

.btnSesion:hover{
background:rgba(10,36,28,0.32);
}

.bloque{
display:flex;
flex-direction:column;
font-size:13px;
}

.label{
font-size:11px;
color:#b6e8d3;
}

.usuario{
font-weight:700;
color:#FFD166;
font-size:15px;
}

</style>
