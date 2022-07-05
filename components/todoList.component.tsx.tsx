import { TodoItem } from "./todoItem.component";

export interface TodoInterface {
  message: string;
  id: number;
}

interface TodoListProps {
  todos: TodoInterface[];
  removeTodo: (id: any) => void;
}

export function TodoList(props: TodoListProps) {
  return (
    <>
      {props.todos.map((todo, index) => (
        <TodoItem
          message={todo.message}
          id={todo.id}
          key={index}
          removeTodo={props.removeTodo}
        />
      ))}
    </>
  );
}
