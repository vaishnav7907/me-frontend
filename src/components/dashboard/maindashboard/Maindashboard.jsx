import React, { useState, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import PageTransition from "../../pagetransition/PageTransition";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Maindashboard = () => {
  const navigate = useNavigate();

  const [getWelcomeImage, setGetWelcomeImage] = useState([]);

  const getimageFn = useCallback(async () => {
    try {
      const welcomeImage = await axios.get(
        `${import.meta.env.VITE_API_URL}/Me/getWelcomeImage`,
      );

      setGetWelcomeImage(welcomeImage.data.welcomepageImageData || []);
    } catch (error) {
      console.log("error in get welcome images frontend", error);
    }
  }, []);

  const filterImage = getWelcomeImage.filter(
    (welcomeImage) => welcomeImage.status === "Active",
  );

  useEffect(() => {
    getimageFn();
  }, [getimageFn]);

  return (
    <PageTransition>
      <div className="relative h-dvh w-full overflow-hidden bg-[#080808] text-white">
        <div className="relative flex h-full flex-col overflow-hidden">
          {/* Background Text */}
          <h1 className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 select-none text-[340px] font-black leading-none tracking-[-25px] text-white/[0.025] lg:block">
            ME
          </h1>

          {/* Main Container */}
          <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col px-5 py-4 sm:px-8 sm:py-5 md:px-10 lg:px-16 lg:py-8">
            {/* Navbar */}
            <div className="flex shrink-0 items-center justify-between border-b border-white/10 pb-4 sm:pb-5">
              <h1 className="text-2xl font-light tracking-[7px] sm:text-3xl sm:tracking-[10px]">
                M<span className="font-bold">E</span>
              </h1>

              <div className="flex items-center gap-4 text-[9px] uppercase tracking-[2px] text-gray-400 sm:gap-7 sm:text-[10px] sm:tracking-[4px] md:gap-10 md:text-xs">
                <p className="cursor-pointer transition duration-300 hover:text-white">
                  Men
                </p>
                <p className="cursor-pointer transition duration-300 hover:text-white">
                  Collections
                </p>
              </div>
            </div>

            {/* Hero Section */}
            <div className="relative grid min-h-0 flex-1 grid-cols-1 items-center gap-4 overflow-hidden py-5 sm:py-7 lg:grid-cols-2 lg:gap-10 lg:py-8">
              {/* Mobile Background Image */}
              {filterImage.map((image) => (
                <div className="absolute inset-0 lg:hidden" key={image._id}>
                  <img
                    src={image.welcomeImage?.url}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover object-center grayscale"
                  />

                  <div className="absolute inset-0 bg-black/60" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/60" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
                </div>
              ))}

              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -80 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                className="relative z-10 w-full min-w-0 translate-y-0 sm:translate-y-1 lg:translate-y-0"
              >
                <div className="mb-5 flex items-center gap-3 sm:mb-7">
                  <span className="h-px w-8 bg-white/70 sm:w-12" />

                  <p className="text-[9px] uppercase tracking-[3px] text-gray-300 sm:text-xs sm:tracking-[5px] lg:tracking-[7px]">
                    New Collection 2026
                  </p>
                </div>

                <h1 className="text-[clamp(48px,13vw,76px)] font-extralight leading-[0.9] tracking-[-3px] sm:text-[clamp(64px,10vw,100px)] lg:text-[clamp(70px,12vh,120px)]">
                  CREATE
                </h1>

                <h1 className="mt-2 text-[clamp(48px,13vw,76px)] font-light italic leading-[0.9] tracking-[-3px] sm:text-[clamp(64px,10vw,100px)] lg:text-[clamp(70px,12vh,120px)]">
                  YOUR
                </h1>

                <h1 className="mt-2 text-[clamp(48px,13vw,76px)] font-bold leading-[0.9] tracking-[-3px] sm:text-[clamp(64px,10vw,100px)] lg:text-[clamp(70px,12vh,120px)]">
                  STYLE<span className="text-gray-500">.</span>
                </h1>

                <div className="mt-6 h-px w-12 bg-white/40 sm:mt-7 sm:w-16" />

                <p className="mt-5 max-w-[420px] text-[10px] leading-5 text-gray-300 sm:mt-6 sm:text-xs sm:leading-6 md:text-sm lg:mt-7 lg:text-base lg:leading-8 lg:text-gray-400">
                  Curated for modern elegance, crafted to leave a lasting
                  impression. Discover timeless fashion that reflects confidence
                  and individuality.
                </p>

                {/* Tablet and Desktop Button */}
                <button
                  className="mt-6 hidden w-full border border-white/80 px-7 py-3 text-[9px] uppercase tracking-[3px] transition-all duration-500 hover:border-white hover:bg-white hover:text-black sm:block sm:w-full sm:py-3.5 sm:text-xs sm:tracking-[4px] lg:mt-8 lg:w-fit lg:px-9 lg:py-4"
                  onClick={() => navigate("/mainpage")}
                >
                  Shop Collection
                  <span className="ml-3">→</span>
                </button>
              </motion.div>

              {/* Mobile Bottom Button */}
              <div className="absolute bottom-3 left-0 right-0 z-20 sm:hidden">
                <button
                  className="w-full border border-white/80 bg-white/[0.04] px-5 py-3.5 text-[9px] uppercase tracking-[3px] backdrop-blur-sm transition-all duration-500 hover:bg-white hover:text-black"
                  onClick={() => navigate("/mainpage")}
                >
                  Shop Collection
                  <span className="ml-3">→</span>
                </button>
              </div>

              {/* Desktop Image */}
              <motion.div
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                className="relative hidden h-full max-h-[75vh] w-full min-w-0 items-center justify-center lg:flex"
              >
                <div className="absolute h-[78%] w-[65%] translate-x-5 translate-y-5 border border-white/20" />

                <div className="absolute h-[78%] w-[65%] -translate-x-5 -translate-y-5 border border-white/10" />

                {filterImage.map((image) => (
                  <div
                    key={image._id}
                    className="relative z-10 flex h-[90%] max-h-[650px] w-[75%] items-center justify-center overflow-hidden"
                  >
                    <img
                      src={image.welcomeImage?.url}
                      alt="Premium fashion collection"
                      className="h-full w-full object-cover grayscale transition-all duration-1000 hover:scale-105 hover:grayscale-0"
                    />

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />
                  </div>
                ))}

                <div className="absolute left-[-32px] top-10 rotate-[-90deg] whitespace-nowrap text-[10px] uppercase tracking-[7px] text-gray-500">
                  Premium Fashion
                </div>

                <div className="absolute bottom-8 right-0 text-right">
                  <p className="text-[9px] uppercase tracking-[4px] text-gray-500">
                    ME Collection
                  </p>
                  <p className="mt-1 text-xs tracking-[2px] text-gray-300">
                    Modern. Minimal. Timeless.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Footer */}
            <div className="relative z-10 flex shrink-0 flex-wrap items-center justify-between gap-2 border-t border-white/15 pt-3 text-[7px] uppercase tracking-[2px] text-gray-400 sm:pt-4 sm:text-[9px] sm:tracking-[3px] lg:pt-5 lg:text-[10px] lg:tracking-[4px]">
              <span>Luxury Clothing</span>

              <span className="hidden sm:block">
                Designed For Modern Living
              </span>

              <span>Since 2026</span>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Maindashboard;



// import React, { useState, useEffect, useCallback } from "react";
// import { motion } from "motion/react";
// import PageTransition from "../../pagetransition/PageTransition";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const Maindashboard = () => {
//   const navigate = useNavigate();

//   const [getWelcomeImage, setGetWelcomeImage] = useState([]);

//   const getimageFn = useCallback(async () => {
//     try {
//       const welcomeImage = await axios.get(
//         `${import.meta.env.VITE_API_URL}/Me/getWelcomeImage`,
//       );

//       setGetWelcomeImage(welcomeImage.data.welcomepageImageData || []);
//     } catch (error) {
//       console.log("error in get welcome images frontend", error);
//     }
//   }, []);

//   const filterImage = getWelcomeImage.filter(
//     (welcomeImage) => welcomeImage.status === "Active",
//   );

//   useEffect(() => {
//     getimageFn();
//   }, [getimageFn]);

//   return (
//     <PageTransition>
//       <div className="relative h-dvh w-full bg-black text-white overflow-hidden">
//         <div className="relative h-full flex flex-col overflow-hidden">
//           {/* Background Text */}
//           <h1 className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[340px] font-bold text-white/[0.03] select-none leading-none pointer-events-none">
//             ME
//           </h1>

//           {/* Main Container */}
//           <div className="relative z-10 max-w-7xl mx-auto w-full h-full flex flex-col px-4 sm:px-7 md:px-10 lg:px-16 py-3 sm:py-5 lg:py-8">
//             {/* Navbar */}
//             <div className="flex justify-between items-center gap-3 shrink-0">
//               <h1 className="text-2xl sm:text-3xl tracking-[5px] sm:tracking-[10px] font-light shrink-0">
//                 M<span className="font-bold">E</span>
//               </h1>

//               <div className="flex gap-3 sm:gap-6 md:gap-8 lg:gap-10 uppercase tracking-[2px] sm:tracking-[4px] text-[9px] sm:text-xs md:text-sm text-gray-400">
//                 <p className="hover:text-white transition cursor-pointer">
//                   Men
//                 </p>
//                 <p className="hover:text-white transition cursor-pointer">
//                   Collections
//                 </p>
//               </div>
//             </div>

//             {/* Hero Section */}
//             <div className="relative flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 items-center gap-2 sm:gap-4 lg:gap-10 py-2 sm:py-4 lg:py-6 overflow-hidden">
//               {/* Mobile Background Image */}
//               {filterImage.map((image) => (
//                 <div className="absolute inset-0 lg:hidden" key={image._id}>
//                   <img
//                     src={image.welcomeImage?.url}
//                     alt=""
//                     className="absolute inset-0 w-full h-full object-cover object-center"
//                   />

//                   <div className="absolute inset-0 bg-black/65" />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/70" />
//                 </div>
//               ))}

//               {/* Left Content */}
//               <motion.div
//                 initial={{ opacity: 0, x: -80 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 1 }}
//                 className="relative z-10 w-full min-w-0 translate-y-0 sm:translate-y-2 md:translate-y-4 lg:translate-y-0"
//               >
//                 <p className="uppercase tracking-[3px] sm:tracking-[6px] lg:tracking-[8px] text-gray-300 lg:text-gray-500 mb-4 sm:mb-5 lg:mb-5 text-[9px] sm:text-xs">
//                   New Collection 2026
//                 </p>

//                 <h1 className="text-[clamp(48px,13vw,76px)] sm:text-[clamp(64px,10vw,100px)] lg:text-[clamp(70px,12vh,120px)] font-extralight leading-[0.9] tracking-tight mb-2">
//                   CREATE
//                 </h1>

//                 <h1 className="text-[clamp(48px,13vw,76px)] sm:text-[clamp(64px,10vw,100px)] lg:text-[clamp(70px,12vh,120px)] italic font-light leading-[0.9] tracking-tight mb-2">
//                   YOUR
//                 </h1>

//                 <h1 className="text-[clamp(48px,13vw,76px)] sm:text-[clamp(64px,10vw,100px)] lg:text-[clamp(70px,12vh,120px)] font-bold leading-[0.9] tracking-tight">
//                   STYLE
//                 </h1>

//                 <p className="mt-5 sm:mt-6 lg:mt-7 max-w-[420px] text-[10px] sm:text-xs md:text-sm lg:text-base text-gray-300 lg:text-gray-400 leading-5 sm:leading-6 lg:leading-8">
//                   Curated for modern elegance, crafted to leave a lasting
//                   impression. Discover timeless fashion that reflects confidence
//                   and individuality.
//                 </p>

//                 {/* Tablet and Desktop Button */}
//                 <button
//                   className="hidden sm:block mt-4 sm:mt-5 lg:mt-8 w-full lg:w-fit border border-white px-5 sm:px-7 lg:px-8 py-2.5 sm:py-3 lg:py-3.5 text-[9px] sm:text-xs uppercase tracking-[2px] sm:tracking-[4px] hover:bg-white hover:text-black transition duration-500"
//                   onClick={() => navigate("/mainpage")}
//                 >
//                   Shop Collection
//                 </button>
//               </motion.div>

//               {/* Mobile Bottom Button */}
//               <div className="absolute bottom-3 left-0 right-0 z-20 sm:hidden">
//                 <button
//                   className="w-full border border-white px-5 py-3 text-[9px] uppercase tracking-[2px] hover:bg-white hover:text-black transition duration-500"
//                   onClick={() => navigate("/mainpage")}
//                 >
//                   Shop Collection
//                 </button>
//               </div>

//               {/* Desktop Image */}
//               <motion.div
//                 initial={{ opacity: 0, x: 80 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 1 }}
//                 className="hidden lg:flex relative justify-center items-center w-full min-w-0 h-full max-h-[75vh]"
//               >
//                 <div className="absolute w-[360px] max-w-[80%] h-[85%] border border-white/20 translate-x-5 translate-y-5" />

//                 {filterImage.map((image) => (
//                   <div key={image._id} className="h-[90%] max-w-[80%]">
//                     <img
//                       src={image.welcomeImage?.url}
//                       alt="Premium fashion collection"
//                       className="relative z-10 h-[90%] max-h-[620px] w-auto max-w-[75%] object-cover grayscale hover:grayscale-0 transition duration-700"
//                     />
//                   </div>
//                 ))}

//                 <div className="absolute left-[-32px] top-10 rotate-[-90deg] uppercase tracking-[8px] text-xs text-gray-500 whitespace-nowrap">
//                   Premium Fashion
//                 </div>
//               </motion.div>
//             </div>

//             {/* Footer */}
//             <div className="relative z-10 flex flex-wrap justify-between items-center gap-2 border-t border-white/20 pt-2 sm:pt-3 lg:pt-5 uppercase tracking-[1.5px] sm:tracking-[3px] lg:tracking-[4px] text-[7px] sm:text-[9px] lg:text-xs text-gray-300 lg:text-gray-500 shrink-0">
//               <span>Luxury Clothing</span>

//               <span className="hidden sm:block">
//                 Designed For Modern Living
//               </span>

//               <span>Since 2026</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </PageTransition>
//   );
// };

// export default Maindashboard;
