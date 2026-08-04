# APOD - Astronomy Picture of the Day

![APOD](https://img.shields.io/badge/status-active-success)
![License](https://img.shields.io/badge/license-MIT-blue)

Aplicación web que permite explorar el archivo de imágenes astronómicas de la NASA, consultando por fecha y guardando tus favoritos.

## 🚀 URL Deploy

URL Deploy = https://camilobermeo.github.io/apod/

## 📋 Descripción del Proyecto

APOD (Astronomy Picture of the Day) es una aplicación interactiva que utiliza la API de la NASA para mostrar la imagen astronómica del día correspondiente a cualquier fecha desde el 16 de junio de 1995 hasta la actualidad.

### Características Principales

- **🔍 Consulta por Fecha**: Navega a través de más de 25 años de imágenes astronómicas
- **⭐ Sistema de Favoritos**: Guarda tus imágenes favoritas en el almacenamiento local
- **📱 Diseño Responsivo**: Interfaz adaptada para diferentes dispositivos
- **🎨 Interfaz Moderna**: Diseño limpio con estética espacial
- **🎬 Soporte Multimedia**: Visualiza tanto imágenes como videos
- **💾 Persistencia Local**: Tus favoritos se guardan en el navegador

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Estilos y diseño responsivo
- **JavaScript Vanilla**: Lógica de la aplicación
- **NASA APOD API**: Fuente de datos astronómicos
- **Bootstrap 5**: Framework CSS para componentes
- **Font Awesome**: Iconos

## 📁 Estructura del Proyecto

```
apod/
├── css/
│   ├── style.css          # Estilos principales y calendario
│   └── favoritos.css      # Estilos específicos de favoritos
├── js/
│   ├── app.js             # Lógica principal del calendario
│   └── favoritos.js       # Lógica de gestión de favoritos
├── index.html             # Página principal con calendario
├── favoritos.html         # Página de favoritos
├── package.json           # Dependencias del proyecto
└── README.md              # Documentación del proyecto
```

## 🚀 Instalación y Ejecución

### Requisitos Previos

- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Servidor local (opcional, para desarrollo)

### Pasos de Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/CamiloBermeo/apod.git
```

2. Navegar al directorio del proyecto:
```bash
cd apod
```

3. Instalar dependencias (opcional):
```bash
npm install
```

### Ejecución Local

Usa Live Server (extensión de VS Code) para ejecutar el proyecto localmente.

## 🎯 Funcionalidades

### Consulta de Imágenes

1. **Por fecha específica**: Utiliza el calendario para seleccionar cualquier fecha
2. **Imagen del día**: Click en "Consultar la imagen de hoy" para ver la actual
3. **Validación**: El sistema valida que la fecha esté dentro del rango disponible

### Sistema de Favoritos

1. **Agregar**: Click en "Agregar a Favorito" en cualquier imagen
2. **Visualizar**: Navega a la sección de favoritos para ver tus imágenes guardadas
3. **Eliminar**: Remueve imágenes de favoritos con un solo click
4. **Persistencia**: Los favoritos se mantienen incluso después de cerrar el navegador

## 👥 Equipo de Desarrollo

- **Camilo Bermeo** - Desarrollador FullStack
- **Estefania Mancipe** - Desarrollador FullStack
- **Bryan Camilo Diaz Sanchez** - Desarrollador FullStack
- **Angélica García** - Desarrollador FullStack

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 🔗 Recursos

- [NASA APOD API](https://api.nasa.gov/)
- [Documentación de la API](https://api.nasa.gov/api-docs/)
- [Repositorio GitHub](https://github.com/CamiloBermeo/apod)

## 🐛 Issues y Contribuciones

Para reportar issues o contribuir al proyecto, por favor visita el [repositorio en GitHub](https://github.com/CamiloBermeo/apod).

---

**Desarrollado con ❤️ para explorar el universo**

