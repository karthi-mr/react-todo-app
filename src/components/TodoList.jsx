import TodoItem from "./TodoItem";

export default function TodoList({ todos, onUpdateTodo, onDeleteTodo, onUpdateTodoStatus }) {
  return (
    <ul className="w-full max-w-xl space-y-4 mx-5 my-6">
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