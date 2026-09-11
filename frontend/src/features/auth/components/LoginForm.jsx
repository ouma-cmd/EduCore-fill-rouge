import { useState } from "react";
import loginAxios from "../../../services/axion";
import logo from "../../../assets/Educore.png";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  function handlchangeEmail(e) {
    setEmail(e.target.value);
  }
  function handlchangePass(e) {
    setPass(e.target.value);
  }
  function handlSubmit(e) {
    e.preventDefault();
    loginAxios(email, pass);
  }
  return (
    <div className=" bg-gray-100 min-h-screen flex justify-center ">
      <form
        onSubmit={handlSubmit}
        className="w-full max-w-md bg-white   px-8 py-6 m-20"
      >
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img src={logo}  alt="Logo" className="w-12 h-12 object-contain" />
        </div>

        {/* System name */}
        <p className="text-center text-[10px] text-gray-800 mb-3">
          Smart Academy Management System
        </p>

        {/* Title */}
        <h1 className="text-center text-base font-bold text-gray-900">
          Welcome Back !
        </h1>

        <p className="text-center text-xs text-gray-700 mt-1 mb-7">
          Please sign in to your account
        </p>

        {/* Email */}
        <div className="mb-5">
          <label className="block text-xs font-medium text-gray-800 mb-2">
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={handlchangeEmail}
            placeholder="Enter your email"
            className="w-full h-9 px-3 text-[10px] border border-gray-200 rounded-sm outline-none focus:border-blue-500"
          />
        </div>

        {/* Password */}
        <div className="mb-7">
          <label className="block text-xs font-medium text-gray-800 mb-2">
            Password
          </label>

          <input
            type="password"
            value={pass}
            onChange={handlchangePass}
            placeholder="Enter your password"
            className="w-full h-9 px-3 text-[10px] border border-gray-200 rounded-sm outline-none focus:border-blue-500"
          />
        </div>

        {/* Login button */}
        <button
          type="submit"
          className="w-full h-9 bg-blue-600 text-white text-xs rounded-sm hover:bg-blue-700 transition"
        >
          Login
        </button>

        {/* Register */}
        <p className="text-center text-[9px] text-gray-700 mt-3">
          Don't have an account?{" "}
          <span className="text-blue-600 cursor-pointer hover:underline">
            Register
          </span>
        </p>
      </form>
    </div>
  );
}
export default LoginForm;
