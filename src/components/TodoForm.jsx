import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {API_BASE_URL} from '../api/config';

const defaultPriority = 'Medium';

export default function TodoForm({ onAddTodo }) {
  const [input, setInput] = useState('');
  const [priority, setPriority] = useState(defaultPriority);
  const [dueDate, setDueDate] = useState('');

  async function handleSumbit(e) {
    e.preventDefault();

    if (!input.trim()) return;

    const newTodo = {
      id: uuidv4(),
      text: input,
      priority,
      dueDate,
      isCompleted: false,
    };

    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: newTodo.text, priority: newTodo.priority, dueDate: newTodo.dueDate, completed: false })
    });

    const saved = await response.json();

    onAddTodo(saved);
    setPriority(defaultPriority);
    setInput('');
    setDueDate('');
  }

  return (
    <form onSubmit={handleSumbit} className="flex gap-2 mb-4">
      <input
        type="text"
        id="input"
        name="input"
        className="px-4 py-1.5 rounded w-64 shadow-2xl text-black dark:text-white border dark:bg-gray-800 dark:border-gray-600"
        placeholder="Add a new task..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div className="flex gap-2">
        <select
          className="flex-1 px-3 py-2 border rounded dark:bg-gray-800 dark:border-gray-600"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
        <input
          type="date"
          className="flex-1 px-2 py-2 border rounded text-black dark:text-white dark:bg-gray-800 dark:border-gray-600"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>
      <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-1.5 rounded cursor-pointer hover:transition-all duration-150 hover:scale-90">
        Add
      </button>
    </form>
  );
}
