# m6c11 - Bosque Helado (Vue 3 + Vite)

Proyecto frontend para heladeria artesanal, con:
- Landing page comercial (scroll moderno).
- Dashboard interno (tareas y KPI).
- Modulo de inventario/stock.
- Modulo de proveedores.

## Estado real del repositorio (12-03-2026)

- Rama de trabajo activa: `cz`.
- Ramas remotas detectadas:
  - `origin/main`
  - `origin/cz`
  - `origin/rama-amara`

### Criterio de integracion aplicado

Se utilizo esta regla:
- Si un archivo existe en `rama-amara`, se puede usar como base para alinear estructura/variables.
- Si un archivo **no** existe en `rama-amara`, se mantiene/desarrolla la version de `cz`.

Esto significa:
- `inventario` esta principalmente alineado con `amara`.
- `landing` y parte del `dashboard` son extension nueva sobre `cz` (porque en `amara` no existen esos archivos).

## Punto de entrada actual

`src/App.vue` inicia en landing (`LandingPage.vue`) y luego entra al sistema con menu interno:
- `panel`
- `tareas`
- `kpi`
- `stock`
- `proveedores`

## Funcionalidades implementadas

### Landing comercial
- Navbar con secciones.
- Hero + historia + servicios + proveedores + testimonios.
- Galeria de sabores en carrusel.
- Formulario de contacto.
- Mapa embebido en Temuco.
- Boton flotante WhatsApp.
- Boton flotante "volver arriba".

### Dashboard interno
- Panel de tareas con estado del dia (`diaActivo` / `cambiarEstado`).
- Formulario de tareas con validacion y `@submit.prevent`.
- Lista de tareas con filtros y acciones (completar, editar, eliminar).
- Modal de edicion.
- Resumen + agenda + KPI.

### Inventario / stock
- Interpolacion de tienda y encargado.
- Estado tienda abierta/cerrada.
- Alta/edicion/eliminacion de productos.
- Validaciones de formulario.
- Renderizado condicional (`v-if`, `v-else`, `v-show`) y listas con `v-for`.
- Estilos condicionales para stock/alergenos.

### Proveedores
- Tabla de proveedores.
- Alta/edicion/eliminacion con modal.
- Validaciones basicas.

## Estructura principal

```text
src/
  App.vue
  modules/
    inventario/
      components/
      data/
      views/
    panelTareas/
      components/
      layout/
      views/
backend/
```

> Nota: `backend/` existe como carpeta, pero hoy sus archivos estan vacios (sin API operativa).

## Requisitos

- Node.js `^20.19.0` o `>=22.12.0`
- npm

## Instalacion y ejecucion

```bash
npm install
npm run dev
```

Build de produccion:

```bash
npm run build
```

Preview del build:

```bash
npm run preview
```

## Convencion de naming (alineacion)

Para mantener coherencia con el origen y con lo nuevo:
- Se priorizan nombres base usados en ramas originales cuando existen.
- En componentes nuevos se usa naming equivalente y compatible.
- Ejemplos actuales: `usuario`, `diaActivo`, `cambiarEstado`, `tareaSeleccionada`, `agregar`.

## Pendientes tecnicos

- Persistencia de datos (hoy en memoria).
- Backend/API real.
- Integracion de carrito de compra, checkout y confirmacion.
- Feed de Instagram real (si se habilita por API o embed estable).

## Comandos Git utiles para comparativa

```bash
git fetch origin --prune
git log --oneline --graph --decorate --all
git diff --name-status origin/main...cz
git diff --name-status origin/rama-amara...cz
```
