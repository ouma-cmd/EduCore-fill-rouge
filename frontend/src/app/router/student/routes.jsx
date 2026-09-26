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
    loader: () => protecte("student"),
  },
  {
    path: "/subjects",
    element: <></>,
    loader: () => protecte("student"),
  },
  {
    path: "/Mynote",
    element: <></>,
    loader: () => protecte("student"),
  },
  {
    path: "/absence",
    element: <></>,
    loader: () => protecte("student"),
  },
];
export default routStudent;
