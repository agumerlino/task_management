import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import TaskListPage from './pages/TaskListPage';
import CreateTaskPage from './pages/CreateTaskPage';
import Layout from './components/Layout'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><h2>Welcome to Task Management!</h2></Layout>} />
        <Route path="/tasks" element={<Layout><TaskListPage /></Layout>} />
        <Route path="/create-task" element={<Layout><CreateTaskPage /></Layout>} />
        <Route path="/login" element={<Layout><LoginPage /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;
