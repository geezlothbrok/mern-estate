import React, { useEffect, useState } from "react";
import "./Contact.css";
import { Link } from "react-router-dom";

function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchLandlord();
  }, [listing.userRef]);

  const handleMessage = (e) => {
    e.preventDefault();
    setMessage(e.target.value);
  };
  return (
    <>
      {landlord && (
        <div className="contact">
          <p className="landlord">
            Contact{" "}
            <span className="landlord-name" style={{ fontWeight: "bold" }}>
              {landlord.username}
            </span>{" "}
            for{" "}
            <span className="listing-" style={{ fontWeight: "bold" }}>
              {listing.name.toLowerCase()}?
            </span>
          </p>
          <textarea
            name="message"
            id="message"
            rows={2}
            value={message}
            onChange={handleMessage}
            placeholder="Enter your message..."
            className="message"
          ></textarea>

          <Link
            to={`mailto:${landlord.email}?subject=Regarding ${encodeURIComponent(
              listing.name
            )}&body=${encodeURIComponent(message)}`}
            className="message-button"
          >
            Send Message
          </Link><br />                        
          <span className="option">or call</span>
            <Link
                to={`tel:${landlord.phone}`}
                className="message-button" style={{background: "#229954", marginTop: "1rem", color: "whitesmoke"}}> +233{landlord.phone}</Link>
        </div>
      )}
    </>
  );
}

export default Contact;
