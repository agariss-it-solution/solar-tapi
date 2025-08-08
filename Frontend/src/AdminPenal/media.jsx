import React, { useState, useEffect, useRef } from "react";
import { API_ENDPOINTS } from "../AdminPenal/config/api"
import axios from "axios";

const MediaManager = () => {
  const [products, setProducts] = useState([]);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ image: null });
  const [formSource, setFormSource] = useState(API_ENDPOINTS);
  const [filter, setFilter] = useState("images");
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const formRef = useRef(null);

  const fetchProducts = async () => {
    try {
      const [res1, res2, res3, res4, res5] = await Promise.all([
        axios.get(API_ENDPOINTS.IMAGES),
        axios.get(API_ENDPOINTS.IMAGE_GALLERY_1),
        axios.get(API_ENDPOINTS.PRODUCT),
        axios.get(API_ENDPOINTS.IMAGE_GALLERY_2),
        axios.get(API_ENDPOINTS.BANNER),
      ]);

      const combined = [
        ...res1.data.data.map((i) => ({ ...i, group: "Home Page", source: API_ENDPOINTS.IMAGES })),
        ...res2.data.data.map((i) => ({ ...i, group: "Home Page", source: API_ENDPOINTS.IMAGE_GALLERY_1 })),
        ...res3.data.data.map((i) => ({ ...i, group: "Product Page", source: API_ENDPOINTS.PRODUCT })),
        ...res4.data.data.map((i) => ({ ...i, group: "Home Page", source: API_ENDPOINTS.IMAGE_GALLERY_2 })),
        ...res5.data.data.map((i) => ({ ...i, group: "Home Page", source: API_ENDPOINTS.BANNER })),
      ];

      setProducts(combined);
    } catch (err) {
      alert("Failed to fetch media");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const isValidImage = file.type.startsWith("image/");
    const isValidVideo = file.type.startsWith("video/");
    const isImageFilter = filter === "images";
    const isVideoFilter = filter === "videos";

    if ((isImageFilter && !isValidImage) || (isVideoFilter && !isValidVideo)) {
      setError(`Please upload a valid ${filter.slice(0, -1)} file.`);
      e.target.value = null;
      return;
    }

    if (isValidImage && file.size > 10 * 1024 * 1024) {
      setError("Image size must be less than 10MB.");
      e.target.value = null;
      return;
    }

    if (isValidVideo && file.size > 200 * 1024 * 1024) {
      setError("Video size must be less than 200MB.");
      e.target.value = null;
      return;
    }

    setForm({ image: file });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.image) return alert("Please select a file");

    const data = new FormData();
    data.append("file", form.image);

    try {
      setUploading(true);
      await axios.put(`${formSource}/${editId}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUploading(false);
      setEditId(null);
      setForm({ image: null });
      fetchProducts();
      alert("Media updated successfully");
    } catch (err) {
      setUploading(false);
      console.error("Upload error:", err?.response?.data || err.message);
      alert("Update failed: " + (err?.response?.data?.message || err.message));
    }
  };

  const handleEdit = (product) => {
    setEditId(product._id);
    setFormSource(product.source);
    setForm({ image: null });

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setForm({ image: null });
    setError("");
  };

  const isVideo = (url) => /\.(mp4|mov|webm|ogg)$/i.test(url);

  const grouped = products.reduce((acc, item) => {
    acc[item.group] = acc[item.group] ? [...acc[item.group], item] : [item];
    return acc;
  }, {});

  return (
    <div style={{ backgroundColor: "#fafcf7" }}>
      <div className="container py-lg-4 min-vh-100">
        <h5 className="fw-bold mb-3 d-none d-sm-block">Media</h5>

        {/* Filter Buttons */}
        <div className="mb-3 d-flex gap-2 justify-content-center">
          <button
            className={`btn ${filter === "images" ? "btn-success" : "btn-outline-success"} rounded-pill px-4`}
            onClick={() => setFilter("images")}
          >
            Images
          </button>
          <button
            className={`btn ${filter === "videos" ? "btn-success" : "btn-outline-success"} rounded-pill px-4`}
            onClick={() => setFilter("videos")}
          >
            Videos
          </button>
        </div>

        {/* Edit Form */}
        {editId && (
          <form onSubmit={handleSubmit} className="mb-4" ref={formRef}>
            <input
              type="file"
              className="form-control mb-2"
              accept={filter === "images" ? "image/*" : "video/*"}
              onChange={handleInputChange}
            />

            <small className="text-muted d-block mb-2">
              {filter === "images"
                ? "Upload image (Max size: 10MB)"
                : "Upload video (Max size: 200MB)"}
            </small>

            {error && <div className="text-danger mb-2">{error}</div>}

            <button className="btn btn-success btn-sm me-2" type="submit" disabled={uploading}>
              {uploading ? "Uploading..." : "Update"}
            </button>
            <button className="btn btn-secondary btn-sm" type="button" onClick={handleCancelEdit}>
              Cancel
            </button>
          </form>
        )}

        {/* Display Media */}
        {Object.keys(grouped).map((group) => (
          <div key={group} className="mb-5 pb-4">
            <h6 className="fw-semibold mb-3">{group}</h6>
            <div className="row g-3">
              {grouped[group]
                .filter((item) => {
                  const url = item.media || item.image;
                  return filter === "images" ? !isVideo(url) : isVideo(url);
                })
                .map((item) => {
                  const mediaUrl = item.media || item.image;
                  return (
                    <div className="col-6 col-md-4 col-lg-3" key={item._id}>
                      <div className="card border-0 shadow-sm position-relative">
                        <div className="ratio ratio-4x3">
                          {isVideo(mediaUrl) ? (
                            <video
                              className="w-100 h-100 object-fit-cover"
                              src={mediaUrl}
                              controls
                              muted
                            />
                          ) : (
                            <img
                              className="w-100 h-100 object-fit-cover"
                              crossOrigin="anonymous"
                              src={mediaUrl}
                              alt="media"
                            />
                          )}
                        </div>
                        <button
                          className="btn btn-light btn-sm border position-absolute"
                          style={{ bottom: "8px", right: "8px" }}
                          onClick={() => handleEdit(item)}
                        >
                          ✏️
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaManager;
