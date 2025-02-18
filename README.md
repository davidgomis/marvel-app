# 🦸‍♂️ Marvel Characters App

Este es un proyecto de React que muestra personajes de Marvel, permitiendo buscar, ver detalles y gestionar una lista de favoritos.

---

## 🚀 **Tecnologías utilizadas**

- React + Vite
- TypeScript
- React Router
- SCSS
- Context API
- Marvel API
- Axios
- classnames (para gestionar clases CSS dinámicamente)

---

## ▶️ **Instalación**

1. Clona este repositorio:

   ```sh
   git clone
   cd marvel-app
   ```

2. Instala las dependencias:

   npm install

3. Ejecuta el proyecto:

   npm run dev

---

## 📦 **Estructura del proyecto**

📂 src
├── 📂 api # Servicios para llamadas a la API de Marvel
├── 📂 components # Componentes reutilizables
├── 📂 hooks # Hooks reutilizables
├── 📂 context # Context API (favoritos, etc.)
├── 📂 pages # Páginas principales (Home, CharacterDetail, Favorites)
├── 📂 styles # Archivos SCSS
├── 📂 assets # Imagenes
├── 📂 routers # Definición de rutas
├── App.tsx # Componente principal
├── main.tsx # Punto de entrada
├── App.scss # Estilos generales

## ✨ **Características**

✅ Listado de personajes de Marvel
✅ Búsqueda en tiempo real
✅ Favoritos con Context API
✅ Detalle de cada personaje (nombre, imagen, descripción, cómics)
✅ Diseño responsive con SCSS

## ⚙️ **Test**

Para lanzar test, ejecutar
npm run test

```
npm run test

```

## 🐞 **Solución de problemas**

1. Asegúrate de tener Node.js instalado

   node -v

2. Limpia la caché e instala dependencias de nuevo

   rm -rf node_modules package-lock.json
   npm install
