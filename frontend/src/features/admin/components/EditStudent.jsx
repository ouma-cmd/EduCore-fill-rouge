import { useEffect, useState } from "react";
import getParent from "../../../services/GetParent";
import getTeacher from "../../../services/GetTeacher";
import getClasses from "../../../services/getClasses";
import editStudent from "../../../services/editStudent";

export default function EditFormStudent({ student, onClose }) {
  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [parent, setParent] = useState("");
  const [parents, setParents] = useState([]);
  const [teacher, setTeacher] = useState("");
  const [teachers, setTeachrs] = useState([]);
  const [classe, setClasse] = useState("");
  const [classes, setClasses] = useState([]);
  const [edit, setEdit] = useState({});
  const [loding, isLoading] = useState(false);
  function usernameChange(e) {
    setusername(e.target.value);
  }

  function emailChange(e) {
    setEmail(e.target.value);
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

  async function handlSubmit(e) {
    const payload = {
      idStudent: student._id,
      newStudent: {
        username: username,
        email: email,
        dateOfBirth: dateOfBirth,
        gender: gender,
      },
      newParentId: parent,
      newClasse: classe,
      newTeacher: teacher,
      newsubjects: student.newsubjects,
    };
    await editStudent(payload);
  }

  useEffect(() => {
      console.log("STUDENT EDIT:", student);

    setusername(student.user.username);
    setEmail(student.user.email);
    setGender(student.gender);
    setDateOfBirth(student.dateOfBirth.split("T")[0]);
    setClasse(student.classes?.[0]?._id);
    setParent(student.parent?._id);
    setTeacher(student.teachers?.[0]);
  }, [student]);

  useEffect(() => {
    async function Fetchdata() {
      const dataParent = await getParent();
      if (Array.isArray(dataParent)) {
        setParents(dataParent);
      }
    }
    Fetchdata();
  }, []);

  useEffect(() => {
    async function fetchTeacher() {
      const dataTeacher = await getTeacher();
      if (Array.isArray(dataTeacher)) {
        setTeachrs(dataTeacher);
      }
    }
    fetchTeacher();
  }, []);

  useEffect(() => {
    async function fetchClasses() {
      const dataClasses = await getClasses();
      if (Array.isArray(dataClasses)) {
        setClasses(dataClasses);
      }
    }
    fetchClasses();
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
        {/* gender */}
        <div className="mb-2">
          <label className="block text-xs font-medium text-gray-800 mb-2">
            Gender
          </label>
        </div>
        <select
          className="w-full h-9 px-3 mb-5 text-[10px] border border-gray-200 rounded-sm outline-none focus:border-blue-500"
          value={gender}
          onChange={(e) => {
            genderChange(e);
          }}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        {/* dateOfBirth */}
        <div className="mb-5">
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

        {/* parent */}
        <div className="mb-7">
          <label className="block text-xs font-medium text-gray-800 mb-2">
            parent
          </label>
          <select
            type="text"
            value={parent}
            onChange={(e) => {
              parentChange(e);
            }}
            placeholder="Enter parent"
            className="w-full h-9 px-3 text-[10px] border border-gray-200 rounded-sm outline-none focus:border-blue-500"
          >
            {parents.map((parent) => {
              return (
                <option key={parent._id} value={parent._id}>
                  {parent.user?.username}
                </option>
              );
            })}
          </select>
        </div>
        {/* teacher */}
        <div className="mb-7">
          <label className="block text-xs font-medium text-gray-800 mb-2">
            teacher
          </label>
          <select
            type="text"
            value={teacher}
            onChange={(e) => {
              teacherChange(e);
            }}
            placeholder="Enter teacher"
            className="w-full h-9 px-3 text-[10px] border border-gray-200 rounded-sm outline-none focus:border-blue-500"
          >
            {teachers.map((teacher) => {
              return (
                <option key={teacher._id} value={teacher._id}>
                  {teacher.user?.username}
                </option>
              );
            })}
          </select>
        </div>
        {/* classe */}
        <div className="mb-7">
          <label className="block text-xs font-medium text-gray-800 mb-2">
            classe
          </label>
          <select
            type="text"
            value={classe}
            onChange={(e) => {
              classeChange(e);
            }}
            placeholder="Enter classe"
            className="w-full h-9 px-3 text-[10px] border border-gray-200 rounded-sm outline-none focus:border-blue-500"
          >
            {classes.map((classe) => {
              return (
                <option key={classe._id} value={classe._id}>
                  {classe.name}
                </option>
              );
            })}
          </select>
        </div>

        {/* Edit */}
        <button
          disablee={loding}
          type="submit"
          className="w-full h-9 bg-blue-600 text-white text-xs rounded-sm hover:bg-blue-700 transition"
        >
          {loding ? "Edit in" : "Edit"}
        </button>
      </form>
    </div>
  );
}
