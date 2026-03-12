<script setup>

import FilaStock from "./filaStock.vue"

defineProps({
  productos: Array
})

</script>

<template>

<table>

<thead>
<tr>
<th>Nombre</th>
<th>Stock</th>
<th>Categoría</th>
<th>Alérgenos</th>
<th>Acciones</th>
</tr>
</thead>

<tbody>

<FilaStock
v-for="producto in productos"
:key="producto.nombre"
:producto="producto"
/>

</tbody>

</table>

</template>