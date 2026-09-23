import { useEffect, useState } from "react";
import getUser from "../../../services/getUser";
import AddUser from "../components/AddUser";
import EditFormUser from "../components/EditFormUser";
import deletUser from "../../../services/deletUser";
import ViewUser from "../components/ViewUser";

export default function USer() {
  const [search, setSearch] = useState("");
  const [state, setstate] = useState([]);
  const [ajouter, setAjouter] = useState(null);
  const [usernow, setusertnow] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [delet, setDelet] = useState([]);
  const [view, setView] = useState(null);

  function handlEdit(us) {
    setusertnow(us);
  }
  async function handlDelet(id) {
    const delet = await deletUser(id);
    if (delet) {
      setDelet((prev) => {
        return prev.filter((item) => {
          return item._id !== id;
        });
      });
    }
  }

  function handlView(us){
    setView(us)
  }
  function handlAdd() {
    setAjouter(true);
  }

  useEffect(() => {
    async function fetchuser() {
      const data = await getUser(page, 5);
      console.log("DATA FROM API:", data);
      console.log("USERS:", data?.users);
      if (data) {
        setstate(data.getUser);
        setTotalPages(data.totalPages);
      }
    }
    fetchuser();
  }, [page]);
  return (
    <div className="p-6">
      {usernow && (
        <EditFormUser user={usernow} onClose={() => setusertnow(false)} />
      )}
      {ajouter && <AddUser onClose={() => setAjouter(false)} />}
      {view && <ViewUser user={view} onClose={() => setView(false)} />}
      <header>
        <h1 className="text-2xl font-bold text-gray-900 py-5">Stuboord</h1>
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
          Ajouter user
        </button>
      </div>
      <div>
        <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                  user
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                  Email
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                  role
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {(state || [])
                .filter((filt) => {
                  return (filt.username || "")
                    .toLowerCase()
                    .includes(search.toLowerCase());
                })
                .map((us) => {
                  return (
                    <tr
                      key={us._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {us.username || ""}
                      </td>

                      <td className="px-6 py-4 text-gray-600">
                        {us.email || ""}
                      </td>

                      <td className="px-6 py-4">
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                          {us.role}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              handlEdit(us);
                            }}
                            className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg"
                          >
                            Modifier
                          </button>

                          <button
                            onClick={() => handlDelet(us._id)}
                            className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            Delete
                          </button>

                          <button
                            onClick={() => handlView(us)}
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
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 rounded-lg bg-violet-600 text-white
               hover:bg-violet-700 transition
               disabled:bg-gray-300 disabled:text-gray-500
               disabled:cursor-not-allowed"
        >
          Previous
        </button>

        <span className="text-sm font-medium text-gray-700">
          Page <span className="text-violet-600">{page}</span>
          <span className="text-violet-600">{totalPages}</span>
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 rounded-lg bg-violet-600 text-white
               hover:bg-violet-700 transition
               disabled:bg-gray-300 disabled:text-gray-500
               disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
}
