import { useEffect, useState } from "react";
import getClasses from "../../../services/getClasses";
import subjectApi from "../../../services/getsubject";
import editSubject from "../../../services/editSubject";
import editTeacher from "../../../services/editTeacher";

export default function EditTeacher({ teacher, onClose }) {
  const [loding, isLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [classe, setclasse] = useState("");
  const [classes, setclasses] = useState([]);

  function usernameChange(e) {
    setUsername(e.target.value);
  }

  function emailChange(e) {
    setEmail(e.target.value);
  }

  function classeChange(e) {
    setclasse(e.target.value);
  }
  function subjectChange(e) {
    setSubject(e.target.value);
  }

  async function handlSubmit(e) {
    e.preventDefault();
    const payload = {
      username: username,
      email: email,
      classeId: classe,
      subjectId: subject,
    };
    const result = await editTeacher({
      id: teacher._id,
      payload,
    });
  }

  useEffect(() => {
    if (!teacher?.user) return;
    setUsername(teacher.user.username);
    setEmail(teacher.user.email);
    if (teacher.classe?.length > 0) {
      setclasse(teacher.classe[0]._id);
    }
    if (teacher.subjects?.length > 0) {
      setSubject(teacher.subjects[0]._id);
    }
  }, [teacher]);

  useEffect(() => {
    async function fetchData() {
      const data = await getClasses();
      if (Array.isArray(data)) {
        setclasses(data);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const data = await subjectApi();
      if (Array.isArray(data)) {
        setSubjects(data);
      }
    }
    fetchData();
  }, []);
  console.log(teacher);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <form
        onSubmit={(e) => {
          handlSubmit(e);
        }}
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
        {/* subject */}
        <div className="mb-7">
          <label className="block text-xs font-medium text-gray-800 mb-2">
            subject
          </label>
          <select
            type="text"
            value={subject}
            onChange={(e) => {
              subjectChange(e);
            }}
            placeholder="Enter teacher"
            className="w-full h-9 px-3 text-[10px] border border-gray-200 rounded-sm outline-none focus:border-blue-500"
          >
            <option value="">select subject</option>
            {subjects.map((subject) => {
              return (
                <option key={subject._id} value={subject._id}>
                  {subject.name}
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
            <option value="">select classe</option>
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
