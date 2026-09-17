import protecte from "../routes/protected";

const routTeacher = [
  {
    path: "/dashboardTeacher",
    element: <></>,
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
];
export default routTeacher;
