import { useEffect, useState } from "react";
import user from "../../../services/user";
import student from "../../../services/Getstudent";
import ajouterParent from "../../../services/ajouterParent";

export default function AddParent({ onClose }) {
  const [loding, setloding] = useState(false);
  const [userA, setUser] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setselectedUser] = useState(null);
  const [phone, setphone] = useState("");
  const [studentA, setstudent] = useState("");
  const [students, setstudents] = useState([]);

  function userChange(e) {
    setUser(e.target.value);
    const selectUsers = users.find((user) => {
      return user._id === e.target.value;
    });
    setselectedUser(selectUsers);
  }
  function phoneChange(e) {
    setphone(e.target.value);
  }
  function studentChange(e) {
    setstudent(e.target.value);
  }
  async function handlAjouter(e) {
      e.preventDefault();
    const payload = {
      userId: userA,
      studentId: studentA,
      phone: phone,
    };
     console.log("PAYLOAD:", payload);

  const result = await ajouterParent(payload);

  console.log("RESULT:", result);
  }

  useEffect(() => {
    async function fetchUser() {
      const data = await user();
      if (Array.isArray(data)) {
        setUsers(data);
      }
    }
    fetchUser();
  }, []);

  useEffect(() => {
    async function fetcstudent() {
      const data = await student();
      if (Array.isArray(data)) {
        setstudents(data);
      }
    }
    fetcstudent();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
      <form
        onSubmit={handlAjouter}
        className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        {/* Header */}
        <div className="border-b border-gray-100 px-8 py-5">
          <h2 className="text-xl font-semibold text-gray-900">
            Ajouter un parent
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Associer un utilisateur et un étudiant à un parent
          </p>

          {/* Close */}
          <button
            type="button"
            onClick={() => {
              onClose();
            }}
            className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full text-lg text-gray-400 transition hover:bg-red-50 hover:text-red-500"
          >
            ✕
          </button>
        </div>

        {/* Form body */}
        <div className="grid grid-cols-1 gap-5 px-8 py-6 md:grid-cols-2">
          {/* User */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              User
            </label>

            <select
              value={userA}
              onChange={(e) => {
                userChange(e);
              }}
              className="h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
            >
              <option value="">Select user</option>

              {users.map((user) => {
                return (
                  <option key={user._id} value={user._id}>
                    {user.username}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Phone */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Phone
            </label>

            <input
              value={phone}
              onChange={(e) => {
                phoneChange(e);
              }}
              type="tel"
              placeholder="Enter phone number"
              className="h-11 w-full rounded-lg border border-gray-200 px-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
            />
          </div>

          {/* Username */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Username
            </label>

            <input
              type="text"
              value={selectedUser?.username || ""}
              readOnly
              placeholder="Username"
              className="h-11 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm text-gray-600 outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email
            </label>

            <input
              type="text"
              value={selectedUser?.email || ""}
              readOnly
              placeholder="Email"
              className="h-11 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm text-gray-600 outline-none"
            />
          </div>

          {/* Student */}
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Student
            </label>

            <select
              value={studentA}
              onChange={(e) => {
                studentChange(e);
              }}
              className="h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
            >
              <option value="">Select student</option>

              {students.map((student) => {
                return (
                  <option key={student._id} value={student._id}>
                    {student.user.username}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-gray-100 bg-gray-50 px-8 py-5">
          <button
            type="button"
            onClick={() => {
              onClose();
            }}
            className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-100"
          >
            Annuler
          </button>

          <button
            disabled={loding}
            type="submit"
            className="rounded-lg bg-violet-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-violet-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loding ? "Ajout en cours..." : "Ajouter"}
          </button>
        </div>
      </form>
    </div>
  );
}
