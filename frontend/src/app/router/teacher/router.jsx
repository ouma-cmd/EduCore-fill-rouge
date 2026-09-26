import Layout from "../../../features/teacher/components/Layout";
import Absence from "../../../features/teacher/pages/Absence";
import AddNote from "../../../features/teacher/pages/AddNote";
import Classes from "../../../features/teacher/pages/Classes";
import DashboardTeacher from "../../../features/teacher/pages/dashboardTeach";
import MoyenneNote from "../../../features/teacher/pages/MoyennNote";
import Settings from "../../../features/teacher/pages/Settings";
import Student from "../../../features/teacher/pages/Student";
import Subject from "../../../features/teacher/pages/Subjects";
import protecte from "../routes/protected";

const routTeacher = [
  {
    element: <Layout />,
    children: [
      {
        path: "/dashboardTeacher",
        element: <DashboardTeacher />,
        loader: () => protecte("teacher"),
      },
      {
        path: "/classe",
        element: <Classes />,
        loader: () => protecte("teacher"),
      },
      {
        path: "/student",
        element: <Student />,
        loader: () => protecte("teacher"),
      },
      {
        path: "/teacher/subjects",
        element: <Subject />,
        loader: () => protecte("teacher"),
      },
      {
        path: "/AddNote",
        element: <AddNote />,
        loader: () => protecte("teacher"),
      },
      {
        path: "/MoyennNote",
        element: <MoyenneNote />,
        loader: () => protecte("teacher"),
      },
      {
        path: "/teacher/absence",
        element: <Absence />,
        loader: () => protecte("teacher"),
      },
      {
        path: "/teacher/settings",
        element: <Settings/>,
        loader: () => protecte("teacher"),
      },
    ],
  },
];
export default routTeacher;
