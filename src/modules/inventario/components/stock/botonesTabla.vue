<script setup>
const props = defineProps({
  producto: {
    type: Object,
    required: true
  },
  tiendaAbierta: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(["editar", "eliminar"])

function editar() {
  if (!props.tiendaAbierta) {
    return
  }
  emit("editar", props.producto)
}

function eliminar() {
  if (!props.tiendaAbierta) {
    return
  }
  emit("eliminar", props.producto)
}
</script>

<template>
  <div class="accionesStock">
    <button class="btnAccion btnEditar" :disabled="!tiendaAbierta" @click="editar">✏️ Editar</button>
    <button class="btnAccion btnEliminar" :disabled="!tiendaAbierta" @click="eliminar">🗑 Eliminar</button>
  </div>
</template>

<style scoped>
.accionesStock {
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

.btnEditar:hover:not(:disabled) {
  background: #d2efe3;
}

.btnEliminar {
  background: #ffe9e9;
  color: #b64040;
}

.btnEliminar:hover:not(:disabled) {
  background: #ffd9d9;
}

.btnAccion:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}
</style>
