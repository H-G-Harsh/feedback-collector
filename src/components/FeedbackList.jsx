import { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

export default function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get('/.netlify/functions/get-feedbacks');
        setFeedbacks(response.data);
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Failed to load feedbacks. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchFeedbacks();
  }, []);

  if (loading) return <div className="text-center py-4">Loading feedback...</div>;
  if (error) return <div className="text-red-500 text-center py-4">{error}</div>;
  if (!feedbacks.length) return <div className="text-center py-4">No feedback submitted yet.</div>;

  return (
    <div className="space-y-4">
      {feedbacks.map((feedback) => (
        <div key={feedback.id} className="p-4 border rounded-lg shadow-sm bg-white">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-lg">{feedback.name}</h3>
              <p className="text-blue-600 text-sm">{feedback.email}</p>
            </div>
            <span className="text-xs text-gray-500">
              {format(new Date(feedback.timestamp), 'MMM dd, yyyy h:mm a')}
            </span>
          </div>
          <p className="mt-2 text-gray-700">{feedback.message}</p>
        </div>
      ))}
    </div>
  );
}