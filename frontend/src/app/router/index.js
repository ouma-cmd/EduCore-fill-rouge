import { createBrowserRouter } from "react-router-dom";

import routesAuth from "./auth/routes";
import routes from "./admin/routes";
import routeParent from "./parent/routes";
import routStudent from "./student/routes";
import routTeacher from "./teacher/router";

const router = createBrowserRouter([
  ...routesAuth,
  ...routes,
  ...routeParent,
  ...routStudent,
  ...routTeacher,
]);
export default router;
