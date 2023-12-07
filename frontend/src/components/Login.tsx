import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import Swal from "sweetalert2";

const Login = () => {
  const router = useRouter();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post(
        "http://127.0.0.1:9000/api/v1/users/login",
        {
          email,
          password,
        },
      );
      // Store the token in local storage after successful login
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("email", response.data.data.user.email);
      // Redirect to the homepage after successful login
      router.push("/homepage");
    } catch (err: any) {
      // Handle login error
      // console.error("Login failed:", err.response.data.message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.response.data.message,
      });
    }
  };
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="w-full max-w-sm p-4 bg-teal-100 border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <form className="space-y-6" action="#" onSubmit={handleLogin}>
            <h5 className="text-xl font-medium text-gray-900 dark:text-white">
              Login to our platform
            </h5>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="name@company.com"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Login your account
            </button>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
              Not registered?{" "}
              <Link
                href="/register"
                className="text-blue-700 hover:underline dark:text-teal-800"
              >
                Create your account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
