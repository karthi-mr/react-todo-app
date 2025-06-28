import { useEffect, useState } from 'react';
import Header from './components/Header';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import ThemeToggle from './components/ThemeToggle';
import { predefinedTasks } from './utils/sampleTasks';
import FilterBar from './components/FilterBar';

// setting dark mode to true initially
const setDarkModeInitially = true;

// preDefined filters with priority and status
const filtersDefined = { priority: '', status: '' };

export default function App() {
  const [todos, setTodos] = useState(predefinedTasks); // creating state for tasks
  const [darkMode, setDarkMode] = useState(setDarkModeInitially); // creating state for theme
  const [filters, setFilters] = useState(filtersDefined); // creating state for filters

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  function toggleTheme() {
    setDarkMode(!darkMode);
  }

  const addTodo = (newTodo) => {
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

  /* Function to get filtered todos based on priority and status */
  function getFiltersTodos() {
    return todos.filter((todo) => {
      const matchedPriority = filters.priority ? todo.priority === filters.priority : true;
      const matchedStatus =
        filters.status === 'completed'
          ? todo.isCompleted
          : filters.status === 'active'
          ? !todo.isCompleted
          : true;
      return matchedPriority && matchedStatus;
    });
  }

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
        <FilterBar filters={filters} setFilters={setFilters} />
        <TodoList
          todos={getFiltersTodos()}
          onUpdateTodo={updateTodo}
          onDeleteTodo={deleteTodo}
          onUpdateTodoStatus={updateTodoStatus}
        />
      </div>
    </div>
  );
}
