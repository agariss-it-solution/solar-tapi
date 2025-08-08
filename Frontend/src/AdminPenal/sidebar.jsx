import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Product from "./Product";
import Contact from "./Contact";
import Review from "./Review";
import Gallary from "./media";
import Dashboard from "./Dashboard/Dashboard";
import { FaBell } from "react-icons/fa";
import axios from "axios";
import { LOGOUT_API } from "./config/api";
import "../App.css";

const AdminPanel = () => {
  const [view, setView] = useState("dashboard");
  const [formVisible, setFormVisible] = useState(false);
  const [newContactAlert, setNewContactAlert] = useState(false);

  const navigate = useNavigate();

  const parseJwt = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) return navigate("/admin");

    const decoded = parseJwt(token);
    if (!decoded?.exp) {
      localStorage.removeItem("adminToken");
      return navigate("/admin");
    }

    const expiryTime = decoded.exp * 1000;
    const currentTime = Date.now();

    if (currentTime >= expiryTime) {
      localStorage.removeItem("adminToken");
      return navigate("/admin");
    }

    const interval = setInterval(() => {
      if (Date.now() >= expiryTime) {
        localStorage.removeItem("adminToken");
        navigate("/admin");
      }
    }, 30000); // check every 30 seconds

    return () => clearInterval(interval);
  }, [navigate]);

  const navItems = [
    { key: "dashboard", label: "Dashboard", icon: "bi-house-door" },
    { key: "media", label: "Media", icon: "bi-images" },
    { key: "product", label: "Products", icon: "bi-box-seam" },
    { key: "review", label: "Reviews", icon: "bi-star" },
    { key: "contact", label: "Contact", icon: "bi-envelope-paper" },
  ];

  const handleLogout = async () => {
    const token = localStorage.getItem("adminToken");

    try {
      if (token) {
        // Only call API if token exists
        await axios.post(
          LOGOUT_API,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      // Always clear token and redirect
      localStorage.removeItem("adminToken");
      navigate("/admin");
    } catch (error) {
      console.error("Logout error:", error);

      // Still clear and redirect even if logout API fails
      localStorage.removeItem("adminToken");
      navigate("/admin");
    }
  };


  const handleBellClick = () => {
    setView("contact");
    setNewContactAlert(false);
  };

  const renderView = () => {
    switch (view) {
      case "product":
        return <Product formVisible={formVisible} setFormVisible={setFormVisible} />;
      case "review":
        return <Review />;
      case "media":
        return <Gallary />;
      case "contact":
        return <Contact setNewContactAlert={setNewContactAlert} />;
      case "dashboard":
        return <Dashboard setView={setView} />;
      default:
        return null;
    }
  };

  return (
    <div style={{ backgroundColor: "#fafcf7" }}>
      <style>
        {`
          @keyframes ring {
            0% { transform: rotate(0); }
            1% { transform: rotate(30deg); }
            3% { transform: rotate(-28deg); }
            5% { transform: rotate(34deg); }
            7% { transform: rotate(-32deg); }
            9% { transform: rotate(30deg); }
            11% { transform: rotate(-28deg); }
            13% { transform: rotate(26deg); }
            15% { transform: rotate(-24deg); }
            17% { transform: rotate(22deg); }
            19% { transform: rotate(-20deg); }
            21% { transform: rotate(18deg); }
            23% { transform: rotate(-16deg); }
            25% { transform: rotate(14deg); }
            27% { transform: rotate(-12deg); }
            29% { transform: rotate(10deg); }
            31% { transform: rotate(-8deg); }
            33% { transform: rotate(6deg); }
            35% { transform: rotate(-4deg); }
            37% { transform: rotate(2deg); }
            39% { transform: rotate(-1deg); }
            41% { transform: rotate(1deg); }
            43% { transform: rotate(0); }
          }
        `}
      </style>

      <div className="container-fluid p-0">
        {/* Mobile Header */}
        <div
          className="d-lg-none d-flex align-items-center bg-white justify-content-between px-3 py-2 shadow-sm border-bottom mb-3"
          style={{ position: "sticky", top: 0, zIndex: 1050 }}
        >
          {view !== "dashboard" ? (
            <button className="btn btn-lg p-1 fs-1" onClick={() => setView("dashboard")}>
              <i className="bi bi-arrow-left"></i>
            </button>
          ) : (
            <span style={{ width: "24px", height: "39px" }} />
          )}

          <h6 className="fw-bold mb-0 d-flex align-items-center gap-2">
            {navItems.find((item) => item.key === view)?.label || "Dashboard"}
            {newContactAlert && (
              <FaBell
                onClick={handleBellClick}
                style={{ color: "orange", animation: "ring 1s infinite", cursor: "pointer" }}
                title="New Contact! Click to view"
              />
            )}
          </h6>

          <div className="d-flex align-items-center gap-2">
            {view === "product" && (
              <button className="btn btn-sm p-0 fs-1" onClick={() => setFormVisible(true)}>
                +
              </button>
            )}
            <button className="btn btn-outline-danger" onClick={handleLogout}>
              🔒 Logout
            </button>
          </div>
        </div>

        <div className="row g-0">
          {/* Sidebar */}
          <div
            className="col-lg-2 d-none d-lg-flex flex-column bg-white overflow-hidden"
            style={{
              position: "sticky",
              top: "0",
              height: "100vh",
              borderRight: "1px solid #d6e8d1",
              boxShadow: "0 5px 5px rgba(104, 236, 122, 0.55)",
              zIndex: 1000,
            }}
          >
            <div>
              <h5 className="text-center fw-bold mb-4 mt-3">Admin Panel</h5>
              <div className="nav flex-column px-2">
                {navItems.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setView(item.key)}
                    className={`btn text-start d-flex align-items-center gap-2 px-3 fw-semibold py-2 mb-2 rounded ${view === item.key ? "bg-success fw-bold text-dark fw-semibold" : "text-dark bg-light"
                      }`}
                  >
                    <div style={{ fontSize: "1rem" }}>
                      <i className={` bi ${item.icon}     text-dark`}></i>
                    </div>
                    <span style={{ fontSize: "1.2rem" }}>{item.label}</span>
                    {item.key === "contact" && newContactAlert && (
                      <FaBell
                        onClick={handleBellClick}
                        style={{
                          color: "orange",
                          animation: "ring 1s infinite",
                          marginLeft: "auto",
                          cursor: "pointer",
                        }}
                        title="New Contact!"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
            <button className="btn btn-outline-danger m-3 bottom-0" onClick={handleLogout}>
              🔒 Logout
            </button>
          </div>

          {/* Main Content */}
          <div className="col-12 col-lg-10 min-vh-100">{renderView()}</div>
        </div>

        {/* Bottom Nav (Mobile) */}
        <div className="d-lg-none fixed-bottom bg-white border-top">
          <div className="d-flex justify-content-around text-center py-2">
            {navItems.map((item) => (
              <div
                key={item.key}
                onClick={() => setView(item.key)}
                className={`flex-grow-1 ${view === item.key ? "text-success fw-bold" : "text-muted"
                  }`}
                style={{ fontSize: "0.8rem", cursor: "pointer" }}
              >
                <div style={{ fontSize: "1rem" }}>
                  <i className={`bi ${item.icon}`}></i>
                  {item.key === "contact" && newContactAlert && (
                    <FaBell
                      onClick={handleBellClick}
                      style={{
                        color: "orange",
                        animation: "ring 1s infinite",
                        marginLeft: "4px",
                        cursor: "pointer",
                      }}
                      title="New Contact!"
                    />
                  )}
                </div>
                <div>{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
