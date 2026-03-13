<template>

<div v-if="visible" class="modalOverlay" @click.self="$emit('cerrar')">

  <div class="modal">

    <h3 class="tituloModal">✏️ Editar tarea</h3>

    <label class="labelModal">Nombre de la tarea</label>
    <input
      v-model="nombreLocal"
      class="inputModal"
      placeholder="Nombre de la tarea"
      @keyup.enter="guardar"
    />

    <label class="labelModal">Prioridad</label>
    <select v-model="prioridadLocal" class="selectModal">
      <option value="baja">🟢 Baja</option>
      <option value="media">🟡 Media</option>
      <option value="alta">🔴 Alta</option>
    </select>

    <p v-if="error" class="errorModal">⚠️ {{ error }}</p>

    <div class="modalBotones">
      <button class="btnGuardar" @click="guardar">💾 Guardar</button>
      <button class="btnCancelar" @click="$emit('cerrar')">Cancelar</button>
    </div>

  </div>

</div>

</template>

<script>

export default{

props:{
visible:{ type: Boolean, default: false },
tarea:{ type: Object, default: null }
},

emits:["cerrar","guardar"],

// ── DATOS ──────────────────────────────────────────
data(){
return{
nombreLocal: "",
prioridadLocal: "media",
error: ""
}
},

// ── WATCHERS ───────────────────────────────────────
watch:{
tarea(val){
  if(val){
    this.nombreLocal = val.nombre
    this.prioridadLocal = val.prioridad || "media"
    this.error = ""
  }
}
},

// ── MÉTODOS ────────────────────────────────────────
methods:{

guardar(){
if(this.nombreLocal.trim() === ""){
  this.error = "El nombre no puede estar vacío"
  return
}
this.$emit("guardar",{
  ...this.tarea,
  nombre: this.nombreLocal.trim(),
  prioridad: this.prioridadLocal
})
this.error = ""
}

}

}

</script>

<style scoped>

/* ── OVERLAY ── */
.modalOverlay{
position:fixed;
inset:0;
background:rgba(0,0,0,0.45);
display:flex;
align-items:center;
justify-content:center;
z-index:200;
}

/* ── MODAL ── */
.modal{
background:white;
border-radius:16px;
padding:28px;
width:100%;
max-width:420px;
box-shadow:0 8px 40px rgba(0,0,0,0.2);
display:flex;
flex-direction:column;
gap:10px;
}

.tituloModal{
font-size:17px;
font-weight:700;
color:#1a3d2e;
margin:0 0 4px;
}

.labelModal{
font-size:13px;
font-weight:600;
color:#2d9e74;
}

/* ── INPUTS ── */
.inputModal{
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

.inputModal:focus{
border-color:#2d9e74;
background:#fff;
}

.selectModal{
padding:11px 12px;
border:2px solid #b6e8d3;
border-radius:10px;
font-size:14px;
background:#f9fffe;
color:#1a3d2e;
cursor:pointer;
outline:none;
width:100%;
}

/* ── ERROR ── */
.errorModal{
color:#e05a00;
font-size:13px;
}

/* ── BOTONES ── */
.modalBotones{
display:flex;
gap:10px;
margin-top:6px;
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

</style>
