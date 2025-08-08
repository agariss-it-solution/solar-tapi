import React, { useEffect, useState } from "react";
import solarImg from "./Images/a17658af9b5c53edf2faa25880d4e29686389343.png";
import './Product.css';

import AOS from "aos";
import "aos/dist/aos.css";
import { Col, Button } from "react-bootstrap";
import { IoSunnyOutline } from "react-icons/io5";
import { TfiWorld } from "react-icons/tfi";
import { LuWrench } from "react-icons/lu";
import { IoIosFlash } from "react-icons/io";
import leftImg from "./Images/leftImg.jpeg"
import ReviewModal from './ReviewModal'
import ContactModal from '../Contact/ContactModal'
import Footer from "../Footer/Footer"
import step1 from "./Images/Frame 1321317651.png"
import step2 from "./Images/star.png"
import step3 from "./Images/Frame 1321317665.png"
import step4 from "./Images/Frame 1321317666.png"
import step5 from "./Images/Frame 1321317667.png"
import solarPalte4 from "./Images/29ebcb0644f6441bedc8f9658ff1c7f8421f273d.jpg"
import solarPalte6 from "./Images/9c0ed4bed8e07e5805acaf932dacfe581e1fec68.jpg"
import guaranteeImg from "./Images/Depth 8, Frame 0 (2).svg"
import heaterWarrantyImg from "./Images/Depth 8, Frame 0.svg"
import brandsImg from './Images/Depth 8, Frame 0 (3).svg'
import certifiedImg from './Images/Depth 8, Frame 0 (4).svg'
import iconImg from './Images/noto_sun.svg'

import { fetchProducts } from "../../Api/api";
const steps = [
    {
        icon: step1,
        number: "1",
        title: "Site Assessment & DPR",
        description: "We visit and draft a project plan.",
    },
    {
        icon: step2,
        number: "2",
        title: "Customized Design",
        description: "Layout tailored to your space.",
    },
    {
        icon: step3,
        number: "3",
        title: "Installation",
        description: "Panels and systems installed onsite.",
    },
    {
        icon: step4,
        number: "4",
        title: "Net Metering & Subsidy",
        description: "We handle all official approvals.",
    },
    {
        icon: step5,
        number: "5",
        title: "Testing & Support",
        description: "Final checks and maintenance help.",
    },
];

const highlights = [
    {
        icon: < IoSunnyOutline size={32} />,
        title: "150+ Successful Projects",
        description: "Proven track record across homes, businesses & farms.",
    },
    {
        icon: < IoIosFlash size={32} />,
        title: "Turnkey EPC Solutions",
        description: "From design to delivery — all under one roof.",
    },
    {
        icon: < LuWrench size={32} />,
        title: "Hassle-Free Maintenance",
        description: "Our team ensures long-term performance & support.",
    },

    {
        image: solarPalte4,
    },
    {
        icon: < TfiWorld size={32} />,
        title: "Sustainable Living",
        description: "Helping Gujarat transition to clean energy — one panel at a time.",
    },
    {
        image: solarPalte6,
    },
];






const Product = () => {

    const [products, setProducts] = useState([]);
    const [showReviewModal, setShowReviewModal] = useState(false);  // ✅ For Review



    useEffect(() => {
        fetchProducts().then(setProducts);
        AOS.init({ duration: 3000, once: true });
    }, []);

    return (
        <div className="container overflow-hidden px-0">
            <div className="position-relative">
                <img
                    crossorigin="anonymous"
                    src={solarImg}
                    alt="About Us"
                    className="img-fluid w-100 "
                    style={{
                        height: window.innerWidth < 768 ? "250px" : "512px", // media query style
                        objectFit: "cover",
                        width: "100%",
                    }}
                />

                <div className="overlay-text fw-bold text-whitef responsive-title">
                    <p>Harness the Sun, Power the Future</p>
                    <p className="  responsive-subtitle  fw-semibold ">Explore sustainable solar solutions for homes, businesses, and agriculture</p>
                </div>
            </div>
          <div className="floating-element"> 
              <img
                src={iconImg}
                alt="Icon"
                className="animated-icon  icon-img"
                style={{ width: "100px", height: "100px", marginTop: "16px" }}
            />
          </div>
            <div className="text-center mt-4 ">
                <h2 className="fw-semibold responsive-title ">Our Range of Solar Solutions</h2>
                <p className="fw-normal responsive-subtitle">Reliable. Efficient. Eco-friendly.</p>
            </div>


            <div className="py-3 px-3">
                <div>
                    {products.map((product, index) => (
                        <div key={index} className="row hovet-img align-items-start justify-content-center py-4 flex-column flex-md-row">
                            {index % 2 === 0 ? (
                                <>
                                    {/* Left Image for even index */}
                                    <div className="col-12 col-md-3">
                                        <div className="me-md-5 mb-3 mb-md-0">
                                            <img
                                                crossorigin="anonymous"
                                                src={product.image}
                                                alt={product.title}
                                                className="img-fluid rounded product-image"
                                            />
                                        </div>
                                    </div>
                                    {/* Right Text */}
                                    <div className="col-12 col-md-6">
                                        <h5 className="fw-bold mb-4 responsive-heading mt-4 ">{product.title}</h5>
                                        <p className="mb-0 fw-normal responsive-subtitle">{product.description}</p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    {/* Left Text for odd index */}
                                    <div className="col-12 col-md-6 order-md-1 order-2">
                                        <h5 className="fw-bold mb-4 responsive-heading mt-4">{product.title}</h5>
                                        <p className="mb-0 fw-normal responsive-subtitle">{product.description}</p>
                                    </div>
                                    {/* Right Image */}
                                    <div className="col-12 col-md-3 order-md-2 order-1 mb-3 mb-md-0">
                                        <div className="ms-md-5">
                                            <img
                                                crossorigin="anonymous"
                                                src={product.image}
                                                alt={product.title}
                                                className="img-fluid rounded product-image"
                                            />
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div className="py-5 px-2 px-md-5">
                <h2 className="text-center fw-bold mb-1">Find Your Perfect Solar Match</h2>
                <p className="text-center text-dark mb-4">Simple, clean, and user-focused.</p>

                {/* Desktop Table View */}
                <div className="table-responsive d-none d-md-block ">
                    <table className="table table-bordered align-middle text-start shadow-sm rounded custom-table bg-transparent" >
                        <thead className="responsive-subtitle ">
                            <tr>
                                <th className="bg-transparent">Your Need</th>
                                <th className="bg-transparent">Recommended Product</th>
                                <th className="bg-transparent">Why It's Perfect</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="fw-medium">Power for your home or office rooftop</td>
                                <td><p className="text-decoration-none fw-medium text-color">Solar Rooftop System</p></td>
                                <td><p className="fw-medium text-color">Custom-designed for your roof and energy usage. Works in all lighting conditions with high efficiency.</p></td>
                            </tr>
                            <tr>
                                <td className="fw-medium">Hot water for daily use</td>
                                <td><p className="text-decoration-none text-color fw-medium">Solar Water Heater</p></td>
                                <td><p className="fw-medium text-color">Saves electricity by using the sun to heat water. Ideal for homes, hospitals, and hostels.</p></td>
                            </tr>
                            <tr>
                                <td className="fw-medium">Irrigation for your farm</td>
                                <td><p className="text-decoration-none text-color fw-medium">Solar Agricultural Pump</p></td>
                                <td><p className="fw-medium text-color">Runs on sunlight — no diesel, no power cuts. Reliable and cost-effective for farmers.</p></td>
                            </tr>
                            <tr>
                                <td className="fw-medium">Large land available for high energy output</td>
                                <td><p className="text-decoration-none text-color fw-medium">Ground-Mounted Solar System</p></td>
                                <td><p className="fw-medium text-color">Best for industries or solar farms. Flexible tilt design gives maximum performance.</p></td>
                            </tr>
                            <tr>
                                <td className="fw-medium">Premium performance & sleek aesthetics</td>
                                <td><p className="text-decoration-none text-color fw-medium">Premium Solar Panels</p></td>
                                <td><p className="fw-medium text-color">High-efficiency, advanced features, and longer life. Great for high-end residential or commercial projects.</p></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Mobile Card View */}
                <div className="d-block d-md-none">
                    {[
                        {
                            need: "Power for your home or office rooftop",
                            product: "Solar Rooftop System",
                            reason: "Custom-designed for your roof and energy usage. Works in all lighting conditions with high efficiency."
                        },
                        {
                            need: "Hot water for daily use",
                            product: "Solar Water Heater",
                            reason: "Saves electricity by using the sun to heat water. Ideal for homes, hospitals, and hostels."
                        },
                        {
                            need: "Irrigation for your farm",
                            product: "Solar Agricultural Pump",
                            reason: "Runs on sunlight — no diesel, no power cuts. Reliable and cost-effective for farmers."
                        },
                        {
                            need: "Large land available for high energy output",
                            product: "Ground-Mounted Solar System",
                            reason: "Best for industries or solar farms. Flexible tilt design gives maximum performance."
                        },
                        {
                            need: "Premium performance & sleek aesthetics",
                            product: "Premium Solar Panels",
                            reason: "High-efficiency, advanced features, and longer life. Great for high-end residential or commercial projects."
                        }
                    ].map((item, index) => (
                        <div key={index} className="border rounded p-3 shadow-sm bg-white">
                            <p className="fw-medium mb-1 text-dark">{item.need}</p>
                            <p className=" text-color  fw-semibold mb-1">{item.product}</p>
                            <p className=" text-dark  fw-medium">{item.reason}</p>
                        </div>
                    ))}
                </div>
            </div>




            <div className="text-center my-5">
                <h2 className="fw-bold responsive-heading   mb-2">From Site Visit to Sun-Powered Success</h2>
                <p className="fw-normal  responsive-subtitle ">We simplify solar — start to finish.</p>
            </div>


            <div className="steps-wrapper py-5">
                {steps.map((step, index) => (
                    <div
                        key={index}
                        className={`step-block ${index % 2 === 0 ? "left-img" : "right-img"}`}
                    >
                        <div className="step-icon">
                            <img src={step.icon} alt={`step-${index + 1}`} />
                        </div>
                        <div className="step-box">
                            <div className="step-number">{index + 1}</div>
                            <p className="fw-medium responsive-subtitle">{step.title}</p>
                            <p className="fw-normal responsive-text" style={{ color: "#EFB01D" }}>
                                {step.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>



            <div className="text-center my-5">
                <p className="fw-bold responsive-title  mb-2">Why Choose Tapi Solar?</p>

            </div>

            <div className="why-choose-container">
                {/* Left Image */}
                <div className="why-choose-image mobile-small-img ">
                    <img
                        src={leftImg}
                        alt="Solar Panels"
                        className="img-fluid px-1 px-lg-0"
                    />
                </div>


                {/* Right Content Grid */}
                <div className="why-choose-grid " data-aos="fade-left">
                    {highlights.map((item, index) => (
                        <div key={index} className="highlight-card " >
                            {item.image && !item.title ? (
                                <img src={item.image} alt="Highlight" className="highlight-full-image" />
                            ) : (
                                <div className="highlight-card-content" >
                                    <p className="fw-bold   responsive-heading  mt-3">{item.title}</p>
                                    <p className="fw-medium  responsive-subtitle  color-text ">{item.description}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

            </div>

            <div className="py-5">
                <div className=" text-center">
                    <Col xs={12} md={8} lg={12}>
                        <button
                            size="lg"
                            onClick={() => setShowReviewModal(true)}  // ✅ changed
                            className="custom-review  rounded fw-semibold responsive-subtitle"
                        >
                            Give Us a Review
                        </button>

                        {/* ✅ Review Modal */}
                        <ReviewModal isOpen={showReviewModal} onClose={() => setShowReviewModal(false)} />
                    </Col>
                </div>
            </div>
            <div className="py-lg-5 text-center">
                <h3 className="fw-bold responsive-title ">Ready to Go Solar?</h3>
                <p className="responsive-subtitle mb-4">
                    Book a site visit or get a free consultation today.
                </p>
                <div className="text-center my-4 mt-0">
                    <button
                        type="button"
                        className=" contact-button  responsive-subtitle  fw-semibold"
                        data-bs-toggle="modal"
                        data-bs-target="#contactModal"
                    >
                        Contact Us
                    </button>
                </div>
            </div>
            <div className="py-lg-5 px-4 px-md-5 py-5">
                <div className="row align-items-start g-4">
                    {/* ✅ Left Content */}
                    <div className="col-12 col-lg-4 
                    ">
                        <h5 className="fw-bold mb-3  responsive-heading ">Warranty & Quality Assurance</h5>
                        <p className="mb-2 py-2 pe-lg-5 heading responsive-subtitle">
                            We stand by the quality of every product we install.
                        </p>
                        <p className="mb-0 responsive-subtitle">
                            At Solar Tapi, we only use high-quality, certified products backed by
                            long-term warranties. From panels to pumps, everything is built to perform and last.
                        </p>
                    </div>

                    {/* ✅ Right Cards */}
                    <div className="col-12 col-lg-8">
                        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-2 row-cols-xl-4 g-4">
                            {[
                                {
                                    title: "25-Year Panel Performance Guarantee",
                                    subtitle: "Panels come with long-term output warranty for peace of mind.",
                                    img: guaranteeImg,
                                },
                                {
                                    title: "5–10 Year Warranty on Water Heaters",
                                    subtitle: "Rust-resistant, insulated tanks built to last.",
                                    img: heaterWarrantyImg,
                                },
                                {
                                    title: "Trusted Brands: Tata, Waaree, Rayzon, Adani",
                                    subtitle: "We install only MNRE-approved premium panels.",
                                    img: brandsImg,
                                },
                                {
                                    title: "MNRE + BIS Certified Products",
                                    subtitle: "Certified for quality, efficiency, and safety.",
                                    img: certifiedImg,
                                },
                            ].map((item, index) => (
                                <div key={index} className="col  d-flex">
                                    <div className="border rounded-3 p-3 w-100 text-start h-100 shadow-sm  ">
                                        <img
                                            src={item.img}
                                            alt={item.title}
                                            className="mb-3 img-fluid text"
                                            style={{ height: "48px", objectFit: "contain" }}
                                        />
                                        <p className="fw-bold  mb-1 text ">{item.title}</p>
                                        <p className="fw-semibold   text responsive-color mb-0">{item.subtitle}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>





            <ContactModal />

            <Footer />
        </div >

    );
};

export default Product;
