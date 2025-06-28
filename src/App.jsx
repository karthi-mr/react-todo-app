import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Header from './components/Header';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import ThemeToggle from './components/ThemeToggle';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  function toggleTheme() {
    setDarkMode(!darkMode);
  }

  const addTodo = (text) => {
    const newTodo = {
      id: uuidv4(),
      text,
      isCompleted: false,
    };
    setTodos([...todos, newTodo]);
  };

  const updateTodo = (id, text) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, text: text } : todo)));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const updateTodoStatus = (id) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo))
    );
  };

  return (
    <div className="min-h-screen p-6 transition flex flex-col items-center bg-gray-100 dark:bg-gray-900 dark:text-white">
      <div className="border-0 py-3 px-5 shadow-xl shadow-gray-500 dark:shadow-xl dark:shadow-gray-700">
        <div className="max-w-xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <Header />
            <ThemeToggle onToggleTheme={toggleTheme} darkMode={darkMode} />
          </div>
        </div>
        <TodoForm onAddTodo={addTodo} />
        <TodoList
          todos={todos}
          onUpdateTodo={updateTodo}
          onDeleteTodo={deleteTodo}
          onUpdateTodoStatus={updateTodoStatus}
        />
      </div>
    </div>
  );
}
