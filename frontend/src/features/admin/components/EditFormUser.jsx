import { useEffect, useState } from "react";
import edituser from "../../../services/editUser";

export default function EditFormUser({ user, onClose }) {
  const [loding, isloding] = useState(false);
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [role, setrole] = useState("");

  function usernameChange(e) {
    setusername(e.target.value);
  }

  function emailChange(e) {
    setemail(e.target.value);
  }

  async function handlSubmit() {
    const payload = {
      username: username,
      email: email,
      role: role,
    };
    const result = await edituser({ id: user._id, payload });
  }

  useEffect(() => {
    setusername(user.username);
    setemail(user.email);
    setrole(user.role);
  }, [user]);
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <form
        onSubmit={handlSubmit}
        className="relative w-full max-w-md bg-white px-8 py-6 rounded-lg shadow-lg"
      >
        <button
          type="button"
          onClick={() => {
            onClose();
          }}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl"
        >
          ✕
        </button>
        {/* username */}
        <div className="mb-5">
          <label className="block text-xs font-medium text-gray-800 mb-2">
            Username
          </label>

          <input
            type="text"
            value={username}
            onChange={(e) => {
              usernameChange(e);
            }}
            placeholder="Enter username"
            className="w-full h-9 px-3 text-[10px] border border-gray-200 rounded-sm outline-none focus:border-blue-500"
          />
        </div>
        {/* Email */}
        <div className="mb-5">
          <label className="block text-xs font-medium text-gray-800 mb-2">
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => {
              emailChange(e);
            }}
            placeholder="Enter your email"
            className="w-full h-9 px-3 text-[10px] border border-gray-200 rounded-sm outline-none focus:border-blue-500"
          />
        </div>
        {/* role */}
        <div className="mb-7">
          <label className="block text-xs font-medium text-gray-800 mb-2">
            role
          </label>

          <select
            value={role}
            onChange={(e) => {
              setrole(e.target.value);
            }}
            className="w-full h-9 px-3 text-[10px] border border-gray-200 rounded-sm outline-none focus:border-blue-500"
          >
            <option value="">Select role</option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="parent">Parent</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* Edit */}
        <button
          disabled={loding}
          type="submit"
          className="w-full h-9 bg-blue-600 text-white text-xs rounded-sm hover:bg-blue-700 transition"
        >
          {loding ? "Edit in" : "Edit"}
        </button>
      </form>
    </div>
  );
}
