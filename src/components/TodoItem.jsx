import { useState } from 'react';

const priorityColor = {
  High: 'bg-red-300 text-red-800 dark:bg-red-800 dark:text-red-300',
  Medium: 'bg-yellow-300 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-300',
  Low: 'bg-green-300 text-green-800 dark:bg-green-800 dark:text-green-300',
};

export default function TodoItem({ todo, onUpdateTodo, onDeleteTodo, onUpdateTodoStatus }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editVal, setEditVal] = useState('');
  const isOverDue = todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.isCompleted;

  function handleUpdateTask() {
    if (editVal.trim()) {
      onUpdateTodo(todo.id, editVal);
      setEditVal('');
    }
    setIsEditMode(false);
  }

  return (
    <li className="bg-white dark:bg-gray-800 flex px-4 py-2 rounded shadow-2xl items-start w-11/12 space-x-2  hover:dark:bg-amber-950 hover:bg-amber-200">
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
          <div className="w-full cursor-pointer" onClick={() => onUpdateTodoStatus(todo.id)}>
            <span
              className={`flex-1 ${
                todo.isCompleted ? 'line-through text-gray-400' : ''
              } transition-all duration-100`}>
              {todo.text}
            </span>
            <div className="text-sm text-gray-500 dark:text-gray-300 mt-1">
              <span
                className={`px-1.5 py-0.5 justify-items-center rounded-2xl ${
                  priorityColor[todo.priority]
                }`}>
                {todo.priority}
              </span>
              {isOverDue && <span className="px-2 py-0.5 font-semibold ml-2 rounded-2xl bg-pink-300 dark:bg-pink-900 text-black dark:text-white">
                Overdue!
                </span>}
              <span className="px-2 py-0.5 ml-2 rounded-2xl bg-orange-300 dark:bg-orange-800 text-black dark:text-white">
                {todo.dueDate || 'N/A'}
              </span>
            </div>
          </div>
          <div className="flex justify-center gap-2">
            <button
              className="text-white bg-green-800 hover:bg-green-600 font-semibold px-4 py-2 rounded cursor-pointer hover:transition duration-150 hover:scale-110"
              onClick={() => setIsEditMode((editMode) => !editMode)}>
              Edit
            </button>
            <button
              className="text-white bg-red-800 hover:bg-red-600 font-semibold px-4 py-2 rounded cursor-pointer hover:transition duration-150 hover:scale-110"
              onClick={() => onDeleteTodo(todo.id)}>
              Delete
            </button>
          </div>
        </>
      )}
    </li>
  );
}
