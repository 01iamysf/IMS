import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch {
      alert("Invalid login credentials");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">IMS Admin Login</h2>

      <form onSubmit={handleLogin} className="col-md-4 mx-auto">
        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-danger w-100">Login</button>
      </form>
    </div>
  );
}

export default Login;
