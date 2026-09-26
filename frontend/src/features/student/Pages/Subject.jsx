import { useEffect, useState } from "react";
import getSubjectSubject from "../../../services/getSubjetcStudent";

function Subject() {
  const [search, setSearch] = useState("");
  const [subjects, setsubjects] = useState([]);

  useEffect(() => {
    async function getSubject() {
      const data = await getSubjectSubject();
      console.log("subject", data);

      if (Array.isArray(data)) {
        setsubjects(data);
      }
    }
    getSubject();
  });
  return (
    <div className="p-6">
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
                  coefficient
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {console.log(subjects)}
              {(subjects || [])
                .filter((filt) => {
                  return filt.name.toLowerCase().includes(search.toLowerCase());
                })
                .map((sb) => {
                  return (
                    <tr
                      key={sb._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {sb.name}
                      </td>

                      <td className="px-6 py-4 text-gray-600">
                        {sb.coefficient}
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

export default Subject;
