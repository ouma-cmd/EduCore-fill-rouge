import { useEffect, useState } from "react";
import getAbsence from "../../../services/getAbsence";

export default function Absence() {
  const [absences, setabsences] = useState([]);

  useEffect(() => {
    async function fetshAbsence() {
      const data = await getAbsence();
      console.log(data);
      
      if (Array.isArray(data)) {
        setabsences(data);
      }
    }
    fetshAbsence();
  });
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Mes absences</h1>

        <p className="mt-1 text-sm text-gray-500">
          Consultez votre historique de présence
        </p>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="font-semibold text-gray-800">
            Historique des absences
          </h2>
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
                  Date
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Statut
                </th>
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {absences.map((absence,index) => {
                return (
                  <tr
                    key={index}
                    className="border-b border-gray-100 transition hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {absence.subjects?.name}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {absence.classe?.name}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {absence.teacher?.user?.username}
                    </td>

                    <td className="px-6 py-4">
                      <span className="rounded-lg bg-indigo-50 px-3 py-1 font-semibold text-indigo-600">
                        {absence.date}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {absence.status}
                    </td>

                    <td className="px-6 py-4 text-gray-600">{absence.examType}</td>
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
