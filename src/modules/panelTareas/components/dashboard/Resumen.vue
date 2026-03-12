<template>

<div class="resumen">

<h2>Resumen</h2>

<div class="cards-resumen">

<div class="card total">
    <p>Total</p>
    <h3>{{ total }}</h3>
</div>

<div class="card completadas">
    <p>Completadas</p>
    <h3>{{ completadas }}</h3>

</div>

<div class="card pendientes">
    <p>Pendientes</p>
    <h3>{{ pendientes }}</h3>
</div>

</div>

<p class="tituloProgreso">Progreso del día</p>

<div class="barraProgreso">

<div
class="progreso"
:style="{ width: porcentaje + '%' }"
></div>

</div>

<p class="porcentaje">{{ porcentaje }}%</p>

</div>

</template>

<script>

export default{

props:[
"total",
"completadas",
"pendientes",
"porcentaje"
]

}

</script>

<style scoped>

.resumen{
background:#f4f1f1;
padding:20px;
border-radius:15px;
margin-top:20px;
}

.cards-resumen{
display:flex;
gap:20px;
margin:15px 0;
}

.card{
flex:1;
padding:20px;
border-radius:12px;
color:white;

display:flex;
flex-direction:column;
align-items:center;
justify-content:center;

gap:6px;
text-align:center;
}

.card p{
margin:0;
font-size:14px;
font-weight:500;
}

.card h3{
margin:0;
font-size:26px;
font-weight:700;
}

.total{
background:#9f94c8;
}

.completadas{
background:#7fb39a;
}

.pendientes{
background:#bfa88c;
}

.barraProgreso{
height:10px;
background:#ddd;
border-radius:10px;
overflow:hidden;
margin-top:10px;
}

.progreso{
height:10px;
background:linear-gradient(90deg,#ff5ca8,#7b5cff);
}

.porcentaje{
text-align:right;
color:#ff4a7d;
}

</style>