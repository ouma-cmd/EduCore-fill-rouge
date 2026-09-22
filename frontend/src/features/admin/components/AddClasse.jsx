import { useState } from "react";
import ajouterClasse from "../../../services/ajouterClasse";

export default function AddClasse({ onClose }) {
  const [loding, isloding] = useState(false);
  const [name, setName] = useState("");
  const [level, setlevel] = useState("");

  function nameChange(e) {
    setName(e.target.value);
  }
  function levelChange(e) {
    setlevel(e.target.value);
  }
  async function handlAjouter() {
    const payload = {
      name: name,
      level: level,
    };
    const result = await ajouterClasse(payload);
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
            Level
          </label>

          <input
            type="text"
            value={level}
            onChange={levelChange}
            className="w-full h-9 px-3 text-[10px] border border-gray-200 rounded-sm outline-none focus:border-blue-500"
          />
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
