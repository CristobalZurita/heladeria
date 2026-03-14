<template>

<div v-if="visible" class="modalOverlay" @click.self="$emit('cerrar')">

  <div class="modal">

    <h3 class="tituloModal">✏️ Editar tarea</h3>

    <div class="gridModal">

      <div class="campoModal campoModal--full">
        <label class="labelModal">Nombre de la tarea</label>
        <input
          v-model="nombreLocal"
          class="inputModal"
          placeholder="Nombre de la tarea"
          @keyup.enter="guardar"
        />
      </div>

      <div class="campoModal">
        <label class="labelModal">Estado</label>
        <select v-model="estadoLocal" class="selectModal">
          <option value="pendiente">Pendiente</option>
          <option value="en progreso">En progreso</option>
          <option value="completada">Completada</option>
        </select>
      </div>

      <div class="campoModal">
        <label class="labelModal">Prioridad</label>
        <select v-model="prioridadLocal" class="selectModal">
          <option value="baja">Baja</option>
          <option value="media">Media</option>
          <option value="alta">Alta</option>
        </select>
      </div>

      <div class="campoModal">
        <label class="labelModal">Asignado</label>
        <input
          v-model="asignadoLocal"
          class="inputModal"
          placeholder="Valentina Torres"
        />
      </div>

      <div class="campoModal">
        <label class="labelModal">Inicio</label>
        <input
          v-model="fechaInicioLocal"
          type="date"
          class="inputModal"
        />
      </div>

      <div class="campoModal">
        <label class="labelModal">Entrega</label>
        <input
          v-model="fechaEntregaLocal"
          type="date"
          class="inputModal"
        />
      </div>

    </div>

    <p v-if="error" class="errorModal">⚠️ {{ error }}</p>

    <div class="modalBotones">
      <button class="btnGuardar" @click="guardar">💾 Guardar</button>
      <button class="btnCancelar" @click="$emit('cerrar')">Cancelar</button>
    </div>

  </div>

</div>

</template>

<script>

export default {

props:{
visible:{ type: Boolean, default: false },
tarea:{ type: Object, default: null }
},

emits:["cerrar","guardar"],

data(){
return{
nombreLocal: "",
estadoLocal: "pendiente",
prioridadLocal: "media",
asignadoLocal: "Valentina Torres",
fechaInicioLocal: "",
fechaEntregaLocal: "",
error: ""
}
},

watch:{
tarea:{
  immediate:true,
  handler(val){
    if(!val){
      this.nombreLocal = ""
      this.estadoLocal = "pendiente"
      this.prioridadLocal = "media"
      this.asignadoLocal = "Valentina Torres"
      this.fechaInicioLocal = ""
      this.fechaEntregaLocal = ""
      this.error = ""
      return
    }

    this.nombreLocal = val.nombre || ""
    this.estadoLocal = val.estado || (val.completada ? "completada" : "pendiente")
    this.prioridadLocal = val.prioridad || "media"
    this.asignadoLocal = val.asignado || "Valentina Torres"
    this.fechaInicioLocal = val.fechaInicio || ""
    this.fechaEntregaLocal = val.fechaEntrega || ""
    this.error = ""
  }
}
},

methods:{

guardar(){
if(
  this.nombreLocal.trim() === "" ||
  this.asignadoLocal.trim() === "" ||
  this.fechaInicioLocal === "" ||
  this.fechaEntregaLocal === ""
){
  this.error = "Completa tarea, asignado, inicio y entrega."
  return
}

this.$emit("guardar",{
  ...this.tarea,
  nombre: this.nombreLocal.trim(),
  estado: this.estadoLocal,
  prioridad: this.prioridadLocal,
  asignado: this.asignadoLocal.trim(),
  fechaInicio: this.fechaInicioLocal,
  fechaEntrega: this.fechaEntregaLocal,
  completada: this.estadoLocal === "completada"
})

this.error = ""
}

}

}

</script>

<style scoped>

.modalOverlay{
position:fixed;
inset:0;
background:rgba(0,0,0,0.45);
display:flex;
align-items:center;
justify-content:center;
z-index:200;
padding:20px;
}

.modal{
background:white;
border-radius:16px;
padding:28px;
width:100%;
max-width:540px;
box-shadow:0 8px 40px rgba(0,0,0,0.2);
display:flex;
flex-direction:column;
gap:14px;
}

.tituloModal{
font-size:20px;
font-weight:700;
color:#1a3d2e;
margin:0;
}

.gridModal{
display:grid;
grid-template-columns:repeat(2, minmax(0, 1fr));
gap:12px;
}

.campoModal{
display:grid;
gap:6px;
}

.campoModal--full{
grid-column:1 / -1;
}

.labelModal{
font-size:12px;
font-weight:800;
letter-spacing:0.12em;
text-transform:uppercase;
color:#557566;
}

.inputModal,
.selectModal{
padding:11px 14px;
border:2px solid #b6e8d3;
border-radius:10px;
font-size:14px;
outline:none;
transition:0.2s;
background:#f9fffe;
color:#1a3d2e;
width:100%;
box-sizing:border-box;
}

.inputModal:focus,
.selectModal:focus{
border-color:#2d9e74;
background:#fff;
}

.errorModal{
color:#e05a00;
font-size:13px;
margin:0;
}

.modalBotones{
display:flex;
gap:10px;
margin-top:2px;
}

.btnGuardar{
flex:1;
padding:11px;
background:linear-gradient(135deg,#2d9e74,#1a6b52);
border:none;
border-radius:10px;
color:white;
font-weight:700;
cursor:pointer;
font-size:14px;
transition:0.2s;
}

.btnGuardar:hover{
opacity:0.9;
}

.btnCancelar{
padding:11px 20px;
background:#f0f0f0;
border:none;
border-radius:10px;
color:#555;
font-weight:600;
cursor:pointer;
font-size:14px;
transition:0.2s;
}

.btnCancelar:hover{
background:#e0e0e0;
}

@media (max-width: 640px){
  .modal{
    padding:22px;
  }

  .gridModal{
    grid-template-columns:1fr;
  }

  .modalBotones{
    flex-direction:column;
  }
}

</style>
