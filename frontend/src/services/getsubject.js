import axios from "axios";

export default async function subjectApi() {
  try {
    const token = localStorage.getItem("token");
    const responce = await axios.get(
      "http://localhost:3000/admin/getAllSubject",
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
    return false;
  }
}
