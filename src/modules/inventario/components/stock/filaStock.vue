<script setup>
import BotonesTabla from "./botonesTabla.vue"

defineProps({
  producto: {
    type: Object,
    required: true
  },
  tiendaAbierta: {
    type: Boolean,
    default: true
  }
})

defineEmits(["editar", "eliminar"])
</script>

<template>
  <tr class="filaProducto" :class="{ 'fila--sinStock': producto.stock === 0 }">
    <td class="colImagen">
      <img
        v-if="producto.thumbnail_url || producto.cloudinary_url"
        :src="producto.thumbnail_url || producto.cloudinary_url"
        :alt="`Imagen de ${producto.nombre}`"
        class="miniImagen"
      />
      <span v-else class="sinImagen">Sin imagen</span>
    </td>

    <td class="nombreProducto">{{ producto.nombre }}</td>

    <td class="stockProducto" :class="{ 'stock--sin': producto.stock === 0 }">
      {{ producto.stock }} {{ producto.unidad }}
      <span v-if="producto.stock === 0" class="badgeSinStock">(Sin stock)</span>
    </td>

    <td>
      <span class="badgeDato">{{ producto.categoria }}</span>
    </td>

    <td class="alergenosCol">
      <span class="badgeDato">{{ producto.alergenos.join(", ") }}</span>
    </td>

    <td>
      <BotonesTabla
        :producto="producto"
        :tiendaAbierta="tiendaAbierta"
        @editar="$emit('editar', $event)"
        @eliminar="$emit('eliminar', $event)"
      />
    </td>
  </tr>
</template>

<style scoped>
.filaProducto td {
  padding: 11px 14px;
  border-bottom: 1px solid #edf5f1;
  font-size: 14px;
  color: #1a3d2e;
  vertical-align: middle;
}

.filaProducto:hover {
  background: #f7fcfa;
}

.filaProducto.fila--sinStock {
  background: #fff7f7;
}

.nombreProducto {
  font-weight: 600;
}

.stockProducto {
  font-weight: 600;
}

.stockProducto.stock--sin {
  color: #d03c3c;
}

.badgeSinStock {
  margin-left: 6px;
  font-size: 12px;
  color: #d03c3c;
}

.badgeDato {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  padding: 4px 10px;
  font-size: 12px;
  background: #ecf7f2;
  color: #1a6b52;
  border: 1px solid #d7eee4;
}

.alergenosCol .badgeDato {
  max-width: 240px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
