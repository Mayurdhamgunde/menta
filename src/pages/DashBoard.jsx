// import React from 'react';
// import { motion } from 'framer-motion';

// const Dashboard = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-100 to-blue-200 px-6 md:px-12 py-9 md:py-15">
//       <motion.div 
//         className="w-full max-w-7xl mx-auto"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <motion.h1 
//           className="text-4xl font-bold text-center text-gray-900 mb-6"
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.2 }}
//         >
//           Power BI Dashboard
//         </motion.h1>

//         <motion.div 
//           className="bg-white shadow-lg rounded-xl overflow-hidden p-6"
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.5, delay: 0.4 }}
//         >
//           <iframe 
//             title="Power BI Report"
//             className="w-full h-[600px] rounded-lg"
//             // src="https://app.powerbi.com/view?r=YOUR_REPORT_EMBED_URL" 
//             src="https://app.powerbi.com/groups/me/reports/44df0423-1979-4275-89bc-27bd245bedd4/42c8ac48ce6836948aef?experience=power-bi " 
//             style={{ border: 'none' }}
//             allowFullScreen
//           ></iframe>
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// };

// export default Dashboard;


// import React from "react";

// const photos = [
//   { id: 1, url: "https://res.cloudinary.com/dfrjuatt2/image/upload/v1740344143/first_iq1b0g.png" },
//   { id: 2, url: "https://res.cloudinary.com/dfrjuatt2/image/upload/v1740344205/third_pzf99v.png" },
//   { id: 3, url: "https://res.cloudinary.com/dfrjuatt2/image/upload/v1740344373/fourth_vw9k69.png" },
//   { id: 4, url: "https://res.cloudinary.com/dfrjuatt2/image/upload/v1740344510/second_y31dyy.png" },
// ];

// const Dashboard = () => {
//   return (
//     <div className="grid grid-cols-2 gap-3 p-12 ">
//       {photos.map((photo) => (
//         <div key={photo.id} className="rounded-lg shadow-lg overflow-hidden">
//           <img src={photo.url} alt="Dashboard" className="w-full h-auto" />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Dashboard;


// import React from "react";

// const photos = [
//   { id: 1, url: "https://res.cloudinary.com/dfrjuatt2/image/upload/v1740344143/first_iq1b0g.png" },
//   { id: 2, url: "https://res.cloudinary.com/dfrjuatt2/image/upload/v1740344205/third_pzf99v.png" },
//   { id: 3, url: "https://res.cloudinary.com/dfrjuatt2/image/upload/v1740344373/fourth_vw9k69.png" },
//   { id: 4, url: "https://res.cloudinary.com/dfrjuatt2/image/upload/v1740344510/second_y31dyy.png" },
// ];

// const Dashboard = () => {
//   return (
//     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4 p-6 sm:p-8 md:p-12 sm:grid-cols-2">
//       {photos.map((photo) => (
//         <div key={photo.id} className="rounded-lg shadow-lg overflow-hidden">
//           <img src={photo.url} alt="Dashboard" className="w-full h-auto object-cover" />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Dashboard;

// import React, { useState } from "react";

// const photos = [
//   { id: 1, url: "https://res.cloudinary.com/dfrjuatt2/image/upload/v1740344143/first_iq1b0g.png", title: "Dashboard View 1" },
//   { id: 2, url: "https://res.cloudinary.com/dfrjuatt2/image/upload/v1740344205/third_pzf99v.png", title: "Dashboard View 2" },
//   { id: 3, url: "https://res.cloudinary.com/dfrjuatt2/image/upload/v1740344373/fourth_vw9k69.png", title: "Dashboard View 3" },
//   { id: 4, url: "https://res.cloudinary.com/dfrjuatt2/image/upload/v1740344510/second_y31dyy.png", title: "Dashboard View 4" },
// ];

// function Dashboard() {
//   const [hoveredId, setHoveredId] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-200 to-slate-900">
//       <div className="max-w-[1290px] mx-auto px-[15px] py-8">
//         {/* Header Section */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-white mb-4">Dashboard Gallery</h1>
//         </div>

//         {/* Gallery Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-9">
//           {photos.map((photo) => (
//             <div
//               key={photo.id}
//               className="group relative rounded-xl overflow-hidden shadow-xl transform transition-all duration-300 hover:scale-[1.02]"
//               onMouseEnter={() => setHoveredId(photo.id)}
//               onMouseLeave={() => setHoveredId(null)}
//             >
//               <div className="aspect-w-16 aspect-h-9">
//                 <img
//                   src={photo.url}
//                   alt={photo.title}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <div
//                 className={`absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-4 flex flex-col justify-end transform transition-all duration-300 ${
//                   hoveredId === photo.id ? 'opacity-100' : 'opacity-0'
//                 }`}
//               >
//                 <h3 className="text-white font-semibold text-lg mb-2">{photo.title}</h3>
//                 <div className="flex gap-2">
//                   <button className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-md transition-colors">
//                     View
//                   </button>
//                   <button className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white text-sm rounded-md transition-colors">
//                     Details
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const photos = [
  { id: 1, url: "https://res.cloudinary.com/dfrjuatt2/image/upload/v1740344143/first_iq1b0g.png", title: "Dashboard View 1" },
  { id: 2, url: "https://res.cloudinary.com/dfrjuatt2/image/upload/v1740344205/third_pzf99v.png", title: "Dashboard View 2" },
  { id: 3, url: "https://res.cloudinary.com/dfrjuatt2/image/upload/v1740344373/fourth_vw9k69.png", title: "Dashboard View 3" },
  { id: 4, url: "https://res.cloudinary.com/dfrjuatt2/image/upload/v1740344510/second_y31dyy.png", title: "Dashboard View 4" },
];

function Dashboard() {
  const [hoveredId, setHoveredId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  // Container variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  // Item variants
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  // Button variants
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 }
  };

  // Modal variants
  const modalVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  // Function to handle view button click
  const handleViewClick = (photo) => {
    setSelectedImage(photo);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-200 to-slate-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-[1290px] mx-auto px-[15px] py-8">
        {/* Header Section */}
        <motion.div 
          className="mb-8"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 100,
            damping: 10,
            delay: 0.2
          }}
        >
          <h1 className="text-3xl font-bold text-white mb-4">Dashboard Gallery</h1>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-9"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {photos.map((photo) => (
            <motion.div
              key={photo.id}
              className="group relative rounded-xl overflow-hidden shadow-xl transform transition-all duration-300 hover:scale-[1.02]"
              onMouseEnter={() => setHoveredId(photo.id)}
              onMouseLeave={() => setHoveredId(null)}
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="aspect-w-16 aspect-h-9">
                <motion.img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <motion.div
                className={`absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-4 flex flex-col justify-end transform transition-all duration-300 ${
                  hoveredId === photo.id ? 'opacity-100' : 'opacity-0'
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ 
                  opacity: hoveredId === photo.id ? 1 : 0,
                  y: hoveredId === photo.id ? 0 : 10
                }}
                transition={{ duration: 0.2 }}
              >
                <motion.h3 
                  className="text-white font-semibold text-lg mb-2"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ 
                    x: hoveredId === photo.id ? 0 : -20,
                    opacity: hoveredId === photo.id ? 1 : 0
                  }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  {photo.title}
                </motion.h3>
                <motion.div 
                  className="flex gap-2"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ 
                    y: hoveredId === photo.id ? 0 : 20,
                    opacity: hoveredId === photo.id ? 1 : 0
                  }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <motion.button 
                    className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-md transition-colors"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleViewClick(photo)}
                  >
                    View
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Fullscreen Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={closeModal}
          >
            <motion.div 
              className="relative max-w-screen max-h-screen p-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 15 }}
              onClick={e => e.stopPropagation()}
            >
              <img 
                src={selectedImage.url}
                alt={selectedImage.title}
                className="max-h-[90vh] max-w-[90vw] object-contain"
              />
              <motion.button
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 rounded-full p-2 text-white"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={closeModal}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </motion.button>
              <div className="absolute bottom-4 left-0 right-0 text-center">
                <h2 className="text-white text-xl font-semibold">{selectedImage.title}</h2>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Dashboard;