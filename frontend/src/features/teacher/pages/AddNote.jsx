import { useEffect, useState } from "react";

import ajouterNote from "../../../services/addNote";
import getStudentsTeacher from "../../../services/getStudentTeacher";
import getSubjectTeacher from "../../../services/getSubjectTeacher";
import getClasseTeacher from "../../../services/getClassesTeacher";
import getGrad from "../../../services/getGrad";
import EditGrade from "../components/EditGrade";

function AddNote() {
  const [students, setstudents] = useState([]);
  const [Subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState([]);
  const [note, setNote] = useState("");
  const [studentId, setStudentId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [semester, setsemester] = useState("");
  const [examType, setexamType] = useState("");
  const [classeId, setclasseId] = useState("");
  const [grades, setgrades] = useState([]);
  const [Edit, setEdit] = useState(null);

  function handlEdit(grade) {
    setEdit(grade);
  }

  async function handlAjouter() {
    const payload = {
      classe: classeId,
      student: studentId,
      subject: subjectId,
      score: note,
      semester: semester,
      examType: examType,
    };

    console.log("PAYLOAD:", payload);

    try {
      const result = await ajouterNote(payload);
      console.log("RESULT:", result);
    } catch (error) {
      console.log("ERROR ADD NOTE:", error);
    }
  }

  useEffect(() => {
    async function getStudent() {
      const data = await getStudentsTeacher();

      if (Array.isArray(data)) {
        setstudents(data);
      }
    }

    getStudent();
  }, []);

  useEffect(() => {
    async function getSubject() {
      const data = await getSubjectTeacher();

      if (Array.isArray(data)) {
        setSubjects(data);
      }
    }

    getSubject();
  }, []);

  useEffect(() => {
    async function getClasses() {
      const data = await getClasseTeacher();

      console.log("CLASSES:", data);

      if (Array.isArray(data)) {
        setClasses(data);
      }
    }

    getClasses();
  }, []);

  useEffect(() => {
    async function getGrade() {
      const data = await getGrad();
      console.log(data);

      if (Array.isArray(data)) {
        setgrades(data);
      }
    }
    getGrade();
  }, []);
  return (
    <div className="p-6">
      {Edit && (
        <EditGrade
          grade={Edit}
          onClose={() => {
            setEdit(null);
          }}
        />
      )}
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Notes</h1>
        <p className="mt-1 text-sm text-gray-500">Manage student notes</p>
      </div>

      {/* Add Note */}
      <div className="mb-8 max-w-5xl rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-lg font-semibold text-gray-900">
          Ajouter une note
        </h2>

        <div className="grid gap-5 md:grid-cols-3">
          {/* Class */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Classe
            </label>

            <select
              value={classeId}
              onChange={(e) => setclasseId(e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
            >
              <option value="">Select class</option>

              {classes.map((classe) => (
                <option key={classe._id} value={classe._id}>
                  {classe.name}
                </option>
              ))}
            </select>
          </div>

          {/* Student */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Student
            </label>

            <select
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
            >
              <option value="">Select student</option>

              {students.map((student) => (
                <option key={student._id} value={student._id}>
                  {student.user?.username}
                </option>
              ))}
            </select>
          </div>

          {/* Subject */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Subject
            </label>

            <select
              value={subjectId}
              onChange={(e) => setSubjectId(e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
            >
              <option value="">Select subject</option>

              {Subjects.map((subject) => (
                <option key={subject._id} value={subject._id}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>

          {/* Note */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Note
            </label>

            <input
              type="number"
              min="0"
              max="20"
              placeholder="0 - 20"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
            />
          </div>

          {/* Semester */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Semester
            </label>

            <select
              value={semester}
              onChange={(e) => setsemester(e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
            >
              <option value="">Select semester</option>
              <option value="1">Semester 1</option>
              <option value="2">Semester 2</option>
            </select>
          </div>

          {/* Exam Type */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Exam type
            </label>

            <select
              value={examType}
              onChange={(e) => setexamType(e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
            >
              <option value="">Select exam type</option>
              <option value="controller">Controller</option>
              <option value="exam">Exam</option>
            </select>
          </div>
        </div>

        <button
          onClick={handlAjouter}
          className="mt-6 rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-violet-700"
        >
          Ajouter
        </button>
      </div>

      {/* Students Notes */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Liste des notes
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                  Student
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                  Classe
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                  Subject
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                  Note
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                  Semester
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                  Exam Type
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {grades.length > 0 ? (
                grades.map((grade) => (
                  <tr key={grade._id} className="hover:bg-gray-50">
                    {/* Student */}
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {grade.student?.user?.username || "—"}
                    </td>

                    {/* Class */}
                    <td className="px-6 py-4 text-gray-600">
                      {grade.classe?.name || "—"}
                    </td>

                    {/* Subject */}
                    <td className="px-6 py-4 text-gray-600">
                      {grade.subject?.name || "—"}
                    </td>

                    {/* Note */}
                    <td className="px-6 py-4">
                      <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">
                        {grade.score} / 20
                      </span>
                    </td>

                    {/* Semester */}
                    <td className="px-6 py-4 text-gray-600">
                      Semester {grade.semester}
                    </td>

                    {/* Exam Type */}
                    <td className="px-6 py-4 text-gray-600">
                      {grade.examType || "—"}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            handlEdit(grade);
                          }}
                          className="rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-100"
                        >
                          Modifier
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-10 text-center text-gray-500"
                  >
                    Aucune note trouvée
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AddNote;
