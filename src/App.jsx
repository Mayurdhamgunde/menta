import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './pages/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
// import Login from './pages/Login';
import Login from './components/Login'
import FormContainer from './FormContainer';
import Footer from './pages/Footer';
import VideoCall from './pages/VideoCall';
import DashBoard from './pages/DashBoard';
import Signup from './components/Signup'

function App() {
  return (
    <Router>
      <MainContent />
    </Router>
  );
}

function MainContent() {
  const location = useLocation(); // Get current route
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup"
                    

  return (
    <div className="min-h-screen bg-amber-50/50 bg-gradient-to-b from-[rgb(241,232,255)] to-[rgb(228,222,254)]">
      {/* Show Navbar on all pages */}
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/login" element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path="/predict" element={<FormContainer />} />
        <Route path="/virtual-care" element={<VideoCall />} />
        <Route path="/dashboard" element={<DashBoard />} />
      </Routes>

      {/* Show Footer only if NOT on login or signup pages */}
      {!isAuthPage && <Footer />}
    </div>
  );
}

export default App;

