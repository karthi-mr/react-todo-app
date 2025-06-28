import { useState } from 'react';

const priorityColor = {
  High: 'text-red-500',
  Medium: 'text-yellow-500',
  Low: 'text-green-500',
};

const completedPriorityColor = {
  High: 'text-red-800',
  Medium: 'text-yellow-800',
  Low: 'text-green-800',
};

export default function TodoItem({ todo, onUpdateTodo, onDeleteTodo, onUpdateTodoStatus }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editVal, setEditVal] = useState('');

  function handleUpdateTask() {
    if (editVal.trim()) {
      onUpdateTodo(todo.id, editVal);
      setEditVal('');
    }
    setIsEditMode(false);
  }

  return (
    <li className="bg-white dark:bg-gray-800 flex px-4 py-2 rounded shadow-2xl items-start w-full space-x-2">
      {isEditMode ? (
        <>
          <input
            type="text"
            className="py-1 px-4 border-2 w-full dark:text-white"
            value={editVal}
            onChange={(e) => setEditVal(e.target.value)}
          />
          <button
            onClick={handleUpdateTask}
            className="text-white dark:text-white bg-green-800 hover:bg-green-600 font-semibold px-4 py-1.5 rounded cursor-pointer ml-auto">
            Update
          </button>
          <button
            className="text-white bg-red-800 hover:bg-red-600 font-semibold px-4 py-1.5 rounded cursor-pointer"
            onClick={() => setIsEditMode(false)}>
            Cancel
          </button>
        </>
      ) : (
        <>
          <div
            className="w-full cursor-pointer"
            onClick={() => onUpdateTodoStatus(todo.id)}>
            <span className={`flex-1 ${
              todo.isCompleted ? 'line-through text-gray-400' : ''
            } transition-all duration-100`}>{todo.text}</span>
            <div className="text-sm text-gray-500 dark:text-gray-300">
              <span className={`${todo.isCompleted ? completedPriorityColor[todo.priority] : priorityColor[todo.priority]}`}>
                {todo.priority} | Due: {todo.dueDate || 'N/A'}
              </span>
            </div>
          </div>
          <button
            className="text-white bg-green-800 hover:bg-green-600 font-semibold ml-10 px-4 py-1.5 rounded cursor-pointer"
            onClick={() => setIsEditMode((editMode) => !editMode)}>
            Edit
          </button>
          <button
            className="text-white bg-red-800 hover:bg-red-600 font-semibold ml-0.5 px-4 py-1.5 rounded cursor-pointer"
            onClick={() => onDeleteTodo(todo.id)}>
            Delete
          </button>
        </>
      )}
    </li>
  );
}
