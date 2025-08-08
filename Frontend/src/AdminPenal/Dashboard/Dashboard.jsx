import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { VISIT_API, REVIEW_API, PRODUCT_API, API_ENDPOINTS } from '../config/api'
import EngagementChart from './EngagementChart';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Dashboard = ({ setView }) => {
    const [engagementData, setEngagementData] = useState(null);
    const [percentChange, setPercentChange] = useState(null);
    const [totalProducts, setTotalProducts] = useState(null);
    const [latestReviews, setLatestReviews] = useState([]);
    const [reviews, setReviews] = useState();
    const [media, setMedia] = useState();

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const visit = await axios.get(VISIT_API);
                const rating = await axios.get(REVIEW_API);
                const product = await axios.get(PRODUCT_API);
                const media = await axios.get(API_ENDPOINTS.IMAGE_GALLERY_1);

                const visitData = visit.data.data || {};
                const reviewData = rating.data.data || [];
                const productData = product.data.data || [];
                const mediaData = media.data.data || [];

                setEngagementData(visitData);


                setReviews(reviewData.length);
                setTotalProducts(productData.length);
                setLatestReviews(reviewData.slice(0, 5));
                setMedia(mediaData);

                const thisWeek = visitData.totalWeek || 0;
                const lastWeek = visitData.totalLastWeek || 0;
                let percent = 0;

                if (lastWeek === 0 && thisWeek > 0) {
                    percent = 100; // intentionally capped, but not mathematically accurate
                } else if (lastWeek === 0) {
                    percent = 0;
                } else {
                    percent = ((thisWeek - lastWeek) / lastWeek) * 100;
                }

                setPercentChange(percent.toFixed(1));
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, []);

    return (
        <div style={{ backgroundColor: "#fafcf7" }}>
            <Container fluid className="py-4 px-3 px-md-4">
                {/* Top Stats */}
                <Row className="mb-4 text-center fw-bold">
                    <Col xs={6} md={3} className="mb-3 mb-md-0" data-aos="fade-up">
                        <Card style={{ background: "#FAFCF7" }}>
                            <Card.Body style={{ fontSize: "15px" }}>Total Products: {totalProducts}</Card.Body>
                        </Card>
                    </Col>
                    <Col xs={6} md={3} className="mb-3 mb-md-0" data-aos="fade-up" data-aos-delay="100">
                        <Card style={{ background: "#FAFCF7" }}>
                            <Card.Body>Reviews: {reviews}</Card.Body>
                        </Card>
                    </Col>
                    <Col xs={6} md={3} className="mb-3 mb-md-0" data-aos="fade-up" data-aos-delay="200">
                        <Card style={{ background: "#FAFCF7" }}>
                            <Card.Body>This Week: {engagementData?.totalWeek || 0}</Card.Body>
                        </Card>
                    </Col>
                    <Col xs={6} md={3} className="mb-3 mb-md-0" data-aos="fade-up" data-aos-delay="300">
                        <Card style={{ background: "#FAFCF7" }}>
                            <Card.Body>This Month: {engagementData?.totalThisMonth || 0}</Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Engagement Chart */}
                <Row >
                    <Col xs={12} data-aos="fade-in">
                        <Card style={{ background: "#FAFCF7" }}>
                            <Card.Body>
                                <h5 className="mb-3">Website Engagement</h5>
                                {percentChange !== null && (
                                    <p className={`fw-semibold ${percentChange < 0 ? 'text-danger' : 'text-success'}`}>
                                        This Week Change: {percentChange > 0 ? '+' : ''}{percentChange}%
                                    </p>
                                )}
                                <EngagementChart data={engagementData} />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Latest Reviews */}
                <Row className="mt-5 mb-4" >
                    <Col>
                        <h5 className="mb-3" data-aos="fade-right">Latest 5 Reviews</h5>
                        <Row className="g-3">
                            {latestReviews.map((review, idx) => (
                                <Col key={idx} xs={12} sm={6} md={4} lg={3} xxl={2} data-aos="fade-right" data-aos-delay={idx * 100}>
                                    <Card className="h-100 border-0 ">
                                        <Card.Body className='p-0' style={{ background: "#FAFCF7" }}>
                                            <strong className="fw-bold fst-italic d-block mb-1">
                                                {review.reviewerName || review.name || 'Anonymous'}
                                            </strong>
                                            <small className="fst-italic ">
                                                {review.message || review.review || 'No comment'}
                                            </small>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>

                {/* Image & Video Management */}
                <Row className="mb-4">
                    <Col>
                        <h5 className="mb-3" data-aos="fade-right">Image & Video Management</h5>
                        <Row className="g-3">
                            {Array.isArray(media) && media.map((item, idx) => (
                                <Col
                                    key={idx}
                                    xs={6} sm={4} md={3} lg={3} xl={2}
                                    data-aos="fade-up"
                                    data-aos-delay={idx * 100}
                                    className="d-flex justify-content-center"
                                >
                                    <div
                                        className="w-100"
                                        style={{
                                            height: '200px',
                                            borderRadius: '12px',
                                            backgroundColor: '#f5f5f5',
                                            overflow: 'hidden',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
                                        }}
                                    >
                                        <img
                                            src={item.image}
                                            alt={`media-${idx}`}
                                            crossOrigin="anonymous"
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                borderRadius: '12px'
                                            }}
                                        />
                                    </div>
                                </Col>
                            ))}
                        </Row>
                        <div className="mt-4 mb-5 text-end">
                            <button className="btn btn-success" onClick={() => setView("media")}>
                                Edit
                            </button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Dashboard;
