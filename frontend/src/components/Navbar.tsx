import React from "react"
import { useState, useEffect } from "react";
import router from "next/router";
import Link from "next/link";
import axios from "axios";
import Swal from "sweetalert2";
const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const fetchRole = async () => {
    try {
      const email = localStorage.getItem("email")
      const res = await axios.post(`http://127.0.0.1:9000/api/v1/users/getrole`, {
        email
      })
      // console.log(res.data.role)
      // localStorage.setItem("role", res.data.role)
      if (res.data.role === "admin" || res.data.role==="superadmin") {
        setIsAdmin(true)
      }
    } catch (err: any) {
      // console.log("ERROR: ", err)
      // err.response.data.message
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.response.data.message
      });
    }
  }

  useEffect(() => {
    fetchRole()
  }, [])

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);


  const handleLogout = (e: any) => {
    // Remove the token from local storage on logout
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    // localStorage.removeItem("role");
    // Redirect to the login page after logout
    router.push("/login");
  };

  return (<>
    <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-xl tracking-tight">Exchange</span>
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
          <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="https://www.shopmyexchange.com/ux-responsive/images/exchange_x_logo.svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
        </button>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <Link href="/homepage" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
            Home
          </Link>
          <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
            About
          </a>
          <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white">
            Deals
          </a>
          {
            isAdmin ? (<Link href="/users" className="block ml-4 mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white">
              Role management
            </Link>) : (null)
          }
        </div>
        <div>
          {!isLoggedIn ? (
            <><Link href="/register" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0 mx-2">Register</Link><Link href="/login" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0 mx-2">SignIn</Link></>
          ) : (
            <Link href="#" onClick={handleLogout} className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0 mx-2">Logout</Link>
          )}
        </div>
        {/* <div>
      { isAdmin ?(<><Link href="/register" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0 mx-2">Register</Link><Link href="/login" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0 mx-2">SignIn</Link></>):(null)}
    </div> */}
      </div>
    </nav>
  </>)
}

export default Navbar