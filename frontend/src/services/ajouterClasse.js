import axios from "axios";

export default async function ajouterClasse(payload) {
  try {
    const token = localStorage.getItem("token");
    const responce = await axios.post(
      "http://localhost:3000/admin/ajouterClasse",
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
