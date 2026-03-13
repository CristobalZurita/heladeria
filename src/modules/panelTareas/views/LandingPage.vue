<template>
<div class="landingB2B">

  <header class="topNav">
    <nav class="navWrap">
      <a href="#inicio" class="brand" @click="menuAbierto = false">
        <span class="brandMark">🏪</span>
        <span class="brandText">Bosque Helado B2B</span>
      </a>

      <button class="menuBtn" type="button" @click="menuAbierto = !menuAbierto" aria-label="Abrir menu">☰</button>

      <ul class="navLinks" :class="{ navOpen: menuAbierto }">
        <li v-for="item in menuItems" :key="item.id">
          <a :href="'#' + item.id" @click="menuAbierto = false">{{ item.label }}</a>
        </li>
        <li class="navCtaItem">
          <button class="btnNavCta" type="button" @click="$emit('entrar', 'panel')">Entrar Dashboard</button>
        </li>
      </ul>
    </nav>
  </header>

  <main class="landingMain">

    <section id="inicio" class="heroSection">
      <div class="heroInfo reveal-on-scroll">
        <p class="eyebrow">Red operativa proveedores + tiendas</p>
        <h1 class="heroTitle">Landing operativa para abastecer tiendas sin friccion</h1>
        <p class="heroText">
          Unificamos abastecimiento, stock y seguimiento de entregas para que tu equipo compre,
          reciba y reponga desde un solo flujo. Lista para usar ahora.
        </p>

        <div class="heroActions">
          <a href="#onboarding" class="btnPrimary">Ver activacion rapida</a>
          <button class="btnGhost" type="button" @click="$emit('entrar', 'proveedores')">Ir a Proveedores</button>
          <button class="btnSoft" type="button" @click="$emit('entrar', 'stock')">Ir a Inventario</button>
        </div>

        <div class="heroMetrics">
          <article class="metricCard" v-for="kpi in heroKpis" :key="kpi.label">
            <p class="metricValue">{{ kpi.value }}</p>
            <p class="metricLabel">{{ kpi.label }}</p>
          </article>
        </div>
      </div>

      <div class="heroVisual reveal-on-scroll">
        <div class="statusBoard">
          <div class="boardHead">
            <p>Centro de control</p>
            <span>Live</span>
          </div>

          <div class="boardGrid">
            <article class="boardCard">
              <p>Proveedores activos</p>
              <h3>{{ proveedoresActivos }}</h3>
              <small>Con SLA operativo</small>
            </article>

            <article class="boardCard">
              <p>Tiendas conectadas</p>
              <h3>12</h3>
              <small>Con reposicion diaria</small>
            </article>

            <article class="boardCard">
              <p>Ordenes hoy</p>
              <h3>47</h3>
              <small>Sin quiebre critico</small>
            </article>

            <article class="boardCard boardCardAccent">
              <p>ETA promedio</p>
              <h3>{{ etaPromedio }}</h3>
              <small>Despacho coordinado</small>
            </article>
          </div>

          <div class="boardBarWrap">
            <p>Cumplimiento de abastecimiento</p>
            <div class="boardBar">
              <span></span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="propuesta" class="contentSection sectionPropuesta reveal-on-scroll">
      <div class="sectionTop">
        <p class="sectionEyebrow">Que resuelve hoy</p>
        <h2 class="sectionTitle">Una sola capa para proveedores y tiendas</h2>
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
          <p class="solutionImpacto">{{ solucion.impacto }}</p>
          <button class="solutionBtn" type="button">Ver detalle operativo</button>
        </article>
      </div>

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
    </section>

    <section id="onboarding" class="contentSection altSection reveal-on-scroll">
      <div class="sectionTop">
        <p class="sectionEyebrow">Activacion</p>
        <h2 class="sectionTitle">Onboarding para estar productivo en 1 jornada</h2>
      </div>

      <div class="onboardingGrid">
        <article class="onboardingCard reveal-on-scroll" v-for="(paso, index) in onboarding" :key="paso.titulo" :style="{ '--reveal-order': index }">
          <span class="stepBadge">{{ index + 1 }}</span>
          <h3>{{ paso.titulo }}</h3>
          <p>{{ paso.texto }}</p>
          <small>{{ paso.tiempo }}</small>
        </article>
      </div>
    </section>

    <section id="catalogo" class="contentSection reveal-on-scroll">
      <div class="sectionTop">
        <p class="sectionEyebrow">Modulos clave</p>
        <h2 class="sectionTitle">Todo anclado al flujo real del negocio</h2>
      </div>

      <div class="moduleGrid">
        <article class="moduleCard reveal-on-scroll" v-for="(modulo, index) in modulos" :key="modulo.nombre" :style="{ '--reveal-order': index }">
          <h3>{{ modulo.nombre }}</h3>
          <p>{{ modulo.detalle }}</p>
          <ul>
            <li v-for="campo in modulo.campos" :key="campo">{{ campo }}</li>
          </ul>
        </article>
      </div>

      <div class="providerStrip">
        <h3>Red de proveedores ya cargada</h3>
        <div class="providerPills">
          <span class="providerPill" v-for="proveedor in proveedoresVisibles" :key="proveedor.nombre">
            {{ proveedor.nombre }} · {{ proveedor.tiempo }} {{ proveedor.unidad }}
          </span>
        </div>
      </div>
    </section>

    <section id="kpi" class="contentSection sectionKpi reveal-on-scroll">
      <div class="sectionTop">
        <p class="sectionEyebrow">KPI ejecutivos</p>
        <h2 class="sectionTitle">Indicadores para decisiones de compra y reposicion</h2>
      </div>

      <div class="kpiGrid">
        <article class="kpiCard" v-for="kpi in kpisOperativos" :key="kpi.label">
          <p class="kpiLabel">{{ kpi.label }}</p>
          <p class="kpiValue">{{ kpi.value }}</p>
          <p class="kpiDelta">{{ kpi.delta }}</p>
          <div class="kpiBar">
            <span :style="{ width: kpi.avance + '%' }"></span>
          </div>
        </article>
      </div>
    </section>

    <section id="casos" class="contentSection altSection reveal-on-scroll">
      <div class="sectionTop">
        <p class="sectionEyebrow">Casos de uso</p>
        <h2 class="sectionTitle">Proveedores y tiendas trabajando en la misma mesa</h2>
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
          <p class="caseTexto">"{{ caso.texto }}"</p>
        </article>
      </div>
    </section>

    <section id="faq" class="contentSection reveal-on-scroll">
      <div class="sectionTop">
        <p class="sectionEyebrow">FAQ operativo</p>
        <h2 class="sectionTitle">Lo necesario para salir en produccion</h2>
      </div>

      <div class="faqList">
        <article class="faqItem" v-for="(faq, index) in faqs" :key="faq.pregunta">
          <button class="faqQuestion" type="button" @click="toggleFaq(index)">
            <span>{{ faq.pregunta }}</span>
            <span>{{ faqAbierta === index ? '−' : '+' }}</span>
          </button>
          <p v-show="faqAbierta === index" class="faqAnswer">{{ faq.respuesta }}</p>
        </article>
      </div>
    </section>

    <section id="contacto" class="contentSection altSection reveal-on-scroll">
      <div class="sectionTop">
        <p class="sectionEyebrow">Contacto</p>
        <h2 class="sectionTitle">Activa tu red de proveedores y tiendas</h2>
      </div>

      <div class="contactGrid">
        <form class="contactForm" @submit.prevent="enviarMensaje">
          <label>Nombre empresa</label>
          <input v-model="form.empresa" type="text" placeholder="Ej: Cadena Sur SpA" />

          <label>Email operativo</label>
          <input v-model="form.email" type="email" placeholder="operaciones@empresa.cl" />

          <label>Objetivo</label>
          <textarea v-model="form.mensaje" rows="4" placeholder="Cuantas tiendas, proveedores y fecha de salida"></textarea>

          <button type="submit" class="btnPrimary">Solicitar activacion</button>
          <p v-if="estadoMensaje" class="estadoMensaje">{{ estadoMensaje }}</p>
        </form>

        <div class="contactMapCard">
          <h3>Base operativa Temuco</h3>
          <p>Condell 485, esquina O'Higgins. Mesa de operaciones para red de proveedores y tiendas.</p>
          <iframe title="Mapa Temuco" loading="lazy" :src="mapaTemuco"></iframe>
        </div>
      </div>
    </section>
  </main>

  <footer class="siteFooter">
    <p>© {{ anioActual }} Bosque Helado B2B · Plataforma proveedores y tiendas</p>
    <button class="btnFooter" type="button" @click="$emit('entrar', 'panel')">Abrir Dashboard</button>
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
    @click="irAlInicio"
    aria-label="Subir al inicio"
  >
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M8 3.2 2.4 8.8l1.1 1.1L7.2 6.2V13h1.6V6.2l3.7 3.7 1.1-1.1z"/>
    </svg>
  </button>

</div>
</template>

<script>

import { proveedores } from "@/modules/inventario/data/proveedores.js"

export default {

emits: ["entrar"],

  data(){
    return {
      menuAbierto: false,
      mostrarSubir: false,
      solucionActiva: null,
      faqAbierta: 0,
      revealObserver: null,
      menuItems: [
        { id: "inicio", label: "Inicio" },
        { id: "propuesta", label: "Propuesta" },
        { id: "onboarding", label: "Onboarding" },
        { id: "catalogo", label: "Catalogo" },
        { id: "kpi", label: "KPI" },
        { id: "casos", label: "Casos" },
        { id: "faq", label: "FAQ" },
        { id: "contacto", label: "Contacto" }
      ],
      heroKpis: [
        { value: "< 24h", label: "Activacion inicial" },
        { value: "99.1%", label: "Pedidos trazables" },
        { value: "0", label: "Canales dispersos" }
      ],
      soluciones: [
        {
          icono: "📦",
          titulo: "Abastecimiento sincronizado",
          texto: "Tiendas y proveedores operan con el mismo estado de stock, sin llamadas manuales.",
          impacto: "Reduce quiebres y sobrestock en la misma semana.",
          puntos: [
            "Entrada y salida con SKU",
            "Estados de entrega en tiempo real",
            "Trazabilidad por proveedor"
          ]
        },
        {
          icono: "🧭",
          titulo: "Ruteo de entregas",
          texto: "Priorizacion por urgencia, sucursal y ventana horaria para retiro o despacho.",
          impacto: "Mejora cumplimiento de SLA y baja reprocesos.",
          puntos: [
            "Agenda por franja horaria",
            "Control de cierres de tienda",
            "Alertas de atraso"
          ]
        },
        {
          icono: "🧾",
          titulo: "Gobierno de catalogo",
          texto: "Ingredientes, alergenos, tipo de producto y proveedor en un catalogo central.",
          impacto: "Cumplimiento normativo y comercial mas rapido.",
          puntos: [
            "Filtro por vegano, celiaco y sin azucar",
            "Ficha tecnica por producto",
            "Validaciones antes de publicar"
          ]
        },
        {
          icono: "📊",
          titulo: "KPI accionables",
          texto: "Panel ejecutivo con cumplimiento de abastecimiento, tiempos y incidentes.",
          impacto: "Decisiones de compra con evidencia diaria.",
          puntos: [
            "KPI por tienda y proveedor",
            "Tendencia semanal",
            "Alertas operativas"
          ]
        }
      ],
      onboarding: [
        {
          titulo: "Levantamiento de datos base",
          texto: "Carga inicial de proveedores, tiendas, categorias y horarios de atencion.",
          tiempo: "Duracion estimada: 45 min"
        },
        {
          titulo: "Configuracion de flujo comercial",
          texto: "Define retiro en tienda, pedido online y ventanas de entrega por sucursal.",
          tiempo: "Duracion estimada: 35 min"
        },
        {
          titulo: "Publicacion de catalogo",
          texto: "Activa fichas con ingredientes, alergenos y filtros para clientes finales.",
          tiempo: "Duracion estimada: 30 min"
        },
        {
          titulo: "Monitoreo en dashboard",
          texto: "Operacion diaria desde panel con KPI, inventario y proveedores conectados.",
          tiempo: "Duracion estimada: inmediata"
        }
      ],
      modulos: [
        {
          nombre: "Modulo Proveedores",
          detalle: "Alta, edicion y control de tiempos de entrega por proveedor.",
          campos: ["Nombre", "Telefono", "Direccion", "SLA", "Productos asociados"]
        },
        {
          nombre: "Modulo Inventario",
          detalle: "Stock por producto con advertencias y estado de tienda abierta/cerrada.",
          campos: ["SKU", "Stock", "Categoria", "Alergenos", "Proveedor"]
        },
        {
          nombre: "Modulo Imagenes",
          detalle: "Carga por lote y carpeta para activos visuales del catalogo.",
          campos: ["Drag and drop", "Destino", "Validacion", "Biblioteca"]
        },
        {
          nombre: "Modulo KPI",
          detalle: "Metricas de cumplimiento, eficiencia operativa y respuesta.",
          campos: ["ETA", "SLA", "Quiebres", "Volumen diario"]
        }
      ],
      kpisOperativos: [
        { label: "Cumplimiento de entrega", value: "96%", delta: "+4.2% vs semana pasada", avance: 96 },
        { label: "Pedidos con ETA confirmado", value: "91%", delta: "+2.1% vs semana pasada", avance: 91 },
        { label: "Quiebres de stock critico", value: "2", delta: "-38% vs semana pasada", avance: 78 },
        { label: "Tiempo medio de respuesta", value: "17 min", delta: "-6 min vs semana pasada", avance: 84 }
      ],
      casos: [
        {
          icono: "🏬",
          autor: "Cadena Sur",
          rol: "Operaciones retail",
          texto: "En 3 dias alineamos compras y reposicion entre tiendas. Dejamos de operar por WhatsApp suelto."
        },
        {
          icono: "🚛",
          autor: "Distribuidora Malleco",
          rol: "Proveedor logistica",
          texto: "El tablero nos mostro horarios reales de recepcion y bajamos entregas fallidas."
        },
        {
          icono: "🧑‍💼",
          autor: "Equipo comercial",
          rol: "Jefatura",
          texto: "Ahora negociamos con datos de ETA y cumplimiento, no con percepcion."
        }
      ],
      faqs: [
        {
          pregunta: "¿Esto reemplaza mi dashboard actual?",
          respuesta: "No. El dashboard sigue igual; esta landing es la puerta comercial y operativa para activar proveedores y tiendas."
        },
        {
          pregunta: "¿Cuanto tarda la salida en marcha?",
          respuesta: "Con datos minimos, la activacion queda en una jornada y el equipo opera el mismo dia."
        },
        {
          pregunta: "¿Puedo cargar catalogo con filtros de alergeno?",
          respuesta: "Si. El flujo contempla ingredientes, alergenos, categoria y atributos como vegano/celiaco/sin azucar."
        },
        {
          pregunta: "¿Se integra con carga de imagenes?",
          respuesta: "Si. Desde el dashboard puedes cargar por lote y dejar biblioteca lista para catalogo y tienda."
        }
      ],
      form: {
        empresa: "",
        email: "",
        mensaje: ""
      },
      estadoMensaje: "",
      mapaTemuco: "https://www.openstreetmap.org/export/embed.html?bbox=-72.6086%2C-38.7447%2C-72.5946%2C-38.7361&layer=mapnik&marker=-38.7404%2C-72.6009",
      whatsAppUrl: "https://wa.me/56991234567?text=Hola%20Bosque%20Helado%20B2B%2C%20necesito%20activar%20proveedores%20y%20tiendas"
    }
  },

  computed: {
    anioActual(){
      return new Date().getFullYear()
    },

    proveedoresActivos(){
      return proveedores.length
    },

    proveedoresVisibles(){
      return proveedores.slice(0, 4)
    },

    etaPromedio(){
      if(!proveedores.length) return "N/D"
      const horas = proveedores.reduce((acum, proveedor) => {
        if(proveedor.unidad === "dias") return acum + (proveedor.tiempo * 24)
        return acum + proveedor.tiempo
      }, 0)
      const promedio = Math.round(horas / proveedores.length)
      return `${promedio}h`
    }
  },

  methods: {
    enviarMensaje(){
      if(
        this.form.empresa.trim() === "" ||
        this.form.email.trim() === "" ||
        this.form.mensaje.trim() === ""
      ){
        this.estadoMensaje = "Completa empresa, email y objetivo para activar la solicitud."
        return
      }

      this.estadoMensaje = "Solicitud enviada. Equipo operativo respondera en menos de 24 horas."
      this.form = { empresa: "", email: "", mensaje: "" }
    },

    abrirSolucion(solucion){
      this.solucionActiva = solucion
    },

    cerrarSolucion(){
      this.solucionActiva = null
    },

    toggleFaq(index){
      this.faqAbierta = this.faqAbierta === index ? -1 : index
    },

    manejarScroll(){
      this.mostrarSubir = window.scrollY > 280
    },

    irAlInicio(){
      window.scrollTo({ top: 0, behavior: "smooth" })
    },

    manejarTeclaGlobal(event){
      if(event.key === "Escape" && this.solucionActiva){
        this.cerrarSolucion()
      }
    },

    activarReveals(){
      const targets = this.$el.querySelectorAll(".reveal-on-scroll")
      if(!targets.length) return

      if(!("IntersectionObserver" in window)){
        targets.forEach(target => target.classList.add("is-visible"))
        return
      }

      this.revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if(entry.isIntersecting){
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

  mounted(){
    window.addEventListener("scroll", this.manejarScroll, { passive: true })
    window.addEventListener("keydown", this.manejarTeclaGlobal)
    this.manejarScroll()
    this.$nextTick(() => {
      this.activarReveals()
    })
  },

  beforeUnmount(){
    window.removeEventListener("scroll", this.manejarScroll)
    window.removeEventListener("keydown", this.manejarTeclaGlobal)
    this.revealObserver?.disconnect()
  }

}

</script>

<style scoped>

@import url("https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,700&family=Manrope:wght@400;500;700;800&display=swap");

.landingB2B{
  --bg: #f7f9fc;
  --bg-alt: #eef2f8;
  --ink: #11243a;
  --muted: #5f6f86;
  --primary: #0f8b8d;
  --primary-dark: #0a6163;
  --accent: #ffb703;
  --line: #d8e0eb;
  background: var(--bg);
  color: var(--ink);
  font-family: "Manrope", "Segoe UI", sans-serif;
  position: relative;
  overflow-x: clip;
}

.landingB2B::before,
.landingB2B::after{
  content: "";
  position: absolute;
  pointer-events: none;
  z-index: 0;
}

.landingB2B::before{
  width: 420px;
  height: 420px;
  top: -120px;
  right: -160px;
  background: radial-gradient(circle, rgba(15,139,141,0.2), transparent 70%);
}

.landingB2B::after{
  width: 300px;
  height: 300px;
  left: -120px;
  top: 880px;
  background: radial-gradient(circle, rgba(255,183,3,0.22), transparent 70%);
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
  z-index: 50;
  backdrop-filter: blur(12px);
  background: rgba(247,249,252,0.88);
  border-bottom: 1px solid var(--line);
}

.navWrap{
  max-width: 1240px;
  margin: 0 auto;
  padding: 12px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
}

.brand{
  display: inline-flex;
  align-items: center;
  gap: 9px;
  text-decoration: none;
}

.brandMark{
  font-size: 22px;
}

.brandText{
  font-size: 16px;
  font-weight: 800;
  letter-spacing: 0.3px;
  color: var(--ink);
}

.menuBtn{
  display: none;
  border: none;
  background: transparent;
  font-size: 24px;
  cursor: pointer;
  color: var(--primary-dark);
}

.navLinks{
  display: flex;
  align-items: center;
  gap: 16px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.navLinks a{
  text-decoration: none;
  color: #2a3f5e;
  font-size: 13px;
  font-weight: 700;
}

.navLinks a:hover{
  color: var(--primary);
}

.btnNavCta,
.btnPrimary,
.btnGhost,
.btnSoft,
.btnFooter,
.solutionBtn{
  border: none;
  border-radius: 12px;
  font-weight: 800;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}

.btnNavCta,
.btnPrimary{
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  color: white;
  padding: 11px 16px;
}

.btnNavCta:hover,
.btnPrimary:hover{
  transform: translateY(-1px);
  box-shadow: 0 10px 20px rgba(8,83,84,0.24);
}

.btnGhost{
  background: #ffffff;
  border: 1px solid #bfd6da;
  color: var(--primary-dark);
  padding: 11px 16px;
}

.btnGhost:hover{
  background: #eef8f8;
}

.btnSoft{
  background: #fff7e2;
  border: 1px solid #f3d17b;
  color: #8a6400;
  padding: 11px 16px;
}

.btnSoft:hover{
  background: #ffeec2;
}

.landingMain{
  max-width: 1240px;
  margin: 0 auto;
  padding: 12px 24px 40px;
}

.heroSection{
  min-height: 86vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
  align-items: center;
  padding: 30px 0 42px;
}

.heroInfo{
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.eyebrow,
.sectionEyebrow{
  margin: 0;
  font-size: 12px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  color: var(--primary);
}

.heroTitle,
.sectionTitle{
  margin: 0;
  font-family: "Fraunces", Georgia, serif;
  color: var(--ink);
}

.heroTitle{
  font-size: 56px;
  line-height: 0.97;
  max-width: 11ch;
}

.heroText{
  margin: 0;
  color: #35506e;
  font-size: 18px;
  line-height: 1.55;
  max-width: 54ch;
}

.heroActions{
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.heroMetrics{
  display: grid;
  grid-template-columns: repeat(3, minmax(120px, 1fr));
  gap: 10px;
  max-width: 560px;
}

.metricCard{
  background: #ffffff;
  border: 1px solid var(--line);
  border-radius: 14px;
  padding: 14px;
  box-shadow: 0 10px 22px rgba(17,36,58,0.07);
}

.metricValue{
  margin: 0;
  font-size: 24px;
  font-weight: 800;
  color: var(--primary-dark);
}

.metricLabel{
  margin: 2px 0 0;
  font-size: 12px;
  color: var(--muted);
}

.statusBoard{
  background: linear-gradient(170deg, #ffffff, #f4f8ff);
  border-radius: 24px;
  border: 1px solid var(--line);
  box-shadow: 0 20px 44px rgba(17,36,58,0.16);
  padding: 18px;
}

.boardHead{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.boardHead p{
  margin: 0;
  font-size: 14px;
  font-weight: 800;
  color: #2a3f5e;
}

.boardHead span{
  padding: 6px 10px;
  border-radius: 999px;
  background: #e8fbf7;
  border: 1px solid #a5ddd4;
  color: #0e6768;
  font-size: 11px;
  font-weight: 800;
}

.boardGrid{
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.boardCard{
  border-radius: 14px;
  border: 1px solid #d4deeb;
  background: #ffffff;
  padding: 14px;
}

.boardCard p,
.boardCard small{
  margin: 0;
}

.boardCard p{
  font-size: 12px;
  color: #607086;
}

.boardCard h3{
  margin: 5px 0 3px;
  font-size: 30px;
  color: #173657;
}

.boardCard small{
  font-size: 11px;
  color: #738399;
}

.boardCardAccent{
  background: linear-gradient(160deg, #0f8b8d, #0b5f61);
  border-color: transparent;
}

.boardCardAccent p,
.boardCardAccent h3,
.boardCardAccent small{
  color: white;
}

.boardBarWrap{
  margin-top: 12px;
}

.boardBarWrap p{
  margin: 0 0 8px;
  font-size: 12px;
  font-weight: 700;
  color: #49627f;
}

.boardBar{
  height: 10px;
  border-radius: 999px;
  background: #e4ebf5;
  overflow: hidden;
}

.boardBar span{
  display: block;
  width: 96%;
  height: 100%;
  background: linear-gradient(90deg, var(--primary), #6ad5cc);
  animation: boardLoad 2.2s ease-out;
}

.contentSection{
  padding: 62px 0;
}

.altSection{
  background: var(--bg-alt);
  margin-left: -24px;
  margin-right: -24px;
  padding-left: 24px;
  padding-right: 24px;
  border-top: 1px solid #dce4ef;
  border-bottom: 1px solid #dce4ef;
}

.sectionPropuesta{
  border-left: 5px solid var(--accent);
  padding-left: 20px;
}

.sectionTop{
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
}

.sectionTitle{
  font-size: 39px;
  line-height: 1.05;
}

.solutionGrid,
.onboardingGrid,
.moduleGrid,
.kpiGrid,
.caseGrid{
  display: grid;
  gap: 12px;
}

.solutionGrid{
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
}

.solutionCard,
.onboardingCard,
.moduleCard,
.kpiCard,
.caseCard,
.contactForm,
.contactMapCard,
.faqItem{
  background: #ffffff;
  border: 1px solid var(--line);
  border-radius: 16px;
  box-shadow: 0 10px 24px rgba(17,36,58,0.07);
}

.solutionCard{
  padding: 18px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: transform 0.23s ease, box-shadow 0.23s ease, border-color 0.23s ease;
}

.solutionCard::before{
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 92% 6%, rgba(255,183,3,0.3), transparent 42%);
  opacity: 0;
  transition: opacity 0.25s ease;
}

.solutionCard:hover{
  transform: translateY(-4px);
  border-color: #a8bfdd;
  box-shadow: 0 16px 28px rgba(17,36,58,0.14);
}

.solutionCard:hover::before{
  opacity: 1;
}

.solutionIcon{
  margin: 0 0 8px;
  font-size: 24px;
}

.solutionCard h3,
.onboardingCard h3,
.moduleCard h3,
.contactMapCard h3{
  margin: 0;
  color: #163656;
}

.solutionCard h3{
  font-size: 19px;
}

.solutionCard p{
  margin: 8px 0 0;
  color: #48627f;
  line-height: 1.45;
}

.solutionImpacto{
  font-size: 13px;
  font-weight: 700;
  color: #0a6d6f;
}

.solutionBtn{
  margin-top: 12px;
  background: #edf5ff;
  color: #1b4268;
  padding: 9px 12px;
  font-size: 12px;
}

.solutionModalOverlay{
  position: fixed;
  inset: 0;
  background: rgba(9,18,32,0.62);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  z-index: 120;
}

.solutionModalCard{
  width: 100%;
  max-width: 640px;
  border-radius: 18px;
  background: linear-gradient(180deg, #ffffff, #f4f8ff);
  border: 1px solid #cdd9ea;
  box-shadow: 0 26px 48px rgba(0,0,0,0.3);
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.solutionModalIcon{
  margin: 0;
  font-size: 30px;
}

.solutionModalCard h3{
  margin: 0;
  font-size: 31px;
  font-family: "Fraunces", Georgia, serif;
  color: #14304f;
}

.solutionModalText,
.solutionModalImpact{
  margin: 0;
  color: #44627f;
}

.solutionModalList{
  margin: 0;
  padding-left: 18px;
  color: #2c4f71;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.solutionModalActions{
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 8px;
}

.onboardingGrid{
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.onboardingCard{
  padding: 18px;
  position: relative;
}

.stepBadge{
  width: 32px;
  height: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: #173a5e;
  color: white;
  font-size: 13px;
  font-weight: 800;
}

.onboardingCard h3{
  margin-top: 10px;
  font-size: 18px;
}

.onboardingCard p{
  margin: 8px 0 0;
  color: #496482;
  line-height: 1.45;
}

.onboardingCard small{
  display: inline-block;
  margin-top: 10px;
  color: #0b7072;
  font-weight: 700;
}

.moduleGrid{
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}

.moduleCard{
  padding: 18px;
}

.moduleCard p{
  margin: 8px 0 10px;
  color: #496482;
}

.moduleCard ul{
  margin: 0;
  padding-left: 18px;
  color: #2b4c6d;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.providerStrip{
  margin-top: 14px;
  border-radius: 16px;
  border: 1px dashed #9cb5d4;
  background: #f5f9ff;
  padding: 16px;
}

.providerStrip h3{
  margin: 0 0 10px;
  font-size: 18px;
  color: #163656;
}

.providerPills{
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.providerPill{
  background: #ffffff;
  border: 1px solid #c8d6ea;
  color: #294d72;
  padding: 7px 11px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
}

.sectionKpi{
  background: linear-gradient(130deg, #f2f8ff, #f8fffb);
  border: 1px solid #d5e2f2;
  border-radius: 18px;
  padding: 32px 18px;
}

.kpiGrid{
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.kpiCard{
  padding: 16px;
}

.kpiLabel,
.kpiDelta{
  margin: 0;
  color: #5d6f87;
  font-size: 12px;
}

.kpiValue{
  margin: 6px 0;
  font-size: 32px;
  color: #17395f;
  font-weight: 800;
}

.kpiDelta{
  font-weight: 700;
  color: #0d6c6e;
}

.kpiBar{
  margin-top: 10px;
  height: 8px;
  border-radius: 999px;
  background: #e5edf7;
  overflow: hidden;
}

.kpiBar span{
  display: block;
  height: 100%;
  background: linear-gradient(90deg, var(--primary), #79dfd6);
}

.caseGrid{
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}

.caseCard{
  padding: 18px;
  transition: transform 0.24s ease, box-shadow 0.24s ease;
}

.caseCard:hover{
  transform: translateY(-4px);
  box-shadow: 0 16px 28px rgba(17,36,58,0.14);
}

.caseHead{
  display: flex;
  align-items: center;
  gap: 10px;
}

.caseAvatar{
  width: 38px;
  height: 38px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #fff0cf, #ecf9f7);
  border: 1px solid #c6d8e8;
}

.caseAutor{
  margin: 0;
  font-size: 14px;
  font-weight: 800;
  color: #163656;
}

.caseRol{
  margin: 0;
  font-size: 12px;
  color: #5f7188;
}

.caseTexto{
  margin: 10px 0 0;
  color: #3f5b79;
  line-height: 1.46;
}

.faqList{
  display: grid;
  gap: 10px;
}

.faqItem{
  overflow: hidden;
}

.faqQuestion{
  width: 100%;
  border: none;
  background: #ffffff;
  padding: 14px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  font-weight: 800;
  color: #1d3d61;
  cursor: pointer;
}

.faqAnswer{
  margin: 0;
  padding: 0 16px 14px;
  color: #48627f;
  line-height: 1.45;
}

.contactGrid{
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.contactForm,
.contactMapCard{
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.contactForm label{
  font-size: 13px;
  font-weight: 800;
  color: #25496d;
}

.contactForm input,
.contactForm textarea{
  width: 100%;
  border: 1px solid #c4d4e8;
  border-radius: 10px;
  padding: 10px 12px;
  font-size: 14px;
  font-family: "Manrope", "Segoe UI", sans-serif;
  background: #fcfdff;
  outline: none;
}

.contactForm input:focus,
.contactForm textarea:focus{
  border-color: #5db9be;
}

.estadoMensaje{
  margin: 4px 0 0;
  color: #0a6668;
  font-size: 13px;
  font-weight: 700;
}

.contactMapCard p{
  margin: 0;
  color: #4b6583;
  line-height: 1.42;
}

.contactMapCard iframe{
  width: 100%;
  height: 284px;
  border: 0;
  border-radius: 12px;
}

.siteFooter{
  max-width: 1240px;
  margin: 0 auto;
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  border-top: 1px solid var(--line);
}

.siteFooter p{
  margin: 0;
  color: #6b7c92;
  font-size: 13px;
}

.btnFooter{
  background: #fff2cb;
  border: 1px solid #f1d48d;
  color: #815b00;
  padding: 10px 14px;
}

.floatingWhatsApp,
.floatingTop{
  position: fixed;
  width: 58px;
  height: 58px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 12px 28px rgba(7,26,41,0.28);
  z-index: 60;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.floatingWhatsApp{
  left: 18px;
  bottom: 18px;
  background: #25d366;
  color: white;
}

.floatingTop{
  right: 18px;
  bottom: 18px;
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  border: none;
  color: white;
  cursor: pointer;
}

.floatingWhatsApp:hover,
.floatingTop:hover{
  transform: translateY(-2px);
  box-shadow: 0 14px 30px rgba(7,26,41,0.34);
}

.floatingWhatsApp svg,
.floatingTop svg{
  width: 28px;
  height: 28px;
  fill: currentColor;
}

.reveal-on-scroll{
  opacity: 0;
  transform: translateY(22px) scale(0.985);
  transition: opacity 0.55s ease, transform 0.55s ease;
  transition-delay: calc(var(--reveal-order, 0) * 80ms);
}

.reveal-on-scroll.is-visible{
  opacity: 1;
  transform: translateY(0) scale(1);
}

.modalFade-enter-active,
.modalFade-leave-active{
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.modalFade-enter-from,
.modalFade-leave-to{
  opacity: 0;
  transform: scale(0.96);
}

@keyframes boardLoad{
  from{ width: 0; }
  to{ width: 96%; }
}

@media (max-width: 1040px){
  .heroSection{
    grid-template-columns: 1fr;
    min-height: auto;
    padding-top: 20px;
  }

  .heroTitle{
    max-width: 100%;
    font-size: 48px;
  }

  .heroMetrics{
    grid-template-columns: repeat(3, minmax(100px, 1fr));
  }

  .contactGrid{
    grid-template-columns: 1fr;
  }
}

@media (max-width: 780px){
  .menuBtn{
    display: block;
  }

  .navLinks{
    position: absolute;
    top: 64px;
    left: 0;
    right: 0;
    display: none;
    flex-direction: column;
    align-items: flex-start;
    background: #f8fbff;
    border-bottom: 1px solid var(--line);
    padding: 14px 24px;
  }

  .navLinks.navOpen{
    display: flex;
  }

  .navCtaItem,
  .btnNavCta{
    width: 100%;
  }

  .sectionTitle{
    font-size: 32px;
  }

  .heroTitle{
    font-size: 40px;
  }

  .heroMetrics{
    grid-template-columns: 1fr 1fr;
  }

  .boardGrid{
    grid-template-columns: 1fr;
  }

  .altSection{
    margin-left: -12px;
    margin-right: -12px;
    padding-left: 12px;
    padding-right: 12px;
  }

  .siteFooter{
    flex-direction: column;
    align-items: flex-start;
  }

  .floatingWhatsApp,
  .floatingTop{
    width: 52px;
    height: 52px;
    bottom: 14px;
  }

  .floatingWhatsApp{
    left: 14px;
  }

  .floatingTop{
    right: 14px;
  }
}

@media (prefers-reduced-motion: reduce){
  .reveal-on-scroll{
    opacity: 1;
    transform: none;
    transition: none;
  }

  .boardBar span{
    animation: none;
  }
}

</style>
