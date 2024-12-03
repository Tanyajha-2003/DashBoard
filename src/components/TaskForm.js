import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { addTask, updateTask } from '../features/taskSlice';

const TaskForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Retrieve the task to edit
  const taskToEdit = useSelector((state) =>
    state.tasks.tasks.find((task) => task.id === parseInt(id))
  );

  // Form state for task fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (taskToEdit) {
      // Populate form fields with existing task data if editing
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setDueDate(taskToEdit.dueDate);
    }
  }, [taskToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedTaskData = {
      id: taskToEdit ? taskToEdit.id : Date.now(), 
      title,
      description,
      dueDate,
      completed: taskToEdit ? taskToEdit.completed : false, 
    };

    if (taskToEdit) {
      dispatch(updateTask({ id: taskToEdit.id, updatedData: updatedTaskData })); 
    } else {
      dispatch(addTask(updatedTaskData));
    }

    navigate('/tasks'); 
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task Title"
        required
        className="form-input"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task Description"
        required
        className="form-input"
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
        className="form-input"
      />
      <button type="submit" className="btn btn-primary">
        {taskToEdit ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  );
};

export default TaskForm;


