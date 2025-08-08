import React, { useEffect, useState, useRef } from "react";
import { fetchBanner, fetchRatings, fetchSolarImages, fetchGalleryImages, fetchWorkerImages, getProductHome } from "../../Api/api"
import "./Home.css"
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaPlus, FaMinus } from "react-icons/fa";
import { FaSun, FaChartLine, FaLeaf, FaFileInvoice, FaShieldAlt, FaMoneyCheckAlt, FaHandHoldingUsd, FaEye } from 'react-icons/fa';
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from 'react-router-dom';
import solarPanal from './Images/Vector.svg'
import sunImg from './Images/material-symbols_solar-power.png'
import peopleImg from './Images/pixel_management.png'
import hamerImg from './Images/wpf_maintenance.png'
import sunImage from './Images/Vector (1).svg'
import locationImg from './Images/Vector (2).svg'
import cloudImg from './Images/Vector (4).svg'
import pannelImg from './Images/Vector (3).svg'
import addImg from './Images/Group 1.svg'
import Project1 from './Images/b22cd393ce3ae799f2f5bbf9c5cae6ab89e95720.png'
import Project2 from './Images/40cf76eff8346d0656af700c9af097fc6c834b9e.png'
import Project3 from './Images/Frame 1116607505.png'
import installerImg from './Images/Vector (5).svg'
import supportImg from './Images/Vector (6).svg'
import commitmentImg from './Images/Vector (7).svg'
import packageImg from './Images/Group.svg'
import bgImage from './Images/back.svg'
import InstallerImg from './Images/image (2) 1.png'
import PanelPartnerImg from './Images/image (3) 1.png'
import BifacialImg from './Images/image 19.png'
import Footer from '../Footer/Footer'
import hoverSunImg from './Images/material-symbols_solar-power (1).png'
import hoverPeopleImg from './Images/material-symbols_solar-power (2).png'
import hoverHamerImg from './Images/material-symbols_solar-power (3).png'
import sunIcon from './Images/tabler_sun-filled.png'
import ContactModal from '../Contact/ContactModal'
import Counter from '../About Us/Counter'
import rooftopImg from '../Home/Images/4648755280b07ef3730c4cdea2b1b43cb870e2c5.png'
import waterheaterImg from '../Home/Images/2c6c7222ea11b4028cde62ecd46bfdf2c3013d03.png'
import agricultureImg from '../Home/Images/9090b3472332ab670834d85f7cf1d4ae260f69b6.png'
import groundImg from '../Home/Images/cda7bdc0c20e66fb2c63145a6a4d1f713ebe9769.png'
import primiumimg from '../Home/Images/f1765014889f75c932b94cef0cdf14c4385b991d.png'
import energyImg from '../Home/Images/3bffd90d90a4960e9c739461699592cff2283d74.png'
import savingImg from '../Home/Images/Vector (17).png'
import ecoImg from '../Home/Images/04341eee3b87c86ce07e8ebb53ccd14a5daaf124.png'
import taxImg from '../Home/Images/4cfe3937d057396149ac10768c4c6859879c9869.png'
import longtermImg from '../Home/Images/e6199e89d5d645bbff6160eba7d5cd1498193e68.png'
import flexibalImg from '../Home/Images/Vector (18).png'
import zeroImg from '../Home/Images/5ddad15726365350ecf04327c48dbcd365417815.png'
import smartImg from '../Home/Images/3ef38cb7229541dc97cbb5af2f2f5152575e3441.png'
import notosunIcon from '../Home/Images/noto_sun (1).png'
import image1 from '../Home/Images/9c1fdf8eeccc539d3c5598e8c228ea31d2ad0f8a.jpg'
import image2 from '../Home/Images/9fb4b8d8e6a17460f4b8fb2856f0cb9b3e3fa29b.jpg'
import image3 from '../Home/Images/44ca2e04518369affef6f91e4ba9c98520df2d70.jpg'
import orderImg from '../Home/Images/9dddc3e14629370a6128f8475fab798d90bf08c1.jpg'
import roundImg from '../Home/Images/back.png'
import phoneIcon from '../Home/Images/Frame 1321317822.png'
import overlayIocn from '../Home/Images/Frame 1321317858.png'
import yourImageHere from '../Home/Images/fed1c17e79b53b92fcd872cc16b82cf088fac8fc.png'
import svg from '../Home/Images/logos_whatsapp-icon.svg'
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import smallImg3 from '../Home/Images/Frame 1321317872.svg'
import smallImg1 from '../Home/Images/Frame 1321317839.svg'
import smallImg2 from '../Home/Images/Frame 1321317871.svg'
const solarPlates = [
  {
    title: "System Setup (EPC)",
    image: image1, // Replace with your image path
    description:
      "We take care of everything — from site survey and design to panel sourcing and full system installation.",
    points: ["Hassle-free", "End-to-end setup", "Custom-built for your needs"],
  },
  {
    title: "Installation",
    image: image2, // Replace with your image path
    description:
      "Our team handles everything from start to finish — planning, timelines, permissions, and on-site execution.",
    points: ["Expert coordination and approvals", "Timely, safe, and smooth installation"],
  },
  {
    title: "Maintenance & Support",
    image: image3, // Replace with your image path
    description:
      "We offer regular system checks, cleaning, repairs, and performance monitoring.",
    points: ["Long-term care and service", "Fast response when you need help"],
  },
];

const cards = [
  {
    image: energyImg,
    title: 'Energy Independence',
    desc: 'Generate your own electricity and reduce dependency on the grid with a stable, renewable source.',
  },
  {
    image: savingImg,
    title: 'Big Savings',
    desc: 'With solar, your electricity bills drop significantly — and the savings grow month after month.',
  },
  {
    image: ecoImg,
    title: 'Eco-Friendly Energy',
    desc: 'Solar power reduces CO₂ emissions up to 96% compared to coal, helping protect the environment.',
  },
  {
    image: taxImg,
    title: 'Tax Benefits',
    desc: 'Under Section 80-IA of the Income Tax Act, you can claim tax deductions on solar investment.',
  },
  {
    image: longtermImg,
    title: 'Long-Term Durability',
    desc: 'Solar panels last over 25 years, giving you reliable performance and peace of mind for decades.',
  },
  {
    image: flexibalImg,
    title: 'Flexible Financing',
    desc: 'Whether it’s outright purchase, loan, or EMI, solar systems can fit into your budget easily.',
  },
  {
    image: zeroImg,
    title: 'Zero Upfront Cost Options',
    desc: 'With Power Purchase Agreements (PPA), you can go solar without any upfront investment.',
  },
  {
    image: smartImg,
    title: 'Smart Monitoring',
    desc: 'Modern systems come with real-time monitoring tools, so you always know how your solar system is performing.',
  },
];

const faqs = [
  {
    question: "Is my home or location suitable for solar panel installation?",
    answer:
      "professional site assessment can determine this. Factors like roof direction, shading, and local weather conditions all affect solar suitability.",
  },
  {
    question: "How much can I actually save by switching to solar?",
    answer:
      "Savings depend on your energy usage, local electricity rates, and system size. Most homeowners see a significant reduction—up to 70%—on their monthly bills.",
  },
  {
    question: "What kind of maintenance do solar panels require?",
    answer:
      "Solar panels are low maintenance. Occasional cleaning and a yearly inspection are usually enough to keep them running efficiently.",
  },
  {
    question: "What happens if there's a power outage?",
    answer:
      "If your system is grid-tied and doesn't have battery backup, it will shut off during an outage. Battery systems provide backup power when the grid is down.",
  },
  {
    question: "Are there any government incentives or subsidies for going solar?",
    answer:
      "Yes, many states and the central government offer subsidies, tax credits, and incentives to reduce the upfront cost of solar installations.",
  },
];
const products = [
  {
    title: "Solar Rooftop Systems",
    description: "Power your home with clean energy.",
    icon: rooftopImg
  },
  {
    title: "Solar Water Heaters",
    description: "Heat water efficiently with solar power.",
    icon: waterheaterImg
  },
  {
    title: "Solar Agricultural Pumps",
    description: "Irrigate your fields sustainably.",
    icon: agricultureImg
  },
  {
    title: "Ground-Mounted Solar",
    description: "Large-scale solar solutions for businesses.",
    icon: groundImg
  },
  {
    title: "Ground-Mounted Solar",
    description: "Large-scale solar solutions for businesses.",
    icon: groundImg
  },
  {
    title: "Premium Solar Panels",
    description: "High-efficiency panels for maximum output.",
    icon: primiumimg
  }
];


const stats = [
  {
    image: solarPanal, // already imported
    value: '120 MW',
    label: 'Solar Module Manufacturing Capacity',
  },
  {
    image: sunImage,
    value: '2.5+ MW',
    label: 'Custom Solar Projects Engineered',
  },
  {
    image: locationImg,
    value: '10+',
    label: 'States Covered Across India',
  },
  {
    image: cloudImg,
    value: '18,000 t',
    label: 'CO₂ Emissions Mitigated',
  },
  {
    image: pannelImg,
    value: '120+',
    label: 'Successful Solar Projects Delivered',
  },
  {
    image: addImg,
    value: '200+',
    label: 'Satisfied Clients Across Sectors',
  },
];



const services = [
  {
    image: sunImg,
    hovertitle: "EPC",
    title: 'Engineering, Procurement & Construction',
    subtitle: 'End-to-End Solar Project Delivery',
    hoverdescription:
      "From site survey and custom design to procurement and full installation — we handle everything under one roof for a hassle-free solar experience.",
    leftIcon: hoverSunImg,
    rightIcon: sunIcon,
  },
  {
    image: peopleImg,
    hovertitle: "Maintenance",
    title: 'Project Management',
    subtitle: 'Precision Planning & Execution',
    hoverdescription:
      "We ensure optimal system health and fix issues proactively for long-term performance.",
    leftIcon: hoverPeopleImg,
    rightIcon: sunIcon,
  },
  {
    image: hamerImg,
    hovertitle: "Maintenance",
    title: 'Operation & Maintenance',
    subtitle: 'Reliable Long-Term Support',
    hoverdescription:
      "We ensure optimal system health and fix issues proactively for long-term performance.",
    leftIcon: hoverHamerImg,
    rightIcon: sunIcon,
  },
];

const Home = () => {


  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [mediaUrl, setMediaUrl] = useState("");
  const [mediaType, setMediaType] = useState("");
  const [title, setTitle] = useState("");
  const [images, setImages] = useState([]);
  const [solarImages, setSolarImages] = useState([]);
  const [openQuestion, setOpenQuestion] = useState(null);
  const [testimonials, setTestimonials] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const sectionRef = useRef(null);
  const [start, setStart] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const visibleTestimonials =
    showAll || window.innerWidth >= 768
      ? testimonials
      : testimonials.slice(0, 3);

  useEffect(() => {
    const loadBanner = async () => {
      try {
        const res = await fetchBanner();

        if (res?.data && res.data.length > 0) {
          const banner = res.data[0];
          const url = banner.media;

          setMediaUrl(url);
          setTitle(banner.title || "");

          if (
            url.endsWith(".mp4") ||
            url.endsWith(".webm") ||
            url.endsWith(".ogg")
          ) {
            setMediaType("video");
          } else {
            setMediaType("image");
          }
        } else {
          console.warn("No banner media found.");
        }
      } catch (err) {
        console.error("Failed to fetch banner:", err);
      }
    };

    loadBanner();
  }, []);
  useEffect(() => {
    const loadImages = async () => {
      const res = await fetchSolarImages();
      // console.log("Solar images fetched:", res);
      setImages(res.data || []);
    };

    loadImages();
  }, []);

  useEffect(() => {
    const getTopGalleryImages = async () => {
      try {
        const response = await fetchGalleryImages();
        const images = response?.data?.galleryImages || response?.data || response; // support various formats
        if (Array.isArray(images)) {
          setGalleryImages(images.slice(0, 4));
        } else {
          console.error("API did not return an image array.");
          setGalleryImages([]); // fallback to empty array
        }
      } catch (error) {
        console.error("Error fetching gallery images:", error);
        setGalleryImages([]); // fallback
      }
    };

    getTopGalleryImages();
  }, []);

  useEffect(() => {
    const loadData = async () => {
      const ratings = await fetchRatings();
      setTestimonials(ratings);
    };

    loadData();
  }, []);
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i}>⭐</span>);
    }

    return <div>{stars}</div>;
  };
  useEffect(() => {
    const loadsolarImages = async () => {
      const data = await fetchWorkerImages();
      setSolarImages(data);
    };
    loadsolarImages();
  }, []);
  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };
  const [items, setItems] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProductHome()
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
    AOS.init({ duration: 3000, once: true });
  }, []);


  useEffect(() => {
    const handleScroll = () => {
      const top = sectionRef.current?.getBoundingClientRect().top;
      if (top < window.innerHeight && !start) {
        setStart(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // trigger on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, [start]);

  const parseValue = (val) => {
    const match = val.match(/^(\d+\.?\d*)(.*)$/); // separates number and suffix
    return {
      number: Number(match?.[1]) || 0,
      suffix: match?.[2] || '',
    };
  };


  return (
    <div className="container px-0">

      <div className=" overflow-hidden">
        <div style={{ position: "relative", textAlign: "center" }}>
          {/* Media */}
          {mediaType === "video" ? (
            <video
              crossorigin="anonymous"
              src={mediaUrl}
              autoPlay
              muted
              loop
              playsInline
              className="img-fluid rounded"
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "800px",
                objectFit: "cover",
                borderRadius: "12px",
              }}
            />
          ) : (
            <img
              crossorigin="anonymous"
              src={mediaUrl}
              alt="Banner"
              className="img-fluid rounded"
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "800px",
                objectFit: "cover",
                borderRadius: "12px",
              }}
            />
          )}

          <div className="d-block d-md-none">
            <p className="text-start ps-3 fw-bold   mobileview-title" >

              {title}
            </p>
          </div>

          {/* Desktop Only: Title overlay */}
          <div
            className="d-none d-md-block title-overlay"
            style={{
              position: "absolute",
              bottom: "-25px",
              left: "50%",
              transform: "translateX(-50%)",
              backgroundColor: "#017B41",

              padding: "10px 35px",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
              zIndex: 10,
            }}
          >
            <p
              className="responsive-label fw-semibold"
              style={{
                margin: 0,
                color: "#FFFFFF",
                fontWeight: 600,
              }}
            >
              {title}
            </p>
          </div>
        </div>
        <div className="container-fluid py-5 mt-4  px-3 px-lg-5">
          <div className="row align-items-start">
            {/* Timeline & Text Section */}
            <div className="col-12 col-lg-6 d-flex">
              {/* Timeline */}
              <div className="me-3  d-md-flex flex-column align-items-center mt-2">
                <div className="timeline-diamond mb-2"></div>
                <div className="timeline-line mb-2"></div>
                <div className="timeline-circle"></div>
              </div>

              {/* Text Content */}
              <div>
                <p className="text-start fw-bold text-success ps-3 ">Welcome to Solar Tapi</p>
                <h4 className="text-start fw-bold responsive-title mb-3 ps-3">Solar Tapi – Shaping India’s Solar Future</h4>
                <p className=" text-start fw-medium  responsive-heading ps-3">Welcome to Tapi Green Solar, your trusted partner in sustainable energy.</p>
                <p className="text-start fw-normal responsive-subtitle ps-3">
                  Based in Vyara, Gujarat, we specialize in high-performance solar solutions
                  for homes, businesses, and farms. With 10+ years of experience and 1000+ successful installations,
                  we design, install, and support solar systems that power your future — efficiently and affordably.
                </p>
                <div className="d-flex align-items-start justify-content-start gap-5  py-5  flex-wrap">
                  <Link
                    to="/about"
                    className="home-btn text-decoration-none px-4 py-2 fw-medium responsive-subtitle"
                  >
                    About Us
                  </Link>

                  <div className="d-flex align-items-center gap-2">
                    <img src={phoneIcon} alt="Solar Icon" style={{ width: '50px', height: '50px' }} className="rotating-icon" />
                    <div>
                      <div className="fw-semibold responsive-subtitle">The Future of Solar Energy</div>
                      <div className="fw-semibold responsive-subtitle">+91 81412 21333</div>
                    </div>
                  </div>
                </div>    </div>
            </div>



            {/* Image Section */}
            <div className="col-12 col-lg-6 d-flex flex-column  p-0  mt-4 mt-lg-0" data-aos="fade-left">
              {images.map((item, index) => (
                <div key={item._id || index} className="position-relative text-end">
                  <div
                    key={item._id || index}
                    className={`position-relative ${index === 1 ? 'overlay-container' : ''}`}
                  >

                    <img
                      crossorigin="anonymous"
                      src={item.image}
                      alt={`Solar Image ${index + 1}`}
                      className={`img-fluid  ${index === 1 ? 'first' : 'second'}`}
                    />
                    {index === 1 && (
                      <img
                        src={overlayIocn}
                        alt="Overlay Icon"
                        className="position-absolute top-100 start-50 animated-square-icon"
                        style={{ width: '60px', height: '60px' }}
                      />

                    )}
                  </div>
                </div>
              ))}
            </div>


          </div>
        </div>

        <div
          className="mt-1 py-lg-6 "
          style={{
            backgroundImage: `url(${bgImage})`, // ✅ fix here
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
            // minHeight: "300px", // ✅ ensure the div has visible height
          }}

        >
          <div className="py-5 d-flex align-items-center justify-content-center flex-column text-center px-4">
            <h2 className="fw-bold mb-3 text-white responsive-title">Why Solar Makes Sense</h2>
            <p className="text-white mb-0 responsive-subtitle">
              Discover why switching to solar is smart, sustainable, and built for long-term savings.
            </p>
          </div>

          <div className=" px-lg-5 py-5 mb-5">
            <div className="row g-4 justify-content-center">
              {cards.map((card, index) => (
                <div
                  className="col-12 col-md-6 col-lg-4 col-xl-3 d-flex justify-content-center"
                  key={index}
                >
                  <div
                    className="bg-white rounded shadow p-3 position-relative d-flex flex-column align-items-start"
                    style={{ width: "100%", maxWidth: "300px" }}
                  >
                    {/* Image section */}
                    <div
                      className="w-100 d-flex justify-content-center align-items-center mb-3"
                      style={{ height: "150px" }}
                    >
                      <img

                        src={card.image}
                        alt={card.title}
                        crossorigin="anonymous"
                        style={{
                          maxHeight: "100%",
                          maxWidth: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </div>

                    {/* Text */}
                    <p className="fw-bold responsive-subtitle fs-4 mb-2">{card.title}</p>
                    <p className="responsive-text fs-5 mb-4">{card.desc}</p>

                    {/* Decorative sun icon */}
                    <img
                      src={notosunIcon}
                      alt="sun"
                      style={{
                        position: "absolute",
                        bottom: "0px",
                        right: "0px",
                        width: "60px",
                        height: "60px",
                        pointerEvents: "none", // ensures it doesn't block text
                      }}
                    />
                  </div>
                </div>))}
            </div>
          </div>
          <div className="container d-block d-lg-none z-3" style={{ position: "absolute", bottom: "-100px" }}>
            <div className="row g-0 align-items-stretch border-0 z-3  rounded overflow-hidden">

              {/* Left Column – Green Text Box */}
              <div
                className="col-6 text-white d-flex flex-column justify-content-center"
                style={{
                  backgroundColor: "#008037",
                  padding: "15px",
                }}
              >
                <h2 className="fw-bold mb-3" style={{ fontSize: "1rem", lineHeight: "1.3" }}>
                  Connect to the infinite — <br />
                  because the future runs on sunlight.
                </h2>
                <button
                  type="button"
                  className="order-button fw-semibold"
                  data-bs-toggle="modal"
                  data-bs-target="#contactModal"
                  style={{
                    padding: "8px 16px",

                    border: "none",
                    fontSize: "0.9rem"
                  }}
                >
                  Order Now
                </button>
              </div>

              {/* Right Column – Image */}
              <div className="col-6">

                <img
                  src={orderImg}

                  alt="Solar Field"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="position-relative d-none d-lg-block" style={{ height: "200px" /* parent height for context */ }}>
          <div
            className="d-flex justify-content-center align-items-center position-absolute"
            style={{
              top: "-65px", // adjust this to move the card vertically
              left: "50%",
              transform: "translateX(-50%)",
              gap: "0px",
              padding: "10px",
            }}
          >
            {/* Left – Green Text Box */}
            <div
              className="text-white d-flex  flex-column justify-content-center align-items-start"
              style={{
                backgroundColor: "#008037",
                width: "570px",
                height: "274px",
                padding: "30px",
                borderTopLeftRadius: "8px",
                borderBottomLeftRadius: "8px",
              }}
            >
              <h2 className="fw-bold mb-4" style={{ fontSize: "1.5rem", lineHeight: "1.4" }}>
                Connect to the infinite — <br />
                because the future runs on sunlight.
              </h2>
              <button

                type="button"
                className="order-button fw-semiboldresponsive-subtitle  fw-semibold"
                data-bs-toggle="modal"
                data-bs-target="#contactModal"
                style={{
                  padding: "10px 20px",

                  border: "none",
                }}
              >
                Order Now
              </button>
            </div>

            {/* Right – Image */}
            <img
              src={orderImg}
              alt="Solar Field"
              style={{
                width: "388px",
                height: "274px",
                objectFit: "cover",
                borderTopRightRadius: "8px",
                borderBottomRightRadius: "8px",
              }}
            />
          </div>
        </div>


        <div className="row pt-5">
          <div className="col-lg-2 d-sm-none d-lg-block"></div>
          <div className="col-12">

            <div className="why-solar-tapi-section" style={{ backgroundImage: { roundImg } }} data-aos="fade-left">
              <div className="  py-5">
                <div className=" text-white px-4 px-md-5">
                  <h2 className="fw-bold mb-3  responsive-title ">Why Solar Tapi?</h2>
                  <p className="mb-5 responsive-subtitle  ">
                    With certified experts, premium components, and dedicated 24/7 support, Solar Tapi makes going solar
                    simple, stress-free, and truly rewarding — because your trust deserves nothing less.
                  </p>

                  <div className="row text-center">
                    <div className="col-6 col-md-3 mb-4 position-relative">
                      <div className="vertical-divider d-none d-md-block"></div>
                      <img src={installerImg} alt="Certified Installers" className="feature-icon mb-3" />
                      <h6 className="fw-semibold responsive-subtitle ">Certified Installers</h6>
                      <div className="vertical-divider d-none d-md-block"></div>

                    </div>
                    <div className="col-6 col-md-3 mb-4 position-relative">
                      <img src={supportImg} alt="24/7 Support" className="feature-icon mb-3" />
                      <h6 className="fw-semibold responsive-subtitle ">24/7 Support</h6>
                      <div className="vertical-divider d-none d-md-block"></div>

                    </div>
                    <div className="col-6 col-md-3 mb-4 position-relative">
                      <img src={commitmentImg} alt="Committed" className="feature-icon mb-3" />
                      <h6 className="fw-semibold responsive-subtitle ">Committed</h6>
                      <div className="vertical-divider d-none d-md-block"></div>

                    </div>
                    <div className="col-6 col-md-3 mb-4 position-relative">
                      <img src={packageImg} alt="Affordable Packages" className="feature-icon mb-3" />
                      <h6 className="fw-semibold responsive-subtitle ">Affordable Packages</h6>
                      <div className="vertical-divider d-none d-md-block"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-4 g-1">
          {/* First Image */}
          {galleryImages[0] && (
            <div className="col-3 col-md-3 d-flex align-items-center" data-aos="fade-right" key={galleryImages[0].id || "img-1"}>
              <div className="w-100 overflow-hidden rounded shadow gallery-box desktop-400">
                <img
                  crossorigin="anonymous"
                  src={galleryImages[0].image}
                  alt="Gallery Image 1"
                  className="img-fluid w-100 h-100"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          )}

          {/* Second + Third stacked */}
          {(galleryImages[1] || galleryImages[2]) && (
            <div className="col-6 col-md-6 d-flex flex-column gap-1" key="img-stack">
              {galleryImages[1] && (
                <div
                  className="overflow-hidden rounded shadow gallery-box desktop-195"
                  data-aos="fade-down"
                  key={galleryImages[1].id || "img-2"}
                >
                  <img
                    crossorigin="anonymous"
                    src={galleryImages[1].image}
                    alt="Gallery Image 2"
                    className="img-fluid w-100 h-100"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              )}
              {galleryImages[2] && (
                <div
                  className="overflow-hidden rounded shadow gallery-box desktop-195"
                  data-aos="fade-up"
                  key={galleryImages[2].id || "img-3"}
                >
                  <img
                    crossorigin="anonymous"
                    src={galleryImages[2].image}
                    alt="Gallery Image 3"
                    className="img-fluid w-100 h-100"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              )}
            </div>
          )}

          {/* Fourth Image */}
          {galleryImages[3] && (
            <div className="col-3 col-md-3 d-flex align-items-center" data-aos="fade-left" key={galleryImages[3].id || "img-4"}>
              <div className="w-100 overflow-hidden rounded shadow gallery-box desktop-400">
                <img
                  crossorigin="anonymous"
                  src={galleryImages[3].image}
                  alt="Gallery Image 4"
                  className="img-fluid w-100 h-100"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          )}
        </div>

        <div className="py-lg-5 py-5">
          <h2 className="responsive-heading text-center">End-to-End Solar Solutions</h2>
          <p className="responsive-subtitle text-center">
            Everything you need for clean energy — designed, installed, and supported by experts.
          </p>


          <div className="custom-solar-wrapper py-5  px-3">
            <div className="row justify-content-center">
              {solarPlates.map((card, index) => (
                <div key={index} className="col-12 col-md-6 col-lg-4 mb-4 d-flex justify-content-center">
                  <div className="card solar-card border-0 shadow-sm text-center h-100" >
                    <img
                      src={card.image}
                      alt={card.title}
                      className="card-img-top img-fluid"
                      style={{ height: "300px", objectFit: "cover", width: "100%" }}
                    />
                    <div className="notch-divider">
                      <div className="notch-line"></div>
                      <div className="notch-triangle center-notch"></div>
                    </div>

                    <div className="card-body px-4 pb-4 card-color text-start">
                      <p className="card-title fw-bold mt-5 responsive-heading text-center">
                        {card.title}
                      </p>
                      <p className="card-text mt-5 responsive-subtitle text-start">
                        {card.description}
                      </p>
                      <ul className="responsive-text ps-3">
                        {card.points.map((point, idx) => (
                          <li key={idx}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="product-section px-3 px-sm-4 px-md-5 py-lg-6">
          <h2 className="fw-semibold responsive-title text-center ">Products</h2>
          <div className="underline-center mx-auto"></div>
          <p className="responsive-heading fw-normal text-center mb-4 ">
            Scalable solar technology for every project size.
          </p>

          <div className="row g-5 align-items-center justify-content-start "  >

            {products.map((product, index) => {
              // Replace 4th card with image
              if (index === 3) {
                return (
                  <div
                    key="image-card"
                    className="col-12 col-lg-4 col-10  col-md-6  position-relative "
                    style={{ zIndex: 1 }}
                  >
                    <div className=" position-absolute d-none d-lg-block" style={{
                      backgroundImage: `url(${yourImageHere}) `,
                      backgroundSize: '100% 100%',
                      backgroundPosition: 'bottom ',
                      backgroundRepeat: 'no-repeat',
                      width: "200%",
                      height: '800px',
                      left: "-30px",
                      bottom: "-310px",
                      borderRadius: '8px',
                    }}>

                    </div>
                    <div className="ms-auto p-0 w-100">
                      <div className="animated-small-images d-none d-lg-block px-3">
                        <div className="marquee-inner">
                          {[smallImg1, smallImg2, smallImg3].map((img, i) => (
                            <img
                              key={i}
                              src={img}
                              alt={`Small ${i}`}
                              className="animated-floating-img"
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                  </div>
                );
              }

              // Render all other cards
              return (
                <div
                  key={index}
                  className="col-12  col-lg-4  col-10 col-md-6 d-flex justify-content-center position-relative z-2"

                >
                  <div className="product-card d-flex flex-column align-items-center text-center p-4 rounded shadow-sm product-color w-100 position-relative" >
                    <div className="my-4">
                      <img
                      crossOrigin="anonymous"

                        src={product.icon}
                        alt={`${product.title} icon`}
                        className="product-icon"
                      />
                    </div>
                    <p className="fw-medium responsive-subtitle mb-2">{product.title}</p>
                    <p className="mb-3 fw-normal responsive-text">{product.description}</p>
                    <a
                      href="/product#details"
                      className="fw-semibold align-items-center gap-2 text-decoration-none text-dark"
                    >
                      Read More <FaLongArrowAltRight />
                    </a>
                  </div>
                </div>
              );
            })}

          </div>




        </div>
        <div className="stats-section text-white py-5  mt-4  ">

          <div ref={sectionRef} className="text-white py-5 ">
            <div className="row justify-content-center text-center g-4 ps-2">
              {stats.map((stat, index) => {
                const { number, suffix } = parseValue(stat.value);
                return (
                  <div key={index} className="col-6 col-sm-6 col-md-6  col-xl-2">
                    <div className="d-flex flex-column align-items-center">
                      <div className="mb-3">
                        <img
                          src={stat.image}
                          alt={stat.label}
                          style={{ width: '80px', height: '80px', objectFit: 'contain' }}
                        />
                      </div>
                      <Counter value={number} suffix={suffix} start={start} />
                      <p className="text-white mb-0  responsive-subtitle">{stat.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        <div className="px-3 px-lg-5 py-5">
          <p className="solar-heading fw-semibold text-center responsive-title">
            WHAT OUR CLIENTS SAY
          </p>
          <div className="title-underline mx-auto mb-4"></div>

          <div className="row gy-4 justify-content-center">
            {visibleTestimonials.map((testimonial, index) => (
              <div className="col-12 col-md-6 col-lg-4" key={index}>
                <div className="testimonial-card rounded p-4 d-flex flex-column justify-content-between h-100">
                  <div>
                    <p className="fw-normal responsive-subtitle mb-3">
                      "{testimonial.message}"
                    </p>
                  </div>
                  <div className="text-end mt-3">
                    <h6 className="mb-1 fw-semibold">– {testimonial.name}</h6>
                    <div>{renderStars(testimonial.rating)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Show toggle button only on mobile and if more than 3 testimonials */}
          {testimonials.length > 3 && (
            <div className="text-center mt-4 d-md-none">
              <button
                onClick={() => setShowAll(!showAll)}
                className="btn btn-outline-dark d-inline-flex align-items-center gap-2 px-4 py-2"
              >
                {showAll ? "Read Less" : "Read More"}
                {showAll ? <FaChevronUp /> : <FaChevronDown />}
              </button>
            </div>
          )}
        </div>

        <div className="trusted-partners-section py-5 px-3 px-md-5">
          <div className=" text-center">
            <h2 className="fw-semibold responsive-title  mb-3">Our Trusted Solar Partners</h2>
            <p className="fw-normal responsive-subtitle   mb-5">
              We work with industry-leading solar manufacturers to ensure top-tier quality, performance, and reliability.
            </p>

            <div className="row justify-content-center">
              <div className="col-6 col-md-6 col-lg-6 mb-4">
                <img src={InstallerImg} alt="Premium Installer" className="img-fluid mb-3" />
                <h5 className="fw-semibold">Premium Installer</h5>
              </div>

              <div className="col-6 col-md-6 col-lg-6 mb-4">
                <img src={PanelPartnerImg} alt="Trusted Panel Partner" className="img-fluid mb-3" />
                <h5 className="fw-semibold">Trusted Panel Partner</h5>
              </div>

              <div className="col-6 col-md-6 col-lg-6 mb-4">
                <img src={BifacialImg} alt="Bifacial Tech Expert" className="img-fluid mb-3" />
                <h5 className="fw-semibold">Bifacial Technology Expert</h5>
              </div>
            </div>

            <p className="mt-4 fw-medium  responsive-subtitle">
              We partner only with globally trusted OEMs to ensure long-lasting performance and value.
            </p>
          </div>
        </div>
        <div className="flex-gallery">
          <div className="row g-1  top-row">
            {solarImages.slice(0, 3).map((img, index) => {
              const aosAnimations = ['fade-right', 'fade-down', 'fade-left'];
              return (
                <div
                  className="image-wrapper"
                  data-aos={aosAnimations[index]}
                  key={img.id}
                >
                  <img crossorigin="anonymous" src={img.image} alt={`Solar ${index + 1}`} />
                </div>
              );
            })}
          </div>

          <div className="row g-1 bottom-row">
            {solarImages.slice(3, 5).map((img, index) => {
              const aosAnimations = ['fade-right', 'fade-left']; // for 4th and 5th
              return (
                <div
                  className="image-wrapper"
                  data-aos={aosAnimations[index]}
                  key={img.id}
                >
                  <img crossorigin="anonymous" src={img.image} alt={`Solar ${index + 4}`} />
                </div>
              );
            })}
          </div>
        </div>
        <div className="faq-division fw-semibold py-5 px-lg-4 bg-transparent">
          <div data-aos="fade-down" className="mb-5">
            <h2 className="offer-heading  text-center responsive-heading division-header">
              FAQs
            </h2>
            <div className="py-5 px-3 d-flex justify-content-center">
              <div className="w-100" style={{ maxWidth: "1400px" }}>
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className={`faq-item mb-3 ${openQuestion === index ? "active" : ""}`}

                    onClick={() => toggleQuestion(index)}
                    style={{
                      cursor: "pointer",
                      borderRadius: "15px",
                      backgroundColor: "#F5F9EC",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                      overflow: "hidden",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {/* Question */}
                    <div
                      className="faq-question responsive-subtitle py-3 px-lg-4 px-2"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div className="d-flex align-items-start fw-normal">
                        <span className="faq-number me-2">{index + 1}.</span>
                        <span>{faq.question}</span>
                      </div>
                      <span className="ms-3">
                        {openQuestion === index ? <FaMinus /> : <FaPlus />}
                      </span>
                    </div>

                    {/* Answer */}
                    <div
                      className={`faq-answer responsive-subtitle fw-normal ${openQuestion === index ? "show" : "collapse"
                        }`}
                      style={{
                        backgroundColor: openQuestion === index ? "#D5E6B0" : "transparent",
                        padding: openQuestion === index ? "12px 20px 16px" : "0 20px",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                        transition: "all 0.3s ease",
                      }}
                    >
                      {faq.answer}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="py-5 text-center  ">
          <p className="text-center responsive-subtitle fw-medium " style={{
            margin: " -16px 10px 10px 10px",
            backgroundColor: " #017B41",
            color: " #ffffff",
            padding: "10px 35px 10px 30px",
            borderRadius: "8px",
            display: "inline-block"
          }}>
            Start Your Solar Journey Today
            <button className=" request-button fw-medium  ms-3" style={{ fontSize: "1rem", backgroundColor: " #F5F9EC" }}

              type="button"

              data-bs-toggle="modal"
              data-bs-target="#contactModal"
            >
              "Request a Free Quote” or “Book a Consultation"
            </button>
          </p>

        </div>
        <ContactModal />

        <div
          className="svg-overlay"
          style={{
            position: "fixed",
            bottom: "20px", // Stick to bottom of screen
            left: "20px",
            zIndex: 1000,
          }}
        >
          {/* Show only on large screens */}
          <div className="d-none d-lg-block">
            <a
              href="https://wa.me/918141221313"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark"
            >
              <img
                src={svg}
                alt="WhatsApp Icon"
                style={{
                  width: "85px",
                  height: "85px",
                }}
              />
            </a>
          </div>

          {/* Show on mobile & tablet */}
          <div className="d-lg-none">
            <a
              href="https://wa.me/918141221313"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark"
            >
              <img
              crossOrigin="anonymous"
                src={svg}
                alt="WhatsApp Icon"
                style={{
                  width: "65px", // Slightly smaller for mobile
                  height: "65px",
                }}
              />
            </a>
          </div>
        </div>

        <Footer />


      </div>
    </div >
  );
}

export default Home;
