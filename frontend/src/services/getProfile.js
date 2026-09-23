import axios from "axios";

export default async function getProfile() {
  const token = localStorage.getItem("token");

  const response = await axios.get("http://localhost:3000/users/profile ", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
