import axios from "axios";
const loginAxios = async (email, password) => {
  try {
    const reponse = await axios.post("http://localhost:3000/users/login", {
      email,
      password,
    });
    if (reponse.data.error) {
      return false;
    }
    const token = reponse.data.token;
    localStorage.setItem("token", token);
    return reponse.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};
export default loginAxios;
