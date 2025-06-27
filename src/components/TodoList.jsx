import TodoItem from "./TodoItem";

export default function TodoList({ todos, onUpdateTodo, onDeleteTodo, onUpdateTodoStatus }) {
  return (
    <ul className="w-full max-w-md space-y-2">
      {todos.map(todo => (
        <TodoItem 
          key={todo.id} 
          todo={todo} 
          onUpdateTodo={onUpdateTodo} 
          onDeleteTodo={onDeleteTodo}
          onUpdateTodoStatus={onUpdateTodoStatus} />
      ))}
    </ul>
  );
}