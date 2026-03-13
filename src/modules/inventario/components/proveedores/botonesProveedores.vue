<script setup>
defineEmits(["agregar"])
</script>

<template>
  <button class="btnNuevoProv" @click="$emit('agregar')">➕ Nuevo proveedor</button>
</template>

<style scoped>
.btnNuevoProv {
  padding: 10px 20px;
  background: linear-gradient(135deg, #ffd166, #f5a623);
  border: none;
  border-radius: 10px;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  color: #1a3d2e;
  transition: 0.2s;
}

.btnNuevoProv:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(245, 166, 35, 0.35);
}
</style>
