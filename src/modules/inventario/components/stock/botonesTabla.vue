<script setup>

function editar() {
  console.log("editar")
}

function eliminar() {
  console.log("eliminar")
}

</script>

<template>

<button @click="editar">
Editar
</button>

<button @click="eliminar">
Eliminar
</button>

</template>