import axios from "axios";

export default async function editTeacher({ id, payload }) {
  try {
    const token = localStorage.getItem("token");
    const responce = await axios.put(
      `http://localhost:3000/admin/updateTeacher/${id}`,
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
