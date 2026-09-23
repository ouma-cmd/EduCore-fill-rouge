import { useEffect, useState } from "react";
import ajouterUser from "../../../services/ajouterUser";

export default function AddUser({ onClose }) {
  const [loding, isloding] = useState(false);
  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setrole] = useState();
  const [password, setpassword] = useState();

  function usernamchange(e) {
    setusername(e.target.value);
  }

  function emailchange(e) {
    setEmail(e.target.value);
  }

  function passwordchange(e) {
    setpassword(e.target.value);
  }

  async function handlAjouter() {
    const payload = {
      username: username,
      email: email,
      password: password,
      role: role,
    };
    console.log("payload", payload);

    const result = await ajouterUser(payload);
    console.log("result", result);
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <form
        onSubmit={handlAjouter}
        className="relative w-full max-w-2xl bg-white px-8 py-6 rounded-lg shadow-lg"
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

        {/* usernam & email */}
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-5">
            <label className="block text-xs font-medium text-gray-800 mb-2">
              username
            </label>

            <input
              type="text"
              value={username || ""}
              onChange={usernamchange}
              className="w-full h-9 px-3 text-[10px] border border-gray-200 rounded-sm outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-7">
            <label className="block text-xs font-medium text-gray-800 mb-2">
              email
            </label>

            <input
              type="email"
              value={email || ""}
              onChange={emailchange}
              className="w-full h-9 px-3 text-[10px] border border-gray-200 rounded-sm outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* subject + classe */}
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-7">
            <label className="block text-xs font-medium text-gray-800 mb-2">
              password
            </label>

            <input
              type="password"
              value={password || ""}
              onChange={passwordchange}
              className="w-full h-9 px-3 text-[10px] border border-gray-200 rounded-sm outline-none focus:border-blue-500"
            />
          </div>
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
        </div>

        {/* ajouter */}
        <button
          disabled={loding}
          type="submit"
          className="w-full h-9 bg-blue-600 text-white text-xs rounded-sm hover:bg-blue-700 transition"
        >
          {loding ? "Ajouter in" : "Ajouter"}
        </button>
      </form>
    </div>
  );
}
