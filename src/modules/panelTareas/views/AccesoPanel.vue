<template>
  <section class="accesoPanel">
    <div class="accesoShell">
      <article class="accesoIntro">
        <p class="accesoEyebrow">Acceso al dashboard</p>
        <h1>¿Ya tienes cuenta o necesitas crear una?</h1>
        <p class="accesoTexto">
          El administrador gestiona inventario, proveedores, imagenes y asignación de tareas.
          El empleado entra a su panel y revisa las tareas ya cargadas.
        </p>

        <div class="accesoModos">
          <button
            class="modoBtn"
            :class="{ modoBtnActivo: modo === 'login' }"
            type="button"
            @click="modo = 'login'"
          >
            Ya tengo cuenta
          </button>
          <button
            class="modoBtn"
            :class="{ modoBtnActivo: modo === 'registro' }"
            type="button"
            @click="modo = 'registro'"
          >
            Crear cuenta
          </button>
        </div>

        <div class="cuentasDemo">
          <article v-for="cuenta in cuentasDemo" :key="cuenta.usuario" class="cuentaDemoCard">
            <p class="cuentaRol">{{ cuenta.rol === "admin" ? "Administrador" : "Empleado" }}</p>
            <strong>{{ cuenta.nombre }}</strong>
            <span>Usuario: {{ cuenta.usuario }}</span>
            <span>Clave: {{ cuenta.clave }}</span>
          </article>
        </div>
      </article>

      <article class="accesoCard">
        <h2>{{ modo === "login" ? "Iniciar sesión" : "Crear cuenta de empleado" }}</h2>

        <form v-if="modo === 'login'" class="formAcceso" @submit.prevent="enviarLogin">
          <label>Usuario</label>
          <input v-model.trim="login.usuario" type="text" placeholder="admin o empleado" />

          <label>Clave</label>
          <input v-model.trim="login.clave" type="password" placeholder="Ingresa tu clave" />

          <p v-if="mensajeLogin" class="mensajeAcceso">{{ mensajeLogin }}</p>

          <div class="accionesAcceso">
            <button class="btnPrimarioAcceso" type="submit">Entrar al dashboard</button>
            <button class="btnSecundarioAcceso" type="button" @click="$emit('volverLanding')">Volver al landing</button>
          </div>
        </form>

        <form v-else class="formAcceso" @submit.prevent="enviarRegistro">
          <label>Nombre completo</label>
          <input v-model.trim="registro.nombre" type="text" placeholder="Ej: Camila Rojas" />

          <label>Usuario</label>
          <input v-model.trim="registro.usuario" type="text" placeholder="Ej: camila" />

          <label>Clave</label>
          <input v-model.trim="registro.clave" type="password" placeholder="Crea una clave" />

          <p class="notaAcceso">Las cuentas nuevas se crean como empleado y entran directo al panel de tareas.</p>
          <p v-if="mensajeRegistro" class="mensajeAcceso">{{ mensajeRegistro }}</p>

          <div class="accionesAcceso">
            <button class="btnPrimarioAcceso" type="submit">Crear y entrar</button>
            <button class="btnSecundarioAcceso" type="button" @click="modo = 'login'">Ya tengo cuenta</button>
          </div>
        </form>
      </article>
    </div>
  </section>
</template>

<script>
import { iniciarSesion, listarCuentasDemo, registrarUsuario } from "../services/falsoBackUsuarios.js"

export default {
  emits: ["autenticado", "volverLanding"],

  data() {
    return {
      modo: "login",
      login: {
        usuario: "",
        clave: ""
      },
      registro: {
        nombre: "",
        usuario: "",
        clave: ""
      },
      mensajeLogin: "",
      mensajeRegistro: "",
      cuentasDemo: listarCuentasDemo()
    }
  },

  methods: {
    enviarLogin() {
      const resultado = iniciarSesion(this.login)
      if (!resultado.ok) {
        this.mensajeLogin = resultado.mensaje
        return
      }

      this.mensajeLogin = ""
      this.$emit("autenticado", resultado.sesion)
    },

    enviarRegistro() {
      const resultado = registrarUsuario(this.registro)
      if (!resultado.ok) {
        this.mensajeRegistro = resultado.mensaje
        return
      }

      this.mensajeRegistro = ""
      this.$emit("autenticado", resultado.sesion)
    }
  }
}
</script>

<style scoped>
.accesoPanel{
  min-height:100vh;
  padding:32px;
  background:
    radial-gradient(circle at top left, rgba(255,209,102,0.22), transparent 32%),
    radial-gradient(circle at bottom right, rgba(45,158,116,0.18), transparent 28%),
    #f4fdf8;
  display:flex;
  align-items:center;
  justify-content:center;
}

.accesoShell{
  width:min(1200px, 100%);
  display:grid;
  grid-template-columns:minmax(0, 1.05fr) minmax(360px, 0.95fr);
  gap:24px;
}

.accesoIntro,
.accesoCard{
  background:rgba(255,255,255,0.92);
  border:1px solid #d7eee3;
  border-radius:28px;
  box-shadow:0 16px 34px rgba(16, 37, 31, 0.08);
}

.accesoIntro{
  padding:34px;
  display:grid;
  gap:18px;
}

.accesoEyebrow{
  margin:0;
  font-size:13px;
  font-weight:800;
  letter-spacing:0.16em;
  text-transform:uppercase;
  color:#8c6327;
}

.accesoIntro h1{
  margin:0;
  font-size:52px;
  line-height:0.96;
  color:#183a2e;
  font-family:"Fraunces", Georgia, serif;
}

.accesoTexto{
  margin:0;
  font-size:20px;
  line-height:1.7;
  color:#4d665d;
}

.accesoModos{
  display:flex;
  gap:12px;
  flex-wrap:wrap;
}

.modoBtn{
  border:none;
  border-radius:999px;
  padding:12px 18px;
  font-size:15px;
  font-weight:800;
  cursor:pointer;
  color:#1a6b52;
  background:#edf7f1;
  transition:0.2s;
}

.modoBtnActivo{
  background:linear-gradient(135deg,#2d9e74,#1a6b52);
  color:white;
}

.cuentasDemo{
  display:grid;
  grid-template-columns:repeat(2, minmax(0, 1fr));
  gap:14px;
}

.cuentaDemoCard{
  padding:18px;
  border-radius:18px;
  background:linear-gradient(180deg,#f9fffe,#f4fbf7);
  border:1px solid #d8ede4;
  display:grid;
  gap:6px;
}

.cuentaRol{
  margin:0;
  font-size:11px;
  font-weight:800;
  text-transform:uppercase;
  letter-spacing:0.14em;
  color:#8c6327;
}

.cuentaDemoCard strong{
  font-size:18px;
  color:#183a2e;
}

.cuentaDemoCard span{
  font-size:14px;
  color:#4f675f;
}

.accesoCard{
  padding:32px 28px;
  display:grid;
  align-content:start;
  gap:18px;
}

.accesoCard h2{
  margin:0;
  font-size:28px;
  color:#183a2e;
}

.formAcceso{
  display:grid;
  gap:10px;
}

.formAcceso label{
  font-size:13px;
  font-weight:800;
  letter-spacing:0.12em;
  text-transform:uppercase;
  color:#557566;
}

.formAcceso input{
  width:100%;
  border-radius:16px;
  border:1px solid #cfe5db;
  background:#f9fffe;
  padding:14px 16px;
  font-size:16px;
  color:#183a2e;
}

.notaAcceso,
.mensajeAcceso{
  margin:0;
  font-size:14px;
  line-height:1.6;
}

.notaAcceso{
  color:#5d776d;
}

.mensajeAcceso{
  color:#c5522c;
  font-weight:700;
}

.accionesAcceso{
  display:flex;
  flex-wrap:wrap;
  gap:12px;
  margin-top:8px;
}

.btnPrimarioAcceso,
.btnSecundarioAcceso{
  border:none;
  border-radius:999px;
  padding:12px 18px;
  font-size:15px;
  font-weight:800;
  cursor:pointer;
}

.btnPrimarioAcceso{
  background:linear-gradient(135deg,#2d9e74,#1a6b52);
  color:white;
}

.btnSecundarioAcceso{
  background:#edf7f1;
  color:#1a6b52;
}

@media (max-width: 920px){
  .accesoShell{
    grid-template-columns:1fr;
  }

  .cuentasDemo{
    grid-template-columns:1fr;
  }
}

@media (max-width: 720px){
  .accesoPanel{
    padding:18px;
  }

  .accesoIntro,
  .accesoCard{
    padding:22px;
  }

  .accesoIntro h1{
    font-size:38px;
  }

  .accesoTexto{
    font-size:17px;
  }
}
</style>
