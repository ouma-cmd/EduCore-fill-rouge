import { useEffect, useState } from "react";
import student from "../../../services/Getstudent";
import editParent from "../../../services/EditParent";

export default function EditParent({ parent, onClose }) {
  const [loding, isLoading] = useState(false);
  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setphone] = useState("");
  const [studentA, setstudent] = useState("");
  const [students, setstudents] = useState([]);

  function usernameChange(e) {
    setusername(e.target.value);
  }

  function emailChange(e) {
    setEmail(e.target.value);
  }

  function phoneChange(e) {
    setphone(e.target.value);
  }

  function studentChange(e) {
    setstudent(e.target.value);
  }
  async function handlSubmit() {
    const payload = {
      id: parent._id,
      username: username,
      email: email,
      idStudent: studentA,
      phone: phone,
    };
    await editParent(payload);
  }

  useEffect(() => {
    if (!parent) return;

    setusername(parent.user?.username || "");
    setEmail(parent.user?.email || "");
    setphone(parent.phone || "");
  }, [parent]);

  useEffect(() => {
    async function fetshStudent() {
      const data = await student();
      if (Array.isArray(data)) {
        setstudents(data);
      }
    }
    fetshStudent();
  }, []);

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
        {/* phone */}
        <div className="mb-5">
          <label className="block text-xs font-medium text-gray-800 mb-2">
            phone
          </label>

          <input
            type="number"
            value={phone}
            onChange={(e) => {
              phoneChange(e);
            }}
            placeholder="Enter your phone"
            className="w-full h-9 px-3 text-[10px] border border-gray-200 rounded-sm outline-none focus:border-blue-500"
          />
        </div>
        {/* student */}
        <div className="mb-2">
          <label className="block text-xs font-medium text-gray-800 mb-2">
            student
          </label>
        </div>
        <select
          className="w-full h-9 px-3 mb-5 text-[10px] border border-gray-200 rounded-sm outline-none focus:border-blue-500"
          value={studentA}
          onChange={(e) => {
            studentChange(e);
          }}
        >
          {students.map((student) => {
            return (
              <option key={student._id} value={student._id}>
                {student.user.username}
              </option>
            );
          })}
        </select>

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
