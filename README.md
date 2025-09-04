# Aplicación de Gastos

Esta aplicación permite gestionar movimientos de dinero, ahorro en "bolsillos" y cashback.

---

## Requisitos

### Node.js

Se uso  la versión **20.17.0**, verificar en caso de cualquier error.

> Si tienes otra versión y encuentras errores, considera usar `nvm` para cambiar a la versión recomendada.

### npm

La versión que viene con Node.js.

---

## Instalación y Despliegue Local

### 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd <NOMBRE_DEL_PROYECTO>
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Construir la aplicación

```bash
npm run build
```

### 4. Entrar a la carpeta de build

```bash
cd build
```

### 5. Iniciar el servidor

```bash
npm run start
```

### 6. Abrir la aplicación en el navegador

```
http://localhost:3000 0 http://localhost:5173
```

> Nota: La URL de redirección de autenticación se ajusta automáticamente al puerto donde ejecutes la app.

---

## Variables de Entorno

Verifica el archivo `.env` en la raíz del proyecto con tus claves de Supabase:

```env
VITE_SUPABASE_URL=<TU_SUPABASE_URL>
VITE_SUPABASE_KEY=<TU_SUPABASE_KEY>
```

> ⚠️ Estas variables vienen el PR solo con fines educativos, no subir a producción con crenciales reales.

---

## Uso Básico

* Crear movimientos de dinero.
* Gestionar "bolsillos" de ahorro.
* Visualizar el balance de la billetera y el cashback acumulado.
* Cada movimiento que generes suma cashback automáticamente.

---

## Funcionalidades

* **Movimientos**: Agregar, listar y eliminar movimientos de dinero.
* **Bolsillos**: Crear y actualizar pockets de ahorro.
* **Wallet**: Mostrar balance actualizado.
* **Cashback**: Visualizar saldo de cashback acumulado por movimientos.

---

## Tecnologías

* **Supabase**: Autenticación y base de datos.
* **React Router v7**: Navegación.
* **Zustand**: Manejo de estado global.
* **TailwindCSS**: Estilos.
* **React Query**: Fetch de datos.
* **TypeScript**: Tipado estático.

---

## Notas

* Mantener la versión recomendada de Node.js para evitar errores en dependencias.
* La aplicación está preparada para ejecutarse en la máquina local.
* La URL de redirección en Supabase se ajusta al puerto donde ejecutes la app (localhost:5173 por defecto) para desarrollo.
