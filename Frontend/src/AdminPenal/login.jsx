import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LOGIN_API } from "../AdminPenal/config/api"
import header from "./images/header.jpg";
import logo from "./images/logo.png";
import "./ad.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Auto-redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(LOGIN_API, { email, password });
      const { token } = res?.data?.data || {};

      if (res.status === 200 && token) {
        localStorage.setItem("adminToken", token);
        console.log("Login token:", token); // ✅ Debug
        alert("Login successful");
        navigate("/dashboard", { replace: true });
      } else {
        alert(res.data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-start min-vh-100 bg-light p-md-5">
      <img
        src={header}
        alt="Solar Panel Banner"
        className="img-fluid mb-4 rounded-md-4"
        crossOrigin="anonymous"
        style={{ maxHeight: "300px", objectFit: "cover", width: "100%" }}
      />

      <h4 className="mb-4 fw-bold text-center">Admin Panel</h4>

      <div className="row w-100 justify-content-center align-items-center">
        <div className="col-12 col-md-6 d-flex justify-content-end">
          <div
            className="card border-0 py-md-2 bg-light"
            style={{ width: "100%", maxWidth: "480px", height: "284px" }}
          >
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="py-2">Username</label>
                <input
                  type="email"
                  className="form-control p-2 shadow-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  placeholder="Enter your username"
                />
              </div>

              <div className="mb-3">
                <label className="py-2">Password</label>
                <div className="position-relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control p-2 shadow-none"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="btn btn-sm position-absolute top-50 end-0 translate-middle-y me-2"
                    onClick={() => setShowPassword((prev) => !prev)}
                    tabIndex={-1}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-success w-100 mt-3 border-0 rounded-pill"
                style={{
                  background: "#5CE51A",
                  boxShadow:
                    "rgba(0, 0, 0, 0.1) 0px 5px 20px, rgba(0, 0, 0, 0.28) 0px 3px 6px",
                }}
                disabled={loading}
              >
                {loading ? "Logging in..." : "Log in"}
              </button>
            </form>
          </div>
        </div>

        <div className="col-12 col-md-6 d-flex justify-content-center justify-content-lg-start mt-4 mt-md-0">
          <img
            src={logo}
            alt="Tapi Green Solar Logo"
            crossOrigin="anonymous"
            className="img-fluid"
            style={{ width: "584px", height: "300px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
