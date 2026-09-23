import axios from "axios";

export default async function changePassword(payload) {
  const token = localStorage.getItem("token");

  const response = await axios.put(
    "http://localhost:3000/users/change-password",
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}