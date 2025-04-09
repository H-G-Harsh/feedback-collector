import FeedbackList from '../components/FeedbackList';

export default function Admin() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Feedback Submissions</h2>
      <FeedbackList />
    </div>
  );
}