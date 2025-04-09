import { useState } from 'react';
import axios from 'axios';
import './FeedbackForm.css'; // Import the CSS file

export default function FeedbackForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Valid email is required';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await axios.post('.netlify/functions/submit-feedback', formData);
      setFormData({ name: '', email: '', message: '' });
      alert('Feedback submitted successfully!');
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to submit feedback. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="feedback-form">
      <div className="form-group">
        <label htmlFor="name" className="form-label">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`form-input ${errors.name ? 'input-error' : ''}`}
        />
        {errors.name && <p className="error-message">{errors.name}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`form-input ${errors.email ? 'input-error' : ''}`}
        />
        {errors.email && <p className="error-message">{errors.email}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="message" className="form-label">
          Feedback Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className={`form-textarea ${errors.message ? 'input-error' : ''}`}
        />
        {errors.message && <p className="error-message">{errors.message}</p>}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="submit-button"
      >
        {loading ? 'Submitting...' : 'Submit Feedback'}
      </button>
    </form>
  );
}