import React from "react";
import { motion } from "motion/react";
import { FaCircleLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
const Signin = () => {
  const navigate=useNavigate()
  return (
    <div className="min-h-screen  flex items-center justify-center px-6">
       
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-4xl grid md:grid-cols-2 overflow-hidden rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl"
      >
        {/* Left Side */}
       

        <div className=" relative flex flex-col justify-center px-12 py-16 border-r border-white/10">
          <div className="absolute top-14" onClick={()=>navigate(-1)}>
            <FaCircleLeft className="text-white" size={24}/>
          </div>
          <h1 className="text-6xl font-extralight text-white leading-tight">
            Welcome
            <br />
            <span className="font-semibold italic">Back.</span>
          </h1>

          <div className="w-16 h-[2px] bg-white mt-8"></div>

          <p className="mt-8 text-gray-400 text-lg leading-8">
            Discover timeless fashion curated for modern lifestyles. Sign in to
            continue your journey with
            <span className="text-white font-medium"> ME.</span>
          </p>
        </div>

        {/* Right Side */}
        <div className="flex items-center justify-center px-12 py-16">
          <div className="w-full max-w-md">
            <h2 className="text-white text-3xl font-light tracking-[0.2em] uppercase mb-10">
              Sign In
            </h2>

            <form className="space-y-8">
              <div>
                <label className="text-xs uppercase tracking-[0.3em] text-gray-500">
                  Username
                </label>

                <input
                  type="text"
                  placeholder="Enter username"
                  className="mt-3 w-full bg-transparent border-b border-gray-700 py-3 text-white placeholder:text-gray-600 outline-none focus:border-white transition"
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-[0.3em] text-gray-500">
                  Password
                </label>

                <input
                  type="password"
                  placeholder="••••••••"
                  className="mt-3 w-full bg-transparent border-b border-gray-700 py-3 text-white placeholder:text-gray-600 outline-none focus:border-white transition"
                />
              </div>

              <button className="w-full h-14 rounded-full border border-white bg-white text-black uppercase tracking-[0.3em] hover:bg-transparent hover:text-white transition duration-300">
                Sign In
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Signin;
