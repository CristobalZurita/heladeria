<template>

<header class="header">

<!-- IZQUIERDA -->
<div class="infoHeladeria">

<LogoBosque/>

<div class="textoHeladeria">
<h2>Bosque Helado</h2>
<p>Panel de empleados</p>
</div>

</div>

<!-- DERECHA -->
<div class="infoUsuario">

<div class="bloque">
<span class="label">Empleado</span>
<span class="usuario">🍦 {{ heladero }}</span>
</div>

</div>

</header>

</template>

<script>

import LogoBosque from "./LogoBosque.vue"

export default{

props:["heladero","hora"],

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
padding-bottom:20px;
margin-bottom:25px;
border-bottom:1px solid #e6e6e6;
}

/* IZQUIERDA */

.infoHeladeria{
display:flex;
align-items:center;
gap:12px;
}

.textoHeladeria h2{
margin:0;
font-size:20px;
font-weight:700;
color:#333;
}

.textoHeladeria p{
margin:0;
font-size:13px;
color:#888;
}

/* DERECHA */

.infoUsuario{
display:flex;
align-items:center;
gap:25px;
}

.bloque{
display:flex;
flex-direction:column;
font-size:13px;
}

.label{
font-size:11px;
color:#888;
}

.hora{
font-weight:600;
color:#7b5cff;
}

.usuario{
font-weight:600;
color:#444;
}


</style>