import Layout from "../../../features/student/components/Layout";
import Absence from "../../../features/student/Pages/Absence";
import Classes from "../../../features/student/Pages/Classes";
import Dashboard from "../../../features/student/Pages/Dashboard";
import MyNot from "../../../features/student/Pages/MyNote";
import Settings from "../../../features/student/Pages/Settings";
import Subject from "../../../features/student/Pages/Subject";
import protecte from "../routes/protected";

const routStudent = [
  {
    element: <Layout />,
    children: [
      {
        path: "/dashboardStudent",
        element: <Dashboard />,
        loader: () => protecte("student"),
      },
      {
        path: "/student/classes",
        element: <Classes/>,
        loader: () => protecte("student"),
      },
      {
        path: "/subjects",
        element: <Subject/>,
        loader: () => protecte("student"),
      },
      {
        path: "/Mynote",
        element: <MyNot/>,
        loader: () => protecte("student"),
      },
      {
        path: "/absence",
        element: <Absence/>,
        loader: () => protecte("student"),
      },
      {
        path: "/teacher/settings",
        element: <Settings/>,
        loader: () => protecte("student"),
      },
    ],
  },
];
export default routStudent;
