<template>

<form class="formTarea" @submit.prevent="enviar">

  <div class="filaInputs">

    <input
      v-model="nombre"
      class="inputTarea"
      placeholder="Describe la tarea..."
      :disabled="!diaActivo"
    />

    <select v-model="prioridad" class="selectPrioridad" :disabled="!diaActivo">
      <option value="baja">🟢 Baja</option>
      <option value="media">🟡 Media</option>
      <option value="alta">🔴 Alta</option>
    </select>

    <button type="button" class="btnAgregar" :disabled="!diaActivo" @click="enviar">
      ➕ Agregar
    </button>

  </div>

  <p v-if="error" class="errorForm">⚠️ {{ error }}</p>

</form>

</template>

<script>

export default{

props:{
diaActivo:{ type: Boolean, default: true }
},

emits:["agregar","agregarTarea"],

// ── DATOS ──────────────────────────────────────────
data(){
return{
nombre: "",
prioridad: "media",
error: ""
}
},

// ── MÉTODOS ────────────────────────────────────────
methods:{

enviar(){
if(this.nombre.trim() === ""){
  this.error = "La tarea no puede estar vacía"
  return
}
const nuevaTarea = {
  nombre: this.nombre.trim(),
  prioridad: this.prioridad
}
this.$emit("agregar", nuevaTarea)
this.$emit("agregarTarea", nuevaTarea)
this.nombre = ""
this.prioridad = "media"
this.error = ""
}

}

}

</script>

<style scoped>

/* ── FORM ── */
.formTarea{
margin-bottom:8px;
}

.filaInputs{
display:flex;
gap:10px;
flex-wrap:wrap;
align-items:center;
}

/* ── INPUT ── */
.inputTarea{
flex:1;
min-width:200px;
padding:11px 16px;
border:2px solid #b6e8d3;
border-radius:10px;
font-size:14px;
outline:none;
transition:0.2s;
background:#f9fffe;
color:#1a3d2e;
}

.inputTarea:focus{
border-color:#2d9e74;
background:#fff;
}

.inputTarea:disabled{
background:#f0f0f0;
color:#aaa;
cursor:not-allowed;
}

/* ── SELECT ── */
.selectPrioridad{
padding:11px 12px;
border:2px solid #b6e8d3;
border-radius:10px;
font-size:13px;
background:#f9fffe;
color:#1a3d2e;
cursor:pointer;
outline:none;
}

.selectPrioridad:disabled{
background:#f0f0f0;
color:#aaa;
cursor:not-allowed;
}

/* ── BOTÓN ── */
.btnAgregar{
padding:11px 22px;
background:linear-gradient(135deg,#FFD166,#f5a623);
border:none;
border-radius:10px;
font-weight:700;
font-size:14px;
cursor:pointer;
color:#1a3d2e;
transition:0.2s;
white-space:nowrap;
}

.btnAgregar:hover:not(:disabled){
transform:translateY(-1px);
box-shadow:0 4px 12px rgba(245,166,35,0.4);
}

.btnAgregar:disabled{
opacity:0.45;
cursor:not-allowed;
}

/* ── ERROR ── */
.errorForm{
color:#e05a00;
font-size:13px;
margin-top:6px;
}

</style>
