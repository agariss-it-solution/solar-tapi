import React, { useEffect, useState } from "react";
import axios from "axios";
import {REVIEW_API} from "../AdminPenal/config/api"
const Review = () => {
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    try {
      const res = await axios.get(REVIEW_API);
      setReviews(res.data.data);
    } catch {
      alert("Error fetching reviews");
    }
  };

  const deleteReview = async (id) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    try {
      await axios.delete(`${REVIEW_API}/${id}`);
      setReviews((prev) => prev.filter((r) => r._id !== id));
    } catch {
      alert("Failed to delete review.");
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const renderStars = (rating) => {
    return (
      <>
        {[...Array(5)].map((_, i) => (
          <i
            key={i}
            className={`bi ${i < rating ? "bi-star-fill text-success" : "bi-star text-secondary"}`}
          ></i>
        ))}
      </>
    );
  };

  return (
    <div
      style={{ backgroundColor: "#fafcf7" }}
    >
      <div className="container mb-5 pb-4">
        <h5 className="fw-bold  border-bottom d-none d-md-block py-lg-3">Review Management</h5>
        {/* <h5 className="fw-bold mb-3 border-bottom d-block d-md-none pb-2">Review </h5> */}

        {reviews.length === 0 ? (
          <div className="text-center text-muted">No reviews found.</div>
        ) : (
          <div className="list-group ">
            {reviews.map((r) => (
              <div key={r._id} className="list-group-item border-0 p-1 border-bottom"   style={{ backgroundColor: "#fafcf7" }}>
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h6 className="mb-0 fw-semibold">{r.name}</h6>
                    <small className="text-success">
                      {new Date(r.createdAt).toISOString().split("T")[0]}
                    </small>
                  </div>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => deleteReview(r._id)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>

                <div className="mt-1">{renderStars(r.rating)}</div>

                <p className=" mt-2 text-dark d-none d-sm-block" >{r.message}</p>
                <div>
                   <p className=" mt-2 text-dark d-block d-sm-none" style={{fontSize:"12px"}}>{r.message}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Review;
