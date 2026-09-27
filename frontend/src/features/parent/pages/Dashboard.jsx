import { useEffect, useState } from "react";
import { UserRound, ClipboardCheck, CalendarX } from "lucide-react";
import dashParent from "../../../services/dashParent";

function Dashboard() {
  const [state, setState] = useState(null);

  useEffect(() => {
    async function dataDash() {
      const data = await dashParent();
      console.log(data);
      
      setState(data);
    }
    dataDash();
  }, []);

  const card = [
    { title: "student", Value: state?.student },
    { title: "grade", Value: state?.grade },
    { title: "Attendance", Value: state?.attendance },
  ];

  return (
    <main className="flex-1 p-6 bg-gray-50 min-h-screen">
      <header>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Welcome back , Parent</p>
      </header>
      <section className="mt-6 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* map card */}
          {card.map((cards, index) => {
            return (
              <div
                key={index}
                className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-sm font-medium text-gray-500">
                      {cards.title}
                    </h1>

                    <p className="text-2xl font-bold text-gray-900 mt-2">
                      {cards.Value}
                    </p>
                  </div>

                  <div className="w-11 h-11 rounded-lg bg-violet-50 flex items-center justify-center">
                    {index === 0 && (
                      <UserRound className="w-6 h-6 text-violet-600" />
                    )}

                    {index === 1 && (
                      <ClipboardCheck className="w-6 h-6 text-violet-600" />
                    )}

                    {index === 2 && (
                      <CalendarX className="w-6 h-6 text-violet-600" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
export default Dashboard;
