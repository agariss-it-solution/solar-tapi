import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { PRODUCT_API } from "../AdminPenal/config/api"

const Product = ({ formVisible, setFormVisible }) => {
  const [products, setProducts] = useState([]);
  const [preview, setPreview] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);
  const formRef = useRef(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    file: null,
    id: null,
  });

  const fetchProducts = async () => {
    try {
      const res = await axios.get(PRODUCT_API);
      setProducts(res.data.data);
    } catch {
      alert("Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "file" && files[0]) {
      const file = files[0];
      if (!file.type.startsWith("image/")) {
        alert("Only image files are allowed");
        return;
      }
      setForm((prev) => ({ ...prev, file }));
      generatePreview(file);
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description || (!form.file && !form.id)) {
      return alert("All fields are required");
    }

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    if (form.file) formData.append("file", form.file);

    try {
      if (form.id) {
        await axios.put(`${PRODUCT_API}/${form.id}`, formData);
        alert("Product updated");
      } else {
        await axios.post(PRODUCT_API, formData);
        alert("Product created");
      }

      setForm({ title: "", description: "", file: null, id: null });
      setPreview(null);
      setFormVisible(false);
      fetchProducts();
    } catch {
      alert("Error saving product");
    }
  };

  const handleEdit = (item) => {
    setForm({
      title: item.title,
      description: item.description,
      id: item._id,
      file: null,
    });
    setPreview(item.media || item.image || null);
    setFormVisible(true);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`${PRODUCT_API}/${id}`);
      alert("Product deleted");
      fetchProducts();
    } catch {
      alert("Error deleting product");
    }
  };

  const generatePreview = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Only image files are allowed");
      return;
    }

    setForm((prev) => ({ ...prev, file }));
    generatePreview(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  return (
    <div style={{ backgroundColor: "#fafcf7" }}>
      <div className="container py-lg-5">
        <div className="row align-items-center justify-content-between">
          <div className="col-auto">
            <h4 className=" d-none d-sm-inline-block">Product Management</h4>
          </div>

          {!formVisible && (
            <div className="col-auto text-end ">
              <button
                className="btn btn-success d-none d-md-block"
                onClick={() => setFormVisible(true)}
              >
                + Add New Product
              </button>
            </div>
          )}
        </div>

        <hr className="d-none d-sm-block" />

        {formVisible && (
          <form
            onSubmit={handleSubmit}
            ref={formRef}
            className="p-4 rounded position-relative"
            style={{ maxWidth: 1200, margin: "0 auto" }}
          >
            <button
              type="button"
              className="btn-close position-absolute"
              style={{ top: 16, right: 16 }}
              aria-label="Close"
              onClick={() => setFormVisible(false)}
            />

            <h2 className="text-center mb-4 fw-bold">Add New Product</h2>

            <div className="mb-3">
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                className="form-control"
                placeholder="Product Name"
                required
              />
            </div>

            <div className="mb-3">
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className="form-control"
                placeholder="Description"
                rows="4"
                required
              ></textarea>
            </div>

            <div
              className={`mb-4 text-center border border-dashed rounded p-4 ${dragOver ? "border-success bg-light" : "border-secondary"
                }`}
              style={{ cursor: "pointer", borderStyle: "dashed" }}
              onClick={() => fileInputRef.current.click()}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              {preview ? (
                <img
                  src={preview}
                  crossOrigin="anonymous"
                  alt="Preview"
                  style={{ maxHeight: 50, objectFit: "contain", maxWidth: "100%" }}
                />
              ) : (
                <>
                  <p className="fw-semibold text-muted">
                    Tap to upload an image for the product
                  </p>
                  <button type="button" className="btn btn-light border">
                    Choose Image
                  </button>
                </>
              )}

              <input
                type="file"
                name="file"
                ref={fileInputRef}
                onChange={handleChange}
                accept="image/*"
                style={{ display: "none" }}
              />
            </div>

            <button
              type="submit"
              className="btn w-100"
              style={{ backgroundColor: "#b2ff59", fontWeight: "bold" }}
            >
              {form.id ? "Update Product" : "Add Product"}
            </button>
          </form>
        )}

        {/* Desktop Table */}
        <div className="d-none d-md-block">
          <table className="table align-middle table-borderless">
            <thead style={{ background: "#fafcf7" }}>
              <tr className="border-bottom border-dark">
                <th>Product</th>
                <th>Description</th>
                <th>Image</th>
                <th style={{ width: "140px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => (
                <tr key={item._id} className="border-bottom border-dark">
                  <td style={{ fontWeight: "600", background: "#fafcf7" }}>
                    {item.title}
                  </td>
                  <td style={{ maxWidth: "350px", background: "#fafcf7" }}>
                    <small className="text-muted fw-semibold">
                      {item.description}
                    </small>
                  </td>
                  <td className="text-center" style={{ backgroundColor: "#fafcf7" }}>
                    <img
                      src={item.media || item.image}
                      alt={item.title}
                      crossOrigin="anonymous"
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover",
                        borderRadius: "50%",
                      }}
                    />
                  </td>
                  <td style={{ backgroundColor: "#fafcf7" }}>
                    <button
                      className="btn btn-sm btn-outline-success me-2"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="d-block d-md-none mb-5 pb-4">
          {products.map((item) => (
            <div
              key={item._id}
              className="card mb-3 shadow-sm"
              style={{ borderRadius: "12px", background: "#fff", overflow: "hidden" }}
            >
              <img
                src={item.media || item.image}
                alt={item.title}
                className="img-fluid"
                crossOrigin="anonymous"
                style={{
                  height: "180px",
                  objectFit: "cover",
                  width: "100%",
                }}
              />
              <div className="card-body p-3">
                <h6 className="card-title mb-1 fw-semibold fs-6">{item.title}</h6>
                <p className="card-text text-muted mb-3" style={{ fontSize: "13px" }}>
                  {item.description}
                </p>
                <div className="d-flex justify-content-between">
                  <button
                    className="btn btn-sm w-50 me-1 btn-success"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm w-50 ms-1 btn-danger"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
