import React from "react";
import { motion } from "motion/react";
import DashboardNavbar from "../../navbars/DashboardNavbar";
import fashionmen from "../../../assets/fashiongirl.webp";
import fashionwomen from "../../../assets/fashionmen.jpg";
import { BsChevronCompactLeft } from "react-icons/bs";
import { BsChevronCompactRight } from "react-icons/bs";
import { AiOutlineEye } from "react-icons/ai";
import PageTransition from "../../pagetransition/PageTransition";
import { GoArrowUpRight } from "react-icons/go";
// import { AiOutlineEyeInvisible } from "react-icons/ai";
{
  /* <AiOutlineEyeInvisible /> */
}
const Maindashboard = () => {
  return (
    <PageTransition>
      <div className="h-screen overflow-hidden relative w-full">
        <div className="">
          {/* navbar */}

          <div className="absolute top-0 left-0 w-full p-3 z-50">
            <DashboardNavbar />
          </div>
          {/* men and women */}
          <div className="grid grid-cols-2 h-screen  ">
            <div className="w-full">
              <img
                src={fashionwomen}
                alt=""
                className="w-full object-cover  "
              />
            </div>
            <div className="w-full">
              <img src={fashionmen} alt="" className="w-full object-cover" />
            </div>
          </div>
          <div className="absolute inset-0 z-20 flex flex-col justify-center items-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="uppercase tracking-[0.7em] text-white/70 text-xs mb-5"
            >
              SPRING • SUMMER 2026
            </motion.p>

            <div className="w-full px-16 flex items-center justify-between">
              <motion.button
                whileHover={{ x: -8, scale: 1.1 }}
                className="text-white/70 hover:text-white transition"
              >
                <BsChevronCompactLeft size={42} />
              </motion.button>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-white uppercase text-6xl md:text-8xl font-extralight tracking-[0.3em] text-center drop-shadow-xl"
              >
                NEW COLLECTION
              </motion.h1>

              <motion.button
                whileHover={{ x: 8, scale: 1.1 }}
                className="text-white/70 hover:text-white transition"
              >
                <BsChevronCompactRight size={42} />
              </motion.button>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-6 max-w-xl text-center text-white/80 text-lg font-light leading-8"
            >
              Elevate every moment with effortless fashion
            </motion.p>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="group mt-12 px-8 py-4 rounded-full border border-white/20 bg-white/10 backdrop-blur-xl text-white uppercase tracking-[0.35em] text-xs flex items-center gap-4 hover:bg-white hover:text-black transition-all duration-500"
            >
              Explore Collection
              <GoArrowUpRight
                size={18}
                className="transition duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </motion.button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Maindashboard;
