import { redirect } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const publice =async  () => {
  const token = localStorage.getItem("token");
  if (token) {
    const decode = jwtDecode(token);
    const pay = decode.role;
    if (pay === "admin") {
      throw redirect("/dashboardAdmin");
    }
    if (pay === "student") {
      throw redirect("/dashboardStudent");
    }
    if (pay === "parent") {
      throw redirect("/dashboardParent");
    }
    if (pay === "teacher") {
      throw redirect("/dashboardTeacher");
    }
  }
  return null;
};

export default publice