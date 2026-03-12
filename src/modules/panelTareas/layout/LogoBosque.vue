<template>

<svg
class="logoBosque"
viewBox="0 0 120 120"
xmlns="http://www.w3.org/2000/svg"
>

<!-- hoja -->
<path
d="M60 18 C80 18 95 35 88 55 C83 68 72 78 60 88 C48 78 37 68 32 55 C25 35 40 18 60 18 Z"
:fill="modo === 'claro' ? 'white' : '#2f8f6f'"
/>

<!-- vena -->
<path
d="M60 22 C60 40 60 60 60 85"
:stroke="modo === 'claro' ? 'white' : '#1b5e4a'"
stroke-width="3"
fill="none"
stroke-linecap="round"
/>

<!-- cono -->
<polygon
points="45,88 75,88 60,110"
:fill="modo === 'claro' ? '#FFD166' : '#e3a857'"
/>

</svg>

</template>

<script>

export default{

props:{
modo:{
type:String,
default:"normal"
}
}

}

</script>

<style>

.logoBosque{
width:38px;
height:38px;
}

</style>