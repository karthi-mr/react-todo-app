import { useState } from 'react';

export default function TodoItem({ todo, onUpdateTodo, onDeleteTodo, onUpdateTodoStatus }) {
  const [isEditMode, setIsEditMode] = useState(true);
  const [editVal, setEditVal] = useState('');

  function handleUpdateTask() {
    onUpdateTodo(todo.id, editVal);
    setEditVal('');
    setIsEditMode(false);
  }

  return (
    <li className="bg-white dark:bg-black flex justify-between items-center px-4 py-2 rounded shadow-2xl">
      {isEditMode ? (
        <>
          <input
            type="text"
            className="py-1.5 px-4 border-2 dark:text-white"
            value={editVal}
            onChange={(e) => setEditVal(e.target.value)}
          />
          <button
            onClick={handleUpdateTask}
            className="text-white dark:text-white bg-green-800 hover:bg-green-600 font-semibold ml-10 px-4 py-1.5 rounded cursor-pointer">
            Update
          </button>
          <button
            className="text-white bg-red-800 hover:bg-red-600 font-semibold ml-0.5 px-4 py-1.5 rounded cursor-pointer"
            onClick={() => setIsEditMode(false)}>
            Cancel
          </button>
        </>
      ) : (
        <>
          <span
            className={`flex-1 cursor-pointer ${
              todo.isCompleted ? 'line-through text-gray-400' : ''
            }`}
            onClick={() => onUpdateTodoStatus(todo.id)}>
            {todo.text}
          </span>
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
