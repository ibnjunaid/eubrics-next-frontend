import { useRouter } from 'next/router';
import { ChangeEvent, useContext, useState } from "react";
import { AuthService } from "../services/auth.service";
import { AppContext, appContext } from './_app';

export default function Login() {
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const context = useContext<AppContext | null>(appContext);

  const router = useRouter();

  if(!context?.userCred?.access_token){
    return (
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
              a id nisi.
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  type="text"
                  placeholder="username"
                  className="input input-bordered"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setUsername(e.target.value);
                  }}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <div className="btn-group gap-2 items-center">
                <button
                  className="btn bg-primary rounded-none"
                  onClick={() => {
                    console.log(username, password);
                    if (!username || !password) {
                      throw new Error("Empty username or password");
                    }
                    AuthService.logIn(username, password)
                      .then((data) => {
                          context?.setUserCred({...data});
                          console.log(data);
                    });
                  }}
                >
                  Login
                </button>
                <button
                  className="btn bg-accent rounded-none"
                  onClick={() => {
                    console.log(username, password);
                    if (!username || !password) {
                      throw new Error("Empty username or password");
                    }
                    AuthService.signUp(username, password);
                  }}
                >
                  SignUp
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } 
  if(context?.selectedBehaviour?.behaviourId && context?.selectedBehaviour?.behaviourName){
    router.push(
      `/todo/${context?.selectedBehaviour?.behaviourId}?name=${encodeURIComponent(context?.selectedBehaviour?.behaviourName)}`
    );
  }
  else {
    router.push('/');
  }
}
