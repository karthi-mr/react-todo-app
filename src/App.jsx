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
// priority map
const priorityMap = {High: 1, Medium: 2, Low: 3}

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
    let result = todos.filter((todo) => {
      const matchedPriority = filters.priority ? todo.priority === filters.priority : true;
      const matchedStatus =
        filters.status === 'completed'
          ? todo.isCompleted
          : filters.status === 'active'
          ? !todo.isCompleted
          : true;
      return matchedPriority && matchedStatus;
    });

    if (filters.sortBy === 'dueDate') {
      result.sort((todo1, todo2) => new Date(todo1.dueDate) - new Date(todo2.dueDate));
    } else if (filters.sortBy === 'priority') {
      result.sort((todo1, todo2) => priorityMap[todo1.priority] - priorityMap[todo2.priority]);
    }
    return result;
  }

  return (
    <div className="p-9 transition flex flex-col items-center">
      <div className="w-3xl border-0 py-3 px-5 shadow-xl shadow-gray-500 dark:shadow-xl dark:shadow-gray-700">
        <div className="max-w-xl mx-auto">
          <div className="mb-4 flex-row">
            <div className="flex justify-center"><Header /></div>
            <div className="flex justify-end"><ThemeToggle onToggleTheme={toggleTheme} darkMode={darkMode} /></div>
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
