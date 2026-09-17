import LoginForm from "../../../features/auth/components/LoginForm";
import publice from "../routes/public";

const routesAuth = [
  {
    path: "/login",
    element: <LoginForm />,
    loader: async () => await publice(),
  },
  {
    path: "/register",
    element: <></>,
    loader: async () => await publice(),
  },
];
export default routesAuth;
