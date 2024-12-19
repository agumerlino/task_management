import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

const Layout = ({ children }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token'); // Verificar si hay un token en localStorage
  
    const handleLogout = () => {
      // Eliminar el token del localStorage
      localStorage.removeItem('token');
  
      // Redirigir al login después de cerrar sesión
      navigate('/login');
    };
  return (
    <div>
      {/* Barra de navegación fija */}
      <div className="navbar">
        <h2>Task Management</h2>
        <div className="button-container">
          <Link to="/" className="button">
            Home
          </Link>
          <Link to="/tasks" className="button">
            Tasks
          </Link>
          <Link to="/create-task" className="button">
            New Task
          </Link>

          {/* Mostrar Login si no hay token, de lo contrario mostrar Logout */}
          {token ? (
            <button onClick={handleLogout} className="button">
              Logout
            </button>
          ) : (
            <Link to="/login" className="button">
              Login
            </Link>
          )}
        </div>
      </div>
      {/* Contenido dinámico */}
      <div className="content">
        {children}
      </div>
    </div>
  );
};

export default Layout;