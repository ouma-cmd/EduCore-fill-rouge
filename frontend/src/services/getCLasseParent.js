import axios from "axios";

export default async function getClasse() {
  try {
    const token = localStorage.getItem("token");
    const responce = await axios.get(
      "http://localhost:3000/parent/getClasse",
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
    return error.message;
  }
}
