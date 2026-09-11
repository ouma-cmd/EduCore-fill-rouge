import { useState } from "react";
import loginAxios from "../../../services/axion";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  function handlchangeEmail(e) {
    setEmail(e.target.value);
  }
  function handlchangePass(e) {
    setPass(e.target.value);
  }
  function handlSubmit(e) {
    e.preventDefault();
    loginAxios(email, pass);
  }
  return (
    <div>
      <form onSubmit={handlSubmit}>
        <div>
          <label>Email</label>
          <input type="email" value={email} onChange={handlchangeEmail} />
        </div>
        <div>
          <label>password</label>
          <input type="password" value={pass} onChange={handlchangePass} />
        </div>
        <div>
          <button>Login</button>
        </div>
        <div>
          <p>
            Don't have an account? <span>Register</span>
          </p>
        </div>
      </form>
    </div>
  );
}
export default LoginForm;
