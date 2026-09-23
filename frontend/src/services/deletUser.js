import axios from "axios";

export default async function deletUser(id) {
  try {
    const token = localStorage.getItem("token");
    const responce = await axios.delete(
      `http://localhost:3000/admin/delet/${id}`,
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
