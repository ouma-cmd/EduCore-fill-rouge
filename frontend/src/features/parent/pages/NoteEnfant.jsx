import { useEffect, useState } from "react";
import getChildren from "../../../services/getChildren";
import getSubjectParent from "../../../services/getSubjetcParent";
import getClasse from "../../../services/getCLasseParent";
import getNoteParent from "../../../services/getNoteParent";

export default function NoteEnfant() {
  const [children, setchildren] = useState([]);
  const [subject, setsubject] = useState([]);
  const [classes, setclasses] = useState([]);
  const [Notes, setNotes] = useState([]);

  useEffect(() => {
    async function fetchChildren() {
      const data = await getChildren();
      console.log(data);

      if (Array.isArray(data)) {
        setchildren(data);
      }
    }
    fetchChildren();
  }, []);

  useEffect(() => {
    async function fetchSubject() {
      const data = await getSubjectParent();
      console.log(data);

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
    async function fetchNote() {
      const data = await getNoteParent();
      if (Array.isArray(data)) {
        setNotes(data);
      }
    }
    fetchNote();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Notes de mon enfant
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Consultez les résultats scolaires de votre enfant
        </p>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="font-semibold text-gray-800">Liste des notes</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            <thead className="bg-gray-50">
              <tr className="border-b border-gray-200">
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Children
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Subject
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Classe
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Note
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Semestre
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Type
                </th>
              </tr>
            </thead>

            <tbody>
              {/* Les notes viendront de l'API */}
              {children.map((child) => {
                const student = subject.find((sub) => sub._id === child._id);
                const classe = classes.find(
                  (cl) => cl._id.toString() === child.classes?.[0].toString(),
                );
                const note = Notes.find(
                  (note) =>
                    note.student?._id.toString() === child._id.toString(),
                );
                return (
                  <tr
                    key={child._id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {child.user?.username}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {student?.subjects?.[0]?.name}
                    </td>

                    <td className="px-6 py-4 text-gray-600">{classe?.name}</td>

                    <td className="px-6 py-4">
                      <span className="rounded-lg bg-violet-50 px-3 py-1 font-semibold text-violet-600">
                        {note?.score}/20
                      </span>
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      semester {note?.semester}
                    </td>

                    <td className="px-6 py-4 text-gray-600">{note?.examType}</td>
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
