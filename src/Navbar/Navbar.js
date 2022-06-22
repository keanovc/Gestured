import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { NavLink, useLocation, Link } from "react-router-dom";

const Navbar = () => {
    const location = useLocation();

    const [user, loading] = useAuthState(auth);
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
    }, [user, loading, navigate, fetchUserName]);

    const [open, setOpen] = useState(false);

    const toggleMenu = () => {
      setOpen(!open);
      console.log(open);
    };

    let navItems = [
      {
          href: "/dashboard",
          label: "Home",
      },
      {
          href: "/leaderboard",
          label: "Leaderboard",
      },
      {
          href: "/modes",
          label: "Modes",
      },
    ];

  return (
    <>
      <nav id="header" className="fixed w-full z-30 top-0 text-white bg-white border-b shadow-md  py-3">
      <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2">
        <div className="flex items-center uppercase">
          <Link to={'/dashboard'} className="text-indigo-500 no-underline  font-bold text-2xl lg:text-4xl flex items-center">
            <img className="w-56" src="../../img/gestured-logo.svg" alt="logo" />
          </Link>
        </div>
        <div className="block lg:hidden pr-4">
          <button onClick={toggleMenu} id="nav-toggle" className="flex items-center p-1 text-pink-800 hover:text-gray-900 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
            <svg className="fill-current h-6 w-6" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div className={`w-full flex-grow lg:flex lg:items-center lg:w-auto mt-2 lg:mt-0 bg-white lg:bg-transparent text-black p-4 lg:p-0 z-20 ${!open ? 'hidden' : ''}`} id="nav-content">
          <ul className="list-reset lg:flex justify-end flex-1 items-center">
              {navItems.map((navItem) => (
                <li className="nav-item mr-10" key={navItem.href}>
                    <NavLink
                        className={({isActive}) => (isActive ? 'font-bold text-black' : 'text-black transition-all')}
                        to={navItem.href}>
                        {navItem.label}
                    </NavLink>
                </li>
              ))}
          </ul>
          <button
            onClick={logout}
            id="navAction"
            className="mx-auto lg:mx-0 bg-indigo-500 hover:bg-indigo text-white font-bold rounded-full mt-4 lg:mt-0 py-3 px-8 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out shadow-md"
          >
            Logout
          </button>
        </div>
      </div>
      <hr className="border-b border-gray-100 opacity-25 my-0 py-0" />
    </nav>
    </>
  )
}

export default Navbar