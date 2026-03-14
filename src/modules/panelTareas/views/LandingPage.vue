<template>
<div class="landingB2B">

  <header class="topNav">
    <nav class="navWrap">
      <a href="#inicio" class="brand" @click="menuAbierto = false">
        <span class="brandLogo">
          <LogoBosque />
        </span>

        <span class="brandCopy">
          <strong>Bosque Helado</strong>
          <small>Control operativo para productores de helado</small>
        </span>
      </a>

      <button class="menuBtn" type="button" aria-label="Abrir menu" @click="menuAbierto = !menuAbierto">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <ul class="navLinks" :class="{ navOpen: menuAbierto }">
        <li v-for="item in menuItems" :key="item.id">
          <a :href="'#' + item.id" @click="menuAbierto = false">{{ item.label }}</a>
        </li>
        <li>
          <button class="btnNavCta" type="button" @click="$emit('entrar', 'panel')">Entrar dashboard</button>
        </li>
      </ul>
    </nav>
  </header>

  <main class="landingMain">
    <section id="inicio" class="heroSection">
      <div class="heroCopy reveal-on-scroll">
        <p class="eyebrow">Cuando el inventario se desordena, la operacion pierde dinero</p>
        <h1 class="heroTitle">Stock visible, tareas claras y abastecimiento sin caos logístico</h1>
        <p class="heroText">
          Esta plataforma fue pensada para resolver quiebres de stock, tareas duplicadas,
          planillas manuales y entregas sin seguimiento. La portada ya presenta el problema,
          la solucion y una demo comercial lista para mostrar.
        </p>

        <div class="heroActions">
          <a href="#catalogo" class="btnPrimary">Ver catalogo online</a>
          <button class="btnGhost" type="button" @click="$emit('entrar', 'stock')">Ir a inventario</button>
          <button class="btnSoft" type="button" @click="$emit('entrar', 'proveedores')">Ir a proveedores</button>
        </div>

        <div class="heroRibbon">
          <span v-for="categoria in categoriasCatalogo" :key="categoria">{{ categoria }}</span>
        </div>

        <div class="heroMetrics">
          <article class="metricCard" v-for="kpi in heroKpis" :key="kpi.label">
            <p class="metricValue">{{ kpi.value }}</p>
            <p class="metricLabel">{{ kpi.label }}</p>
          </article>
        </div>
      </div>

      <div class="heroGallery reveal-on-scroll">
        <article class="galleryStage">
          <img :src="slideActual.imagen" :alt="slideActual.alt" />

          <div class="galleryOverlay">
            <p class="miniEyebrow">Galeria comercial</p>
            <h2>{{ slideActual.titulo }}</h2>
            <p>{{ slideActual.texto }}</p>

            <div class="galleryTags">
              <span v-for="tag in slideActual.tags" :key="tag">{{ tag }}</span>
            </div>
          </div>

          <div class="galleryControls">
            <button type="button" class="galleryArrow" aria-label="Anterior" @click="anteriorSlide">‹</button>
            <button type="button" class="galleryArrow" aria-label="Siguiente" @click="siguienteSlide">›</button>
          </div>
        </article>

        <div class="galleryThumbs">
          <button
            v-for="(slide, index) in galeriaSlides"
            :key="slide.id"
            class="galleryThumb"
            :class="{ isActive: slideActiva === index }"
            type="button"
            @click="irASlide(index)"
          >
            <img :src="slide.imagen" :alt="slide.alt" />
            <span>
              <strong>{{ slide.titulo }}</strong>
              <small>{{ slide.subtitulo }}</small>
            </span>
          </button>
        </div>
      </div>
    </section>

    <section id="dolor" class="contentSection altSection">
      <div class="sectionTop reveal-on-scroll">
        <p class="sectionEyebrow">El dolor del cliente</p>
        <h2 class="sectionTitle">El caos operativo se nota en bodega, compras, tareas y reposicion</h2>
        <p class="sectionLead">
          Antes de hablar de tecnologia, el sitio ahora abre con problemas de negocio:
          perdida de stock, responsabilidades difusas y cero visibilidad del flujo diario.
        </p>
      </div>

      <div class="painGrid">
        <article class="painCard reveal-on-scroll" v-for="(dolor, index) in doloresCliente" :key="dolor.titulo" :style="{ '--reveal-order': index }">
          <p class="painIcon">{{ dolor.icono }}</p>
          <p class="painValue">{{ dolor.dato }}</p>
          <h3>{{ dolor.titulo }}</h3>
          <p>{{ dolor.texto }}</p>
        </article>
      </div>
    </section>

    <section id="catalogo" class="contentSection">
      <div class="sectionTop reveal-on-scroll">
        <p class="sectionEyebrow">Catalogo online</p>
        <h2 class="sectionTitle">El cliente puede ver insumos reales antes de entrar al sistema</h2>
        <p class="sectionLead">
          El cliente puede filtrar y explorar los insumos ya cargados. No se inventan productos nuevos:
          la grilla sale de inventario y se cruza con recetas base ya existentes en el proyecto.
        </p>
      </div>

      <div class="catalogToolbar reveal-on-scroll">
        <label class="catalogSearch">
          <span>Buscar insumo</span>
          <input
            v-model.trim="catalogoBusqueda"
            type="text"
            placeholder="Frambuesa, crema, crema vegana, leche..."
          />

          <div v-if="productosBusquedaRapida.length" class="catalogQuickStrip">
            <button
              v-for="producto in productosBusquedaRapida"
              :key="producto.nombre"
              class="catalogQuickResult"
              :class="{ isActive: productoActivo && productoActivo.nombre === producto.nombre }"
              type="button"
              @click="seleccionarProducto(producto.nombre)"
            >
              <img
                class="catalogQuickThumb"
                :src="producto.thumbnail_url || producto.cloudinary_url"
                :alt="producto.nombre"
                loading="lazy"
              />
              <span>{{ producto.nombre }}</span>
            </button>
          </div>
        </label>

        <div class="filterGroup">
          <p>Categoria</p>
          <div class="filterRow">
            <button
              class="filterChip"
              :class="{ isActive: categoriaActiva === 'todos' }"
              type="button"
              @click="seleccionarCategoria('todos')"
            >
              Todo
            </button>

            <button
              v-for="categoria in categoriasCatalogo"
              :key="categoria"
              class="filterChip"
              :class="{ isActive: categoriaActiva === categoria }"
              type="button"
              @click="seleccionarCategoria(categoria)"
            >
              {{ categoria }}
            </button>
          </div>
        </div>

        <div class="filterGroup">
          <p>Receta base</p>
          <div class="filterRow">
            <button
              class="filterChip"
              :class="{ isActive: recetaActiva === 'todas' }"
              type="button"
              @click="seleccionarReceta('todas')"
            >
              Todas
            </button>

            <button
              v-for="receta in recetasBase"
              :key="receta.nombre"
              class="filterChip"
              :class="{ isActive: recetaActiva === receta.nombre }"
              type="button"
              @click="seleccionarReceta(receta.nombre)"
            >
              {{ receta.nombre }}
            </button>
          </div>
        </div>
      </div>

      <article v-if="productoActivo" class="catalogSpotlight reveal-on-scroll">
        <div class="spotlightHeader">
          <div class="spotlightCopy">
            <p class="miniEyebrow">Ficha rapida</p>
            <h3>{{ productoActivo.nombre }}</h3>
            <p>{{ productoActivoResumen }}</p>
          </div>

          <div class="spotlightMedia">
            <img
              :src="productoActivo.thumbnail_url || productoActivo.cloudinary_url"
              :alt="productoActivo.nombre"
              loading="lazy"
            />
          </div>

          <div class="spotlightSummary">
            <article>
              <small>Stock</small>
              <strong>{{ productoActivo.stock }} {{ productoActivo.unidad }}</strong>
            </article>
            <article>
              <small>Categoria</small>
              <strong>{{ productoActivo.categoria }}</strong>
            </article>
            <article>
              <small>ETA red</small>
              <strong>{{ etaPromedio }}</strong>
            </article>
          </div>
        </div>

        <div class="spotlightMeta">
          <div class="metaBlock">
            <p>Alergenos</p>
            <span v-for="alergeno in productoActivo.alergenos" :key="alergeno">{{ alergeno }}</span>
          </div>

          <div class="metaBlock">
            <p>Recetas asociadas</p>
            <span v-for="receta in productoActivoRecetas" :key="receta">{{ receta }}</span>
            <span v-if="!productoActivoRecetas.length">Sin receta base</span>
          </div>

          <div class="metaActions">
            <button class="btnPrimary" type="button" @click="$emit('entrar', 'stock')">Ver inventario</button>
            <button class="btnGhost" type="button" @click="$emit('entrar', 'proveedores')">Ver proveedores</button>
          </div>
        </div>
      </article>

      <div class="catalogGrid reveal-on-scroll">
        <article
          v-for="producto in productosFiltrados"
          :key="producto.nombre"
          class="catalogCard"
          :class="{ isSelected: productoActivo && productoActivo.nombre === producto.nombre }"
          @mouseenter="seleccionarProducto(producto.nombre)"
          @focusin="seleccionarProducto(producto.nombre)"
          @click="seleccionarProducto(producto.nombre)"
        >
          <div class="catalogMedia">
            <img
              :src="producto.thumbnail_url || producto.cloudinary_url"
              :alt="producto.nombre"
              loading="lazy"
            />
          </div>

          <div class="catalogCardHead">
            <p class="catalogCategory">{{ producto.categoria }}</p>
            <span class="stockBadge" :class="estadoStockClase(producto)">
              {{ estadoStockTexto(producto) }}
            </span>
          </div>

          <h3>{{ producto.nombre }}</h3>
          <p class="catalogStock">{{ producto.stock }} {{ producto.unidad }} disponibles</p>

          <div class="catalogTags">
            <span v-for="alergeno in producto.alergenos" :key="alergeno">{{ alergeno }}</span>
          </div>

          <p class="catalogRecipe">
            {{ recetasPorProducto[producto.nombre]?.length ? recetasPorProducto[producto.nombre].join(" / ") : "Sin receta base asociada" }}
          </p>
        </article>

        <article v-if="!productosFiltrados.length" class="catalogEmpty">
          <h3>Sin coincidencias</h3>
          <p>Prueba con otra categoria, otra receta o limpia la busqueda.</p>
          <button class="btnGhost" type="button" @click="limpiarCatalogo">Limpiar filtros</button>
        </article>
      </div>

      <div class="providerRail reveal-on-scroll">
        <div class="providerIntro">
          <p class="sectionEyebrow">Red activa</p>
          <h3>Proveedores visibles desde la misma landing</h3>
        </div>

        <div class="providerPills">
          <span class="providerPill" v-for="proveedor in proveedoresVisibles" :key="proveedor.nombre">
            {{ proveedor.nombre }} · {{ proveedor.tiempo }} {{ proveedor.unidad }}
          </span>
        </div>
      </div>
    </section>

    <section id="propuesta" class="contentSection altSection">
      <div class="sectionTop reveal-on-scroll">
        <p class="sectionEyebrow">Propuesta</p>
        <h2 class="sectionTitle">Lo comercial y lo operativo ya hablan el mismo idioma</h2>
      </div>

      <div class="solutionGrid">
        <article
          class="solutionCard reveal-on-scroll"
          v-for="(solucion, index) in soluciones"
          :key="solucion.titulo"
          :style="{ '--reveal-order': index }"
          @click="abrirSolucion(solucion)"
        >
          <p class="solutionIcon">{{ solucion.icono }}</p>
          <h3>{{ solucion.titulo }}</h3>
          <p>{{ solucion.texto }}</p>
          <p class="solutionImpact">{{ solucion.impacto }}</p>
          <button class="solutionBtn" type="button">Ver detalle</button>
        </article>
      </div>
    </section>

    <section id="demo" class="contentSection">
      <div class="splitBoard">
        <div class="splitColumn">
          <div class="sectionTop reveal-on-scroll">
            <p class="sectionEyebrow">Demostracion en vivo</p>
            <h2 class="sectionTitle">Un caso real para mostrar el “aha moment” en menos de cinco minutos</h2>
            <p class="sectionLead">
              El flujo ya está contado como demo comercial: llega cargamento, se registra stock,
              se asigna tarea y el gerente ve el impacto al instante.
            </p>
          </div>

          <div class="onboardingGrid">
            <article class="onboardingCard reveal-on-scroll" v-for="(paso, index) in onboarding" :key="paso.titulo" :style="{ '--reveal-order': index }">
              <span class="stepBadge">{{ index + 1 }}</span>
              <h3>{{ paso.titulo }}</h3>
              <p>{{ paso.texto }}</p>
              <small>{{ paso.tiempo }}</small>
            </article>
          </div>
        </div>

        <div id="kpi" class="splitColumn">
          <div class="sectionTop reveal-on-scroll">
            <p class="sectionEyebrow">KPI</p>
            <h2 class="sectionTitle">Indicadores alimentados por inventario, recetas e imagenes</h2>
          </div>

          <div class="kpiGrid">
            <article class="kpiCard reveal-on-scroll" v-for="(kpi, index) in kpisOperativos" :key="kpi.label" :style="{ '--reveal-order': index }">
              <p class="kpiLabel">{{ kpi.label }}</p>
              <p class="kpiValue">{{ kpi.value }}</p>
              <p class="kpiDelta">{{ kpi.delta }}</p>
              <div class="kpiBar">
                <span :style="{ width: kpi.avance + '%' }"></span>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>

    <section id="casos" class="contentSection altSection">
      <div class="sectionTop reveal-on-scroll">
        <p class="sectionEyebrow">Modalidad comercial</p>
        <h2 class="sectionTitle">Una propuesta facil de vender: implementacion, salida y soporte</h2>
        <p class="sectionLead">
          El cierre del pitch ya no queda abierto. Esta sección deja clara una modalidad de trabajo
          y pago, incluso si el precio final se ajusta por sedes, volumen y alcance.
        </p>
      </div>

      <div class="caseGrid">
        <article class="caseCard reveal-on-scroll" v-for="(caso, index) in casos" :key="caso.autor" :style="{ '--reveal-order': index }">
          <div class="caseHead">
            <span class="caseAvatar">{{ caso.icono }}</span>
            <div>
              <p class="caseAutor">{{ caso.autor }}</p>
              <p class="caseRol">{{ caso.rol }}</p>
            </div>
          </div>
          <p class="caseTexto">{{ caso.texto }}</p>
        </article>
      </div>
    </section>

    <section id="faq" class="contentSection">
      <div class="sectionTop reveal-on-scroll">
        <p class="sectionEyebrow">FAQ</p>
        <h2 class="sectionTitle">Lo necesario para explicar el sistema sin relleno</h2>
      </div>

      <div class="faqList">
        <article class="faqItem reveal-on-scroll" v-for="(faq, index) in faqs" :key="faq.pregunta" :style="{ '--reveal-order': index }">
          <button class="faqQuestion" type="button" @click="toggleFaq(index)">
            <span>{{ faq.pregunta }}</span>
            <span>{{ faqAbierta === index ? "−" : "+" }}</span>
          </button>
          <p v-show="faqAbierta === index" class="faqAnswer">{{ faq.respuesta }}</p>
        </article>
      </div>
    </section>

    <section id="contacto" class="contentSection contactSection">
      <div class="sectionTop reveal-on-scroll">
        <p class="sectionEyebrow">Contacto</p>
        <h2 class="sectionTitle">Solicita activacion para tu red de produccion y abastecimiento</h2>
      </div>

      <div class="contactGrid">
        <form class="contactForm reveal-on-scroll" @submit.prevent="enviarMensaje">
          <label>Nombre empresa</label>
          <input v-model.trim="form.empresa" type="text" placeholder="Ej: Productora Sur SpA" />

          <label>Email operativo</label>
          <input v-model.trim="form.email" type="email" placeholder="operaciones@empresa.cl" />

          <label>Objetivo</label>
          <textarea
            v-model.trim="form.mensaje"
            rows="4"
            placeholder="Lineas de producto, volumen esperado y fecha de salida"
          ></textarea>

          <button type="submit" class="btnPrimary">Solicitar activacion</button>
          <p v-if="estadoMensaje" class="estadoMensaje">{{ estadoMensaje }}</p>
        </form>

        <article class="contactVisual reveal-on-scroll">
          <div class="contactVisualCopy">
            <p class="miniEyebrow">Base operativa</p>
            <h3>Temuco</h3>
            <p>Condell 485, esquina O'Higgins. Punto de coordinacion para compras, proveedores y despacho.</p>
          </div>
          <img :src="fotoMateriasPrimas" alt="Materias primas para elaboracion de helado" />
        </article>
      </div>
    </section>
  </main>

  <Transition name="modalFade">
    <div v-if="solucionActiva" class="solutionModalOverlay" @click.self="cerrarSolucion">
      <article class="solutionModalCard">
        <p class="solutionModalIcon">{{ solucionActiva.icono }}</p>
        <h3>{{ solucionActiva.titulo }}</h3>
        <p class="solutionModalText">{{ solucionActiva.texto }}</p>
        <ul class="solutionModalList">
          <li v-for="item in solucionActiva.puntos" :key="item">{{ item }}</li>
        </ul>
        <p class="solutionModalImpact">Impacto: {{ solucionActiva.impacto }}</p>
        <div class="solutionModalActions">
          <button class="btnPrimary" type="button" @click="$emit('entrar', 'panel')">Abrir dashboard</button>
          <button class="btnGhost" type="button" @click="cerrarSolucion">Cerrar</button>
        </div>
      </article>
    </div>
  </Transition>

  <footer class="siteFooter">
    <div class="footerWrap">
      <div class="footerCopy">
        <p>© {{ anioActual }} Bosque Helado · Catalogo online y operacion B2B</p>
        <small>
          Plataforma pensada para dar visibilidad en tiempo real sobre inventario, tareas y abastecimiento,
          con una experiencia comercial clara para presentar la solucion sin mostrar complejidad tecnica.
        </small>
      </div>
      <button class="btnFooter" type="button" @click="$emit('entrar', 'panel')">Abrir dashboard</button>
    </div>
  </footer>

  <a
    class="floatingWhatsApp"
    :href="whatsAppUrl"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Contactar por WhatsApp"
  >
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M13.601 2.326A7.854 7.854 0 0 0 8.006 0C3.627 0 .068 3.559.068 7.937a7.9 7.9 0 0 0 1.063 3.942L0 16l4.242-1.111a7.97 7.97 0 0 0 3.762.956h.004c4.378 0 7.937-3.559 7.937-7.937a7.85 7.85 0 0 0-2.344-5.582zm-5.593 12.19h-.003a6.62 6.62 0 0 1-3.367-.92l-.24-.142-2.515.658.671-2.452-.156-.253a6.61 6.61 0 0 1-1.013-3.506c0-3.654 2.972-6.626 6.626-6.626a6.58 6.58 0 0 1 4.707 1.953 6.58 6.58 0 0 1 1.94 4.7c0 3.654-2.972 6.626-6.626 6.626zm3.638-4.965c-.198-.1-1.17-.578-1.352-.646-.181-.067-.313-.1-.446.1-.132.198-.513.646-.628.778-.116.132-.231.149-.43.05-.198-.1-.837-.308-1.595-.982-.589-.525-.986-1.173-1.102-1.371-.115-.198-.012-.305.087-.404.09-.089.198-.231.297-.347.1-.116.132-.198.198-.33.066-.132.033-.248-.017-.347-.05-.1-.446-1.073-.611-1.47-.161-.388-.325-.335-.446-.341l-.38-.007c-.132 0-.347.05-.529.248-.181.198-.694.678-.694 1.652s.71 1.916.81 2.048c.1.132 1.398 2.136 3.388 2.994.473.204.842.326 1.13.417.475.151.907.13 1.249.079.381-.057 1.17-.479 1.336-.943.165-.463.165-.86.115-.943-.05-.082-.182-.132-.38-.231z"/>
    </svg>
  </a>

  <button
    v-show="mostrarSubir"
    class="floatingTop"
    type="button"
    aria-label="Subir al inicio"
    @click="irAlInicio"
  >
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M8 3.2 2.4 8.8l1.1 1.1L7.2 6.2V13h1.6V6.2l3.7 3.7 1.1-1.1z"/>
    </svg>
  </button>

</div>
</template>

<script>

import LogoBosque from "@/modules/panelTareas/layout/LogoBosque.vue"
import { recetas } from "@/modules/inventario/data/recetas.js"
import { listarStock, listarProveedores } from "@/modules/inventario/services/falsoBackInventario.js"
import { listarEstadoTareas } from "../services/falsoBackTareas.js"
import { listarImagenes } from "../services/falsoBackImagenes.js"
import fotoAplicacion from "@/assets/landing/galeria-aplicacion.jpg"
import fotoFrutos from "@/assets/landing/galeria-frutos.jpg"
import fotoLacteo from "@/assets/landing/galeria-lacteos.jpg"
import fotoMateriasPrimas from "@/assets/landing/materias-primas-raw.jpg"

export default {

  components: {
    LogoBosque
  },

  emits: ["entrar"],

  data() {
    return {
      menuAbierto: false,
      mostrarSubir: false,
      solucionActiva: null,
      faqAbierta: 0,
      revealObserver: null,
      carouselTimer: null,
      slideActiva: 0,
      catalogoBusqueda: "",
      categoriaActiva: "todos",
      recetaActiva: "todas",
      productoActivoNombre: "",
      fotoMateriasPrimas,
      menuItems: [
        { id: "inicio", label: "Inicio" },
        { id: "dolor", label: "Dolor" },
        { id: "catalogo", label: "Catalogo" },
        { id: "propuesta", label: "Propuesta" },
        { id: "demo", label: "Demo" },
        { id: "kpi", label: "KPI" },
        { id: "casos", label: "Modalidad" },
        { id: "faq", label: "FAQ" },
        { id: "contacto", label: "Contacto" }
      ],
      galeriaSlides: [
        {
          id: "frutos",
          titulo: "Frutos y pulpas",
          subtitulo: "Bases para sabores vivos",
          texto: "Una galeria pensada para hablar de materias primas y familias de insumo, no de fotos decorativas sin relacion.",
          alt: "Frutos y pulpas para elaboracion de helado",
          imagen: fotoFrutos,
          tags: ["fruta", "sorbete", "temporada"]
        },
        {
          id: "lacteos",
          titulo: "Bases lacteas",
          subtitulo: "Soporte para lineas cremosas",
          texto: "La vista comercial puede explicar bases, volumen y continuidad de abastecimiento desde la misma portada.",
          alt: "Bases lacteas para helado",
          imagen: fotoLacteo,
          tags: ["lacteos", "cremoso", "produccion"]
        },
        {
          id: "aplicacion",
          titulo: "Aplicacion final",
          subtitulo: "De la materia prima al producto",
          texto: "Se muestra tambien el destino final del insumo para que la experiencia conecte con el lenguaje real del negocio heladero.",
          alt: "Aplicacion final del helado",
          imagen: fotoAplicacion,
          tags: ["carta", "presentacion", "venta"]
        },
        {
          id: "materias-primas",
          titulo: "Materias primas esenciales",
          subtitulo: "Base para lineas cremosas y veganas",
          texto: "En vez de mostrar personas o escenas sin sentido, este bloque refuerza materias primas, bases y continuidad de abastecimiento.",
          alt: "Materias primas para elaboracion de helado",
          imagen: fotoMateriasPrimas,
          tags: ["materias primas", "bases", "stock"]
        }
      ],
      soluciones: [
        {
          icono: "🧊",
          titulo: "Catalogo conectado al inventario",
          texto: "La landing muestra insumos reales del sistema y los cruza con recetas base sin crear datasets paralelos.",
          impacto: "La conversacion comercial arranca con datos y no con promesas vacias.",
          puntos: [
            "Filtros por categoria y receta",
            "Seleccion de producto desde la grilla",
            "Paso directo a inventario"
          ]
        },
        {
          icono: "🎞️",
          titulo: "Galeria con relato visual",
          texto: "Las fotos pasan a ser una galeria real con navegacion y foco por familia de insumo o proceso.",
          impacto: "La portada deja de parecer una ficha financiera y gana lectura comercial.",
          puntos: [
            "Carrusel con controles",
            "Miniaturas clickeables",
            "Copia conectada al negocio"
          ]
        },
        {
          icono: "📦",
          titulo: "Abastecimiento visible",
          texto: "Stock, tiempos medios y proveedores activos aparecen en la misma pagina como respaldo de la propuesta.",
          impacto: "El cliente entiende mas rapido que hay una base operativa detras.",
          puntos: [
            "Indicadores de disponibilidad",
            "ETA promedio desde proveedores",
            "Red visible en la misma landing"
          ]
        },
        {
          icono: "📊",
          titulo: "Puerta de entrada al sistema",
          texto: "La experiencia comercial no queda separada del dashboard, inventario y proveedores.",
          impacto: "La pagina invita, explica y luego deriva al flujo real con un clic.",
          puntos: [
            "CTA a dashboard",
            "CTA a inventario",
            "CTA a proveedores"
          ]
        }
      ],
      onboarding: [
        {
          titulo: "Llega un cargamento de crema",
          texto: "Se registran 50 litros de Crema o Crema Vegana en inventario sin depender de una planilla externa.",
          tiempo: "Paso 1"
        },
        {
          titulo: "Se asigna la tarea de bodega",
          texto: "En la misma historia comercial puedes mostrar que el equipo deja una tarea operativa pendiente y visible.",
          tiempo: "Paso 2"
        },
        {
          titulo: "El dashboard refleja el cambio",
          texto: "El gerente ve disponibilidad, pendientes y tiempos medios sin pedir reportes manuales por WhatsApp.",
          tiempo: "Paso 3"
        },
        {
          titulo: "Se valida la red de abastecimiento",
          texto: "Queda claro quién abastece, cuánto tarda y qué hacer si el stock vuelve a caer.",
          tiempo: "Paso 4"
        }
      ],
      casos: [
        {
          icono: "🧾",
          autor: "Implementacion inicial",
          rol: "Pago por puesta en marcha",
          texto: "Diagnostico, configuracion base y carga inicial de inventario, proveedores y flujo comercial."
        },
        {
          icono: "🎓",
          autor: "Capacitacion y salida",
          rol: "Pago por hito de entrega",
          texto: "Activacion con demo guiada, entrenamiento del equipo y acompanamiento durante la salida."
        },
        {
          icono: "🔁",
          autor: "Soporte mensual",
          rol: "Modalidad recurrente",
          texto: "Ajustes, soporte y evolucion continua para que la operacion no vuelva al caos manual."
        }
      ],
      faqs: [
        {
          pregunta: "¿Que pasa si se cae internet?",
          respuesta: "La demo puede explicarse con el flujo ya cargado y, a nivel de propuesta, la operacion puede contemplar modos locales o sincronizacion diferida segun alcance."
        },
        {
          pregunta: "¿Es dificil de usar para operarios?",
          respuesta: "No. La demo muestra acciones concretas: registrar stock, revisar pendientes y abrir proveedores, sin lenguaje tecnico."
        },
        {
          pregunta: "¿Como evitamos el efecto demo?",
          respuesta: "Usando datos de prueba creibles como Frambuesa, Crema, Crema Vegana, Cacao y Leche Entera en vez de productos genericos."
        },
        {
          pregunta: "¿Y si algo falla en vivo?",
          respuesta: "La landing ya cuenta el caso de uso completo. Si una vista falla, el equipo puede explicar el resultado esperado y continuar con seguridad."
        }
      ],
      form: {
        empresa: "",
        email: "",
        mensaje: ""
      },
      estadoMensaje: "",
      whatsAppUrl: "https://wa.me/56991234567?text=Hola%20Bosque%20Helado%2C%20quiero%20ver%20el%20catalogo%20de%20insumos"
    }
  },

  computed: {
    anioActual() {
      return new Date().getFullYear()
    },

    recetasBase() {
      return recetas
    },

    stockData() {
      return listarStock()
    },

    proveedoresData() {
      return listarProveedores()
    },

    estadoTareas() {
      return listarEstadoTareas()
    },

    imagenesData() {
      return listarImagenes()
    },

    slideActual() {
      return this.galeriaSlides[this.slideActiva] || this.galeriaSlides[0]
    },

    totalProductos() {
      return this.stockData.length
    },

    totalImagenes() {
      return this.imagenesData.length
    },

    tareasPendientes() {
      return this.estadoTareas.tareas.filter((tarea) => !tarea.completada).length
    },

    tareasCompletadas() {
      return this.estadoTareas.tareas.filter((tarea) => tarea.completada).length
    },

    productosSinStock() {
      return this.stockData.filter((producto) => Number(producto.stock) === 0).length
    },

    productosConImagen() {
      return this.stockData.filter((producto) => producto.thumbnail_url || producto.cloudinary_url).length
    },

    coberturaVisual() {
      if (!this.totalProductos) return 0
      return Math.round((this.productosConImagen / this.totalProductos) * 100)
    },

    cumplimientoAbastecimiento() {
      if (!this.totalProductos) return 0
      return Math.round(((this.totalProductos - this.productosSinStock) / this.totalProductos) * 100)
    },

    categoriasCatalogo() {
      return [...new Set(this.stockData.map((producto) => producto.categoria).filter(Boolean))]
    },

    recetasPorProducto() {
      return this.recetasBase.reduce((acum, receta) => {
        receta.productos.forEach((item) => {
          if (!acum[item.nombre]) {
            acum[item.nombre] = []
          }

          acum[item.nombre].push(receta.nombre)
        })

        return acum
      }, {})
    },

    productosFiltrados() {
      const termino = this.catalogoBusqueda.toLowerCase()

      return this.stockData.filter((producto) => {
        const coincideBusqueda = termino === "" || [
          producto.nombre,
          producto.categoria,
          ...producto.alergenos
        ].some((valor) => String(valor).toLowerCase().includes(termino))

        const coincideCategoria = this.categoriaActiva === "todos" || producto.categoria === this.categoriaActiva
        const coincideReceta = this.recetaActiva === "todas" || (this.recetasPorProducto[producto.nombre] || []).includes(this.recetaActiva)

        return coincideBusqueda && coincideCategoria && coincideReceta
      })
    },

    productosBusquedaRapida() {
      return this.productosFiltrados.slice(0, 6)
    },

    productoActivo() {
      return this.productosFiltrados.find((producto) => producto.nombre === this.productoActivoNombre) || this.productosFiltrados[0] || null
    },

    productoActivoRecetas() {
      if (!this.productoActivo) return []
      return this.recetasPorProducto[this.productoActivo.nombre] || []
    },

    productoActivoResumen() {
      if (!this.productoActivo) {
        return "Selecciona un insumo para ver categoria, stock, alergenos y recetas asociadas."
      }

      const recetasTexto = this.productoActivoRecetas.length
        ? this.productoActivoRecetas.join(" / ")
        : "sin receta base asociada"

      return `${this.productoActivo.nombre} pertenece a ${this.productoActivo.categoria}, tiene ${this.productoActivo.stock} ${this.productoActivo.unidad} disponibles y participa en ${recetasTexto}.`
    },

    doloresCliente() {
      return [
        {
          icono: "📉",
          titulo: "Quiebres de stock",
          dato: `${this.productosSinStock} insumos criticos`,
          texto: "Cuando compras y bodega no comparten una sola vista, aparecen faltantes justo cuando se necesita producir."
        },
        {
          icono: "🗂️",
          titulo: "Planillas desalineadas",
          dato: `${this.totalProductos} insumos en juego`,
          texto: "El stock vive en archivos manuales, cada area opera por separado y nadie sabe cual es la version correcta."
        },
        {
          icono: "✅",
          titulo: "Tareas sin seguimiento",
          dato: `${this.tareasPendientes} pendientes`,
          texto: "Las tareas se reparten por mensaje o memoria, sin responsables claros ni cierre visible para jefatura."
        },
        {
          icono: "🚚",
          titulo: "Entregas sin trazabilidad",
          dato: `ETA media ${this.etaPromedio}`,
          texto: "Si el proveedor se atrasa o cambia la ventana de entrega, la operacion reacciona tarde y pierde tiempo."
        }
      ]
    },

    heroKpis() {
      return [
        { value: this.totalProductos, label: "insumos activos" },
        { value: this.categoriasCatalogo.length, label: "familias" },
        { value: this.recetasBase.length, label: "recetas base" },
        { value: this.proveedoresActivos, label: "proveedores" }
      ]
    },

    proveedoresActivos() {
      return this.proveedoresData.length
    },

    proveedoresVisibles() {
      return this.proveedoresData.slice(0, 4)
    },

    etaPromedioHoras() {
      if (!this.proveedoresData.length) return 0

      const horas = this.proveedoresData.reduce((acum, proveedor) => {
        if (proveedor.unidad === "dias") return acum + (proveedor.tiempo * 24)
        return acum + proveedor.tiempo
      }, 0)

      return Math.round(horas / this.proveedoresData.length)
    },

    etaPromedio() {
      if (!this.proveedoresData.length) return "N/D"
      return `${this.etaPromedioHoras}h`
    },

    kpisOperativos() {
      return [
        {
          label: "Cumplimiento de abastecimiento",
          value: `${this.cumplimientoAbastecimiento}%`,
          delta: `${this.totalProductos - this.productosSinStock}/${this.totalProductos || 0} insumos disponibles`,
          avance: this.cumplimientoAbastecimiento
        },
        {
          label: "Cobertura visual",
          value: `${this.coberturaVisual}%`,
          delta: `${this.productosConImagen}/${this.totalProductos || 0} con imagen en sistema`,
          avance: this.coberturaVisual
        },
        {
          label: "Catalogo filtrado",
          value: String(this.productosFiltrados.length),
          delta: "resultado actual de la busqueda",
          avance: this.totalProductos ? Math.round((this.productosFiltrados.length / this.totalProductos) * 100) : 0
        },
        {
          label: "Tiempo medio de respuesta",
          value: this.etaPromedio,
          delta: `${this.proveedoresActivos} proveedores con tiempo declarado`,
          avance: Math.max(100 - Math.min(this.etaPromedioHoras * 4, 100), 12)
        }
      ]
    }
  },

  watch: {
    productosFiltrados: {
      immediate: true,
      handler(lista) {
        if (!lista.length) {
          this.productoActivoNombre = ""
          return
        }

        if (!lista.some((producto) => producto.nombre === this.productoActivoNombre)) {
          this.productoActivoNombre = lista[0].nombre
        }
      }
    }
  },

  methods: {
    enviarMensaje() {
      if (
        this.form.empresa === "" ||
        this.form.email === "" ||
        this.form.mensaje === ""
      ) {
        this.estadoMensaje = "Completa empresa, email y objetivo para activar la solicitud."
        return
      }

      this.estadoMensaje = "Solicitud enviada. Equipo operativo respondera en menos de 24 horas."
      this.form = { empresa: "", email: "", mensaje: "" }
    },

    abrirSolucion(solucion) {
      this.solucionActiva = solucion
    },

    cerrarSolucion() {
      this.solucionActiva = null
    },

    toggleFaq(index) {
      this.faqAbierta = this.faqAbierta === index ? -1 : index
    },

    seleccionarCategoria(categoria) {
      this.categoriaActiva = categoria
    },

    seleccionarReceta(receta) {
      this.recetaActiva = receta
    },

    seleccionarProducto(nombre) {
      this.productoActivoNombre = nombre
    },

    limpiarCatalogo() {
      this.catalogoBusqueda = ""
      this.categoriaActiva = "todos"
      this.recetaActiva = "todas"
    },

    estadoStockTexto(producto) {
      return Number(producto.stock) > 0 ? "Disponible" : "Critico"
    },

    estadoStockClase(producto) {
      return Number(producto.stock) > 0 ? "isOk" : "isAlert"
    },

    siguienteSlide() {
      this.slideActiva = (this.slideActiva + 1) % this.galeriaSlides.length
    },

    anteriorSlide() {
      this.slideActiva = (this.slideActiva - 1 + this.galeriaSlides.length) % this.galeriaSlides.length
    },

    irASlide(index) {
      this.slideActiva = index
    },

    iniciarCarrusel() {
      this.detenerCarrusel()
      this.carouselTimer = window.setInterval(() => {
        this.siguienteSlide()
      }, 5200)
    },

    detenerCarrusel() {
      if (this.carouselTimer) {
        window.clearInterval(this.carouselTimer)
        this.carouselTimer = null
      }
    },

    manejarScroll() {
      this.mostrarSubir = window.scrollY > 280
    },

    irAlInicio() {
      window.scrollTo({ top: 0, behavior: "smooth" })
    },

    manejarTeclaGlobal(event) {
      if (event.key === "Escape" && this.solucionActiva) {
        this.cerrarSolucion()
      }
    },

    activarReveals() {
      const targets = this.$el.querySelectorAll(".reveal-on-scroll")
      if (!targets.length) return

      if (!("IntersectionObserver" in window)) {
        targets.forEach((target) => target.classList.add("is-visible"))
        return
      }

      this.revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
            this.revealObserver?.unobserve(entry.target)
          }
        })
      }, {
        threshold: 0.18,
        rootMargin: "0px 0px -6% 0px"
      })

      targets.forEach((target) => this.revealObserver?.observe(target))
    }
  },

  mounted() {
    document.title = "Bosque Helado | Insumos B2B"
    window.addEventListener("scroll", this.manejarScroll, { passive: true })
    window.addEventListener("keydown", this.manejarTeclaGlobal)
    this.manejarScroll()
    this.iniciarCarrusel()
    this.$nextTick(() => {
      this.activarReveals()
    })
  },

  beforeUnmount() {
    window.removeEventListener("scroll", this.manejarScroll)
    window.removeEventListener("keydown", this.manejarTeclaGlobal)
    this.revealObserver?.disconnect()
    this.detenerCarrusel()
  }

}

</script>

<style scoped>

@import url("https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,700&family=Manrope:wght@400;500;700;800&display=swap");

.landingB2B{
  --bg: #f5eee3;
  --bg-soft: #fcf7ef;
  --ink: #17362f;
  --muted: #5f7067;
  --primary: #1b5e4f;
  --primary-dark: #10392f;
  --accent: #c58d3f;
  --line: rgba(23, 54, 47, 0.12);
  --panel: rgba(255, 252, 247, 0.86);
  --shadow-soft: 0 20px 40px rgba(19, 28, 23, 0.08);
  --shadow-strong: 0 34px 80px rgba(12, 23, 19, 0.16);
  background:
    radial-gradient(circle at 10% 10%, rgba(197,141,63,0.18), transparent 20%),
    radial-gradient(circle at 90% 10%, rgba(27,94,79,0.18), transparent 20%),
    linear-gradient(180deg, #f8f4ec 0%, #f4eee4 46%, #f7f2ea 100%);
  color: var(--ink);
  font-size: 20px;
  font-family: "Manrope", "Segoe UI", sans-serif;
  overflow-x: clip;
  position: relative;
}

.landingB2B::before,
.landingB2B::after{
  content: "";
  position: absolute;
  pointer-events: none;
  z-index: 0;
}

.landingB2B::before{
  inset: -160px auto auto -120px;
  width: 380px;
  height: 380px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(197,141,63,0.26), transparent 72%);
  filter: blur(18px);
}

.landingB2B::after{
  inset: 640px -120px auto auto;
  width: 420px;
  height: 420px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(27,94,79,0.16), transparent 72%);
  filter: blur(22px);
}

.topNav,
.landingMain,
.siteFooter,
.floatingWhatsApp,
.floatingTop{
  position: relative;
  z-index: 1;
}

.topNav{
  position: sticky;
  top: 0;
  z-index: 40;
  backdrop-filter: blur(18px);
  background: rgba(248, 244, 236, 0.82);
  border-bottom: 1px solid rgba(23, 54, 47, 0.08);
}

.navWrap,
.landingMain,
.footerWrap{
  width: min(var(--site-max-width, 1640px), calc(100% - var(--site-gutter-desktop, 36px)));
  margin: 0 auto;
}

.navWrap{
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 14px 0;
}

.brand{
  display: inline-flex;
  align-items: center;
  gap: 14px;
  text-decoration: none;
  color: var(--ink);
}

.brandLogo{
  width: 56px;
  height: 56px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 18px;
  background: linear-gradient(145deg, rgba(255,255,255,0.96), rgba(244,230,205,0.92));
  border: 1px solid rgba(197,141,63,0.18);
  box-shadow: 0 14px 24px rgba(19, 28, 23, 0.08);
}

.brandCopy{
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.brandCopy strong{
  font-size: 28px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.brandCopy small{
  font-size: 18px;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.14em;
}

.menuBtn{
  display: none;
  width: 46px;
  height: 46px;
  border-radius: 14px;
  border: 1px solid var(--line);
  background: rgba(255,255,255,0.8);
  cursor: pointer;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 4px;
}

.menuBtn span{
  width: 18px;
  height: 2px;
  border-radius: 999px;
  background: var(--primary-dark);
}

.navLinks{
  list-style: none;
  display: flex;
  align-items: center;
  gap: 18px;
  margin: 0;
  padding: 0;
}

.navLinks a{
  text-decoration: none;
  color: #27473f;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.btnNavCta,
.btnPrimary,
.btnGhost,
.btnSoft,
.btnFooter,
.solutionBtn,
.filterChip,
.galleryArrow{
  border: none;
  border-radius: 999px;
  cursor: pointer;
  font-weight: 800;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}

.btnNavCta,
.btnPrimary{
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  color: white;
  padding: 12px 18px;
  font-size: 19px;
  text-decoration: none;
  box-shadow: 0 14px 28px rgba(16, 57, 47, 0.16);
}

.btnGhost{
  background: rgba(255,255,255,0.82);
  color: var(--primary-dark);
  padding: 12px 18px;
  font-size: 19px;
  border: 1px solid rgba(27,94,79,0.14);
}

.btnSoft{
  background: rgba(197,141,63,0.14);
  color: #8b5b1f;
  padding: 12px 18px;
  font-size: 19px;
  border: 1px solid rgba(197,141,63,0.22);
}

.btnFooter{
  padding: 12px 18px;
  font-size: 19px;
  background: rgba(255,255,255,0.92);
  color: var(--primary-dark);
}

.btnNavCta:hover,
.btnPrimary:hover,
.btnGhost:hover,
.btnSoft:hover,
.btnFooter:hover,
.solutionBtn:hover,
.filterChip:hover,
.galleryArrow:hover{
  transform: translateY(-2px);
}

.landingMain{
  padding: 32px 0 84px;
}

.heroSection,
.contentSection{
  padding: 28px 0 38px;
}

.painGrid{
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}

.painCard{
  padding: 24px;
  border-radius: 28px;
  border: 1px solid var(--line);
  box-shadow: var(--shadow-soft);
  background: linear-gradient(180deg, rgba(255,255,255,0.88), rgba(255,247,238,0.76));
}

.painIcon{
  margin: 0 0 14px;
  font-size: 30px;
}

.painValue{
  margin: 0 0 10px;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #8c6327;
}

.painCard h3{
  margin: 0 0 10px;
  font-family: "Fraunces", Georgia, serif;
  font-size: 42px;
  line-height: 1;
}

.painCard p:last-child{
  margin: 0;
  font-size: 24px;
  color: #50625a;
  line-height: 1.72;
}

.heroSection{
  display: grid;
  grid-template-columns: minmax(440px, 0.84fr) minmax(520px, 1.16fr);
  gap: 40px;
  align-items: center;
  min-height: calc(100vh - 110px);
}

.heroCopy{
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.eyebrow,
.sectionEyebrow,
.miniEyebrow{
  margin: 0;
  font-size: 18px;
  font-weight: 800;
  color: #8c6327;
  text-transform: uppercase;
  letter-spacing: 0.22em;
}

.heroTitle,
.sectionTitle,
.catalogCard h3,
.solutionCard h3,
.onboardingCard h3,
.spotlightHeader h3{
  margin: 0;
  font-family: "Fraunces", Georgia, serif;
  color: var(--ink);
  letter-spacing: -0.04em;
}

.heroTitle{
  font-size: clamp(78px, 7.6vw, 118px);
  line-height: 0.94;
  max-width: 10.8ch;
}

.heroText,
.sectionLead,
.catalogRecipe,
.caseTexto,
.faqAnswer,
.contactVisualCopy p{
  margin: 0;
  font-size: 26px;
  color: #50625a;
  line-height: 1.72;
}

.heroActions,
.heroRibbon,
.galleryTags,
.catalogTags,
.metaBlock,
.providerPills{
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.heroMetrics{
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
}

.metricCard,
.catalogToolbar,
.catalogSpotlight,
.catalogCard,
.solutionCard,
.onboardingCard,
.kpiCard,
.caseCard,
.faqItem,
.contactForm,
.contactVisual{
  background: linear-gradient(180deg, rgba(255,255,255,0.86), rgba(255,249,241,0.74));
  border: 1px solid var(--line);
  border-radius: 28px;
  box-shadow: var(--shadow-soft);
}

.metricCard{
  padding: 18px 16px;
}

.metricValue{
  margin: 0;
  font-size: 52px;
  font-weight: 800;
  color: var(--primary-dark);
}

.metricLabel{
  margin: 6px 0 0;
  font-size: 18px;
  font-weight: 700;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

.heroRibbon span,
.galleryTags span,
.catalogTags span,
.metaBlock span,
.providerPill{
  padding: 9px 13px;
  border-radius: 999px;
  background: rgba(255,255,255,0.7);
  border: 1px solid rgba(23,54,47,0.1);
  color: var(--primary-dark);
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.heroGallery{
  display: grid;
  gap: 16px;
  width: 100%;
  max-width: 1320px;
  justify-self: end;
}

.galleryStage{
  min-height: 0;
  aspect-ratio: 16 / 10;
  max-height: 640px;
  position: relative;
  overflow: hidden;
  border-radius: 36px;
  box-shadow: var(--shadow-strong);
}

.galleryStage img,
.galleryThumb img,
.contactVisual img{
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.galleryOverlay{
  position: absolute;
  left: 24px;
  right: 24px;
  bottom: 24px;
  padding: 24px;
  border-radius: 28px;
  background: linear-gradient(180deg, rgba(15,34,28,0.2), rgba(15,34,28,0.84));
  color: #fff6ea;
  backdrop-filter: blur(12px);
}

.galleryOverlay h2{
  margin: 10px 0 12px;
  font-family: "Fraunces", Georgia, serif;
  font-size: clamp(46px, 5vw, 72px);
  line-height: 0.98;
}

.galleryOverlay p{
  margin: 0;
  font-size: 25px;
  color: rgba(255,246,234,0.9);
  line-height: 1.72;
  max-width: 54ch;
}

.galleryControls{
  position: absolute;
  top: 24px;
  right: 24px;
  display: flex;
  gap: 10px;
}

.galleryArrow{
  width: 46px;
  height: 46px;
  background: rgba(255,255,255,0.88);
  color: var(--primary-dark);
  font-size: 28px;
  line-height: 1;
}

.galleryThumbs{
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}

.galleryThumb{
  padding: 0;
  overflow: hidden;
  border-radius: 24px;
  border: 1px solid var(--line);
  background: rgba(255,255,255,0.8);
  box-shadow: var(--shadow-soft);
  display: grid;
  grid-template-rows: 132px auto;
  text-align: left;
}

.galleryThumb.isActive{
  border-color: rgba(27,94,79,0.24);
  transform: translateY(-2px);
}

.galleryThumb span{
  padding: 16px;
  display: grid;
  gap: 6px;
}

.galleryThumb strong{
  font-size: 22px;
  color: var(--ink);
}

.galleryThumb small{
  font-size: 18px;
  color: var(--muted);
}

.sectionTop{
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.sectionTitle{
  font-size: clamp(56px, 5.6vw, 84px);
  line-height: 0.98;
  max-width: 16ch;
}

.catalogToolbar{
  padding: 22px;
  display: grid;
  gap: 18px;
}

.catalogSearch{
  display: grid;
  gap: 10px;
}

.catalogQuickStrip{
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.catalogQuickResult{
  border: 1px solid rgba(23,54,47,0.12);
  background: rgba(255,255,255,0.78);
  border-radius: 999px;
  padding: 6px 12px 6px 6px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}

.catalogQuickResult:hover,
.catalogQuickResult.isActive{
  transform: translateY(-1px);
  border-color: rgba(27,94,79,0.24);
  box-shadow: 0 10px 18px rgba(16, 37, 31, 0.08);
}

.catalogQuickThumb{
  width: 42px;
  height: 42px;
  border-radius: 50%;
  object-fit: cover;
  flex: none;
}

.catalogQuickResult span{
  font-size: 17px;
  font-weight: 700;
  color: var(--ink);
}

.catalogSearch span,
.filterGroup p,
.metaBlock p,
.catalogCategory,
.kpiLabel{
  margin: 0;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--muted);
}

.catalogSearch input,
.contactForm input,
.contactForm textarea{
  width: 100%;
  border-radius: 18px;
  border: 1px solid rgba(23,54,47,0.12);
  background: rgba(255,255,255,0.88);
  padding: 16px 18px;
  font-size: 24px;
  color: var(--ink);
  font-family: inherit;
}

.filterGroup{
  display: grid;
  gap: 10px;
}

.filterRow{
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.filterChip{
  padding: 10px 14px;
  background: rgba(255,255,255,0.7);
  color: var(--primary-dark);
  border: 1px solid rgba(23,54,47,0.1);
  font-size: 18px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.filterChip.isActive{
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  color: white;
}

.catalogSpotlight{
  margin-top: 18px;
  padding: 24px;
}

.spotlightHeader{
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(220px, 260px) minmax(300px, 0.8fr);
  gap: 20px;
  align-items: start;
}

.spotlightCopy{
  display: grid;
  gap: 8px;
}

.spotlightMedia{
  overflow: hidden;
  border-radius: 24px;
  min-height: 220px;
  background: rgba(255,255,255,0.68);
  border: 1px solid rgba(23,54,47,0.08);
}

.spotlightMedia img{
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.spotlightHeader h3{
  margin-top: 10px;
  font-size: clamp(48px, 4.8vw, 68px);
  line-height: 0.98;
}

.spotlightHeader p:last-child{
  margin-top: 10px;
}

.spotlightSummary{
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.spotlightSummary article{
  padding: 16px;
  border-radius: 20px;
  background: rgba(255,255,255,0.74);
  border: 1px solid rgba(23,54,47,0.08);
}

.spotlightSummary small{
  display: block;
  margin-bottom: 8px;
  font-size: 17px;
  color: #8c6327;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 800;
}

.spotlightSummary strong{
  font-size: 30px;
  color: var(--primary-dark);
}

.spotlightMeta{
  margin-top: 20px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) auto;
  gap: 18px;
  align-items: start;
}

.metaActions{
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.catalogGrid{
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}

.catalogCard{
  padding: 22px;
  cursor: pointer;
  min-height: 220px;
}

.catalogMedia{
  margin-bottom: 16px;
  overflow: hidden;
  border-radius: 22px;
  aspect-ratio: 4 / 3;
  background: rgba(255,255,255,0.72);
}

.catalogMedia img{
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.catalogCard.isSelected{
  border-color: rgba(27,94,79,0.26);
  box-shadow: 0 26px 50px rgba(16, 37, 31, 0.14);
  transform: translateY(-2px);
}

.catalogCardHead{
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.stockBadge{
  padding: 8px 12px;
  border-radius: 999px;
  font-size: 16px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.stockBadge.isOk{
  background: rgba(27,94,79,0.12);
  color: var(--primary-dark);
}

.stockBadge.isAlert{
  background: rgba(197,141,63,0.18);
  color: #8b5b1f;
}

.catalogCard h3{
  margin-top: 18px;
  font-size: 46px;
  line-height: 0.98;
}

.catalogStock{
  margin: 10px 0 0;
  font-size: 24px;
  color: #4f6259;
}

.catalogTags{
  margin: 16px 0;
}

.catalogEmpty{
  grid-column: 1 / -1;
  padding: 28px;
  border-radius: 28px;
  border: 1px dashed rgba(23,54,47,0.18);
  background: rgba(255,255,255,0.64);
}

.catalogEmpty h3,
.providerIntro h3,
.contactVisualCopy h3{
  margin: 0 0 10px;
}

.providerRail{
  margin-top: 20px;
  padding: 22px 24px;
  border-radius: 30px;
  background: linear-gradient(135deg, rgba(18,56,47,0.98), rgba(10,28,24,0.98));
  color: #fff6ea;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.providerIntro h3{
  font-size: 44px;
  line-height: 1.2;
  max-width: 18ch;
}

.providerPill{
  background: rgba(255,255,255,0.08);
  border-color: rgba(255,255,255,0.1);
  color: #fff6ea;
}

.splitBoard{
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
}

.solutionGrid,
.onboardingGrid,
.kpiGrid,
.caseGrid{
  display: grid;
  gap: 16px;
}

.solutionGrid{
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.onboardingGrid,
.kpiGrid{
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.caseGrid{
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.solutionCard,
.onboardingCard,
.kpiCard,
.caseCard,
.faqItem,
.contactForm,
.contactVisual{
  padding: 24px;
}

.solutionCard{
  cursor: pointer;
}

.solutionIcon,
.stepBadge,
.caseAvatar{
  display: inline-grid;
  place-items: center;
}

.solutionIcon{
  margin: 0 0 14px;
  font-size: 30px;
}

.solutionCard h3,
.onboardingCard h3{
  font-size: 46px;
  line-height: 1;
  margin-bottom: 10px;
}

.solutionCard p,
.onboardingCard p,
.kpiDelta{
  margin: 0;
  font-size: 24px;
  color: #50625a;
  line-height: 1.7;
}

.solutionImpact{
  margin-top: 14px !important;
  color: var(--primary-dark) !important;
  font-weight: 700;
}

.solutionBtn{
  margin-top: 18px;
  padding: 10px 14px;
  background: rgba(27,94,79,0.1);
  color: var(--primary-dark);
  border: 1px solid rgba(27,94,79,0.12);
}

.stepBadge{
  width: 42px;
  height: 42px;
  border-radius: 14px;
  background: rgba(197,141,63,0.16);
  color: #8c6327;
  font-weight: 800;
  margin-bottom: 14px;
}

.onboardingCard small{
  display: inline-block;
  margin-top: 16px;
  font-size: 18px;
  color: var(--primary-dark);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.kpiLabel{
  margin-bottom: 10px;
}

.kpiValue{
  margin: 0;
  font-family: "Fraunces", Georgia, serif;
  font-size: 70px;
  line-height: 0.98;
}

.kpiBar{
  margin-top: 18px;
  height: 12px;
  border-radius: 999px;
  background: rgba(27,94,79,0.08);
  overflow: hidden;
}

.kpiBar span{
  display: block;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #ffd27a, #f0b04c);
}

.caseHead{
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 16px;
}

.caseAvatar{
  width: 48px;
  height: 48px;
  border-radius: 16px;
  background: rgba(197,141,63,0.16);
  font-size: 22px;
}

.caseAutor{
  margin: 0;
  font-size: 24px;
  font-weight: 800;
}

.caseRol{
  margin: 4px 0 0;
  font-size: 20px;
  color: var(--muted);
}

.faqList{
  display: grid;
  gap: 14px;
}

.faqQuestion{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
  text-align: left;
  color: var(--ink);
  font-size: 30px;
  font-weight: 800;
}

.faqAnswer{
  margin-top: 14px;
}

.contactGrid{
  display: grid;
  grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
  gap: 18px;
}

.contactForm{
  display: grid;
  gap: 12px;
}

.contactForm label{
  font-size: 18px;
  font-weight: 800;
  color: var(--muted);
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.contactForm textarea{
  resize: vertical;
}

.estadoMensaje{
  margin: 0;
  font-size: 20px;
  color: var(--primary-dark);
  font-weight: 700;
}

.contactVisual{
  overflow: hidden;
  display: grid;
  grid-template-columns: minmax(280px, 0.9fr) minmax(0, 1.1fr);
  gap: 0;
  padding: 0;
  max-width: 1180px;
  justify-self: end;
}

.contactVisualCopy{
  padding: 28px;
  background: linear-gradient(180deg, rgba(255,255,255,0.94), rgba(255,249,241,0.82));
}

.contactVisualCopy h3{
  font-size: 66px;
  font-family: "Fraunces", Georgia, serif;
  line-height: 0.98;
}

.contactVisual img{
  min-height: 100%;
  aspect-ratio: 3 / 2;
}

.solutionModalOverlay{
  position: fixed;
  inset: 0;
  z-index: 80;
  display: grid;
  place-items: center;
  padding: 20px;
  background: rgba(8, 18, 15, 0.56);
  backdrop-filter: blur(10px);
}

.solutionModalCard{
  width: min(640px, 100%);
  padding: 30px;
  border-radius: 30px;
  background: linear-gradient(180deg, rgba(255,255,255,0.96), rgba(251,245,237,0.92));
  box-shadow: var(--shadow-strong);
}

.solutionModalIcon{
  margin: 0 0 12px;
  font-size: 36px;
}

.solutionModalCard h3{
  margin: 0 0 12px;
  font-family: "Fraunces", Georgia, serif;
  font-size: 42px;
  line-height: 0.98;
}

.solutionModalText,
.solutionModalImpact{
  margin: 0;
  color: #50625a;
  line-height: 1.7;
}

.solutionModalList{
  margin: 18px 0;
  padding-left: 18px;
}

.solutionModalActions{
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.siteFooter{
  padding: 0 0 30px;
}

.footerWrap{
  padding: 22px 24px;
  border-radius: 28px;
  background: linear-gradient(135deg, rgba(18,56,47,0.98), rgba(10,28,24,0.98));
  color: #fff6ea;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.footerCopy{
  display: grid;
  gap: 8px;
}

.footerWrap p{
  margin: 0;
  font-size: 22px;
}

.footerCopy small{
  display: block;
  max-width: 72ch;
  color: rgba(255,246,234,0.82);
  font-size: 19px;
  line-height: 1.6;
}

.floatingWhatsApp,
.floatingTop{
  position: fixed;
  right: 16px;
  width: 52px;
  height: 52px;
  display: grid;
  place-items: center;
  border-radius: 18px;
  box-shadow: 0 18px 36px rgba(14, 25, 21, 0.2);
}

.floatingWhatsApp{
  bottom: 16px;
  background: #1fc66a;
  color: white;
}

.floatingTop{
  bottom: 82px;
  border: none;
  background: rgba(18,56,47,0.96);
  color: white;
}

.floatingWhatsApp svg,
.floatingTop svg{
  width: 22px;
  fill: currentColor;
}

.reveal-on-scroll{
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.55s ease, transform 0.55s ease;
  transition-delay: calc(var(--reveal-order, 0) * 0.06s);
}

.reveal-on-scroll.is-visible{
  opacity: 1;
  transform: translateY(0);
}

.modalFade-enter-active,
.modalFade-leave-active{
  transition: opacity 0.22s ease;
}

.modalFade-enter-from,
.modalFade-leave-to{
  opacity: 0;
}

@media (max-width: 1380px){
  .heroSection,
  .contactGrid,
  .contactVisual,
  .spotlightMeta,
  .splitBoard{
    grid-template-columns: 1fr;
  }

  .painGrid,
  .catalogGrid,
  .solutionGrid{
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .spotlightHeader{
    grid-template-columns: minmax(0, 1fr) minmax(220px, 280px);
  }

  .spotlightSummary{
    grid-column: 1 / -1;
  }
}

@media (max-width: 1080px){
  .menuBtn{
    display: inline-flex;
  }

  .navLinks{
    position: absolute;
    top: calc(100% + 10px);
    left: 18px;
    right: 18px;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    padding: 18px;
    border-radius: 24px;
    background: rgba(255,250,242,0.98);
    border: 1px solid var(--line);
    box-shadow: var(--shadow-soft);
    opacity: 0;
    pointer-events: none;
    transform: translateY(-10px);
    transition: opacity 0.2s ease, transform 0.2s ease;
  }

  .navLinks.navOpen{
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
  }

  .heroSection,
  .galleryThumbs,
  .heroMetrics,
  .painGrid,
  .catalogGrid,
  .onboardingGrid,
  .kpiGrid,
  .caseGrid{
    grid-template-columns: 1fr;
  }

  .providerRail,
  .footerWrap{
    flex-direction: column;
    align-items: flex-start;
  }

  .spotlightHeader{
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px){
  .navWrap,
  .landingMain,
  .footerWrap{
    width: min(100%, calc(100% - var(--site-gutter-mobile, 20px)));
  }

  .heroSection,
  .contentSection{
    padding: 20px 0 28px;
  }

  .heroTitle{
    font-size: 48px;
  }

  .sectionTitle{
    font-size: 34px;
  }

  .galleryStage{
    min-height: 0;
  }

  .galleryOverlay,
  .catalogToolbar,
  .catalogSpotlight,
  .catalogCard,
  .solutionCard,
  .onboardingCard,
  .kpiCard,
  .caseCard,
  .faqItem,
  .contactForm,
  .contactVisualCopy{
    padding: 20px;
  }

  .galleryControls{
    top: 16px;
    right: 16px;
  }

  .galleryArrow{
    width: 42px;
    height: 42px;
  }

  .floatingWhatsApp,
  .floatingTop{
    width: 48px;
    height: 48px;
    right: 12px;
    border-radius: 16px;
  }
}

</style>
