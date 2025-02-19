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

   ```sh
     npm install
   ```

3. Ejecuta el proyecto:

   ```sh
     npm run dev
   ```

---

## 📦 **Estructura del proyecto**

```sh
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
```

## 🏗 **Arquitectura del proyecto**

El proyecto sigue una arquitectura modular basada en capas, lo que mejora la organización, la reutilización del código y la escalabilidad.

🔹 División por capas

1. Capa de API (/api)

   - Responsable de interactuar con la API de Marvel.
   - Separa la lógica de negocio de las llamadas HTTP.
   - Utiliza Axios para manejar peticiones asíncronas.
   - Se divide en servicios específicos (characterService.ts, comicsService.ts).

2. Capa de Componentes (/components)

   - Contiene componentes reutilizables y pequeños bloques de UI.
   - Separación clara entre presentación y lógica.
   - Utiliza props para recibir datos desde los hooks o contextos.

3. Capa de Hooks (/hooks)

   - Encapsula la lógica de negocio y la obtención de datos.
   - Evita la duplicación de código en componentes.
   - Implementa lógica específica como useCharacters, useComics, useFavorites.

4. Capa de Context (/context)

   - Maneja el estado global de la aplicación, como los favoritos.
   - Usa Context API para compartir estado entre componentes sin prop drilling.

5. Capa de Páginas (/pages)

   - Define las vistas principales de la aplicación.
   - Cada página es autocontenida y puede incluir su propia lógica de negocio.

6. Capa de Rutas (/routers)

   - Administra la navegación con React Router.
   - Permite una estructura clara y escalable de las rutas.

7. Capa de Estilos (/styles)

   - Centraliza los estilos en SCSS.
   - Usa arquitectura modular para mejorar la mantenibilidad.

✅ Ventajas de esta arquitectura

- Mantenibilidad – Separación clara entre lógica, presentación y estado.
- Escalabilidad – Modularidad que permite agregar más funcionalidades sin afectar el resto del código.
- Reutilización – Componentes y hooks pueden ser utilizados en múltiples partes de la app.
- Pruebas más sencillas – Separación de la lógica de negocio facilita la escritura de tests.
- Rendimiento – Evita renderizados innecesarios mediante la gestión eficiente del estado.

## ✨ **Características**

- Listado de personajes de Marvel
- Búsqueda en tiempo real
- Favoritos con Context API
- Detalle de cada personaje (nombre, imagen, descripción, cómics)
- Diseño responsive con SCSS

## ⚙️ **Test**

Para lanzar test, ejecutar:

```
npm run test
```

## 🐞 **Solución de problemas**

1. Asegúrate de tener Node.js instalado

```
   node -v
```

2. Limpia la caché e instala dependencias de nuevo

```
   rm -rf node_modules package-lock.json
   npm install
```
