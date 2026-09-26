import { useEffect, useState } from "react";
import getClasseStudent from "../../../services/getCLasseStudent";

export default function Classes() {
  const [search, setSearch] = useState("");
  const [classes, setclasses] = useState([]);

  useEffect(() => {
    async function fetchclasse() {
      const data = await getClasseStudent();
      console.log("class student",data);
      
      if (Array.isArray(data)) {
        setclasses(data);
      }
    }

    fetchclasse();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">My Classes</h1>

        <p className="mt-1 text-sm text-gray-500">
          View the classes assigned to you.
        </p>
      </div>

      {/* Search */}
      <div className="mb-6 flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Class List</h2>

          <p className="text-sm text-gray-500">View your assigned classes.</p>
        </div>

        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          type="search"
          placeholder="Search class..."
          className="w-64 rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
        />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-6 py-4">
          <h3 className="font-semibold text-gray-800">Assigned Classes</h3>

          <p className="mt-1 text-sm text-gray-500">
            Classes currently assigned to you.
          </p>
        </div>

        <table className="w-full text-left">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Class Name
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Level
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Status
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {console.log(classes)}

            {(classes || [])
              .filter((filt) => {
                return filt.name.toLowerCase().includes(search.toLowerCase());
              })
              .map((cl) => {
                return (
                  <tr key={cl._id} className="transition hover:bg-gray-50">
                    {/* Class Name */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100 font-semibold text-violet-600">
                          {cl.name?.charAt(0).toUpperCase()}
                        </div>

                        <div>
                          <p className="font-semibold text-gray-900">
                            {cl.name}
                          </p>

                          <p className="text-xs text-gray-400">
                            Class ID: {cl._id}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Level */}
                    <td className="px-6 py-5">
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600">
                        {cl.level}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-5">
                      <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                        Active
                      </span>
                    </td>
                  </tr>
                );
              })}

            {classes.length === 0 && (
              <tr>
                <td colSpan="3" className="px-6 py-16 text-center">
                  <div className="mx-auto flex max-w-sm flex-col items-center">
                    <h3 className="text-base font-semibold text-gray-800">
                      No classes found
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      You don't have any classes assigned yet.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 px-6 py-4">
          <p className="text-sm text-gray-500">
            Showing
            <span className="font-semibold text-gray-700">
              {classes.length}
            </span>
            class{classes.length !== 1 ? "es" : ""}
          </p>

          <span className="text-xs text-gray-400">Teacher Classes</span>
        </div>
      </div>
    </div>
  );
}
