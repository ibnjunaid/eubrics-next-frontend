import { useRouter } from "next/router";
import { ChangeEvent, useContext, useState } from "react";
import Navbar from '../components/navbar.component';
import { AuthService } from "../services/auth.service";
import { AppContext, appContext } from "./_app";

export default function Login() {
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [isSignUpSucess, setSignUpSuccess] = useState<boolean>(false);
  const [signUpStarted, setSignUpStarted] = useState<boolean>(false);

  const context = useContext<AppContext | null>(appContext);

  const router = useRouter();

  if (!context?.userCred?.access_token) {
    return (
      <>
              <Navbar></Navbar>
      <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae
            et a id nisi.
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
                  AuthService.logIn(username, password).then((data) => {
                    context?.setUserCred({ ...data });
                    console.log(data);
                  });
                }}
              >
                Login
              </button>
              <button
                className="btn bg-orange-800 rounded-none"
                onClick={() => {
                  console.log(username, password);
                  if (!username || !password) {
                    throw new Error("Empty username or password");
                  }
                  setSignUpStarted(true);
                  AuthService.signUp(username, password).then(() => {
                    setSignUpSuccess(true);
                    setSignUpStarted(false);
                    setTimeout(() => {
                      setSignUpSuccess(false);
                    },3000)
                  });
                }}
              >
                {signUpStarted ? 'Signin...' : 'SignUp'}
              </button>
            </div>
            {isSignUpSucess ? (
              <div className="alert alert-success shadow-lg">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current flex-shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Signup sucess please login now!</span>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
      </>
    );
  }
  if (
    context?.selectedBehaviour?.behaviourId &&
    context?.selectedBehaviour?.behaviourName
  ) {
    router.push(
      `/todo/${
        context?.selectedBehaviour?.behaviourId
      }?name=${encodeURIComponent(context?.selectedBehaviour?.behaviourName)}`
    );
  } else {
    router.push("/");
  }
}
