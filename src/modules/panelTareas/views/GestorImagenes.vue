<template>
  <section class="gestorImagenes">
    <header class="headerGestor">
      <div>
        <h2 class="titulo">🖼 Gestor de Imagenes</h2>
        <p class="subtitulo">Carga por lote o carpeta desde el dashboard y gestiona biblioteca visual.</p>
      </div>
      <span class="modoBadge modo--local">
        Modo: Local (sin nube)
      </span>
    </header>

    <div class="barraCarga">
      <label class="labelCampo">Destino</label>
      <select v-model="carpetaDestino" class="selectCampo">
        <option value="inventario">inventario</option>
        <option value="proveedores">proveedores</option>
        <option value="sabores">sabores</option>
        <option value="eventos">eventos</option>
      </select>

      <button class="btnAccion btnSecundario" @click="abrirSelectorArchivos">Seleccionar archivos</button>
      <button class="btnAccion btnSecundario" @click="abrirSelectorCarpeta">Seleccionar carpeta</button>
      <button class="btnAccion btnPrincipal" :disabled="listaArchivos.length === 0 || subiendo" @click="subirLote">
        {{ subiendo ? "Subiendo..." : "Subir lote" }}
      </button>
    </div>

    <div class="dropZone" @dragover.prevent @drop.prevent="manejarDrop">
      Arrastra imagenes aqui para agregarlas al lote
    </div>

    <p v-if="errorCarga" class="errorCarga">{{ errorCarga }}</p>

    <div class="loteInfo">
      <p><strong>Archivos en lote:</strong> {{ listaArchivos.length }}</p>
      <p><strong>Peso total:</strong> {{ formatearPeso(pesoTotalLote) }}</p>
      <button v-if="listaArchivos.length > 0" class="btnLimpiar" @click="limpiarLote">Limpiar lote</button>
    </div>

    <ul v-if="listaArchivos.length > 0" class="listaLote">
      <li v-for="archivo in listaArchivos" :key="archivo.clave">
        <span>{{ archivo.nombre }}</span>
        <small>{{ formatearPeso(archivo.peso) }}</small>
      </li>
    </ul>

    <h3 class="tituloBiblioteca">Biblioteca cargada</h3>
    <p v-show="listaImagenes.length === 0" class="sinImagenes">No hay imagenes cargadas aun.</p>

    <div class="gridImagenes" v-show="listaImagenes.length > 0">
      <article v-for="imagen in listaImagenes" :key="imagen.id" class="cardImagen">
        <img :src="imagen.thumbnail_url || imagen.cloudinary_url" :alt="imagen.nombre" loading="lazy" />
        <div class="cardBody">
          <h4>{{ imagen.nombre }}</h4>
          <p>Destino: {{ imagen.carpeta }}</p>
          <p>Almacen: {{ imagen.carpeta_cloudinary }}</p>
          <p>{{ formatearPeso(imagen.peso) }}</p>
          <div class="accionesCard">
            <a class="btnMini btnVer" :href="imagen.cloudinary_url" target="_blank" rel="noopener noreferrer">Ver</a>
            <button class="btnMini btnEliminar" @click="quitarImagen(imagen.id)">Eliminar</button>
          </div>
        </div>
      </article>
    </div>

    <input ref="inputArchivos" type="file" accept="image/*" multiple class="inputOculto" @change="seleccionarArchivos" />
    <input
      ref="inputCarpeta"
      type="file"
      accept="image/*"
      multiple
      webkitdirectory
      directory
      class="inputOculto"
      @change="seleccionarArchivos"
    />
  </section>
</template>

<script>
import { eliminarImagen, listarImagenes, subirImagenes } from "../services/falsoBackImagenes.js"

const tiposPermitidos = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"]
const pesoMaximo = 8 * 1024 * 1024

export default {
  data() {
    return {
      carpetaDestino: "inventario",
      listaArchivos: [],
      listaImagenes: [],
      subiendo: false,
      errorCarga: ""
    }
  },

  computed: {
    pesoTotalLote() {
      return this.listaArchivos.reduce((acc, item) => acc + item.peso, 0)
    }
  },

  mounted() {
    this.cargarBiblioteca()
  },

  methods: {
    cargarBiblioteca() {
      this.listaImagenes = listarImagenes()
    },

    abrirSelectorArchivos() {
      this.$refs.inputArchivos?.click()
    },

    abrirSelectorCarpeta() {
      this.$refs.inputCarpeta?.click()
    },

    validarArchivo(file) {
      if (!tiposPermitidos.includes(file.type)) {
        return "Formato no permitido"
      }
      if (file.size > pesoMaximo) {
        return "Archivo supera 8MB"
      }
      return null
    },

    agregarLista(files) {
      const nuevos = []
      for (const file of files) {
        const error = this.validarArchivo(file)
        if (error) {
          this.errorCarga = `${file.name}: ${error}`
          continue
        }
        nuevos.push({
          clave: `${file.name}_${file.size}_${Date.now()}_${Math.random().toString(16).slice(2)}`,
          archivo: file,
          nombre: file.name,
          peso: file.size
        })
      }
      this.listaArchivos = [...this.listaArchivos, ...nuevos]
      if (nuevos.length > 0) {
        this.errorCarga = ""
      }
    },

    seleccionarArchivos(event) {
      const files = Array.from(event.target.files || [])
      if (files.length === 0) {
        return
      }
      this.agregarLista(files)
      event.target.value = ""
    },

    manejarDrop(event) {
      const files = Array.from(event.dataTransfer?.files || [])
      if (files.length === 0) {
        return
      }
      this.agregarLista(files)
    },

    async subirLote() {
      if (this.listaArchivos.length === 0 || this.subiendo) {
        return
      }
      this.subiendo = true
      this.errorCarga = ""
      try {
        await subirImagenes(
          this.listaArchivos.map((item) => item.archivo),
          this.carpetaDestino
        )
        this.cargarBiblioteca()
        this.limpiarLote()
      } catch (error) {
        this.errorCarga = error instanceof Error ? error.message : "Error subiendo imagenes"
      } finally {
        this.subiendo = false
      }
    },

    quitarImagen(id) {
      this.listaImagenes = eliminarImagen(id)
    },

    limpiarLote() {
      this.listaArchivos = []
      this.errorCarga = ""
    },

    formatearPeso(bytes) {
      if (bytes < 1024) return `${bytes} B`
      if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
      return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
    }
  }
}
</script>

<style scoped>
.gestorImagenes {
  padding: 28px 32px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.headerGestor {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  flex-wrap: wrap;
}

.titulo {
  margin: 0;
  font-size: 21px;
  color: #1a3d2e;
}

.subtitulo {
  margin: 6px 0 0;
  color: #45675a;
  font-size: 14px;
}

.modoBadge {
  border-radius: 999px;
  padding: 7px 12px;
  font-size: 12px;
  font-weight: 700;
}

.modo--local {
  background: #fff4e3;
  color: #975c00;
}

.barraCarga {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid #d8ede4;
  background: #f8fdfb;
}

.labelCampo {
  font-size: 13px;
  font-weight: 700;
  color: #1a6b52;
}

.selectCampo {
  border: 2px solid #b6e8d3;
  border-radius: 10px;
  padding: 9px 12px;
  font-size: 13px;
  color: #1a3d2e;
  background: #fff;
}

.btnAccion {
  border: none;
  border-radius: 10px;
  padding: 9px 14px;
  font-weight: 700;
  cursor: pointer;
  font-size: 13px;
}

.btnSecundario {
  background: #e7f4ee;
  color: #1a6b52;
}

.btnSecundario:hover {
  background: #d7ede4;
}

.btnPrincipal {
  background: linear-gradient(135deg, #ffd166, #f5a623);
  color: #1a3d2e;
}

.btnPrincipal:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.dropZone {
  border: 2px dashed #90d8ba;
  border-radius: 14px;
  padding: 22px;
  text-align: center;
  color: #1a6b52;
  font-size: 14px;
  background: #f0fbf6;
}

.errorCarga {
  color: #c63838;
  font-size: 13px;
  font-weight: 700;
}

.loteInfo {
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
  color: #2b4d40;
  font-size: 13px;
}

.btnLimpiar {
  border: none;
  background: #ececec;
  color: #333;
  border-radius: 8px;
  padding: 6px 10px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
}

.listaLote {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 8px;
}

.listaLote li {
  background: white;
  border: 1px solid #e4f1eb;
  border-radius: 10px;
  padding: 9px 12px;
  display: flex;
  justify-content: space-between;
  gap: 12px;
  font-size: 13px;
}

.tituloBiblioteca {
  margin: 8px 0 0;
  color: #1a3d2e;
}

.sinImagenes {
  color: #6a7d75;
  font-style: italic;
}

.gridImagenes {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 14px;
}

.cardImagen {
  background: #fff;
  border-radius: 12px;
  border: 1px solid #d9ede4;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(29, 107, 82, 0.08);
}

.cardImagen img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  display: block;
}

.cardBody {
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.cardBody h4 {
  margin: 0;
  font-size: 13px;
  color: #1a3d2e;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.cardBody p {
  margin: 0;
  font-size: 12px;
  color: #4d6d60;
}

.accionesCard {
  margin-top: 5px;
  display: flex;
  gap: 8px;
}

.btnMini {
  border: none;
  border-radius: 8px;
  padding: 6px 9px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
}

.btnVer {
  background: #e7f4ee;
  color: #1a6b52;
}

.btnEliminar {
  background: #ffe9e9;
  color: #b64040;
}

.inputOculto {
  display: none;
}
</style>
