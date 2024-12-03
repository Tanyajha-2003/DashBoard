import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TaskItem from './TaskItems';
import { setFilter, reorderTasks } from '../features/taskSlice';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const TaskList = () => {
  const tasks = useSelector(state => state.tasks.tasks);
  const filter = useSelector(state => state.tasks.filter);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    if (filter === 'overdue') return new Date(task.dueDate) < new Date();
    return true;
  });

  const searchTasks = filteredTasks.filter(task =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) return;

    // Reorder tasks based on drag position
    if (destination.index !== source.index) {
      const reorderedTasks = Array.from(tasks);
      const [movedTask] = reorderedTasks.splice(source.index, 1);
      reorderedTasks.splice(destination.index, 0, movedTask);

      dispatch(reorderTasks(reorderedTasks));
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Search tasks by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={() => dispatch(setFilter('all'))}>All Tasks</button>
        <button onClick={() => dispatch(setFilter('completed'))}>Completed</button>
        <button onClick={() => dispatch(setFilter('pending'))}>Pending</button>
        <button onClick={() => dispatch(setFilter('overdue'))}>Overdue</button>
      </div>
      
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <ul
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{ padding: 0 }}
            >
              {searchTasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...provided.draggableProps.style,
                        marginBottom: '10px',
                      }}
                    >
                      <TaskItem task={task} />
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default TaskList;
