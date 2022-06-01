import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth, sendPasswordReset } from "../firebase";

function Reset() {
  const [email, setEmail] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
  }, [user, loading]);
  return (
  <>
    <div class="h-full bg-gradient-to-tl from-green-400 to-indigo-900 w-full py-56 px-4">
      <div class="flex flex-col items-center justify-center">
          <div class="bg-white shadow rounded lg:w-1/3  md:w-1/2 w-full p-10">
              <p tabindex="0" class="focus:outline-none text-2xl font-extrabold leading-6 text-gray-800">Forgot your password?</p>
              <p tabindex="0" class="focus:outline-none text-sm mt-4 font-medium leading-none text-gray-500">Remember it again? <Link to="/">Login now.</Link></p>
                  <div className="mt-5">
                      <label id="email" class="text-sm font-medium leading-none text-gray-800">
                          Email
                      </label>
                      <input aria-labelledby="email" type="email" class="bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" value={email} onChange={(e) => setEmail(e.target.value)}/>
                  </div>
                  <div class="mt-8">
                      <button role="button" onClick={() => sendPasswordReset(email)} class="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full">Send password reset email</button>
                  </div>  
            </div>
        </div>
    </div>
  </>
  );
}
export default Reset;