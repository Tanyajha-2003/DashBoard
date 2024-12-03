import React from 'react';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const tasks = useSelector(state => state.tasks.tasks);
  const completedTasks = tasks.filter(task => task.completed).length;
  const overdueTasks = tasks.filter(task => new Date(task.dueDate) < new Date() && !task.completed).length;

  return (
    <div className="container">
      <h1>Dashboard</h1>
      <div className="flex">
        <div className="card">
          <h4>Total Tasks</h4>
          <p>{tasks.length}</p>
        </div>
        <div className="card">
          <h4>Completed Tasks</h4>
          <p>{completedTasks}</p>
        </div>
        <div className="card">
          <h4>Overdue Tasks</h4>
          <p>{overdueTasks}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
