import { useState } from 'react';

export default function TodoForm({ onAddTodo }) {
  const [input, setInput] = useState('');

  function handleSumbit(e) {
    e.preventDefault();

    if (!input.trim())
      return;

    onAddTodo(input);
    setInput('');
  }

  return (
    <form onSubmit={handleSumbit} className="flex gap-2 mb-4">
      <input
        type="text"
        id="input"
        name="input"
        className="px-4 py-1.5 rounded w-64 shadow-2xl text-black dark:text-white"
        placeholder="Add a new task..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-1.5 rounded cursor-pointer">Add</button>
    </form>
  );
}