  // import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
  // import Navbar from './pages/Navbar';
  // import Home from './pages/Home';
  // import About from './pages/About';
  // import Services from './pages/Services';
  // import Login from './pages/Login';
  // import FormContainer from './FormContainer';
  // import Footer from './pages/Footer';

  // function App() {
  //   return (
  //     <Router>
  //       <div className="min-h-screen bg-amber-50/50 bg-gradient-to-b from-[rgb(241,232,255)] to-[rgb(228,222,254)]">
  //         <Navbar />
  //         <Routes>
  //           <Route path="/" element={<Home />} />
  //           <Route path="/about" element={<About />} />
  //           <Route path="/services" element={<Services />} />
  //           <Route path="/login" element={<Login />} />
  //           <Route path="/predict" element={<FormContainer />} />
            
  //         </Routes>
  //         {/* <FormContainer /> */}
  //         <Footer />

          
  //       </div>
  //     </Router>
  //   );
  // }

  // export default App;

//   import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
// import Navbar from './pages/Navbar';
// import Home from './pages/Home';
// import About from './pages/About';
// import Services from './pages/Services';
// import Login from './pages/Login';
// import FormContainer from './FormContainer';
// import Footer from './pages/Footer';
// import VideoCall from './pages/VideoCall';
// import DashBoard from './pages/DashBoard';

// function App() {
//   return (
//     <Router>
//       <MainContent />
//     </Router>
//   );
// }

// function MainContent() {
//   const location = useLocation(); // Get current route

//   return (
//     <div className="min-h-screen bg-amber-50/50 bg-gradient-to-b from-[rgb(241,232,255)] to-[rgb(228,222,254)]">
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/services" element={<Services />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/predict" element={<FormContainer />} />
//         <Route path="/video-call" element={<VideoCall />} />
//         <Route path="/dashboard" element={<DashBoard />} />
//       </Routes>

//       {/* Show Footer only if NOT on the login page */}
//       {location.pathname !== "/login" && <Footer />}
//     </div>
//   );
// }

// export default App;

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

  return (
    <div className="min-h-screen bg-amber-50/50 bg-gradient-to-b from-[rgb(241,232,255)] to-[rgb(228,222,254)]">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/login" element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path="/predict" element={<FormContainer />} />
        <Route path="/video-call" element={<VideoCall />} />
        <Route path="/dashboard" element={<DashBoard />} />
      </Routes>

      {/* Show Footer only if NOT on the login page */}
      {location.pathname !== "/login" && <Footer />}
    </div>
  );
}

export default App;

