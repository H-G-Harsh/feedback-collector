import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Footer from './components/Footer';
import './App.css'; // external CSS file

export default function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <div className="header-content">
            <h1 className="site-title">Feedback Collector</h1>
            <nav className="nav-links">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/admin" className="nav-link">Feedbacks</Link>
            </nav>
          </div>
        </header>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}
