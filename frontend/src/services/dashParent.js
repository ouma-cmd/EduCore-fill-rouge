import axios from "axios";

export default async function dashParent() {
  try {
     const token = localStorage.getItem("token");
    const responce = await axios.get(
      "http://localhost:3000/dashboard/dashParent",
      {
        headers:{
            'Authorization':`Bearer ${token}`
        }
      }
    );
    if (responce.data.error) {
      return false;
    }


    return responce.data
  } catch (error) {
    return error.message;
  }
}
