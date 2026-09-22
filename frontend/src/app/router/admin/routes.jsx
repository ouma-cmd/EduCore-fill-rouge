import Layout from "../../../features/admin/components/Layout";
import Classes from "../../../features/admin/pages/Classes";
import DashAdmin from "../../../features/admin/pages/Dashboard";
import Parent from "../../../features/admin/pages/Parent";
import Settings from "../../../features/admin/pages/Settings";
import Student from "../../../features/admin/pages/student";
import Subjects from "../../../features/admin/pages/Subject";
import Teachers from "../../../features/admin/pages/Teacher";
import USer from "../../../features/admin/pages/User";
import protecte from "../routes/protected";

/**
 * @type {import('react-router').RouteObject[]}
 */
const routes = [
  {
    element: <Layout />,
    children: [
      {
        path: "/dashboardAdmin",
        element: <DashAdmin />,
        loader: () => protecte("admin"),
      },
      {
        path: "/User",
        element: <USer/>,
        loader: () => protecte("admin"),
      },
      {
        path: "/students",
        element: <Student />,
        loader: () => protecte("admin"),
      },
      {
        path: "/teacher",
        element: <Teachers />,
        loader: () => protecte("admin"),
      },
      {
        path: "/parent",
        element: <Parent />,
        loader: () => protecte("admin"),
      },
      {
        path: "/classes",
        element: <Classes />,
        loader: () => protecte("admin"),
      },
      {
        path: "/subject",
        element: <Subjects />,
        loader: () => protecte("admin"),
      },
      {
        path: "/settings",
        element: <Settings/>,
        loader: () => protecte("admin"),
      },
    ],
  },
];
export default routes;
