import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "./Footer.css";
import ReviewModal from '../Product/ReviewModal'
import reviewImg from './584b0931831101fc32e3e8baaafe6a68ccc34a17.png'
import logo from "./logo.png"
const Footer = () => {
    const [showReviewModal, setShowReviewModal] = useState(false);  // ✅ For Review
    return (
        <footer className="bg-color pt-5">
            <div className="container">
                <div>
                    <div className="row ps-lg-5 m-auto align-items-stretch">
                        {/* Company Info */}
                        <div className="col-12 col-md-6 col-lg-3 d-flex flex-column justify-content-start mt-4 mt-lg-0">
                            <div className="">
                                <img
                                    src={logo}
                                    alt="Logo"
                                    className="img-fluid ps-0"
                                    style={{ height: '106px', width: '160px', objectFit: 'contain' }}
                                />
                                <p className="fw-normal">Let the sun shine on a cleaner future.</p>
                                <div className="d-flex gap-3 mt-3 ">
                                    <a
                                        href="https://www.facebook.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-dark"
                                    >
                                        <i className="fab fa-facebook-f fs-5 icon-color"></i>
                                    </a>
                                    <a
                                        href="https://www.youtube.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-dark"
                                    >
                                        <i className="fab fa-youtube fs-5 icon-color"></i>
                                    </a>
                                    <a
                                        href="https://www.instagram.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-dark"
                                    >
                                        <i className="fab fa-instagram fs-5 icon-color"></i>
                                    </a>
                                    <a
                                        href="https://wa.me/918141221313"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-dark"
                                    >
                                        <i className="fab fa-whatsapp fs-5 icon-color"></i>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Navigation */}
                        <div className="col-lg-3 d-flex flex-column justify-content-start h-100">
                            <h4 className="fw-normal my-3">Quick Links</h4>
                            <ul className="list-unstyled">
                                <li className="mb-2">
                                    <a href="/home" className="text-decoration-none text-dark">Home</a>
                                </li>
                                <li className="mb-2">
                                    <a href="/product" className="text-decoration-none text-dark">Products</a>
                                </li>
                                <li className="mb-2">
                                    <a href="/about" className="text-decoration-none text-dark">About Us</a>
                                </li>
                                <li>
                                    <a
                                        href="/contact"
                                        className="text-decoration-none text-dark"
                                        data-bs-toggle="modal"
                                        data-bs-target="#contactModal"
                                    >
                                        Contact Us
                                    </a>
                                </li>
                            </ul>
                        </div>


                        {/* Contact & Address */}
                        <div className="col-12 col-md-6 col-lg-3 d-flex flex-column justify-content-start mt-4 mt-lg-0">
                            <h4 className="fw-normal mb-3">Address</h4>

                            <div className="d-flex mb-3">
                                <i className="fas fa-envelope mt-1 me-2 icon-color"></i>
                                <a
                                    href="https://mail.google.com/mail/?view=cm&fs=1&to=tapigreenenterprise@gmail.com&su,"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-dark text-decoration-none small"
                                >
                                    tapigreensolar@gmail.com
                                </a>
                            </div>

                            <div className="d-flex mb-3">
                                <i className="fas fa-phone mt-1 me-2 icon-color"></i>
                                <a href="tel:+918141221313" className="text-dark text-decoration-none small">
                                    +91 8141221313
                                </a>
                            </div>

                            <div className="d-flex">
                                <i className="fas fa-map-marker-alt mt-1 me-2 icon-color"></i>
                                <a
                                    href="https://maps.app.goo.gl/PaGb6AAAjStPPpuaA"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-dark text-decoration-none small"
                                >
                                    <span>
                                        8C - Shivshakti Park, Opp. Joshi Hospital ,
                                        Musa Road, Musa, Vyara, Tapi 394650
                                    </span>
                                </a>
                            </div>
                        </div>


                        {/* Review Button */}
                        <div className="col-12 col-md-6 col-lg-3 d-flex flex-column justify-content-start mt-4 mt-lg-0">
                            <div
                                className="d-flex justify-content-end align-items-start p-3"
                                style={{
                                    backgroundImage: `url(${reviewImg})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center 40px',
                                    backgroundRepeat: 'no-repeat',
                                    height: '220px',
                                    position: 'relative',
                                    borderRadius: '8px',
                                }}
                            >
                                <button
                                    size="lg"
                                    onClick={() => setShowReviewModal(true)}
                                    className="custom-review-button px-3 py-2 rounded fw-semibold"
                                >
                                    Review
                                </button>

                                <ReviewModal isOpen={showReviewModal} onClose={() => setShowReviewModal(false)} />
                            </div>
                        </div>


                    </div>

                </div>



            </div>
            <div class="container py-4">
                <ul class="list-unstyled  d-flex flex-column flex-md-row justify-content-center align-items-center gap-3 m-0 p-0">
                    <li><a href="#" class="px-2 text-decoration-underline  text-dark">Privacy Policy</a></li>
                    <li><a href="#" class="px-2 text-decoration-underline  text-dark">Terms of Service</a></li>
                    <li><a href="#" class="px-2 text-decoration-underline  text-dark">Cookie Settings</a></li>
                </ul>
            </div>

            <div className="bottom-text text-center  text-white   p-2"  >Copyright © Solar Tapi 2025. All rights reserved</div>


        </footer>




    );
};

export default Footer;
