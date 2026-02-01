import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">IMS Login</h2>

      <form onSubmit={handleLogin} className="col-md-4 mx-auto">
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-danger w-100" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center mt-3">
          Don't have an account?{" "}
          <Link to="/register" className="text-danger">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;

