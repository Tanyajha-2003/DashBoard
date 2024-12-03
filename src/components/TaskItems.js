import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask, markAsCompleted } from '../features/taskSlice';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';

const TaskItem = ({ task }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteTask(task.id)); 
    setIsModalOpen(false); 
  };

  // Handle Mark as Completed
  const handleMarkCompleted = () => {
    dispatch(markAsCompleted(task.id));
  };

  return (
    <div className="card">
      <h4>{task.title}</h4>
      <p>{task.description}</p>
      <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
      <p>
        Status: 
        <span className={`status ${task.completed ? 'completed' : ''}`}>
          {task.completed ? 'Completed' : 'Pending'}
        </span>
      </p>
      <div className="flex">
        <button className="btn" onClick={handleMarkCompleted} disabled={task.completed}>
          Mark as Completed
        </button>
        <Link to={`/edit/${task.id}`} className="btn-edit">
          Edit
        </Link>
        <button className="btn" onClick={() => setIsModalOpen(true)}>
          Delete
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)} 
        contentLabel="Confirm Deletion"
        ariaHideApp={false} 
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
          },
          content: {
            padding: '20px',
            borderRadius: '8px',
            width: '400px',
            height:'300px',
            margin: 'auto',
            backgroundColor: '#fff',
          },
        }}
      >
        <h2>Are you sure you want to delete this task?</h2>
        <p>This action cannot be undone.</p>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button onClick={handleDelete} style={{ backgroundColor: '#e74c3c', color: '#fff', padding: '10px 20px', borderRadius: '5px' }}>
            Yes, Delete
          </button>
          <button
            onClick={() => setIsModalOpen(false)}
            style={{ backgroundColor: '#2ecc71', color: '#fff', padding: '10px 20px', borderRadius: '5px' }}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default TaskItem;
