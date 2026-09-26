import { useEffect, useState } from "react";
import getStudentsTeacher from "../../../services/getStudentTeacher";

function Student() {
  const [state, setState] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function getStudent() {
      const data = await getStudentsTeacher();
      console.log(data);

      if (Array.isArray(data)) {
        setState(data);
      }
    }

    getStudent();
  }, []);

  const filteredStudents = state.filter((student) =>
    (student.user?.username || "")
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Students</h1>
        <p className="mt-1 text-sm text-gray-500">
          View the students assigned to your classes.
        </p>
      </div>

      {/* Search */}
      <div className="mb-6 flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="relative w-full max-w-sm">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="search"
            placeholder="Search student..."
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 outline-none transition focus:border-violet-500 focus:bg-white focus:ring-2 focus:ring-violet-100"
          />
        </div>

        <span className="ml-4 text-sm text-gray-500">
          {filteredStudents.length} student
          {filteredStudents.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Student
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Email
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Gender
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Parent
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr
                    key={student._id}
                    className="transition-colors hover:bg-gray-50"
                  >
                    {/* Student */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 font-semibold text-violet-700">
                          {student.user?.username
                            ?.charAt(0)
                            .toUpperCase() || "S"}
                        </div>

                        <div>
                          <p className="font-medium text-gray-900">
                            {student.user?.username || "Unknown"}
                          </p>

                          <p className="text-xs text-gray-400">
                            Student
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {student.user?.email || "No email"}
                    </td>

                    {/* Gender */}
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                          student.gender === "male"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-pink-100 text-pink-700"
                        }`}
                      >
                        {student.gender || "Unknown"}
                      </span>
                    </td>

                    {/* Parent */}
                    <td className="px-6 py-4">
                      {student.parent?.user?.username ? (
                        <div>
                          <p className="text-sm font-medium text-gray-800">
                            {student.parent.user.username}
                          </p>

                          <p className="text-xs text-gray-400">
                            {student.parent.phone || "No phone"}
                          </p>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400">
                          No parent
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-12 text-center"
                  >
                    <p className="font-medium text-gray-700">
                      No students found
                    </p>

                    <p className="mt-1 text-sm text-gray-400">
                      Try changing your search.
                    </p>
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

export default Student;