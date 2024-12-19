# Task Management App

Este proyecto es una aplicación de gestión de tareas que incluye un **frontend** desarrollado con React y un **backend** construido con Node.js y Express. La app permite a los usuarios autenticarse, gestionar tareas con filtros y paginación, y realizar operaciones CRUD.

## Tabla de Contenidos
1. [Requisitos Previos]
2. [Configuración del Backend]
3. [Configuración del Frontend]
4. [Levantar el Proyecto]
5. [Endpoints del Backend]


---

1. Requisitos Previos

Antes de comenzar, asegúrate de tener las siguientes herramientas instaladas en tu sistema:

- **Node.js** (versión 16 o superior)
- **npm** (se incluye con Node.js) 
- **PostgreSQL** (versión 12 o superior)
- **Git** (opcional, pero recomendado para clonar el repositorio)

---

2. Configuración del Backend

- Clonar el repositorio:
   
  git clone -b master https://github.com/agumerlino/task_management.git


Dependencias necesarias: 
Backend (/backend):

   - **express**
   - **knex**
   - **pg**
   - **jsonwebtoken**

   Comando: npm install express knex pg jsonwebtoken

- Configurar variables de entorno:

   Crea un archivo .env en el directorio del backend.
   Agrega las siguientes variables al archivo .env:

PORT=4000
JWT_SECRET=tu_secreto_super_seguro
DATABASE_URL=postgres://usuario:contraseña@localhost:5432/nombre_de_tu_base

   Asegúrate de reemplazar usuario, contraseña, localhost, 5432, y nombre_de_tu_base con los valores correctos para tu entorno de PostgreSQL.

- Configurar la base de datos:

Crea la base de datos en PostgreSQL con el nombre que configuraste en .env:
   
   CREATE DATABASE nombre_de_tu_base;

- Ejecutar migraciones:

Para crear las tablas necesarias en la base de datos, ejecuta:
   
   npx knex migrate:latest

---

3. Configuracion del Frontend

Dependencias necesarias: 
Frontend (/frontned): 

   - **react**
   - **react-dom**
   - **axios**
   - **react-router-dom**

   Comando: npm install react react-dom axios react-router-dom

- Configurar variables de entorno:

  Crea un archivo .env en el directorio frontend con el siguiente contenido:

REACT_APP_API_URL=(URL DE TU BACKEND)

---

4. Levantar el proyecto

- Levantar el servidor backend: 

   Ejecuta el siguiente comando en el directorio de tu backend:

   Comando para producccion:
  
npm start

   Comando para desarrollo:

npm run dev

- Levantar el servidor frontend: 

npm start

---

5. Endpoints del Backend:

1. POST /api/auth/login
Autenticación de usuario y generación de token JWT.

Request:
{
  "username": "admin",
  "password": "12345"
}

Response:
{
  "token": "<jwt-token>"
}

2. GET /api/tasks
Obtener todas las tareas asociadas al usuario autenticado.

Headers:

Authorization: Bearer <jwt-token>

Response:
{
  "tasks": [
    {
      "id": 1,
      "title": "Tarea 1",
      "completed": false,
      "user_id": 1,
      "created_at": "2024-12-16T12:00:00Z"
    }
  ]
}

3. POST /api/tasks
Crear una nueva tarea.

Request:
{
  "title": "Nueva tarea"
}

Response:
{
  "id": 3,
  "title": "Nueva tarea",
  "completed": false,
  "user_id": 1,
  "created_at": "2024-12-16T12:10:00Z"
}

4. PATCH /api/tasks/:id
Actualizar el estado de completado de una tarea.

Request:
{
  "completed": true
}

Response:
{
  "id": 1,
  "title": "Tarea 1",
  "completed": true,
  "user_id": 1,
  "created_at": "2024-12-16T12:00:00Z"
}

5. DELETE /api/tasks/:id
Eliminar una tarea.

Response:
{
  "message": "Tarea eliminada exitosamente"
}



