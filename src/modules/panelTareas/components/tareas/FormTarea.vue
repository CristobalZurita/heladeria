<template>

<form class="formTarea" @submit.prevent="enviar">

  <p v-if="soloLectura" class="infoLectura">Este perfil solo visualiza tareas ya asignadas.</p>

  <div v-else class="gridFormulario">

    <div class="campoForm campoForm--full">
      <label class="labelForm">Tarea</label>
      <input
        v-model="nombre"
        class="inputTarea"
        placeholder="Describe la tarea..."
        :disabled="!diaActivo"
      />
    </div>

    <div class="campoForm">
      <label class="labelForm">Estado</label>
      <select v-model="estado" class="selectPrioridad" :disabled="!diaActivo">
        <option value="pendiente">Pendiente</option>
        <option value="en progreso">En progreso</option>
        <option value="completada">Completada</option>
      </select>
    </div>

    <div class="campoForm">
      <label class="labelForm">Prioridad</label>
      <select v-model="prioridad" class="selectPrioridad" :disabled="!diaActivo">
        <option value="baja">🟢 Baja</option>
        <option value="media">🟡 Media</option>
        <option value="alta">🔴 Alta</option>
      </select>
    </div>

    <div class="campoForm">
      <label class="labelForm">Asignado</label>
      <input
        v-model="asignado"
        class="inputTarea"
        placeholder="Valentina Torres"
        :disabled="!diaActivo"
      />
    </div>

    <div class="campoForm">
      <label class="labelForm">Inicio</label>
      <input
        v-model="fechaInicio"
        type="date"
        class="inputTarea"
        :disabled="!diaActivo"
      />
    </div>

    <div class="campoForm">
      <label class="labelForm">Entrega</label>
      <input
        v-model="fechaEntrega"
        type="date"
        class="inputTarea"
        :disabled="!diaActivo"
      />
    </div>

    <div class="accionesFormulario">
      <button type="button" class="btnAgregar" :disabled="!diaActivo" @click="enviar">
        ➕ Registrar tarea
      </button>
    </div>

  </div>

  <p v-if="error" class="errorForm">⚠️ {{ error }}</p>

</form>

</template>

<script>

export default{

props:{
diaActivo:{ type: Boolean, default: true },
soloLectura:{ type: Boolean, default: false }
},

emits:["agregar","agregarTarea"],

data(){
return{
nombre: "",
prioridad: "media",
estado: "pendiente",
asignado: "Valentina Torres",
fechaInicio: "",
fechaEntrega: "",
error: ""
}
},

methods:{

enviar(){
if(this.soloLectura){
  return
}

if(
  this.nombre.trim() === "" ||
  this.asignado.trim() === "" ||
  this.fechaInicio === "" ||
  this.fechaEntrega === ""
){
  this.error = "Completa tarea, asignado, inicio y entrega."
  return
}

const nuevaTarea = {
  nombre: this.nombre.trim(),
  prioridad: this.prioridad,
  estado: this.estado,
  asignado: this.asignado.trim(),
  fechaInicio: this.fechaInicio,
  fechaEntrega: this.fechaEntrega,
  completada: this.estado === "completada"
}

this.$emit("agregar", nuevaTarea)
this.$emit("agregarTarea", nuevaTarea)
this.nombre = ""
this.prioridad = "media"
this.estado = "pendiente"
this.asignado = "Valentina Torres"
this.fechaInicio = ""
this.fechaEntrega = ""
this.error = ""
}

}

}

</script>

<style scoped>

.formTarea{
margin-bottom:8px;
}

.infoLectura{
color:#557566;
font-size:14px;
font-weight:600;
margin:0;
}

.gridFormulario{
display:grid;
grid-template-columns:repeat(2, minmax(0, 1fr));
gap:12px;
}

.campoForm{
display:grid;
gap:6px;
}

.campoForm--full{
grid-column:1 / -1;
}

.labelForm{
font-size:12px;
font-weight:800;
letter-spacing:0.12em;
text-transform:uppercase;
color:#557566;
}

.accionesFormulario{
grid-column:1 / -1;
display:flex;
justify-content:flex-start;
padding-top:4px;
}

.inputTarea{
width:100%;
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

.errorForm{
color:#e05a00;
font-size:13px;
margin-top:6px;
}

@media (max-width: 720px){
  .gridFormulario{
    grid-template-columns:1fr;
  }
}

</style>
