<script setup>
import BotonesTabla from "./botonesTabla.vue"

defineProps({
  proveedor: {
    type: Object,
    required: true
  }
})

defineEmits(["editar", "eliminar"])
</script>

<template>
  <tr class="filaProveedor">
    <td class="colImagen">
      <img
        v-if="proveedor.thumbnail_url || proveedor.cloudinary_url"
        :src="proveedor.thumbnail_url || proveedor.cloudinary_url"
        :alt="`Imagen de ${proveedor.nombre}`"
        class="miniImagen"
      />
      <span v-else class="sinImagen">Sin imagen</span>
    </td>

    <td class="nombreProv">{{ proveedor.nombre }}</td>
    <td>{{ proveedor.telefono }}</td>
    <td>
      <span class="badgeEntrega">{{ proveedor.tiempo }} {{ proveedor.unidad }}</span>
    </td>
    <td>{{ proveedor.direccion }}</td>
    <td>
      <BotonesTabla
        :proveedor="proveedor"
        @editar="$emit('editar', $event)"
        @eliminar="$emit('eliminar', $event)"
      />
    </td>
  </tr>
</template>

<style scoped>
.filaProveedor td {
  padding: 11px 14px;
  border-bottom: 1px solid #edf5f1;
  font-size: 14px;
  color: #1a3d2e;
  vertical-align: middle;
}

.filaProveedor:hover {
  background: #f7fcfa;
}

.nombreProv {
  font-weight: 600;
}

.badgeEntrega {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  padding: 4px 10px;
  font-size: 12px;
  background: #ecf7f2;
  color: #1a6b52;
  border: 1px solid #d7eee4;
}

.colImagen {
  width: 82px;
}

.miniImagen {
  width: 54px;
  height: 54px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #d8ede4;
  display: block;
}

.sinImagen {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 54px;
  height: 54px;
  border-radius: 8px;
  background: #f2f2f2;
  color: #7a7a7a;
  font-size: 11px;
  text-align: center;
}
</style>
