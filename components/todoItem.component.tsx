import { useContext, useState } from "react";
import { AppContext, appContext } from '../pages/_app';
import { TodoService } from '../services/todo.service';

interface TodoItemProps {
  id:number;
  message: string;
  removeTodo: (id: number) => void
}

const editIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
    <path
      fillRule="evenodd"
      d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
      clipRule="evenodd"
    />
  </svg>
);

export const saveIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="green"
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    />
  </svg>
);

export function TodoItem(TodoItemProps: TodoItemProps) {
  const [message, setMessage] = useState(TodoItemProps.message);
  const [isDisabled, setDisabled] = useState(true);
  const context = useContext<AppContext| null>(appContext);

  return (
    <div className="form-control w-screen">
      <div className="input-group justify-center w-screen">
        <button className="btn btn-square" onClick={()=> {
          TodoService.removeTodo(context?.userCred?.access_token!, TodoItemProps.id)
            .then(() => {
              TodoItemProps.removeTodo(TodoItemProps.id);
            })
        }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="red"
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <input
          type="text"
          placeholder="Search…"
          className="input input-bordered input-group-lg w-1/3"
          value={message}
          disabled={isDisabled}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <button
          className="btn btn-square"
          onClick={() => {
            if(isDisabled === false){
              TodoService.editTodo(context?.userCred?.access_token!, message, TodoItemProps.id)
                .then(() => console.log('Todo updated'));
            }
            setDisabled(!isDisabled);
          }}
        >
          {isDisabled ? editIcon : saveIcon}
        </button>
      </div>
    </div>
  );
}
