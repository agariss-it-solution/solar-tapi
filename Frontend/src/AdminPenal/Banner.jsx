import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { BANNER_API } from "../../config/api";
import "../../App.css";
const Banner = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    title: "",
    file: null,
    id: null,
  });

  const formRef = useRef(null);

  const fetchBanners = async () => {
    try {
      const res = await axios.get(BANNER_API);
      setItems(res.data.data);
    } catch {
      alert("Failed to fetch banners");
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === "file" ? files[0] : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.id) {
      return alert("Title is required");
    }

    const formData = new FormData();
    formData.append("title", form.title);
    if (form.file) formData.append("file", form.file);

    try {
      await axios.put(`${BANNER_API}/${form.id}`, formData);
      alert("Banner updated");
      setForm({ title: "", file: null, id: null });
      fetchBanners();
    } catch {
      alert("Error updating banner");
    }
  };

  const handleEdit = (item) => {
    setForm({
      title: item.title,
      file: item.media || item.image,
      id: item._id,
    });

    // Scroll to form smoothly after state updates
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <div className="container py-4">
      {/* 🔹 Edit Form (Visible only when editing) */}
      {form.id && (
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="bg-white border rounded shadow-sm p-4 mb-4"
          encType="multipart/form-data"
        >
          <h5>Update Banner</h5>
          <div className="row g-3">
            <div className="col-md-6 col-12">
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                className="form-control"
                placeholder="Title"
                required
              />
            </div>
            <div className="col-md-6 ">
              <input
                type="file"
                name="file"
                onChange={handleChange}
                className="form-control"
                accept="image/*,video/*"
              />
              {form.file && typeof form.file === "string" && (
                <div className="small text-muted mt-1 ">Current: {form.file.split("/").pop()}</div>
              )}
              {form.file && typeof form.file === "object" && (
                <div className="small text-muted mt-1">Selected: {form.file.name}</div>
              )}
            </div>
            <div className="col-md-12 text-end">
              <button type="submit" className="btn btn-success">
                Update
              </button>
              <button
                type="button"
                className="btn btn-secondary ms-2"
                onClick={() => setForm({ title: "", file: null, id: null })}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}

      {/* 🔹 Banner List */}
      <h4 className="mb-3">All Banners</h4>
      <div className="row">
        {items.map((item) => (
          <div className="col-xl-3 col-lg-4 col-md-6 mb-4" key={item._id}>
            <div className="card h-100 shadow-sm">
              {item.media?.endsWith(".webp") || item.image?.endsWith(".webp") ? (
                <img
                  src={item.media || item.image}
                  crossOrigin="anonymous"
                  className="card-img-top"
                  alt={item.title}
                  style={{ height: "200px", objectFit: "cover" }}
                />
              ) : (
                <video
                  crossOrigin="anonymous"
                  src={item.media || item.image}
                  className="card-img-top"
                  muted
                  autoPlay
                  loop
                  playsInline
                  controls // ← temporarily add this for testing
                  style={{ height: "200px", objectFit: "cover" }}
                />
              )}
              <div className="card-body d-flex flex-column">
                <h6 className="card-title text-truncate">{item.title}</h6>
                <div className="mt-auto m-auto text-end">
                  <button onClick={() => handleEdit(item)} className="btn btn-warning btn-sm">
                    ✏️ Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {items.length === 0 && <p className="text-muted text-center mt-5">No banners found.</p>}
    </div>
  );
};

export default Banner;
