import editGrad from "../../../services/EditGrade";
import { useState } from "react";

export default function EditGrade({ grade, onClose }) {
  const [score, setScore] = useState(grade.score);
  const [semester, setSemester] = useState(grade.semester);
  const [examType, setExamType] = useState(grade.examType);

  async function edtiGrad() {
    const payload = {
      score: score,
      semester: semester,
      examType: examType,
    };
    console.log(payload);

    const result = await editGrad({id:grade._id, payload });
    console.log(result);
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-6 backdrop-blur-sm">
      {/* Modal */}
      <div className="w-full max-w-3xl rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl">
        {/* Header */}
        <h2 className="text-xl font-semibold text-gray-900">
          Modifier la note
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Modifier les informations de la note de l'étudiant
        </p>

        {/* Form */}
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {/* Student */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Student
            </label>

            <input
              type="text"
              value={grade.student.user?.username}
              disabled
              className="w-full cursor-not-allowed rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-500 outline-none"
            />
          </div>

          {/* Classe */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Classe
            </label>

            <input
              type="text"
              value={grade.classe?.name}
              disabled
              className="w-full cursor-not-allowed rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-500 outline-none"
            />
          </div>

          {/* Subject */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Subject
            </label>

            <input
              type="text"
              value={grade.subject.name}
              disabled
              className="w-full cursor-not-allowed rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-500 outline-none"
            />
          </div>

          {/* Note */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Note
            </label>

            <input
              type="number"
              value={score}
              onChange={(e) => setScore(e.target.value)}
              min="0"
              max="20"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
            />
          </div>

          {/* Semester */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Semester
            </label>

            <select
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
            >
              <option value="1">Semester 1</option>
              <option value="2">Semester 2</option>
            </select>
          </div>

          {/* Exam Type */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Exam Type
            </label>

            <select
              value={examType}
              onChange={(e) => setExamType(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
            >
              {" "}
              <option value="controller">Controller</option>
              <option value="exam">Exam</option>
            </select>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => {
              onClose();
            }}
            className="rounded-xl border border-gray-200 px-6 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
          >
            Annuler
          </button>

          <button
            type="button"
            onClick={edtiGrad}
            className="rounded-xl bg-violet-600 px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-violet-700 focus:outline-none focus:ring-4 focus:ring-violet-200"
          >
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
}
