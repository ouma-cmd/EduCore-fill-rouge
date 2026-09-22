import { useEffect, useState } from "react";
import subjectApi from "../../../services/getsubject";
import EditFormSubject from "../components/EditFormSubject";
import deletSubject from "../../../services/deletSubject";
import Viewsubject from "../components/ViewSubject";
import AddSubject from "../components/AddSubject";

export default function Subjects() {
  const [search, setSearch] = useState("");
  const [subject, setsubject] = useState([]);
  const [subjectnow, setSubjectnow] = useState(null);
  const [delet, setdelet] = useState([]);
  const [view, setView] = useState(null);
  const [ajouter, setAjouter] = useState(null);

  function getSubject(e) {
    setsubject(e.target.value);
  }
  function handlEdit(sb) {
    setSubjectnow(sb);
  }

  async function handlDelet(id) {
    const data = await deletSubject(id);
    if (data) {
      setdelet((prev) => {
        return prev.filter((items) => {
          return items._id !== id;
        });
      });
    }
  }

  function handlView(sb) {
    setView(sb);
  }

  function handlAdd(e){
    setAjouter(true)
  }

  useEffect(() => {
    async function getSubeject() {
      const data = await subjectApi();
      if (Array.isArray(data)) {
        setsubject(data);
      }
    }
    getSubeject();
  }, []);
  return (
    <div className="p-6">
      {subjectnow && (
        <EditFormSubject
          subject={subjectnow}
          onClose={() => setSubjectnow(false)}
        />
      )}
      {ajouter && <AddSubject onClose={() => setAjouter(false)} />}
      {view && <Viewsubject subject={view} onClose={() => setView(false)} />}

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
                  coefficient
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                  teacher
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {console.log(subject)}
              {(subject || [])
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
                      <td className="px-6 py-4 text-gray-600">
                        {sb.teachers[0]?.user?.username}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              handlEdit(sb);
                            }}
                            className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg"
                          >
                            Modifier
                          </button>

                          <button
                            onClick={() => handlDelet(sb._id)}
                            className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            Delete
                          </button>

                          <button
                            onClick={() => handlView(sb)}
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
