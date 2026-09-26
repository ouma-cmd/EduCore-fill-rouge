import axios from "axios";

export default async function getattandance() {
  try {
    const token = localStorage.getItem("token");
    const responce = await axios.get(
      `http://localhost:3000/teacher/historAbsence`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (responce.data.error) {
      return null;
    }
    return responce.data;
  } catch (error) {
    console.log("STATUS:", error.response?.status);
    console.log("ERROR DATA:", error.response?.data);
    return null;
  }
}
