import { useEffect, useState } from "react";
import getClasseTeacher from "../../../services/getClassesTeacher";
import getStudentsTeacher from "../../../services/getStudentTeacher";
import getSubjectTeacher from "../../../services/getSubjectTeacher";
import AjouterAbcense from "../../../services/AjouterAbcense";
import getattandance from "../../../services/getAttandance";

export default function Absence() {
  const [classeId, setclasseId] = useState("");
  const [classes, setclasses] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [students, setstudents] = useState([]);
  const [subjectId, setSubjectId] = useState("");
  const [Subjects, setSubjects] = useState([]);
  const [date, setDate] = useState("");
  const [statusId, setstatusId] = useState("");
  const [attendances, setattendances] = useState([]);

  async function handlAjouter() {
    const payload = {
      classe: classeId,
      student: studentId,
      subjects: subjectId,
      date: date,
      status: statusId,
    };
    console.log("payload", payload);

    const result = await AjouterAbcense(payload);
    console.log("result", result);
  }

  useEffect(() => {
    async function getClasse() {
      const data = await getClasseTeacher();
      console.log(data);

      if (Array.isArray(data)) {
        setclasses(data);
      }
    }
    getClasse();
  }, []);

  useEffect(() => {
    async function getstudents() {
      const data = await getStudentsTeacher();
      console.log(data);

      if (Array.isArray(data)) {
        setstudents(data);
      }
    }
    getstudents();
  }, []);

  useEffect(() => {
    async function getsubject() {
      const data = await getSubjectTeacher();
      console.log(data);

      if (Array.isArray(data)) {
        setSubjects(data);
      }
    }
    getsubject();
  }, []);

  useEffect(() => {
    async function fetchattendance() {
      const data = await getattandance();
      if (Array.isArray(data)) {
        setattendances(data);
      }
    }
    fetchattendance();
  }, []);

  return (
    <div>
      {" "}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Absence</h1>
        <p className="mt-1 text-sm text-gray-500">Manage student Absence</p>
      </div>
      {/* Add Note */}
      <div className="mb-8 max-w-5xl rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-lg font-semibold text-gray-900">
          Ajouter une Abcense
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
          {/* date */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Date
            </label>

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
            />
          </div>

          {/* status */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              status
            </label>

            <select
              value={statusId}
              onChange={(e) => setstatusId(e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
            >
              <option value="">Select status</option>

              <option value="present">present</option>
              <option value="absent">absent</option>
              <option value="late">late</option>
            </select>
          </div>
        </div>

        <button
          onClick={handlAjouter}
          className="mt-6 rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-violet-700"
        >
          Ajouter Absence
        </button>
      </div>
      {/* Students Notes */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Liste des Absence
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
                  date
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                  status
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {console.log("attendances", attendances)}
              {attendances.length > 0 ? (
                attendances.map((attendance) => (
                  <tr key={attendance._id} className="hover:bg-gray-50">
                    {/* Student */}
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {attendance.student?.user?.username || "—"}
                    </td>
                    {/* Class */}
                    <td className="px-6 py-4 text-gray-600">
                      {attendance.classe?.name || "—"}
                    </td>
                    {/* Subject */}
                    <td className="px-6 py-4 text-gray-600">
                      {attendance.subjects?.name || "—"}
                    </td>
                    {/* date */}
                    <td className="px-6 py-4">
                      <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">
                        {attendance.date}
                      </span>
                    </td>
                    {/* status */}
                    <td className="px-6 py-4 text-gray-600">
                      {attendance.status}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7" // className="px-6 py-10 text-center text-gray-500"
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
