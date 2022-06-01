import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { Link } from "react-router-dom";

const Navbar = () => {

    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const navigate = useNavigate();
    const fetchUserName = async () => {
      try {
        const q = query(collection(db, "users"), where("uid", "==", user?.uid));
        const doc = await getDocs(q);
        const data = doc.docs[0].data();
        setName(data.name);
      } catch (err) {
      }
    };
    useEffect(() => {
      if (loading) return;
      if (!user) return navigate("/");
      fetchUserName();
    }, [user, loading]);

    const [open, setOpen] = useState(false);

    const toggleMenu = () => {
      setOpen(!open);
    };



  return (
    <nav class="flex items-center justify-between flex-wrap bg-gray-800 p-6 text-white">
    <div class="flex items-center flex-no-shrink text-white mr-6">
      <span class="font-semibold text-xl tracking-tight">Gestured</span>
    </div>
    <div class=''>
      <button onClick={toggleMenu} class="flex items-center px-3 py-2 border rounded text-teal-lighter border-teal-light hover:text-white hover:border-white">
        <svg class="h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
      </button>
    </div>
    <div class={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${ !open ? 'hidden' : ''}`}>
      <div class="text-sm lg:flex-grow">
        <div class="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white mr-4">
          <Link to={'/'}>Home</Link>
        </div>
        <div class="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white mr-4">
          <Link to={'/game'}>Game</Link>
        </div>
      </div>
      <div>
        <div>{name}</div>
        <div>{user?.email}</div>
      </div>
      <div>
        <div onClick={logout} class="ml-5 cursor-pointer inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal hover:bg-gray-500 mt-4 lg:mt-0">Logout</div>
      </div>
    </div>
  </nav>

  )
}

export default Navbar