import { useState } from "react";

export default function Classes() {
  const [search, setSearch] = useState("");
  const [state, setstate] = useState();
  return (
    <div className="p-6">
      {/* {studentnow && (
        <EditFormStudent
          student={studentnow}
          onClose={() => setstudentnow(false)}
        />
      )}
      {ajouter && <AddStudent onClose={() => setAjouter(false)} />}
      {view && <ViewStudent student={view} onClose={() => setView(false)} />} */}

      <header>
        <h1 className="text-2xl font-bold text-gray-900 py-5">Classes</h1>
      </header>
      <div className="flex items-center justify-between">
        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          type="search"
          placeholder="Search student..."
          className="border border-gray-200 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-violet-500"
        />

        <button
          onClick={() => {
            handlAdd();
          }}
          className="bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700"
        >
          Ajouter Student
        </button>
      </div>
      <div>
        <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                  name
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                  level
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {(state || [])
                .filter((filt) => {
                  return filt.user.username
                    .toLowerCase()
                    .includes(search.toLowerCase());
                })
                .map((cl) => {
                  return (
                    <tr
                      key={cl._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {cl.user.username}
                      </td>

                      <td className="px-6 py-4 text-gray-600">
                        {cl.user.email}
                      </td>

                      <td className="px-6 py-4">
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                          {cl.gender}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-gray-600">
                        {cl.parent.user.username}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              handlEdit(cl);
                            }}
                            className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg"
                          >
                            Modifier
                          </button>

                          <button
                            onClick={() => handlDelet(cl._id)}
                            className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            Delete
                          </button>

                          <button
                            onClick={() => handlView(cl)}
                            className="px-3 py-1 text-sm text-green-600 hover:bg-green-50 rounded-lg"
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
