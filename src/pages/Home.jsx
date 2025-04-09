import FeedbackForm from '../components/FeedbackForm';
import './Home.css'; 

export default function Home() {
  return (
    <div className="home-container">
      <h2 className="feedback-heading">Submit Feedback</h2>
      <FeedbackForm />
    </div>
  );
}
