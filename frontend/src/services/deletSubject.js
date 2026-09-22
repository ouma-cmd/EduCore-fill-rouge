import axios from "axios";

export default async function deletSubject(id) {
  try {
    const token = localStorage.getItem("token");
    const responce = await axios.delete(
      `http://localhost:3000/admin/deleteSubject/${id}`,
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
