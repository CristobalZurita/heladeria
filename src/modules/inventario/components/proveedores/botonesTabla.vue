<script setup>
const props = defineProps({
  proveedor: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(["editar", "eliminar"])

function editar() {
  emit("editar", props.proveedor)
}

function eliminar() {
  emit("eliminar", props.proveedor)
}
</script>

<template>
  <div class="accionesProveedor">
    <button class="btnAccion btnEditar" @click="editar">✏️ Editar</button>
    <button class="btnAccion btnEliminar" @click="eliminar">🗑 Eliminar</button>
  </div>
</template>

<style scoped>
.accionesProveedor {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.btnAccion {
  border: none;
  border-radius: 8px;
  padding: 6px 10px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: 0.2s;
}

.btnEditar {
  background: #e8f7f0;
  color: #1a6b52;
}

.btnEditar:hover {
  background: #d2efe3;
}

.btnEliminar {
  background: #ffe9e9;
  color: #b64040;
}

.btnEliminar:hover {
  background: #ffd9d9;
}
</style>
