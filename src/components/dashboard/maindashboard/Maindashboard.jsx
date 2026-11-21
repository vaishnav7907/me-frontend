import React from "react";
import { motion } from "motion/react";
import PageTransition from "../../pagetransition/PageTransition";
import fashionmen from "../../../assets/fashionmen.jpg";
import { useNavigate } from "react-router-dom";

const Maindashboard = () => {
  const navigate = useNavigate();
  const text = "Create Your Own Trend";

  return (
    <PageTransition>
      <div className="relative h-dvh w-full bg-black text-white overflow-hidden">
        <div className="relative h-full flex flex-col overflow-hidden">

          <h1 className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[340px] font-bold text-white/[0.03] select-none leading-none pointer-events-none">
            ME
          </h1>

          <div className="relative z-10 max-w-7xl mx-auto w-full h-full flex flex-col px-5 sm:px-8 lg:px-16 py-4 sm:py-6 lg:py-8">

            {/* Navbar */}
            <div className="flex justify-between items-center gap-4 shrink-0">
              <h1 className="text-2xl sm:text-3xl tracking-[6px] sm:tracking-[10px] font-light shrink-0">
                M<span className="font-bold">E</span>
              </h1>

              <div className="flex gap-4 sm:gap-8 lg:gap-10 uppercase tracking-[2px] sm:tracking-[4px] text-[10px] sm:text-xs md:text-sm text-gray-400">
                <p className="hover:text-white transition cursor-pointer">Men</p>
                <p className="hover:text-white transition cursor-pointer">Collections</p>
              </div>
            </div>

            {/* Hero */}
            <div className="relative flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 items-center gap-3 sm:gap-5 lg:gap-10 py-3 sm:py-5 lg:py-6 overflow-hidden">

              {/* Mobile Background Image */}
              <div className="absolute inset-0 lg:hidden">
                <img
                  src={fashionmen}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />

                <div className="absolute inset-0 bg-black/60" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/60" />
              </div>

              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -80 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                className="relative z-10 w-full min-w-0"
              >
                <p className="uppercase tracking-[3px] sm:tracking-[8px] text-gray-300 lg:text-gray-500 mb-3 sm:mb-5 text-[9px] sm:text-xs">
                  New Collection 2026
                </p>

                <h1 className="text-[13vw] sm:text-[9vw] lg:text-[clamp(70px,12vh,120px)] font-extralight leading-[0.85] tracking-tight">
                  CREATE
                </h1>

                <h1 className="text-[13vw] sm:text-[9vw] lg:text-[clamp(70px,12vh,120px)] italic font-light leading-[0.85] tracking-tight">
                  YOUR
                </h1>

                <h1 className="text-[13vw] sm:text-[9vw] lg:text-[clamp(70px,12vh,120px)] font-bold leading-[0.85] tracking-tight">
                  STYLE
                </h1>

                <p className="mt-4 sm:mt-5 lg:mt-7 max-w-lg text-[11px] sm:text-sm lg:text-base text-gray-300 lg:text-gray-400 leading-5 sm:leading-6 lg:leading-8">
                  Curated for modern elegance, crafted to leave a lasting
                  impression. Discover timeless fashion that reflects confidence
                  and individuality.
                </p>

                <button
                  className="mt-5 sm:mt-6 lg:mt-8 border border-white px-6 sm:px-8 py-3 sm:py-3.5 text-[9px] sm:text-xs uppercase tracking-[3px] sm:tracking-[5px] hover:bg-white hover:text-black transition duration-500"
                  onClick={() => navigate("/mainpage")}
                >
                  Shop Collection
                </button>
              </motion.div>

              {/* Desktop Image */}
              <motion.div
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                className="hidden lg:flex relative justify-center items-center w-full min-w-0 h-full max-h-[75vh]"
              >
                <div className="absolute w-[360px] max-w-[80%] h-[85%] border border-white/20 translate-x-5 translate-y-5" />

                <img
                  src={fashionmen}
                  alt="Premium fashion collection"
                  className="relative z-10 h-[85%] max-h-[620px] w-auto max-w-[55%] object-cover grayscale hover:grayscale-0 transition duration-700"
                />

                <div className="absolute left-[-32px] top-10 rotate-[-90deg] uppercase tracking-[8px] text-xs text-gray-500 whitespace-nowrap">
                  Premium Fashion
                </div>
              </motion.div>
            </div>

            {/* Footer */}
            <div className="relative z-10 flex flex-wrap justify-between items-center gap-2 border-t border-white/20 pt-3 sm:pt-4 lg:pt-5 uppercase tracking-[2px] sm:tracking-[4px] text-[8px] sm:text-[10px] lg:text-xs text-gray-300 lg:text-gray-500 shrink-0">
              <span>Luxury Clothing</span>
              <span className="hidden sm:block">Designed For Modern Living</span>
              <span>Since 2026</span>
            </div>

          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Maindashboard;