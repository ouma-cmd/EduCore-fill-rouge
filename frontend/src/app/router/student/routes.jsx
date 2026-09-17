import protecte from "../routes/protected";

const routStudent = [
  {
    path: "/dashboardStudent",
    element: <></>,
    loader: () => protecte("student"),
  },
  {
    path: "/classes",
    element: <></>,
  },
  {
    path: "/subjects",
    element: <></>,
  },
  {
    path: "/Mynote",
    element: <></>,
  },
  {
    path: "/absence",
    element: <></>,
  },
];
export default routStudent;
