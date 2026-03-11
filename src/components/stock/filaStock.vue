<script setup>

import BotonesTabla from "./botonesTabla.vue"

defineProps({
  ingrediente: Object
})

</script>

<template>

<tr>

<td>{{ ingrediente.nombre }}</td>

<td>{{ ingrediente.stock }}</td>

<td>{{ ingrediente.unidad }}</td>

<td>{{ ingrediente.categoria }}</td>

<td>{{ ingrediente.alergenos }}</td>

<td>
<BotonesTabla />
</td>

</tr>

</template>