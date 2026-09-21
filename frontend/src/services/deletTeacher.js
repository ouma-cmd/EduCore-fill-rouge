import axios from "axios";

export default async function deletTeacher(id) {
  try {
    const token = localStorage.getItem("token");
    const responce = await axios.delete(
      `http://localhost:3000/admin/deletTeacher/${id}`,
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
