import axios from "axios";

export default async function ajouterSubject(payload) {
  try {
    const token = localStorage.getItem("token");
    const responce = await axios.post(
      "http://localhost:3000/admin/ajouterSubject",
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
    return error.message;
  }
}
