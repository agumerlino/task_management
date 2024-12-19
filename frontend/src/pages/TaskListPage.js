import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TaskItem from '../components/TaskItem';
import '../App.css';

// Estados para manejar tareas, error, paginación y filtro
const TaskListPage = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); 
  const [completedFilter, setCompletedFilter] = useState(null); 
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

// useEffect para verificar si el token existe antes de cargar las tareas
  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      fetchTasks();
    }
  }, [token, currentPage, completedFilter]); 

// Leer la URL base del backend desde el .env
const backendUrl = process.env.REACT_APP_BACKEND_URL;
console.log('Backend URL:', backendUrl);

// Obtener las tareas desde el servidor
  const fetchTasks = async () => {
    try {
      const params = {
        page: currentPage,
        limit: 4,
      };
      // Si hay un filtro de tareas completadas, lo agrego a los parámetros
      if (completedFilter !== null) {
        params.completed = completedFilter;
      }
      // Actualizo el estado con las tareas obtenidas
      const response = await axios.get(`${backendUrl}/api/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
        params: params 
      });

      setTasks(response.data.tasks);
      setTotalPages(Math.ceil(response.data.totalTasks / 4)); 
    } catch (err) {
      setError('Error al obtener tareas');
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleFilterChange = (filter) => {
    setCompletedFilter(filter);
    setCurrentPage(1); 
  };

  return (
    <div className="content">
      <h2>Task List</h2>

      {/* Filtro de tareas completadas */}
      <div>
        <button className="button" onClick={() => handleFilterChange(null)}>All</button>
        <button className="button" onClick={() => handleFilterChange(true)}>Completed</button>
        <button className="button" onClick={() => handleFilterChange(false)}>No completed</button>
      </div>

      {/* Mostrar lista de tareas */}
      <ul>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>

      {/* Paginación */}
      <div>
        <button className="button" onClick={handlePreviousPage} disabled={currentPage === 1}>
          Back
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button className="button" onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>

      {/* Mostrar mensaje de error si ocurre */}
      {error && <p>{error}</p>}
    </div>
  );
};

export default TaskListPage;