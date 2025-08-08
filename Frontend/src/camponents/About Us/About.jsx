import react from 'react';
import { useState, useEffect, useRef } from 'react';
import './About.css'
import aboutImg from './Images/355fb3cf6dfd49d25c7a7e0b434c756ae0bda83a.jpg'
import aboutImage from './Images/solar.png'
import visionImage from './Images/light-bulb-with-drawing-graph.png'
import solarPlate from './Images/WhatsApp Image 2025-07-17 at 6.19.19 PM (2).jpeg'
import missionImage from './Images/5898774 1.png'
import workerimg from './Images/6d3fbc89cd9d45b418b18b7abd3b251bca8779e3.jpg'
import goalImage from './Images/da992c44292549cde00e449c68bcc7e5231f8b67.jpg'
import Footer from "../Footer/Footer"
import BhavyaImg from './Images/bhavya.jpg'
import TinalbenImg from './Images/tinalben.jpg'
import BipinImg from './Images/bipin.jpg'
import ContactModal from '../Contact/ContactModal'
import Counter from '../About Us/Counter'

const About = () => {

    const sectionRef = useRef(null);
    const [start, setStart] = useState(false);
    const statsData = [

        { label: 'Clients Served', value: 1000, suffix: '+' },
        { label: 'Distribution', value: '', suffix: 'PAN India' },
        { label: 'Global OEMs', value: 8, suffix: '+' },
        { label: 'Support', value: 24, suffix: '×7' },
        { label: 'MRO Solutions', value: '', suffix: 'End-to-End' }, // Last card (separate)
    ];





    useEffect(() => {
        const handleScroll = () => {
            const top = sectionRef.current?.getBoundingClientRect().top;
            if (top < window.innerHeight && !start) {
                setStart(true);
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Trigger once on mount
        return () => window.removeEventListener('scroll', handleScroll);
    }, [start]);


    return (
        <div className='container px-0   '>
            <div className="position-relative">
                <img
                    src={aboutImg}
                    alt="About Us"
                    className="img-fluid w-100"
                    style={{
                       height: window.innerWidth < 768 ? "250px" : "512px",
                        objectFit: "cover",      // Keep image aspect ratio and fill space
                    }}
                />

                <div className="overlays-text text-dark  responsive-title  ">
                    <p>About Us</p>
                    <p className='fw -normal  responsive-subtitle '>Committed to quality. Focused on the future.</p>
                </div>
            </div>

            <div className="py-5 d-flex justify-content-center">
                <div className='w-lg-75 px-4'>
                    <p className="text-start text-lg-center  fs-medium responsive-text">
                        Tapi Green Solar is a forward-thinking renewable energy company dedicated to delivering high-efficiency solar
                        solutions across residential, commercial, and industrial sectors. With a strong foundation in sustainability and
                        innovation, we design and implement customized solar power systems that help reduce carbon footprints, cut energy
                        costs, and promote energy independence. Backed by cutting-edge technology and a passionate team, Tapi Green Solar
                        is committed to accelerating India’s transition to a clean energy future.
                    </p>
                </div>
            </div>
            <div
                ref={sectionRef}
                className="py-5"
                style={{
                    
                      backgroundImage: `url(${aboutImage})`, // ✅ fix here
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="container">
                    {/* Top Row - First 4 cards */}
                    <div className="row justify-content-center g-4">
                        {statsData.slice(0, 4).map((stat, index) => (
                            <div className="col-6 col-md-6 col-12 col-lg-2" key={index}>
                                <div
                                    className="p-5 text-center fw-medium shadow-sm stat-card text-dark "
                                    style={{
                                        backgroundColor: " #FCFAF780"
                                        ,
                                        border: '4px solid #E8E3CF',
                                        borderRadius: '12px',
                                        backdropFilter: 'blur(6px)',
                                        WebkitBackdropFilter: 'blur(6px)',
                                        color: '#fff',
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <div style={{ fontSize: '14px', opacity: 0.85 }}>
                                        {stat.label}
                                    </div>
                                    <div style={{ fontWeight: 600, fontSize: '20px', marginTop: '4px' }}>
                                        {typeof stat.value === 'number' ? (
                                            <Counter value={stat.value} suffix={stat.suffix} start={start} />
                                        ) : (
                                            stat.suffix
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Bottom Row - Last card full width */}
                    <div className="row mt-4 justify-content-center">
                        <div className="col-12 col-md-10 col-lg-8  ">
                            <div
                                className="p-5 text-center fw-medium shadow-sm stat-card text-dark"
                                style={{
                                    backgroundColor: " #FCFAF780",
                                    border: '4px solid #E8E3CF',
                                    borderRadius: '12px',
                                    backdropFilter: 'blur(6px)',
                                    WebkitBackdropFilter: 'blur(6px)',
                                    // color: '#fff',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                }}
                            >
                                <div style={{ fontSize: '14px', opacity: 0.85, color: "black ! importent" }} >
                                    {statsData[4].label}
                                </div>
                                <div
                                    style={{
                                        fontWeight: 600,
                                        fontSize: '25px',
                                        marginTop: '4px',
                                        color: "black"
                                    }}
                                >
                                    {statsData[4].suffix}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <div className="vision-section py-5 px-4 px-sm-4 px-md-5 mx-auto" >
                <div className="row align-items-center">
                    {/* Left Side Image */}
                    <div className="col-md-4  mb-4 mb-md-0 d-flex justify-content-center ">
                        <img
                            src={visionImage}
                            alt="Our Vision"
                            className="img-fluid rounded shadow"
                        />
                    </div>


                    {/* Right Side Text */}
                    <div className="col-md-8">
                        <p className="fw-medium mb-3  responsive-title text-center text-md-start">
                            OUR VISION
                        </p>
                        <p
                            className="responsive-subtitle   lh-base fw-semibold"
                            style={{ color: "#9C8F4A" }}
                        >
                            Our vision is to lead the transition toward a sustainable and energy-independent future in Vyara and surrounding regions. We strive to make solar energy a practical choice for every household and business by ensuring it is accessible, affordable, and highly efficient.
                            By embracing innovation and prioritizing local needs, we aim to reduce reliance on conventional power sources. Our goal is to create a greener tomorrow through clean energy solutions that empower communities and protect the environment for future generations.
                        </p>
                    </div>
                </div>
            </div>


            <div className='position '>
                <img
                    src={solarPlate}
                    alt="Logo"
                    className=" hero-section responsive-img  img-fluid w-100"

                />
            </div>

          <div className="bg-white content-section mission-section py-5 px-4 px-sm-4 px-md-5 mx-auto">
  <div className="row align-items-center">

    {/* Image First on Mobile, Second on Desktop */}
    <div className="col-md-4 order-1 order-md-2 d-flex justify-content-center align-items-center mb-4 mb-md-0">
      <img
        src={missionImage}
        alt="Our Mission"
        className="img-fluid rounded shadow"
      />
    </div>

    {/* Text Second on Mobile, First on Desktop */}
    <div className="col-md-8 order-2 order-md-1 align-items-center text-center text-md-start">
      <p className="fw-medium responsive-title mb-3">
        OUR MISSION
      </p>
      <p className="responsive-subtitle fw-semibold text-start" style={{ color: "#9C8F4A" }}>
        We deliver innovative and reliable solar energy solutions designed to significantly reduce both energy costs and environmental impact.
        Our focus is on providing high-performance systems that help individuals and businesses transition to clean energy with confidence.
        We ensure the use of top-quality products, backed by expert guidance and professional service at every step.
        From smooth installation to ongoing support, our team is dedicated to making your solar journey effortless.
        At every stage, we prioritize trust, efficiency, and long-term value.
      </p>
    </div>

  </div>
</div>




            <div className='position'>
                <img
                    src={workerimg}
                    alt="Logo"
                    className="img-fluid w-100 responsive-img  fixed"
                    style={{ objectPosition: "top" }}
                />
            </div>

            <div className="bg-white goal-section py-5 px-4 px-sm-4 px-md-5 mx-auto" >
                <div className="row align-items-center">
                    {/* Left Side Image */}
                    <div className="col-md-4 mb-4 mb-md-0 d-flex justify-content-center ">
                        <img
                            src={goalImage}
                            alt="Our Goal"
                            className="img-fluid rounded shadow"
                            style={{ width: "342px", height: "322px", objectFit: "cover" }}
                        />
                    </div>


                    {/* Right Side Text */}
                    <div className="col-md-8 ">
                        <p className="fw-medium mb-3  responsive-title text-center text-md-start">
                            OUR GOAL
                        </p>
                        <p
                            className="  responsive-subtitle  fw-semibold"
                            style={{ color: "#9C8F4A" }}
                        >
                            At Tapi Green Solar, our goal is to build a cleaner, more energy-independent future for Vyara and surrounding regions. We strive to raise awareness about the benefits of solar power and ensure that high-quality solar solutions are both accessible and affordable for homes and businesses.
                            By delivering seamless installations backed by expert support, we aim to reduce dependency on traditional energy sources. Through every project, we work toward fostering eco-conscious growth and driving the region toward a more sustainable tomorrow.
                        </p>
                    </div>
                </div>
            </div>




            <div className="team-section py-5 bg-white overflow-hidden px-4">
                <div className="text-center">
                    <p className="fw-bold responsive-title mb-2">Voices Behind the Vision</p>
                    <p className="fw-medium responsive-text mb-5">Meet the Minds Powering Tapi Green Solar</p>
                    <div className="row justify-content-center g-4">

                        {[
                            {
                                name: "Bipin Chaudhari",
                                role: "Managing Director",
                                quote: "Execution with precision, vision with purpose.",
                                img: BipinImg
                            },
                            {
                                name: "Tinalben Vasava",
                                role: "Director",
                                quote: "Empowering communities through sustainable solutions.",
                                img: TinalbenImg
                            },
                            {
                                name: "Bhavya Chaudhary",
                                role: "Director",
                                quote: "Driven to power every home with clean energy.",
                                img: BhavyaImg
                            }
                        ].map((member, index) => (
                            <div
                                className="col-12 col-md-6 d-flex justify-content-center"
                                key={index}
                            >
                                <div
                                    className="team-card shadow rounded-4 p-4 text-center mx-auto"
                                    style={{ maxWidth: "600px", width: "100%", height: "400px", backgroundColor: "#f8fff6" }} // Optional light green background
                                >
                                    <div className="d-flex justify-content-center">
                                        <img
                                            src={member.img}
                                            alt={member.name}
                                            className="rounded-circle shadow mb-3"
                                            style={{ width: "150px", height: "150px", objectFit: "cover" }}
                                        />
                                    </div>
                                    <p className="fw-bold mb-1 responsive-heading">{member.name}</p>
                                    <p className="text-success fw-medium mb-3 responsive-subtitle">({member.role})</p>
                                    <p className="text-success  d-flex justify-content-center align-items-start gap-2 responsive-subtitle">

                                        <span>{member.quote}</span>
                                    </p>
                                </div>

                            </div>
                        ))}
                    </div>

                </div>

                <div className='text-center mt-4'>
                    {/* CTA Section */}
                    <h4 className="fw-bold responsive-heading mb-3">Let’s Grow the Future of Industry Together.</h4>
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

            <ContactModal />

            <Footer />





        </div>
    )
}
export default About;