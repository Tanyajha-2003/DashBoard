import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => (
  <div className="sidebar">
    <h2>Task Manager</h2>
    <ul>
      <li><Link to="/dashboard">Dashboard</Link></li>
      <li><Link to="/tasks">Task List</Link></li>
      <li><Link to="/add">Add Task</Link></li>
    </ul>
  </div>
);

export default Sidebar;
