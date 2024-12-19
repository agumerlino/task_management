import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const CreateTaskPage = () => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

   // Verificar si el usuario está autenticado
   useEffect(() => {
    if (!token) {
      // Si no hay token, redirigir al login
      navigate('/login');
    }
  }, [token, navigate]);

  // Leer la URL base del backend desde el .env
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  console.log('Backend URL:', backendUrl);

  //Crear tarea, solicitud POST al servidor
  const handleCreateTask = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${backendUrl}/api/tasks`, 
        { title }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate('/tasks'); 
    } catch (err) {
      setError('Error al crear tarea');
    }
  };

  return (
    <div className="content">
      <h2 className="form-title">Create New Task</h2>
      <form onSubmit={handleCreateTask} className="task-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Enter task title"
          />
        </div>
        {error && <p className="error-text">{error}</p>}
        <button type="submit" className="submit-button">
          Create Task
        </button>
      </form>
    </div>
  );
};

export default CreateTaskPage;