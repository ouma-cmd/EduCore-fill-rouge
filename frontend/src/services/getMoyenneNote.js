import axios from "axios";

export default async function getMoyenneNote({ student, classe, subject }) {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      "http://localhost:3000/teacher/moyenneNote",
      {
        params: {
          student,
          classe,
          subject,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    return error.message;
  }
}