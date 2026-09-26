import { Eye } from "lucide-react";
import { useEffect, useState } from "react";
import getStudentsTeacher from "../../../services/getStudentTeacher";
import getClasseTeacher from "../../../services/getClassesTeacher";
import getSubjectTeacher from "../../../services/getSubjectTeacher";
import ViewGrad from "../components/ViewGrad";

export default function MoyenneNote() {
  const [students, setStudents] = useState([]);
  const [classes, setclasses] = useState([]);
  const [subjects, setsubjects] = useState([]);
  const [View, setView] = useState(null);

  useEffect(() => {
    async function getStudent() {
      const data = await getStudentsTeacher();
      if (Array.isArray(data)) {
        setStudents(data);
      }
    }
    getStudent();
  },[]);

  useEffect(() => {
    async function getClasses() {
      const data = await getClasseTeacher();
      if (Array.isArray(data)) {
        setclasses(data);
      }
    }
    getClasses();
  }, []);

  useEffect(() => {
    async function getSubject() {
      const data = await getSubjectTeacher();
      if (Array.isArray(data)) {
        setsubjects(data);
      }
    }
    getSubject();
  }, []);

  return (
    <div className="p-6">
      {View && <ViewGrad grade={View} onClose={() => setView(null)} />}
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Moyennes des étudiants
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Consultez les résultats et les moyennes des étudiants.
        </p>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        {/* Table Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              Liste des étudiants
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Consultez les moyennes par étudiant et par matière.
            </p>
          </div>

          <div className="rounded-lg bg-violet-50 px-3 py-1.5 text-sm font-medium text-violet-600">
            {students.length} Students
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/70">
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Students
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Classe
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Subject
                </th>

                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {students.map((student) => {
                const sudentClasse = classes.find(
                  (classe) => classe._id === student.classes?.[0],
                );
                const studentSubjset = subjects.find(
                  (subject) => subject._id === student.subjects?.[0],
                );
                return (
                  <tr
                    key={student._id}
                    className="group transition-colors hover:bg-violet-50/40"
                  >
                    {/* Student */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-100 text-sm font-semibold text-violet-600">
                          {student.user?.username?.charAt(0)?.toUpperCase()}
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            {student.user?.username || "—"}
                          </p>

                          <p className="mt-0.5 text-xs text-gray-400">
                            Étudiant
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Classe */}
                    <td className="px-6 py-4">
                      <span className="inline-flex rounded-lg bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700">
                        {sudentClasse?.name}
                      </span>
                    </td>

                    {/* Subject */}
                    <td className="px-6 py-4">
                      <span className="inline-flex rounded-lg bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-600">
                        {studentSubjset?.name}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="px-6 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => {
                          setView({
                            student,
                            classe: sudentClasse,
                            subject: studentSubjset,
                          });
                        }}
                        className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm transition-all hover:border-violet-200 hover:bg-violet-50 hover:text-violet-600 hover:shadow"
                      >
                        <Eye size={16} />

                        <span>View</span>
                      </button>
                    </td>
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
