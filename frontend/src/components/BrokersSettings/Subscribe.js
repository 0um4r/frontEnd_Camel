import React, { useState } from "react";
import { addTopic } from "../../services/brokerService";

const Subscribe = ({ onClose }) => {
  const [topic, setTopic] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await addTopic(topic);
      console.log("Subscribed to topic:", topic, "Result:", result);
      alert("Subscription successful!");
      onClose(); // Close the popup after submission
    } catch (err) { 
      console.error("Subscription failed", err);
      alert("Subscription failed. Please try again.");
    }
  };

  return (
    <div className="subscribe-popup">
      <div className="subscribe-content">
        <h2>S'abonner à un topic</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Topic:</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              required
            />
          </div>
          <div className="form-buttons">
            <button type="submit">Subscribe</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Subscribe;
