import { useEffect, useState } from "react";
import getTeacher from "../../../services/GetTeacher";
import deletTeacher from "../../../services/deletTeacher";
import EditTeacher from "../components/EditTeacher";
import AddTeacher from "../components/AddTeacher";
import ViewTeacher from "../components/ViewTeacher";

export default function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [edit, setEdit] = useState(null);
  const [view, setView] = useState(null);
  const [add, setAdd] = useState(false);
  const [search, setsearch] = useState("");

  function handlsearch(e) {
    setsearch(e.target.value);
  }

  const filteredTeachers = teachers.filter((teach) => {
    return teach.user?.username?.toLowerCase().includes(search.toLowerCase());
  });

  async function handlDelet(id) {
    const result = await deletTeacher(id);

    if (result) {
      setTeachers((currentTeachers) =>
        currentTeachers.filter((item) => item._id !== id),
      );
    }
  }

  function handlEdit(teacher) {
    setEdit(teacher);
  }

  function handlView(teacher) {
    console.log(teacher);

    setView(teacher);
  }

  function AddTeachers() {
    setAdd(true);
  }

  useEffect(() => {
    async function fetchTeacher() {
      const data = await getTeacher();
      console.log(data);
      if (Array.isArray(data)) {
        setTeachers(data);
      }
    }
    fetchTeacher();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {edit && <EditTeacher teacher={edit} onClose={() => setEdit(null)} />}
      {view && (
        <ViewTeacher
          teacher={view}
          onClose={() => {
            setView(null);
          }}
        />
      )}
      {add && (
        <AddTeacher
          teacher={add}
          onClose={() => {
            setAdd(null);
          }}
        />
      )}
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Teachers</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your teachers and their information
        </p>
      </header>

      {/* Search + Add */}
      <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <input
          type="search"
          value={search}
          onChange={handlsearch}
          placeholder="Search teacher..."
          className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 sm:w-80"
        />

        <button
          onClick={() => {
            AddTeachers();
          }}
          className="rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-violet-700 active:scale-95"
        >
          Ajouter Teacher
        </button>
      </div>

      {/* Table */}
      <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px] text-left">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                  Teacher
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                  Email
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                  Classes
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                  Subjects
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredTeachers.map((teacher) => {
                return (
                  <tr key={teacher._id} className="transition hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {/* <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 font-semibold text-violet-700">
                          {teacher.user?.username?.charAt(0).toUpperCase()}
                        </div> */}

                        <span className="font-medium text-gray-900">
                          {teacher.user?.username}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600">
                      {teacher.user?.email}
                    </td>

                    <td className="px-6 py-4">
                      {teacher.classe?.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {teacher.classe.map((classe) => (
                            <span
                              key={classe._id}
                              className="rounded-full bg-violet-100 px-3 py-1 text-xs font-medium text-violet-700"
                            >
                              {classe.name}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400">No class</span>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      {teacher.subjects?.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {teacher.subjects.map((subject) => (
                            <span
                              key={subject._id}
                              className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700"
                            >
                              {subject.name}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400">
                          No subject
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            handlEdit(teacher);
                          }}
                          className="rounded-lg px-3 py-1.5 text-sm font-medium text-blue-600 transition hover:bg-blue-50"
                        >
                          Modifier
                        </button>

                        <button
                          onClick={() => {
                            handlDelet(teacher._id);
                          }}
                          className="rounded-lg px-3 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
                        >
                          Delete
                        </button>

                        <button
                          onClick={() => handlView(teacher)}
                          className="rounded-lg px-3 py-1.5 text-sm font-medium text-green-600 transition hover:bg-green-50"
                        >
                          View
                        </button>
                      </div>
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
