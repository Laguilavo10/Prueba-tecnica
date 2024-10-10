# Proyecto de Gestión de Proyectos

Este proyecto es una aplicación de gestión de proyectos que permite a los usuarios crear, editar y eliminar proyectos, así como asignar tareas a los usuarios. La aplicación está construida utilizando tecnologías modernas de frontend y backend.

## Tecnologías Utilizadas

### Frontend

- **React**: Biblioteca de JavaScript para construir interfaces de usuario.
- **Next.js**: Framework de React para aplicaciones web con renderizado del lado del servidor.
- **TypeScript**: Un superconjunto de JavaScript que añade tipos estáticos.
- **Tailwind CSS**: Framework de CSS para un diseño rápido y responsivo.


### Backend

- **Node.js**: Entorno de ejecución de JavaScript del lado del servidor.
- **Prisma**: ORM para Node.js y TypeScript.
- **JWT (JSON Web Tokens)**: Para autenticación y autorización.
- **PostgreSQL**: Base de datos relacional.

## Funcionalidades

### Autenticación

- **Inicio de sesión**: Los usuarios pueden iniciar sesión con su correo electrónico y contraseña.
- **Protección de rutas**: Las rutas están protegidas mediante middleware que verifica la presencia y validez de un token JWT.

### Gestión de Proyectos

- **Crear Proyecto**: Los ADMINS pueden crear nuevos proyectos.
- **Listar Proyectos**: Los usuarios pueden ver una lista de sus proyectos, unicamente en los que tengan tareas, los ADMIN pueden ver todo.
- **Editar Proyecto**: Los ADMIN pueden editar los detalles de un proyecto.
- **Eliminar Proyecto**: Los ADMIN pueden eliminar proyectos.

### Gestión de Tareas

- **Asignar Tareas**: Los ADMIN pueden asignar tareas a otros usuarios.
- **Listar Tareas**: Los usuarios pueden ver una lista de tareas unicamente las asignadas a ellos.
- **Actualizar Estado de Tareas**: Los usuarios pueden actualizar el estado de las tareas.

## Credenciales para prueba

- **ADMIN**: email: hernandezsamuel@gmail.com, password: Prueba123

- **USUARIO**: email: rodriguezjuan@gmail.com, password: Prueba123

## OPCIONES DE MEJORA

Debido al tiempo de la prueba, quedan muchas opciones de mejora, entre ellos:

- Mejorar tiempos de carga
- Añadir mejores loaders para mejorar la UI/UX
- Utilizar una arquitectura
- Agregar la funcionalidad de añadir más usuarios
