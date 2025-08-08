import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { sendContactForm } from "../../Api/api";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const ContactModal = ({ modalRef }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        number: "",
        title: "",
        message: "",
    });

    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};

        if (!formData.name || formData.name.length < 3) {
            newErrors.name = "Name must be at least 3 characters";
        }

        if (!formData.email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(formData.email)) {
            newErrors.email = "Enter a valid email address";
        }

        if (!formData.number || !/^\d{10}$/.test(formData.number)) {
            newErrors.number = "Enter a valid 10-digit phone number";
        }

        if (!formData.title.trim()) {
            newErrors.title = "Location is required";
        }

        if (!formData.message || formData.message.length < 5) {
            newErrors.message = "Message must be at least 5 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        try {
            await sendContactForm(formData);
            alert("Message sent successfully!");

            setFormData({
                name: "",
                email: "",
                number: "",
                title: "",
                message: "",
            });

            setErrors({});
            const modalInstance = window.bootstrap.Modal.getInstance(modalRef.current);
            modalInstance.hide();
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Failed to send message.");
        }
    };

    return (
        <div className="modal fade" id="contactModal" tabIndex="-1" aria-labelledby="contactModalLabel" aria-hidden="true" ref={modalRef}>
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content" style={{ backgroundColor: "#d5e6b0" }}>
                    <div className="modal-header border-0">
                        <button type="button" className="btn-close " data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body px-lg-5 px-4 ">
                        <h5 className="modal-title" id="contactModalLabel">Get in Touch</h5>
                        <p className="text-dark">
                            We're here to help you with your solar energy needs. Please fill out the form below, and we'll get back to you as soon as possible.
                        </p>
                        <div className="row  " >
                            {/* Form Section */}
                            <div className="col-md-6 bg-white px-lg-4 py-4 rounded shadow">
                                <form onSubmit={handleSubmit} noValidate>
                                    {/* Name */}
                                    <div className="mb-3">
                                        <label className="form-label">Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            className={`form-control ${errors.name ? "is-invalid" : ""}`}
                                            placeholder="Your Name"
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                        {errors.name && <small className="text-danger">{errors.name}</small>}
                                    </div>

                                    {/* Email */}
                                    <div className="mb-3">
                                        <label className="form-label">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                            placeholder="Your Email"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                        {errors.email && <small className="text-danger">{errors.email}</small>}
                                    </div>

                                    {/* Phone */}
                                    <div className="mb-3">
                                        <label className="form-label">WhatsApp Number</label>
                                        <input
                                            type="tel"
                                            name="number"
                                            className={`form-control ${errors.number ? "is-invalid" : ""}`}
                                            placeholder="Your WhatsApp Number"
                                            value={formData.number}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                // Allow only digits and max 10 characters
                                                if (/^\d{0,10}$/.test(value)) {
                                                    handleChange(e);
                                                }
                                            }}
                                            required
                                        />

                                        {errors.number && <small className="text-danger">{errors.number}</small>}
                                    </div>

                                    {/* Location */}
                                    <div className="mb-3">
                                        <label className="form-label">Where you want to install solar?</label>
                                        <input
                                            type="text"
                                            name="title"
                                            className={`form-control ${errors.title ? "is-invalid" : ""}`}
                                            placeholder="Location"
                                            value={formData.title}
                                            onChange={handleChange}
                                        />
                                        {errors.title && <small className="text-danger">{errors.title}</small>}
                                    </div>

                                    {/* Message */}
                                    <div className="mb-3">
                                        <label className="form-label">Message</label>
                                        <textarea
                                            name="message"
                                            className={`form-control ${errors.message ? "is-invalid" : ""}`}
                                            rows="3"
                                            placeholder="Message"
                                            value={formData.message}
                                            onChange={handleChange}
                                        ></textarea>
                                        {errors.message && <small className="text-danger">{errors.message}</small>}
                                    </div>

                                    <div className="d-flex justify-content-between">
                                        <button type="submit" className="btn btn-warning fw-bold">
                                            Send Message
                                        </button>
                                    </div>
                                </form>
                            </div>

                            {/* Info Section */}
                            <div className="col-md-6 pt-4  pt-md-0 ps-md-4">
                                <h5 className="fw-bold">Contact Information</h5>
                                <p className="mb-2 d-flex  align-items-start" >
                                    <FaMapMarkerAlt className="me-4 mt-2 "  />
                                    <p style={{ color: "##3E5123" }}>  <strong>Address:</strong><br />
                                     8C - Shivshakti Park, Opp. Joshi Hospital,<br />
                                        Musa Road, Musa, Vyara, Tapi 394650
                                         </p>
                                </p>
                                <p className="mb-2 d-flex  align-items-start">
                                    <FaPhoneAlt className="me-4 mt-2 "  />
                                    <p style={{ color: "##3E5123" }}><strong>Phone:</strong><br />
                                         +91 8141221313</p>
                                </p>
                                <p className="mb-0 d-flex  align-items-start">
                                    <FaEnvelope className="me-4 mt-2 "  />
                                    <p style={{ color: "##3E5123" }}   ><strong>Email:</strong><br />
                                         tapigreensolar@gmail.com</p>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactModal;
