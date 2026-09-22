import axios from "axios";

export default async function getTeacher() {
  try {
    const token = localStorage.getItem("token");
    const responce = await axios.get(
      "http://localhost:3000/admin/getAllTeacher",
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

