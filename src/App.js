import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './pages/Navbar';
import Homepage from './pages/Homepage';
import Products from './pages/Products';
import Product2 from './pages/Product2';
import Team from './pages/Team';
import TheStory from './pages/TheStory';
import Footer from './components/Footer';
import Loginpage from './components/Loginpage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Loginpage />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/homepage" element={<ProtectedRoute><Homepage /></ProtectedRoute>} />
          <Route path="/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
          <Route path="/team" element={<ProtectedRoute><Team /></ProtectedRoute>} />
          <Route path="/story" element={<ProtectedRoute><TheStory /></ProtectedRoute>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
