import Layout from "../../../features/teacher/components/Layout";
import DashboardTeacher from "../../../features/teacher/pages/dashboardTeach";
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
        path: "/student",
        element: <></>,
      },
      {
        path: "/classes",
        element: <></>,
      },
      {
        path: "/subject",
        element: <></>,
      },
      {
        path: "/AddNote",
        element: <></>,
      },
      {
        path: "/absence",
        element: <></>,
      },
      {
        path: "/getAbsences",
        element: <></>,
      },
    ],
  },
];
export default routTeacher;
