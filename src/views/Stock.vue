<script setup>

import { ref } from "vue"
import TablaStock from "../components/stock/tablaStock.vue"
import { ingredientes } from "../data/ingredientes.js"

const stock = ref(ingredientes)

</script>

<template>

<h1>Stock</h1>

<TablaStock :ingredientes="stock" />

</template>