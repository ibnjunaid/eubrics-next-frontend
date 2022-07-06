import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Navbar from "../../components/navbar.component";
import { saveIcon } from "../../components/todoItem.component";
import { TodoInterface, TodoList } from "../../components/todoList.component.tsx";
import { TodoService } from '../../services/todo.service';
import { appContext, AppContext } from '../_app';

export default function Todo() {
  let router = useRouter();

  const [todos, setTodos] = useState<TodoInterface[]>([]);
  const [message, setMessage] = useState("");
  const context = useContext<AppContext | null>(appContext);

  function removeTodo(id: number) {
    const filteredTodos = todos.filter((todo) => todo.id !== id);
    setTodos([...filteredTodos]);
  }
  console.log(router);

  useEffect(() => {
    (async () => {
      const todos = await TodoService.listAllTodos(context?.userCred?.access_token!, Number(router.query.behaviourId));
      setTodos([...todos]);
    })()
    return () => {
      setTodos([])
    };
  },[])
  
  return (
    <>
      <Navbar></Navbar>

      <h1 className='antialiased font-bold text-lime-500 text-center mb-3'>{router.query.name}</h1>
      <div className="flex flex-col items-center justify-between">
        <div className="form-control w-screen">
          <div className="input-group justify-center w-screen">
            <span className="text-green-500">Task</span>
            <input
              type="text"
              placeholder="Search…"
              className="input input-bordered input-group-lg w-1/2"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                console.log(e.target.value);
              }}
            />
            <button
              className="btn btn-square"
              onClick={() => {
                console.log(context)
                if(context?.userCred?.access_token && context?.selectedBehaviour?.behaviourId){
                  TodoService
                      .addTodo(context?.userCred?.access_token, message, Number(router.query.behaviourId))
                      .then((todo: TodoInterface) => {
                        setTodos([...todos, todo])
                      });
                }
              }}
            >
              {saveIcon}
            </button>
          </div>
        </div>

        <div
          className="card w-1/2 h-2/3 
              overflow-y-scroll bg-white 
              flex items-center p-10 
              mt-40 gap-2 fixed shadow-md	"
        >
          <TodoList todos={todos} key={1} removeTodo={removeTodo} />
        </div>
      </div>
    </>
  );
}
