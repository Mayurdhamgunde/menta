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

import React, { useState } from "react";
import { Search, Filter } from "lucide-react";

const photos = [
  { id: 1, url: "https://res.cloudinary.com/dfrjuatt2/image/upload/v1740344143/first_iq1b0g.png", title: "Dashboard View 1" },
  { id: 2, url: "https://res.cloudinary.com/dfrjuatt2/image/upload/v1740344205/third_pzf99v.png", title: "Dashboard View 2" },
  { id: 3, url: "https://res.cloudinary.com/dfrjuatt2/image/upload/v1740344373/fourth_vw9k69.png", title: "Dashboard View 3" },
  { id: 4, url: "https://res.cloudinary.com/dfrjuatt2/image/upload/v1740344510/second_y31dyy.png", title: "Dashboard View 4" },
];

function Dashboard() {
  const [hoveredId, setHoveredId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-200 to-slate-900">
      <div className="max-w-[1290px] mx-auto px-[15px] py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">Dashboard Gallery</h1>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-9">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="group relative rounded-xl overflow-hidden shadow-xl transform transition-all duration-300 hover:scale-[1.02]"
              onMouseEnter={() => setHoveredId(photo.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div
                className={`absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-4 flex flex-col justify-end transform transition-all duration-300 ${
                  hoveredId === photo.id ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <h3 className="text-white font-semibold text-lg mb-2">{photo.title}</h3>
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-md transition-colors">
                    View
                  </button>
                  <button className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white text-sm rounded-md transition-colors">
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;