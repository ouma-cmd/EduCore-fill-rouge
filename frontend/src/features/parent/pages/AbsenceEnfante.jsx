import { useEffect, useState } from "react";
import getChildren from "../../../services/getChildren";
import getClasse from "../../../services/getCLasseParent";
import getSubjectParent from "../../../services/getSubjetcParent";
import getDate from "../../../services/getDateParent";

export default function AbsenceEnfante() {
  const [Childrens, setChildrens] = useState([]);
  const [subject, setsubject] = useState([]);
  const [classes, setclasses] = useState([]);
  const [date, setDate] = useState([]);

  useEffect(() => {
    async function fetchChildren() {
      const data = await getChildren();
      if (Array.isArray(data)) {
        setChildrens(data);
      }
    }
    fetchChildren();
  }, []);

  useEffect(() => {
    async function fetchSubject() {
      const data = await getSubjectParent();
      if (Array.isArray(data)) {
        setsubject(data);
      }
    }
    fetchSubject();
  }, []);

  useEffect(() => {
    async function fetchCLasse() {
      const data = await getClasse();
      if (Array.isArray(data)) {
        setclasses(data);
      }
    }
    fetchCLasse();
  }, []);

  useEffect(() => {
    async function fetchDate() {
      const data = await getDate();
      if (Array.isArray(data)) {
        setDate(data);
      }
    }
    fetchDate();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Absences de mes enfants
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Consultez l’historique des absences et des retards de vos enfants.
        </p>
      </div>

      {/* Card */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        {/* Card Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Historique des absences
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Suivi des présences et des retards
            </p>
          </div>

          <div className="rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-600">
            {date.length} enregistrement{date.length > 1 ? "s" : ""}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Enfant
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Matière
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Classe
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Date
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Statut
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {Childrens.map((childr) => {
                const student = subject.find((sub) => sub._id === childr._id);

                const classe = classes.find(
                  (cl) => cl._id.toString() === childr.classes?.[0].toString(),
                );

                const attendance = date.find(
                  (dt) => dt.student?._id === childr._id,
                );

                return (
                  <tr
                    key={childr._id}
                    className="transition-colors duration-150 hover:bg-gray-50"
                  >
                    {/* Enfant */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-600">
                          {childr.user?.username?.charAt(0).toUpperCase()}
                        </div>

                        <div>
                          <p className="font-semibold text-gray-800">
                            {childr.user?.username}
                          </p>

                          <p className="text-xs text-gray-400">Élève</p>
                        </div>
                      </div>
                    </td>

                    {/* Subject */}
                    <td className="px-6 py-5">
                      <span className="font-medium text-gray-700">
                        {student?.subjects?.[0]?.name ?? "-"}
                      </span>
                    </td>

                    {/* Classe */}
                    <td className="px-6 py-5">
                      <span className="rounded-lg bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-600">
                        {classe?.name ?? "-"}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-5 text-sm text-gray-600">
                      {attendance?.date}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-5">
                      {attendance?.status === "absent" && (
                        <span className="inline-flex items-center rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600">
                          Absent
                        </span>
                      )}

                      {attendance?.status === "late" && (
                        <span className="inline-flex items-center rounded-full bg-yellow-50 px-3 py-1.5 text-xs font-semibold text-yellow-600">
                          En retard
                        </span>
                      )}

                      {attendance?.status === "present" && (
                        <span className="inline-flex items-center rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-600">
                          Présent
                        </span>
                      )}

                      {!attendance?.status && (
                        <span className="text-sm text-gray-400">-</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Empty state */}
        {Childrens.length === 0 && (
          <div className="px-6 py-12 text-center">
            <p className="text-sm font-medium text-gray-600">
              Aucun enfant trouvé.
            </p>

            <p className="mt-1 text-sm text-gray-400">
              Les informations apparaîtront ici.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
