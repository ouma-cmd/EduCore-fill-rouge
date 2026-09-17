import DashAdmin from '../../../features/admin/pages/Dashboard';
import protecte from '../routes/protected';

/**
 * @type {import('react-router').RouteObject[]}
 */
const routes = [
  {
    path: "/dashboardAdmin",
    element: <DashAdmin/>,
    loader: () => protecte("admin"),
  },
  {
    path: "/student",
    element: <></>,
    loader: protecte,
  },
  {
    path: "/parent",
    element: <></>,
    loader: protecte,
  },
  {
    path: "/classes",
    element: <></>,
    loader: protecte,
  },
  {
    path: "/subject",
    element: <></>,
    loader: protecte,
  },
  {
    path: "/settings",
    element: <></>,
    loader: protecte,
  },
];
export default routes;
