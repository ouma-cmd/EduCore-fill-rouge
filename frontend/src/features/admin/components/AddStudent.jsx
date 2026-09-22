import { useEffect, useState } from "react";
import user from "../../../services/user";
import getClasses from "../../../services/getClasses";
import getParent from "../../../services/GetParent";
import getTeacher from "../../../services/GetTeacher";
import ajouterStudent from "../../../services/ajouterStudent";
import subjectApi from "../../../services/getsubject";

export default function AddStudent({ onClose }) {
  const [loding, isLoading] = useState(false);
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [parent, setParent] = useState("");
  const [parents, setParents] = useState([]);
  const [teacher, setTeacher] = useState("");
  const [teachers, setTeachrs] = useState([]);
  const [classe, setClasse] = useState("");
  const [classes, setClasses] = useState([]);
  const [subject, setsubject] = useState("");
  const [subjects, setsubjects] = useState([]);
  const [userA, setUser] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  function userChange(e) {
    setUser(e.target.value);
    const selected = users.find((user) => {
      return user._id === e.target.value;
    });
    setSelectedUser(selected);
  }

  function genderChange(e) {
    setGender(e.target.value);
  }

  function dateOfBirthChange(e) {
    setDateOfBirth(e.target.value);
  }

  function parentChange(e) {
    setParent(e.target.value);
  }

  function teacherChange(e) {
    setTeacher(e.target.value);
  }

  function classeChange(e) {
    setClasse(e.target.value);
  }

  function subjectChange(e) {
    setsubject(e.target.value);
  }

  async function handlAjouter(e) {
    const dateAjouter = {
      userId: userA,
      parentId: parent,
      classId: classe,
      teacherId: teacher,
      dateOfBirth: dateOfBirth,
      SubjectId: subject,
      gender: gender,
    };
    const result = await ajouterStudent(dateAjouter);
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
    async function fetchUser() {
      const data = await getClasses();
      if (Array.isArray(data)) {
        setClasses(data);
      }
    }
    fetchUser();
  }, []);

  useEffect(() => {
    async function fetchUser() {
      const data = await getParent();
      if (Array.isArray(data)) {
        setParents(data);
      }
    }
    fetchUser();
  }, []);

  useEffect(() => {
    async function fetchUser() {
      const data = await getTeacher();
      if (Array.isArray(data)) {
        setTeachrs(data);
      }
    }
    fetchUser();
  }, []);

  useEffect(() => {
    async function fetchUser() {
      const data = await subjectApi();
      if (Array.isArray(data)) {
        setsubjects(data);
      }
    }
    fetchUser();
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

          {/*  gender */}
          <div className="mb-5">
            <label className="block text-xs font-medium text-gray-800 mb-2">
              Gender
            </label>

            <select
              value={gender}
              onChange={(e) => {
                genderChange(e);
              }}
              className="w-full h-9 px-3 text-[10px] border border-gray-200 rounded-sm outline-none focus:border-blue-500"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
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
              value={selectedUser?.username || ""}
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
              value={selectedUser?.email || ""}
              readOnly
              className="w-full h-9 px-3 text-[10px] border border-gray-200 rounded-sm outline-none focus:border-blue-500"
            />
          </div>
        </div>
        {/* dateOfBirth + parent */}
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-7">
            <label className="block text-xs font-medium text-gray-800 mb-2">
              dateOfBirth
            </label>

            <input
              type="date"
              value={dateOfBirth}
              onChange={(e) => {
                dateOfBirthChange(e);
              }}
              className="w-full h-9 px-3 text-[10px] border border-gray-200 rounded-sm outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-7">
            <label className="block text-xs font-medium text-gray-800 mb-2">
              parent
            </label>

            <select
              value={parent}
              onChange={(e) => {
                parentChange(e);
              }}
              className="w-full h-9 px-3 text-[10px] border border-gray-200 rounded-sm outline-none focus:border-blue-500"
            >
              <option value="">Select user</option>
              {parents.map((parent) => {
                return (
                  <option key={parent._id} value={parent._id}>
                    {parent.user.username}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        {/* teacher + classe */}
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-7">
            <label className="block text-xs font-medium text-gray-800 mb-2">
              teacher
            </label>

            <select
              value={teacher}
              onChange={(e) => {
                teacherChange(e);
              }}
              className="w-full h-9 px-3 text-[10px] border border-gray-200 rounded-sm outline-none focus:border-blue-500"
            >
              <option value="">Select user</option>
              {teachers.map((teacher) => {
                return (
                  <option key={teacher._id} value={teacher._id}>
                    {teacher.user.username}
                  </option>
                );
              })}
            </select>
          </div>

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
        </div>
        {/* subject */}
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
