<template>

<div class="formTarea">

<input
v-model="nombre"
placeholder="Nueva tarea"
class="inputTarea"
/>

<input
type="time"
v-model="horaInicio"
class="inputHora"
/>

<input
type="time"
v-model="horaFin"
class="inputHora"
/>

<button
class="btnAgregar"
@click="agregar"
>
Agregar
</button>

</div>

</template>

<script>

export default{

data(){
return{
nombre:"",
horaInicio:"",
horaFin:""
}
},

methods:{

agregar(){

if(
this.nombre.trim() === "" ||
this.horaInicio === "" ||
this.horaFin === ""
) return

this.$emit("agregar", {
nombre:this.nombre,
inicio:this.horaInicio,
fin:this.horaFin
})

this.nombre=""
this.horaInicio=""
this.horaFin=""

}

}

}

</script>

<style scoped>

.formTarea{
display:flex;
gap:10px;
margin:20px 0;
align-items:center;
flex-wrap:wrap;
}

.inputTarea{
flex:1;
padding:10px 14px;
border-radius:8px;
border:1px solid #ccc;
font-size:14px;
}

.inputHora{
padding:10px;
border-radius:8px;
border:1px solid #ccc;
}

.btnAgregar{
background:#1f8a70;
color:white;
border:none;
padding:10px 18px;
border-radius:8px;
cursor:pointer;
font-weight:500;
}

.btnAgregar:hover{
background:#18715b;
}

</style>