import axios from "axios";

export default async function AjouterAbcense(payload) {
  try {
    const token = localStorage.getItem("token");
    const responce = await axios.post(
      "http://localhost:3000/teacher/MarquerPresences",
      payload,
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
