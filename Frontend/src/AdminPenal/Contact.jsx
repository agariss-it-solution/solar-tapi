import React, { useEffect, useState } from "react";
import axios from "axios";
import { CONTACT_API } from "../AdminPenal/config/api"



const Contact = () => {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    try {
      const res = await axios.get(CONTACT_API);
      setContacts(res.data.data);
    } catch {
      // alert("Failed to fetch contacts");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this contact?")) return;
    try {
      await axios.delete(`${CONTACT_API}/${id}`);
      alert("Contact deleted");
      fetchContacts();
    } catch {
      alert("Error deleting contact");
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div
      style={{ backgroundColor: "#fafcf7" }}
    > <div className="container p-lg-4 overflow-hidden">
        <h2>Contact Us</h2>
        {contacts.length === 0 ? (
          <div className="text-center text-muted">No contacts found.</div>
        ) : (
          <div className="row overflow-hidden mb-5  ">
            {contacts.map((c) => (
              <div key={c._id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
                <div className="card shadow-sm" style={{ backgroundColor: "#EAEAEA" }}>
                  <div className="card-body">
                    <h5 className="card-title mb-1" style={{ color: "#5C8A5C" }}>{c.name}</h5>
                    <p className="mb-1">
                      <strong>Email:</strong> <span style={{ color: "#5C8A5C" }}> {c.email}</span>
                    </p>
                    <p className="mb-1">
                      <strong>Number:</strong> <span style={{color:"#5C8A5C" }}>{c.number}</span>
                    </p>
                    <p className="mb-1">
                      <strong>Title:</strong> <span style={{color:"#5C8A5C" }}>{c.title }</span>
                    </p>
                    <p className="text-muted">
                      <strong>Message:</strong> <span style={{color:"#5C8A5C" }}>{c.message}</span>
                    </p>
                  </div>
                  <div className="card-footer border-0 d-flex justify-content-start" style={{ backgroundColor: "transparent" }}>
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => handleDelete(c._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div></div>
  );
};

export default Contact;
