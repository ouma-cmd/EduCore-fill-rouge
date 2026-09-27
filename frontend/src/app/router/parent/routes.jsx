import Layout from "../../../features/parent/components/Layout";
import AbsenceEnfante from "../../../features/parent/pages/AbsenceEnfante";
import Dashboard from "../../../features/parent/pages/Dashboard";
import NoteEnfant from "../../../features/parent/pages/NoteEnfant";
import Settings from "../../../features/parent/pages/Settings";
import protecte from "../routes/protected";

const routeParent = [
  {
    element: <Layout />,
    children: [
      {
        path: "/dashboardParent",
        element: <Dashboard />,
        loader: () => protecte("parent"),
      },
      {
        path: "/NoteEnfant",
        element: <NoteEnfant />,
        loader: () => protecte("parent"),
      },
      {
        path: "/AbsenceEnfante",
        element: <AbsenceEnfante />,
        loader: () => protecte("parent"),
      },
      {
        path: "/parent/settings",
        element: <Settings/>,
        loader: () => protecte("parent"),
      },
    ],
  },
];
export default routeParent;
