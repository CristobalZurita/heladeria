<script setup>

import { ref } from "vue"
import TablaStock from "../components/stock/tablaStock.vue"
import { productos } from "@/modules/inventario/data/productos.js"
import { alergenos } from "@/modules/inventario/data/alergenos.js"
import { categoria } from "@/modules/inventario/data/categoria.js"




const stock = ref([...productos])

const mostrarModal = ref(false) // Integración de modal con formulario

const nombreProducto = ref("")
const nombreCategoria = ref("")
const alergenosSeleccionados = ref([])
const cantidadStock = ref ("")
const cantidadUnidad = ref ("")
const errorFormulario = ref("")


function agregarProducto (){
    
    if (
    nombreProducto.value === "" ||
    nombreCategoria.value === "" ||
    cantidadStock.value === "" ||
    cantidadUnidad.value === "" ||
    alergenosSeleccionados.value.length === 0
    ){
    errorFormulario.value = "Todos los campos son obligatorios"
    return
    }

    stock.value.push({
    nombre: nombreProducto.value,
    categoria: nombreCategoria.value,
    alergenos: alergenosSeleccionados.value,
    stock: Number(cantidadStock.value),
    unidad: cantidadUnidad.value
    })

    nombreProducto.value = ""
    nombreCategoria.value = ""
    alergenosSeleccionados.value = []
    cantidadStock.value = ""
    cantidadUnidad.value = ""
    errorFormulario.value = ""

    mostrarModal.value = false
}

function manejarAlergeno(alergeno){

    if (alergeno === "no aplica") {
        alergenosSeleccionados.value = ["no aplica"]
        return
    }

    alergenosSeleccionados.value =
    alergenosSeleccionados.value.filter(a => a !== "no aplica")

}

</script>

<template>

<h1>Stock</h1>

<button @click="mostrarModal = true"> Agregar producto </button>

<TablaStock :productos="stock" />

<p v-show="stock.length === 0"> <!-- atributo estricto: Si no hay stock nos muestra el mensaje -->
El inventario está vacío
</p>

<!-- Información del modal: Agregar productos -->

<div v-if="mostrarModal" class="modal">

    <h3>Nuevo producto</h3>

    <label for="nombreProducto">Nombre del producto</label>
    <input v-model="nombreProducto" placeholder="Nombre producto" />
    
    <label for="cantidadStock">Cantidad en stock</label>
    <input type="number" v-model="cantidadStock" placeholder="Cantidad" />
    

    <label>Unidad</label>
    <select v-model="cantidadUnidad">
        <option disabled value="">Selecciona una unidad</option>
        <option value="kg">kg</option>
        <option value="L">L</option>
    </select>
    
    <select v-model="nombreCategoria">
    <option disabled value="">Categoría</option>
    <option
    v-for="cat in categoria"
    :key="cat"
    :value="cat"
    >
    {{ cat }}
    </option>
    </select>


    <label>Alérgenos</label>
    <div>
    <label v-for="alergeno in alergenos" :key="alergeno">

    <input
    type="checkbox"
    :value="alergeno"
    v-model="alergenosSeleccionados"
    @change="manejarAlergeno(alergeno)"
    >

    {{ alergeno }}

    </label>
    </div>

    <p v-if="errorFormulario" class="error">
    {{ errorFormulario }}
    </p>


    <button @click="agregarProducto"> Guardar </button>
    <button @click="mostrarModal = false"> Cancelar </button>


</div>

</template>

<style>
    .error{
    color: red;
    font-size: 12px;
    margin-top: 8px;
    text-transform: uppercase;
    }
</style>