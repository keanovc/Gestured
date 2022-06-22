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
    <div className="w-full px-4 bg-gradient-to-tl from-[#EE7A6E] to-[#8D5EF0]">
      <div className="flex flex-col items-center justify-center h-screen">
          <div className="bg-white shadow rounded-3xl lg:w-1/3  md:w-1/2 w-full p-10 bg-opacity-40 backdrop-filter backdrop-blur-lg">
              <p tabIndex="0" className="focus:outline-none text-2xl font-extrabold leading-6 text-gray-800">Forgot your password?</p>
              <Link to="/"><p tabIndex="0" className="focus:outline-none text-sm mt-4 font-medium leading-none text-gray-500">Remember it again? Login now.</p></Link>
                  <div className="mt-5">
                      <label id="email" className="text-sm font-medium leading-none text-gray-800">
                          Email
                      </label>
                      <input aria-labelledby="email" type="email" className="bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" value={email} onChange={(e) => setEmail(e.target.value)}/>
                  </div>
                  <div className="mt-8">
                      <button onClick={() => sendPasswordReset(email)} className="transition duration-500 hover:scale-105 border-0 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full">Send password reset email</button>
                  </div>
            </div>
        </div>
    </div>
  </>
  );
}
export default Reset;