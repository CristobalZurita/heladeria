<template>
  <div class="uploadBloque">
    <div
      class="dropZone"
      :class="{ activa: arrastrando }"
      @dragenter.prevent="arrastrando = true"
      @dragover.prevent="arrastrando = true"
      @dragleave.prevent="arrastrando = false"
      @drop.prevent="manejarDrop"
    >
      <p class="textoDrop">{{ texto }}</p>
      <button class="btnSeleccionar" :disabled="subiendo" @click="abrirSelector">
        {{ subiendo ? "Subiendo..." : boton }}
      </button>
    </div>

    <p v-if="errorCarga" class="errorCarga">{{ errorCarga }}</p>

    <input ref="inputArchivos" type="file" accept="image/*" :multiple="multiple" class="inputOculto" @change="seleccionarArchivos" />
  </div>
</template>

<script>
import { subirImagenes } from "../../services/falsoBackImagenes.js"

export default {
  props: {
    carpetaDestino: { type: String, default: "inventario" },
    multiple: { type: Boolean, default: true },
    texto: { type: String, default: "Arrastra imagenes aqui o selecciona archivos" },
    boton: { type: String, default: "Seleccionar imagenes" }
  },

  emits: ["cargadas", "error"],

  data() {
    return {
      arrastrando: false,
      subiendo: false,
      errorCarga: ""
    }
  },

  methods: {
    abrirSelector() {
      this.$refs.inputArchivos?.click()
    },

    validarArchivos(files) {
      return files.filter((file) => file.type.startsWith("image/"))
    },

    async procesarArchivos(files) {
      const validos = this.validarArchivos(files)
      if (validos.length === 0) {
        this.errorCarga = "No se detectaron imagenes validas"
        this.$emit("error", this.errorCarga)
        return
      }

      this.subiendo = true
      this.errorCarga = ""
      try {
        const cargadas = await subirImagenes(validos, this.carpetaDestino)
        this.$emit("cargadas", cargadas)
      } catch (error) {
        const mensaje = error instanceof Error ? error.message : "Error subiendo imagenes"
        this.errorCarga = mensaje
        this.$emit("error", mensaje)
      } finally {
        this.subiendo = false
      }
    },

    seleccionarArchivos(event) {
      const files = Array.from(event.target.files || [])
      if (files.length > 0) {
        this.procesarArchivos(files)
      }
      event.target.value = ""
    },

    manejarDrop(event) {
      this.arrastrando = false
      const files = Array.from(event.dataTransfer?.files || [])
      if (files.length > 0) {
        this.procesarArchivos(files)
      }
    }
  }
}
</script>

<style scoped>
.uploadBloque {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.dropZone {
  border: 2px dashed #90d8ba;
  border-radius: 12px;
  padding: 16px;
  background: #f0fbf6;
  text-align: center;
  transition: 0.2s;
}

.dropZone.activa {
  border-color: #2d9e74;
  background: #e7f7f0;
}

.textoDrop {
  margin: 0 0 10px;
  color: #1a6b52;
  font-size: 13px;
  font-weight: 600;
}

.btnSeleccionar {
  border: none;
  border-radius: 10px;
  padding: 9px 14px;
  background: linear-gradient(135deg, #ffd166, #f5a623);
  color: #1a3d2e;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
}

.btnSeleccionar:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.errorCarga {
  margin: 0;
  color: #c63838;
  font-size: 12px;
  font-weight: 700;
}

.inputOculto {
  display: none;
}
</style>
