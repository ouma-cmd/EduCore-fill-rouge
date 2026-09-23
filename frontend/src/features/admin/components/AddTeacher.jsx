import { useEffect, useState } from "react";
import user from "../../../services/user";
import getClasses from "../../../services/getClasses";
import subjectApi from "../../../services/getsubject";
import ajouterTeacher from "../../../services/ajouterTeacher";

export default function AddTeacher({ onClose }) {
  const [loding, isloding] = useState(false);
  const [userA, setUser] = useState("");
  const [users, setUsers] = useState([]);
  const [classe, setclasse] = useState("");
  const [classes, setclasses] = useState([]);
  const [subject, setsubject] = useState("");
  const [subjects, setsubjects] = useState([]);
  const [selectUser, setselectUser] = useState(null);

  function userChange(e) {
    setUser(e.target.value);
    const selected = users.find((user) => {
      return user._id === e.target.value;
    });
    setselectUser(selected);
  }

  function classeChange(e) {
    setclasse(e.target.value);
  }
  function subjectChange(e) {
    setsubject(e.target.value);
  }

  async function handlAjouter() {
    const payload = {
      userID: userA,
      classeId: classe,
      subjectId: subject,
    };
    const result = await ajouterTeacher(payload);
  }

  useEffect(() => {
    async function addUser() {
      const data = await user();
      if (Array.isArray(data.getUser)) {
        return setUsers(data.getUser);
      }
    }
    addUser();
  }, []);

  useEffect(() => {
    async function addClasse() {
      const data = await getClasses();
      if (Array.isArray(data)) {
        return setclasses(data);
      }
    }
    addClasse();
  }, []);

  useEffect(() => {
    async function addSubject() {
      const data = await subjectApi();
      if (Array.isArray(data)) {
        return setsubjects(data);
      }
    }
    addSubject();
  }, []);

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

        {/* user + username */}
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-5">
            <div>
              <label className="block text-xs font-medium text-gray-800 mb-2">
                user
              </label>

              <select
                value={userA}
                onChange={(e) => {
                  userChange(e);
                }}
                className="w-full h-9 px-3 text-[10px] border border-gray-200 rounded-sm outline-none focus:border-blue-500"
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
          </div>
        </div>
        {/* usernam & email */}
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-5">
            <label className="block text-xs font-medium text-gray-800 mb-2">
              username
            </label>

            <input
              type="text"
              value={selectUser?.username || ""}
              readOnly
              className="w-full h-9 px-3 text-[10px] border border-gray-200 rounded-sm outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-7">
            <label className="block text-xs font-medium text-gray-800 mb-2">
              email
            </label>

            <input
              type="text"
              value={selectUser?.email || ""}
              readOnly
              className="w-full h-9 px-3 text-[10px] border border-gray-200 rounded-sm outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* subject + classe */}
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-7">
            <label className="block text-xs font-medium text-gray-800 mb-2">
              classe
            </label>

            <select
              value={classe}
              onChange={(e) => {
                classeChange(e);
              }}
              className="w-full h-9 px-3 text-[10px] border border-gray-200 rounded-sm outline-none focus:border-blue-500"
            >
              <option value="">Select user</option>
              {classes.map((classe) => {
                return (
                  <option key={classe._id} value={classe._id}>
                    {classe.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="mb-7">
            <label className="block text-xs font-medium text-gray-800 mb-2">
              subject
            </label>

            <select
              value={subject}
              onChange={(e) => {
                subjectChange(e);
              }}
              className="w-full h-9 px-3 text-[10px] border border-gray-200 rounded-sm outline-none focus:border-blue-500"
            >
              <option value="">Select user</option>
              {subjects.map((subject) => {
                return (
                  <option key={subject._id} value={subject._id}>
                    {subject.name}
                  </option>
                );
              })}
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
