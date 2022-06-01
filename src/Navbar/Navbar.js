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
    <>
      <nav id="header" class="fixed w-full z-30 top-0 text-white bg-black bg-opacity-40 backdrop-filter backdrop-blur-lg">
      <div class="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2">
        <div class="flex items-center uppercase">
          <a class="text-indigo-500 no-underline hover:no-underline font-bold text-2xl lg:text-4xl flex items-center" href="/">
            <img className="w-56" src="../../img/glogo.svg" alt="logo" />
            
          </a>
        </div>
        <div class="block lg:hidden pr-4">
          <button id="nav-toggle" class="flex items-center p-1 text-pink-800 hover:text-gray-900 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
            <svg class="fill-current h-6 w-6" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div class="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden mt-2 lg:mt-0 bg-white lg:bg-transparent text-black p-4 lg:p-0 z-20" id="nav-content">
          <ul class="list-reset lg:flex justify-end flex-1 items-center">
            <li class="mr-3">
              <div class="inline-block py-2 px-4 text-white font-bold no-underline"><Link to={'/'}>Home</Link></div>
            </li>
            <li class="mr-3">
              <div class="inline-block text-white no-underline hover:text-gray-800 hover:text-underline py-2 px-4" href="#"><Link to={'/game'}>Game</Link></div>
            </li>
            <li class="mr-3">
              <div class="inline-block text-white no-underline hover:text-gray-800 hover:text-underline py-2 px-4" href="#"><Link to={'/leaderboard'}>Leaderboard</Link></div>
            </li>
          </ul>
          <button
            onClick={logout}
            id="navAction"
            class="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full mt-4 lg:mt-0 py-4 px-8 shadow opacity-75 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
          >
            Logout
          </button>
        </div>
      </div>
      <hr class="border-b border-gray-100 opacity-25 my-0 py-0" />
    </nav>
    </>
  )
}

export default Navbar