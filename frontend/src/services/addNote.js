import axios from "axios";

export default async function ajouterNote(payload) {
  try {
    const token = localStorage.getItem("token");
    const responce = await axios.post(
      "http://localhost:3000/teacher/addNote",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (responce.data.error) {
      return false;
    }
    return responce.data;
  } catch (error) {
 console.log("STATUS:", error.response?.status);
  console.log("BACKEND ERROR:", error.response?.data);
  return error.response?.data;  }
}
