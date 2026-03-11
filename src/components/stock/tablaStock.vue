<script setup>

import FilaStock from "./filaStock.vue"

defineProps({
  ingredientes: Array
})

</script>

<template>

<table>

<thead>
<tr>
<th>Nombre</th>
<th>Cantidad</th>
<th>Unidad</th>
<th>Categoría</th>
<th>Alergenos</th>
<th>Acciones</th>
</tr>
</thead>

<tbody>

<FilaStock
v-for="ingrediente in ingredientes"
:key="ingrediente.nombre"
:ingrediente="ingrediente"
/>

</tbody>

</table>

</template>
