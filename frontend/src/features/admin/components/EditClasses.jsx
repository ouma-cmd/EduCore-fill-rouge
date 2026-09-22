import { useEffect, useState } from "react";
import editClasse from "../../../services/editClasse";

export default function EditFormClasses({ classe, onClose }) {
  const [loding, isloding] = useState(false);
  const [name, setName] = useState("");
  const [level, setlevel] = useState("");
  const [add, setAdd] = useState("");

  function nameChange(e) {
    setName(e.target.value);
  }

  function levelChange(e) {
    setlevel(e.target.value);
  }

  async function handlSubmit() {
    const payload = {
      name: name,
      level: level,
    };
    const reselt = await editClasse({ id: classe._id, payload });
  }

  useEffect(() => {
    setName(classe.name);
    setlevel(classe.level);
  }, [classe]);

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
        {/* username */}
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
            placeholder="Enter username"
            className="w-full h-9 px-3 text-[10px] border border-gray-200 rounded-sm outline-none focus:border-blue-500"
          />
        </div>
        {/* Email */}
        <div className="mb-5">
          <label className="block text-xs font-medium text-gray-800 mb-2">
            Level
          </label>

          <input
            type="text"
            value={level}
            onChange={(e) => {
              levelChange(e);
            }}
            placeholder="Enter your email"
            className="w-full h-9 px-3 text-[10px] border border-gray-200 rounded-sm outline-none focus:border-blue-500"
          />
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
