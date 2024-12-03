import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';  

const initialState = {
  tasks: [
    { id: 1, title: 'Sample Task 1', description: 'This is a task', dueDate: '2024-12-01', completed: false },
    { id: 2, title: 'Sample Task 2', description: 'This is another task', dueDate: '2024-12-05', completed: true },
  ],
  filter: 'all', 
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newTask = { ...action.payload, id: uuidv4() };  
      state.tasks.push(newTask);
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    markAsCompleted: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) task.completed = true;
    },
    updateTask: (state, action) => {
      const { id, updatedData } = action.payload;
      const taskIndex = state.tasks.findIndex((task) => task.id === id);
      if (taskIndex !== -1) {
        state.tasks[taskIndex] = updatedData;
      }
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    reorderTasks: (state, action) => {
      state.tasks = action.payload;
    },
  },
});

export const { addTask, deleteTask, markAsCompleted, updateTask, setFilter, reorderTasks } = taskSlice.actions;

export default taskSlice.reducer;
