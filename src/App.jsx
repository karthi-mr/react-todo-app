import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Header from './components/Header';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

export default function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = text => {
    const newTodo = {
      id: uuidv4(),
      text,
      isCompleted: false
    };
    setTodos([...todos, newTodo]);
  };

  const updateTodo = (id, text) => {
    setTodos(
      todos.map(todo => todo.id === id ? {...todo, text: text} : todo)
    );
  }

  const deleteTodo = id => {
    setTodos(
      todos.filter(todo => todo.id !== id)
    )
  }

  const updateTodoStatus = id => {
    setTodos(
      todos.map(todo => todo.id === id ? {...todo, isCompleted: !todo.isCompleted} : todo)
    )
  }

  return (
    <div className='min-h-screen bg-gray-100 flex flex-col items-center p-6'>
      <Header />
      <TodoForm onAddTodo={addTodo} />
      <TodoList todos={todos} onUpdateTodo={updateTodo} onDeleteTodo={deleteTodo} onUpdateTodoStatus={updateTodoStatus} />
    </div>
  );
}