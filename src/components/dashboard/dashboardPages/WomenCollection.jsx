import React from "react";
import { motion } from "motion/react";
import women1 from "../../../assets/women1.jpg";
import { GoArrowUpRight } from "react-icons/go";
const WomenCollection = () => {
  return (
    <div>
      <div className=" h-screen  ">
        <div className="w-full">
          <img src={women1} alt="" className="w-full object-cover" />
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

        <div className="w-full px-16 flex items-center justify-center">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-white uppercase text-6xl md:text-8xl font-extralight tracking-[0.3em] text-center drop-shadow-xl"
          >
            Women's Collection
          </motion.h1>
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
  );
};

export default WomenCollection;
