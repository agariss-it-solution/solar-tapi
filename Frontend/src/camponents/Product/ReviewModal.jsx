import React, { useEffect, useRef, useState } from 'react';
import './ReviewModal.css';
import { fetchUserRating, submitUserRating } from '../../Api/api';
import AOS from "aos";
import "aos/dist/aos.css";

const ReviewModal = ({ isOpen, onClose }) => {
  const [rating, setRating] = useState(0);
  const [name, setName] = useState('');
  const [feedback, setFeedback] = useState('');

  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      (async () => {
        const data = await fetchUserRating();
        if (data) {
          setName(data.name || '');
          setFeedback(data.message || '');
          setRating(data.rating || 0);
        }
      })();
      AOS.init({ duration: 1000, once: true });
    }
  }, [isOpen]);

  // Close modal on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleSubmit = async () => {
    // ✅ Form validation
    if (!name.trim()) {
      alert("Name is required.");
      return;
    }

    if (!feedback.trim()) {
      alert("Feedback is required.");
      return;
    }

    if (rating === 0) {
      alert("Please select a rating.");
      return;
    }

    const result = await submitUserRating({ name, message: feedback, rating });
    if (result?.message) {
      alert('Review submitted successfully!');
    } else {
      alert('Something went wrong.');
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content modal-review" ref={modalRef} data-aos="fade-right">
        <h2>Rate Us</h2>
        <div className="stars">
          {[...Array(5)].map((_, index) => {
            const starValue = index + 1;
            return (
              <span
                key={index}
                className={`star ${starValue <= rating ? 'filled' : ''}`}
                onClick={() => setRating(starValue)}
              >
                ★
              </span>
            );
          })}
        </div>

        <input
          type="text"
          placeholder="Name"
          className="input-box"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          placeholder="Write your feedback here ....."
          className="textarea-box"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />

        <button
          className="submit text-center"
          onClick={handleSubmit}
          // data-aos="fade-left"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ReviewModal;
