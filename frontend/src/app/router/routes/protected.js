import { jwtDecode } from "jwt-decode";
import { redirect } from "react-router-dom";

function protecte(requiredRole) {
  const token = localStorage.getItem("token");

  if (!token) {
    throw redirect("/login");
  }

  const decoded = jwtDecode(token);
  const role = decoded.role;

  if (role === requiredRole) {
    return null;
  }

  throw redirect("/login");
}

export default protecte;
