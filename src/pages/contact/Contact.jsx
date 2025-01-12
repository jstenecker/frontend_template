import { useState, useEffect } from "react";
import axios from "axios";
import "./Contact.css"; // Import the CSS file

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/users/contact", {
        name,
        email,
        subject,
        message,
      });
      setSuccess("Your message has been sent successfully!");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      setError("Failed to send your message. Please try again later.");
    }
  };

  return (
    <div className="contact-form">
      <h1 className="contact-heading">Contact Us</h1>
      <p className="contact-description">Use the form below to get in touch with our team.</p>
      <p className="contact-description">We will be in touch with you ASAP!</p>
      <form onSubmit={handleSubmit} className="contact-form-element">
        <div className="contact-input-group">
          <label htmlFor="name" className="contact-label">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            required
            className="contact-input"
          />
        </div>
        <div className="contact-input-group">
          <label htmlFor="email" className="contact-label">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            required
            className="contact-input"
          />
        </div>
        <div className="contact-input-group">
          <label htmlFor="subject" className="contact-label">Subject:</label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject"
            required
            className="contact-input"
          />
        </div>
        <div className="contact-input-group">
          <label htmlFor="message" className="contact-label">Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your message"
            required
            className="contact-textarea"
          />
        </div>
        {error && <p className="contact-error">{error}</p>}
        {success && <p className="contact-success">{success}</p>}
        <button type="submit" className="contact-button">Send Message</button>
      </form>
    </div>
  );
};

export default Contact;
