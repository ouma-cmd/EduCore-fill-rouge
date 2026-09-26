import { useEffect, useState } from "react";
import getNote from "../../../services/getNote";

function MyNot() {
  const [notes, setnotes] = useState([]);

  useEffect(() => {
    async function getNotes() {
      const data = await getNote();
      console.log(data);

      if (Array.isArray(data)) {
        setnotes(data);
      }
    }

    getNotes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Mes notes</h1>

        <p className="mt-1 text-sm text-gray-500">
          Consultez vos résultats scolaires
        </p>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="font-semibold text-gray-800">Liste des notes</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left">
            {/* Head */}
            <thead className="bg-gray-50">
              <tr className="border-b border-gray-200">
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Subject
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Classe
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Teacher
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Score
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Semestre
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Type d'examen
                </th>
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {notes.map((note, index) => {
                return (
                  <tr
                    key={index}
                    className="border-b border-gray-100 transition hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {note.subject?.name}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {note.classe?.name}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {note.teacher?.user?.username}
                    </td>

                    <td className="px-6 py-4">
                      <span className="rounded-lg bg-indigo-50 px-3 py-1 font-semibold text-indigo-600">
                        {note.score} / 20
                      </span>
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      Semester {note.semester}
                    </td>

                    <td className="px-6 py-4 text-gray-600">{note.examType}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MyNot;
