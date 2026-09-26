import { useEffect, useState } from "react";
import { BookOpen, GraduationCap, X } from "lucide-react";
import getMoyenneNote from "../../../services/getMoyenneNote";

export default function ViewGrad({ grade, onClose }) {
  const [moyenne, setmoyenne] = useState([]);

  useEffect(() => {
    async function getMoyenne() {
      const data = await getMoyenneNote({
        student: grade.student._id,
        classe: grade.classe._id,
        subject: grade.subject._id,
      });

      console.log(data);

      if (Array.isArray(data)) {
        setmoyenne(data);
      }
    }

    getMoyenne();
  }, []);

  // Group results by semester
  const semesters = moyenne.reduce((acc, item) => {
    const semester = item._id.semester;

    if (!acc[semester]) {
      acc[semester] = [];
    }

    acc[semester].push(item);

    return acc;
  }, {});

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
        {/* Header */}
        <div className="border-b border-gray-100 px-6 py-5">
          <div className="flex items-start justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                  <GraduationCap size={20} />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Résultats de l'étudiant
                  </h2>

                  <p className="text-sm text-gray-500">
                    Résumé des notes et moyennes
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
            >
              <X size={19} />
            </button>
          </div>
        </div>

        {/* Student information */}
        <div className="px-6 pt-6">
          <div className="grid gap-4 md:grid-cols-3">
            {/* Student */}
            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">
                Student
              </p>

              <p className="font-semibold text-gray-800">
                {grade.student?.user?.username || "—"}
              </p>
            </div>

            {/* Classe */}
            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">
                Classe
              </p>

              <p className="font-semibold text-gray-800">
                {grade.classe?.name || "—"}
              </p>
            </div>

            {/* Subject */}
            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">
                Subject
              </p>

              <p className="font-semibold text-gray-800">
                {grade.subject?.name || "—"}
              </p>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="px-6 py-6">
          <div className="mb-4 flex items-center gap-2">
            <BookOpen size={18} className="text-violet-600" />

            <h3 className="font-semibold text-gray-900">
              Moyennes par semestre
            </h3>
          </div>

          {Object.keys(semesters).length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-200 p-8 text-center">
              <p className="text-sm text-gray-500">
                Aucune note disponible pour cet étudiant.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {Object.entries(semesters).map(([semester, results]) => (
                <div
                  key={semester}
                  className="overflow-hidden rounded-2xl border border-gray-200"
                >
                  {/* Semester header */}
                  <div className="flex items-center justify-between bg-gray-50 px-5 py-4">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                        Semester
                      </p>

                      <h4 className="text-lg font-bold text-gray-900">
                        Semester {semester}
                      </h4>
                    </div>
                  </div>

                  {/* Exam results */}
                  <div className="divide-y divide-gray-100">
                    {results.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between px-5 py-4"
                      >
                        <div>
                          <p className="font-medium capitalize text-gray-700">
                            {item._id.examType}
                          </p>

                          <p className="text-xs text-gray-400">
                            Moyenne
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="text-xl font-bold text-violet-600">
                            {item.moyenne.toFixed(2)}
                          </p>

                          <p className="text-xs text-gray-400">
                            / 20
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-gray-100 px-6 py-5">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-gray-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
