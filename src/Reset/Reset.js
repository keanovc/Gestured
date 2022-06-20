import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth, sendPasswordReset } from "../firebase";

function Reset() {
  const [email, setEmail] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
  }, [user, loading, navigate]);
  return (
  <>
    <div class="w-full px-4">
      <div class="flex flex-col items-center justify-center h-screen">
          <div class="bg-white shadow rounded-3xl lg:w-1/3  md:w-1/2 w-full p-10 bg-opacity-40 backdrop-filter backdrop-blur-lg">
              <p tabindex="0" class="focus:outline-none text-2xl font-extrabold leading-6 text-gray-800">Forgot your password?</p>
              <p tabindex="0" class="focus:outline-none text-sm mt-4 font-medium leading-none text-gray-500">Remember it again? <Link to="/">Login now.</Link></p>
                  <div className="mt-5">
                      <label id="email" class="text-sm font-medium leading-none text-gray-800">
                          Email
                      </label>
                      <input aria-labelledby="email" type="email" class="bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" value={email} onChange={(e) => setEmail(e.target.value)}/>
                  </div>
                  <div class="mt-8">
                      <button onClick={() => sendPasswordReset(email)} class="transition duration-500 hover:scale-105 border-0 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full">Send password reset email</button>
                  </div>
            </div>
        </div>
    </div>
  </>
  );
}
export default Reset;