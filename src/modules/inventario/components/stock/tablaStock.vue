<script setup>
import FilaStock from "./filaStock.vue"

defineProps({
  productos: {
    type: Array,
    default: () => []
  },
  tiendaAbierta: {
    type: Boolean,
    default: true
  }
})

defineEmits(["editar", "eliminar"])
</script>

<template>
  <div class="tablaWrapper">
    <table class="tablaStock">
      <thead>
        <tr>
          <th>Imagen</th>
          <th>Producto</th>
          <th>Stock</th>
          <th>Categoria</th>
          <th>Alergenos</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        <FilaStock
          v-for="producto in productos"
          :key="producto.nombre"
          :producto="producto"
          :tiendaAbierta="tiendaAbierta"
          @editar="$emit('editar', $event)"
          @eliminar="$emit('eliminar', $event)"
        />
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.tablaWrapper {
  overflow-x: auto;
  border-radius: 14px;
  box-shadow: 0 2px 16px rgba(29, 107, 82, 0.1);
  border: 1px solid #b6e8d3;
}

.tablaStock {
  width: 100%;
  border-collapse: collapse;
  background: white;
  min-width: 760px;
}

.tablaStock thead tr {
  background: linear-gradient(90deg, #1a6b52, #2d9e74);
}

.tablaStock thead th {
  padding: 13px 14px;
  text-align: left;
  font-size: 13px;
  font-weight: 600;
  color: #fff;
}
</style>
