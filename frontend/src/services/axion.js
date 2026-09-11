import axios from "axios";
const loginAxios = async (email, password) => {
  try {
    const reponse = await axios.post("http://localhost:3000/users/login", {
      email,
      password,
    });
  } catch (error) {
console.log(error);

  }
};
export default loginAxios;
