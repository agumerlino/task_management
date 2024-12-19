import React from 'react';
import axios from 'axios';
import '../App.css';

// Componente funcional que representa un solo elemento de tarea
const TaskItem = ({ task }) => {
  const token = localStorage.getItem('token');

    // Leer la URL base del backend desde el .env
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    console.log('Backend URL:', backendUrl);

  //Marcar tarea como completada, solicitud PATCH al servidor
  const handleComplete = async () => {
    try {
      await axios.patch(`${backendUrl}/api/tasks/${task.id}`, 
        { completed: true }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      window.location.reload(); 
    } catch (err) {
      alert('Error al completar tarea');
    }
  };

  //Eliminar tarea, solicitud DELETE al servidor
  const handleDelete = async () => {
    try {
      await axios.delete(`${backendUrl}/api/tasks/${task.id}`, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      window.location.reload();
    } catch (err) {
      alert('Error al eliminar tarea');
    }
  };

  return (
    <li className={task.completed ? 'completed' : ''}>
      <span>{task.title}</span>
      {!task.completed && (
        <button className="complete-button" onClick={handleComplete}>
          Complete task
        </button>
      )}
      {task.completed && <span className="completed-text">Completed</span>}
      <button className="delete-button" onClick={handleDelete}>
        Delete
      </button>
    </li>
  );
};

export default TaskItem;