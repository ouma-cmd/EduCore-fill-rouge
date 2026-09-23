import { useEffect, useState } from "react";
import {
  GraduationCap,
  UserRound,
  Users,
  School,
  BookOpen,
  ClipboardCheck,
  CalendarX,
  BookMarked,
} from "lucide-react";
import dashTeacher from "../../../services/dashTeacher";

export default function DashboardTeacher() {
  const [state, setstate] = useState({});
  useEffect(() => {
    async function fetchdashteacher() {
      const data = await dashTeacher();

    console.log("DASH TEACHER DATA:", data);
      if (data) {
        setstate(data);
      }
    }
    fetchdashteacher();
  }, []);
  const cards = [
    { title: "student", Value: state?.student },
    { title: "classes", Value: state?.classe },
    { title: "subject", Value: state?.subject },
  ];
  return (
    <main className="flex-1 p-6 bg-gray-50 min-h-screen">
      <header>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Welcome back , Student</p>
      </header>
      <section className="mt-6 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* map card */}
          {cards.map((card, index) => {
            return (
              <div
                key={index}
                className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-sm font-medium text-gray-500">
                      {card.title}
                    </h1>

                    <p className="text-2xl font-bold text-gray-900 mt-2">
                      {card.Value}
                    </p>
                  </div>

                  <div className="w-11 h-11 rounded-lg bg-violet-50 flex items-center justify-center">
                    {index === 0 && (
                      <GraduationCap className="w-6 h-6 text-violet-600" />
                    )}
                    {index === 1 && (
                      <School className="w-6 h-6 text-violet-600" />
                    )}

                    {index === 2 && (
                      <BookOpen className="w-6 h-6 text-violet-600" />
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
