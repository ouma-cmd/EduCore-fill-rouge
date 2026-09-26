import LoginForm from "../../../features/auth/components/LoginForm";
import protecte from "../routes/protected";
import publice from "../routes/public";

const routesAuth = [
  {
    path: "/login",
    element: <LoginForm />,
    loader: async () => await publice(),
  },

];
export default routesAuth;
