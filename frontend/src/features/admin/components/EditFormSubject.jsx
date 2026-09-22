import { useEffect, useState } from "react";
import getTeacher from "../../../services/GetTeacher";
import editSubject from "../../../services/editSubject";

export default function EditFormSubject({ subject, onClose }) {
  const [loding, isloding] = useState(false);
  const [name, setName] = useState("");
  const [coefficient, setcoefficient] = useState("");
  const [teacher, setteacher] = useState("");
  const [Teachers, setteachers] = useState([]);
  function nameChange(e) {
    setName(e.target.value);
  }
  function coefficientChange(e) {
    setcoefficient(e.target.value);
  }
  function teacherChange(e) {
    setteacher(e.target.value);
  }
  async function handlSubmit(e) {
    e.preventDefault();

    const payload = {
      name,
      coefficient,
      teacher,
    };
    const result = await editSubject({
      id: subject._id,
      payload,
    });
  }

  useEffect(() => {
    async function fetchTeacher() {
      const data = await getTeacher();
      if (Array.isArray(data)) {
        setteachers(data);
      }
    }
    fetchTeacher();
  }, []);

  useEffect(() => {
    console.log("SUBJECT:", subject);
    setName(subject.name || "");
    setcoefficient(subject.coefficient || "");
    setteacher(subject.teachers[0] || "");
  }, [subject]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
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
        {/* name */}
        <div className="mb-5">
          <label className="block text-xs font-medium text-gray-800 mb-2">
            Name
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) => {
              nameChange(e);
            }}
            placeholder="Enter name"
            className="w-full h-9 px-3 text-[10px] border border-gray-200 rounded-sm outline-none focus:border-blue-500"
          />
        </div>
        {/* coefficient */}
        <div className="mb-5">
          <label className="block text-xs font-medium text-gray-800 mb-2">
            coefficient
          </label>

          <input
            type="text"
            value={coefficient}
            onChange={(e) => {
              coefficientChange(e);
            }}
            placeholder="Enter your coefficient"
            className="w-full h-9 px-3 text-[10px] border border-gray-200 rounded-sm outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-5">
          <label className="block text-xs font-medium text-gray-800 mb-2">
            teacher
          </label>

          <select
            type="text"
            value={teacher}
            onChange={(e) => {
              teacherChange(e);
            }}
            placeholder="Enter your coefficient"
            className="w-full h-9 px-3 text-[10px] border border-gray-200 rounded-sm outline-none focus:border-blue-500"
          >
            {Teachers.map((sub) => {
              return (
                <option key={sub._id} value={sub._id}>
                  {sub.user.username}
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
