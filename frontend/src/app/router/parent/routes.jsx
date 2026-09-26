import protecte from "../routes/protected";

const routeParent = [
  {
    path: "/dashboardParent",
    element: <></>,
    loader: () => protecte("parent"),
  },
  {
    path: "/enfant",
    element: <></>,
    loader: () => protecte("parent"),
  },
];
export default routeParent;
