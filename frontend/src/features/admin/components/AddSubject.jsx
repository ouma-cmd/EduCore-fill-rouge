import { useEffect, useState } from "react";
import getTeacher from "../../../services/GetTeacher";
import ajouterSubject from "../../../services/ajouterSubject";

export default function AddSubject({ onClose }) {
  const [loding, isloding] = useState(false);
  const [name, setName] = useState("");
  const [coefficient, setcoefficient] = useState("");
  const [teacher, setTeacher] = useState("");
  const [Teachers, setTeachers] = useState([]);

  function nameChange(e) {
    setName(e.target.value);
  }
  function coefficientChange(e) {
    setcoefficient(e.target.value);
  }
  function teacherChange(e) {
    setTeacher(e.target.value);
  }
  async function handlAjouter(e) {
    e.preventDefault();
    const payload = {
      name: name,
      coefficient: coefficient,
      teachers: [teacher],
    };

    const result = await ajouterSubject(payload);
  }

  useEffect(() => {
    async function getTeachers() {
      const data = await getTeacher();
      if (Array.isArray(data)) {
        setTeachers(data);
      }
    }
    getTeachers();
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

        {/*name */}
        <div className="mb-5">
          <label className="block text-xs font-medium text-gray-800 mb-2">
            Name
          </label>

          <input
            type="text"
            value={name}
            onChange={nameChange}
            className="w-full h-9 px-3 text-[10px] border border-gray-200 rounded-sm outline-none focus:border-blue-500"
          />
        </div>
        {/* level  */}
        <div className="mb-7">
          <label className="block text-xs font-medium text-gray-800 mb-2">
            coefficient
          </label>

          <input
            type="text"
            value={coefficient}
            onChange={coefficientChange}
            className="w-full h-9 px-3 text-[10px] border border-gray-200 rounded-sm outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-7">
          <label className="block text-xs font-medium text-gray-800 mb-2">
            teacher
          </label>

          <select
            type="text"
            value={teacher}
            onChange={teacherChange}
            className="w-full h-9 px-3 text-[10px] border border-gray-200 rounded-sm outline-none focus:border-blue-500"
          >
            <option value="">Select teacher</option>
            {Teachers.map((tech) => {
              return (
                <option key={tech._id} value={tech._id}>
                  {tech.user?.username}
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
