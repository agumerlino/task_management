const express = require('express');
const app = express();
const dotenv = require('dotenv');
const db = require("./database");
const jwt = require("jsonwebtoken");
const verifyToken = require("./middlewares/auth");
const cors = require('cors');   

dotenv.config();

app.use(cors());

app.use(express.json());

// Configurar el puerto 
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// Endpoint para autenticar al usuario y generar un token
app.post('/api/auth/login', async (req, res) => {
    const { username, password } = req.body;
  
    // Validar que se hayan enviado las credenciales
    if (!username || !password) {
      return res.status(400).json({ message: 'Por favor ingresa el nombre de usuario y la contraseña' });
    }
  
    // Verificar si el usuario existe en la base de datos
    try {
      const userResult = await db.query('SELECT id, username, password FROM users WHERE username = $1', [username]);
  
      // Si no se encuentra el usuario
      if (userResult.rows.length === 0) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }
  
      const user = userResult.rows[0];
  
      // Verificar si la contraseña es correcta
      if (password !== user.password) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }
  
      // Generar token JWT con el user_id y username
      const token = jwt.sign(
        { username: user.username, user_id: user.id }, // Incluir user_id en el token
        process.env.JWT_SECRET, 
        { expiresIn: '5h' }
      );
  
      // Devolver el token
      return res.json({ token });
  
    } catch (err) {
      return res.status(500).json({ message: 'Error al autenticar al usuario', error: err.message });
    }
  });
  
  //CRUD

// Obtener lista de tareas con paginación y filtrado
app.get("/api/tasks", verifyToken, async (req, res) => {
    try {
      const { page = 1, limit = 4, completed } = req.query;  // Obtener parámetros de la query
  
      let whereClause = "WHERE user_id = $1";
      let queryParams = [req.user.user_id];
  
      // Si el filtro de completado está presente, agregarlo a la cláusula WHERE
      if (completed !== undefined) {
        const isCompleted = completed === "true";
        whereClause += " AND completed = $2";
        queryParams.push(isCompleted);
      }
  
      // Paginación
      const offset = (page - 1) * limit;
  
      // Consulta con paginación y filtro
      const result = await db.query(
        `SELECT * FROM tasks ${whereClause} ORDER BY created_at ASC LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2}`,
        [...queryParams, limit, offset]
      );
  
      // Obtener el número total de tareas (sin paginación)
      const totalTasksResult = await db.query(
        `SELECT COUNT(*) FROM tasks ${whereClause}`,
        queryParams
      );
      const totalTasks = totalTasksResult.rows[0].count;
  
      // Devolver las tareas y el total de tareas
      res.json({
        tasks: result.rows,
        totalTasks: totalTasks,
      });
    } catch (err) {
      console.error("Error al obtener tareas:", err);
      res.status(500).json({ message: "Error al obtener tareas", error: err.message });
    }
  });

// CREAR TAREA
app.post("/api/tasks", verifyToken, async (req, res) => {
    const { title } = req.body;
  
    try {
      const userId = req.user.user_id;  // Suponiendo que req.user ya contiene el user_id
  
      // Verificar que user_id esté presente
      if (!userId) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
  
      // Insertar la tarea con el user_id correcto
      const result = await db.query(
        "INSERT INTO tasks (title, user_id) VALUES ($1, $2) RETURNING *",
        [title, userId]
      );
  
      // Devolver la tarea creada
      res.status(201).json(result.rows[0]);
    } catch (err) {
      res.status(500).json({
        message: "Error al crear la tarea",
        error: err.message,
        stack: err.stack,
      });
    }
  });

// ACTUALIZAR TAREA
app.patch("/api/tasks/:id", verifyToken, async (req, res) => {
    const { id } = req.params;  
    const { completed } = req.body; 
    
    try {
      // Consultar la tarea para asegurarse de que existe
      const taskCheckResult = await db.query(
        "SELECT * FROM tasks WHERE id = $1 AND user_id = $2", 
        [id, req.user.user_id] 
      );
      
      if (taskCheckResult.rowCount === 0) {
        return res.status(404).json({ message: "Tarea no encontrada" });
      }
      
      // Si la tarea existe, realizar la actualización
      const result = await db.query(
        "UPDATE tasks SET completed = $1 WHERE id = $2 AND user_id = $3 RETURNING *", 
        [completed, id, req.user.user_id] 
      );
      
      res.json(result.rows[0]);  
    } catch (err) {
      res.status(500).json({ message: "Error al actualizar la tarea", error: err.message });
    }
  });

//  ELIMINAR TAREA
app.delete("/api/tasks/:id", verifyToken, async (req, res) => {
    const { id } = req.params;  // ID de la tarea a eliminar

    try {
      // Eliminar la tarea que corresponde al id y al usuario autenticado
      const result = await db.query(
        "DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *",
        [id, req.user.user_id]
      );
  
      // Si no se encuentra ninguna tarea para eliminar
      if (result.rowCount === 0) {
        return res.status(404).json({ message: "Tarea no encontrada" });
      }
  
      // Enviar respuesta confirmando que la tarea fue eliminada
      res.json({ message: "Tarea eliminada exitosamente" });
    } catch (err) {
      res.status(500).json({ message: "Error al eliminar la tarea", error: err.message });
    }
  });