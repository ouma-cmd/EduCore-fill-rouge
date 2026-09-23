import { useEffect, useState } from "react";
import getParent from "../../../services/GetParent";
import EditParent from "../components/EditParent";
import deletParent from "../../../services/deletParent";
import AddParent from "../components/AddParent";
import ViewParent from "../components/ViewParent";

export default function Parent({ onClose }) {
  const [state, setstate] = useState([]);
  const [parentnow, setparentnow] = useState();
  const [ajouter, setAjouter] = useState();
  const [view, setView] = useState();
  const [search, setSearch] = useState("");

  function getUser(e) {
    setstate(e.target.value);
  }

  function handlEdit(parent) {
    setparentnow(parent);
  }

  async function handlDelet(parent) {
    const id = parent._id;
    const result = await deletParent(id);
    if (result) {
      setstate((delet) => {
        return delet.filter((item) => item._id !== id);
      });
    }
  }
  function handlView(par) {
    console.log(par);

    setView(par);
  }

  function handlAdd() {
    setAjouter(true);
  }

  useEffect(() => {
    async function fetchParent() {
      const data = await getParent();
      console.log("PARENTS:", data);
      if (Array.isArray(data)) {
        setstate(data);
      }
    }
    fetchParent();
  }, []);
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {parentnow && (
        <EditParent parent={parentnow} onClose={() => setparentnow(false)} />
      )}

      {ajouter && <AddParent onClose={() => setAjouter(false)} />}

      {view && <ViewParent parent={view} onClose={() => setView(false)} />}

      {/* Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Parents</h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage parents and their students
        </p>
      </header>

      {/* Search + Add */}
      <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          type="search"
          placeholder="Search parent..."
          className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 sm:w-80"
        />

        <button
          onClick={() => {
            handlAdd();
          }}
          className="rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-violet-700 active:scale-95"
        >
          Ajouter parent
        </button>
      </div>

      {/* Table */}
      <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px] text-left">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                  Parent
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                  Email
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                  phone
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                  Enfants
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {(state || [])
                .filter((filt) => {
                  return filt.user?.username
                    .toLowerCase()
                    .includes(search.toLowerCase());
                })
                .map((par) => {
                  return (
                    <tr
                      key={par._id}
                      className="transition-colors hover:bg-gray-50"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <span className="font-medium text-gray-900">
                            {par.user?.username}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-600">
                        {par.user.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {par.phone}
                      </td>

                      <td className="px-6 py-4">
                        <div>
                          {par.students.map((student) => {
                            return (
                              <span
                                key={student._id}
                                className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700"
                              >
                                {student.user?.username}
                              </span>
                            );
                          })}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              handlEdit(par);
                            }}
                            className="rounded-lg px-3 py-1.5 text-sm font-medium text-blue-600 transition hover:bg-blue-50"
                          >
                            Modifier
                          </button>

                          <button
                            onClick={() => handlDelet(par)}
                            className="rounded-lg px-3 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
                          >
                            Delete
                          </button>

                          <button
                            onClick={() => handlView(par)}
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
