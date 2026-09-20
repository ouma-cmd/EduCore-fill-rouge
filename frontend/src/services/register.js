import axios from "axios";

export default async function register(payload) {
  try {
    const token = localStorage.getItem("token");
    const responce = await axios.post(
      "http://localhost:3000/users/register",
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
