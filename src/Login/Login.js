import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/dashboard");
  }, [user, loading, navigate]);
  return (
    <div className="w-full px-4">
      <div className="flex flex-col items-center justify-center h-screen">
          <div className="bg-white shadow rounded-3xl lg:w-1/3  md:w-1/2 w-full p-10 bg-opacity-40 backdrop-filter backdrop-blur-lg">
              <p tabindex="0" className="focus:outline-none text-2xl font-extrabold leading-6 text-gray-800">Login to your account</p>
              <p tabindex="0" className="focus:outline-none text-sm mt-4 font-medium leading-none text-gray-500">Don't have an account? <Link to="/register">Register</Link> now.</p>
              <button aria-label="Continue with google" className="transition duration-500 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 bg-white flex items-center w-full mt-10" onClick={signInWithGoogle}>
                <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/sign_in-svg2.svg" alt="google"/>
                  <p className="text-base font-medium ml-4 text-gray-700">Continue with Google</p>
              </button>
              <div className="w-full flex items-center justify-between py-5 mt-5">
                  <hr className="w-full bg-gray-400"/>
                  <p className="text-base font-medium leading-4 px-2.5 text-white">OR</p>
                  <hr className="w-full bg-gray-400"/>
                  </div>
                  <div>
                      <label id="email" className="text-sm font-medium leading-none text-gray-800">
                          Email
                      </label>
                      <input aria-labelledby="email" type="email" className="bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" value={email} onChange={(e) => setEmail(e.target.value)}/>
                  </div>
                  <div className="mt-6  w-full">
                      <label for="pass" className="text-sm font-medium leading-none text-gray-800">
                          Password
                      </label>
                    <div className="relative flex items-center justify-center">
                      <input id="pass" type="password" className="bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" value={password} onChange={(e) => setPassword(e.target.value)}/>
                      <div className="absolute right-0 mt-2 mr-3 cursor-pointer">
                        <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/sign_in-svg5.svg" alt="viewport"/>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end mt-5">
                    <Link to="/reset">Forgot Password</Link>
                  </div>
                  <div className="mt-8">
                      <button type="button" onClick={() => logInWithEmailAndPassword(email, password)} className="transition duration-500 hover:scale-105 border-0 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full">Login to my account</button>
                  </div>
              </div>
          </div>
      </div>
  );
}
export default Login;