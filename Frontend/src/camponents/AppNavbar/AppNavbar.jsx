import React, { useState, useEffect, useRef } from 'react';
import { Container, Navbar, Nav } from "react-bootstrap";
import { NavLink } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import './AppNavbar.css';
import ContactModal from '../Contact/ContactModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Required for modal
import Logo from "./logo.png";

const AppNavbar = () => {
  const modalRef = useRef(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(false);

  const links = [
    { name: "Home", to: "/home" },
    { name: "Product", to: "/product" },
    { name: "About Us", to: "/about" },
    { name: "Contact", isModal: true },
  ];

  const handleClick = (isModal = false) => {
    if (isModal && modalRef.current) {
      setActiveModal(true);
      const bootstrap = require('bootstrap'); // ✅ Import bootstrap dynamically
      const modalInstance = new bootstrap.Modal(modalRef.current);
      modalInstance.show();
      return;
    }

    setActiveModal(false);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Hide "Select Language" option
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      .goog-te-combo option[value=""] {
        display: none !important;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // Initialize Google Translate
  useEffect(() => {
    const interval = setInterval(() => {
      if (window.google?.translate?.TranslateElement) {
        const alreadyInitialized =
          document.querySelector('#google_translate_element .goog-te-gadget');

        if (!alreadyInitialized) {
          new window.google.translate.TranslateElement({
            pageLanguage: 'en',
            includedLanguages: 'en,hi,gu',
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          }, 'google_translate_element');
        }

        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // Move translate element to mobile menu
  useEffect(() => {
    const sourceEl = document.querySelector("#google_translate_element");
    const targetEl = document.querySelector("#google_translate_element_mobile");

    if (isMobileMenuOpen && sourceEl && targetEl && sourceEl.childNodes.length > 0) {
      setTimeout(() => {
        targetEl.innerHTML = "";
        targetEl.appendChild(sourceEl.firstChild);
      }, 100);
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <Navbar expand="lg" className="bg-offwhite p-0 Navbar shadow-sm d-flex justify-content-between align-items-center">
        <Container fluid className="px-3">
          <div className="logo-section d-flex align-items-start justify-content-start py-2">
            <div className="slanted-bg top-0 start-0 w-100 h-100"></div>
            <Navbar.Brand className="ms-3 mt-2 p-0 position-relative" style={{ zIndex: 1 }}>
              <img
                src={Logo}
                alt="Logo"
                className="responsive-logo"
                style={{ height: '70px', width: '160px', position: "relative", objectFit: 'contain' }}
              />
            </Navbar.Brand>
          </div>

          <div className="d-lg-none">
            <span
              className="mobile-menu-toggle fw-bold"
              onClick={() => setIsMobileMenuOpen(true)}
              style={{ fontSize: '1.5rem', cursor: 'pointer' }}
            >
              ☰
            </span>
          </div>

          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end d-none d-lg-flex">
            <Nav className="align-items-lg-center text-start d-flex gap-5 custom-gap">
              {links.map((item, idx) =>
                item.isModal ? (
                  <span
                    key={idx}
                    role="button"
                    className={`nav-link fw-semibold text-dark responsive-subtitle  ${activeModal ? "clicked-bg" : ""}`}
                    onClick={() => handleClick(true)}
                  >
                    {item.name}
                  </span>
                ) : (
                  <NavLink
                    key={idx}
                    to={item.to}
                    onClick={() => handleClick(false)}
                    className={({ isActive }) =>
                      `nav-link fw-semibold responsive-subtitle ${isActive && !activeModal ? "active-link text-white responsive-subtitle" : "text-dark text-decoration-none"}`
                    }
                  >
                    {item.name}
                  </NavLink>
                )
              )}

              <div style={{ marginLeft: "auto", paddingLeft: "20px" }}>
                <div id="google_translate_element"></div>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay">
          <div className="d-flex justify-content-between align-items-center px-3 py-3">
            <img
              src={Logo}
              alt="Logo"
              style={{ height: '56px', width: '160px', marginLeft: "-20px", objectFit: 'contain' }}
            />
            <FaTimes size={22} onClick={() => setIsMobileMenuOpen(false)} style={{ cursor: 'pointer' }} />
          </div>

          <div className="d-flex flex-column px-4 gap-3 mt-3">
            {links.map((item, idx) =>
              item.isModal ? (
                <span
                  key={idx}
                  className="fw-semibold responsive-subtitle"
                  role="button"
                  onClick={() => handleClick(true)}
                >
                  {item.name}
                </span>
              ) : (
                <NavLink
                  key={idx}
                  to={item.to}
                  onClick={() => handleClick(false)}
                  className={({ isActive }) =>
                    `fw-semibold ${isActive ? "active-link text-decoration-none text-white responsive-subtitle" : "text-dark text-decoration-none"}`
                  }
                >
                  {item.name}
                </NavLink>
              )
            )}

            <div style={{ marginTop: '1rem', fontSize: "15px" }}>
              <div id="google_translate_element_mobile"></div>
            </div>
          </div>
        </div>
      )}

      <ContactModal modalRef={modalRef} />
    </>
  );
};

export default AppNavbar;
