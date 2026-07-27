import React from "react";
import { motion } from "motion/react";
import PageTransition from "../../pagetransition/PageTransition";
import fashionmen from "../../../assets/fashionmen.jpg";
import { useNavigate } from "react-router-dom";

const Maindashboard = () => {
  const navigate=useNavigate()
  const text = "Create Your Own Trend";
  return (
    <PageTransition>
      <div className="relative min-h-screen bg-black text-white overflow-auto">
        <div>
          {/* Background Word */}
          <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[260px] lg:text-[340px] font-bold text-white/[0.03] select-none leading-none">
            ME
          </h1>

          <div className="max-w-7xl mx-auto min-h-screen flex flex-col px-8 lg:px-16 py-8">
            {/* Navbar */}
            <div className="flex justify-between items-center">
              <h1 className="text-3xl tracking-[10px] font-light">
                M<span className="font-bold">E</span>
              </h1>

              <div className="flex gap-10 uppercase tracking-[4px] text-sm text-gray-400">
                <p>Men</p>
                {/* <p>Women</p> */}
                <p>Collections</p>
              </div>
            </div>

            {/* Hero */}
            <div className="flex-1 grid lg:grid-cols-2 items-center gap-10 relative">
              {/* Left */}
              <motion.div
                initial={{ opacity: 0, x: -80 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
              >
                <p className="uppercase tracking-[8px] text-gray-500 mb-6">
                  New Collection 2026
                </p>

                <h1 className="text-7xl lg:text-[120px] font-extralight leading-[0.88]">
                  CREATE
                </h1>

                <h1 className="text-7xl lg:text-[120px] italic font-light leading-[0.88]">
                  YOUR
                </h1>

                <h1 className="text-7xl lg:text-[120px] font-bold leading-[0.88]">
                  STYLE
                </h1>

                <p className="mt-10 max-w-lg text-gray-400 leading-8">
                  Curated for modern elegance, crafted to leave a lasting
                  impression. Discover timeless fashion that reflects confidence
                  and individuality.
                </p>

                <button className="mt-12 border border-white px-8 py-3 uppercase tracking-[5px] hover:bg-white hover:text-black transition duration-500" onClick={()=>navigate("/mainpage")}>
                  Shop Collection
                </button>
              </motion.div>

              {/* Right */}
              <motion.div
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                className="relative flex justify-center"
              >
                {/* Decorative Frame */}
                <div className="absolute w-[360px] h-[520px] border border-white/20 translate-x-5 translate-y-5"></div>

                <img
                  src={fashionmen}
                  alt=""
                  className="relative z-10 w-[360px] h-[520px] object-cover grayscale hover:grayscale-0 transition duration-700"
                />

                {/* Floating Label */}
                <div className="absolute -left-8 top-10 rotate-[-90deg] uppercase tracking-[8px] text-xs text-gray-500">
                  Premium Fashion
                </div>
              </motion.div>
              
            </div>

            {/* Footer */}
            <div className="flex justify-between border-t border-white/10 pt-6 uppercase tracking-[4px] text-xs text-gray-500">
              <span>Luxury Clothing</span>
              <span>Designed For Modern Living</span>
              <span>Since 2026</span>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Maindashboard;
