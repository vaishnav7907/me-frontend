import React, { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { RiArrowRightLongFill } from "react-icons/ri";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
const Signup = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  return (
    <section className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Watermark */}

      <h1
        className="
        absolute
        -top-10
        right-8
        text-[220px]
        lg:text-[320px]
        font-bold
        text-white/[0.03]
        select-none
        pointer-events-none"
      >
        ME
      </h1>

      {/* Divider */}

      <div className="hidden lg:block absolute left-1/2 top-0 h-full w-px bg-white/10" />

      {/* Back */}

      <button
        onClick={() => navigate(-1)}
        className="group absolute top-10 left-10 flex items-center gap-3 z-20"
      >
        <IoArrowBack className="text-xl transition-transform duration-300 group-hover:-translate-x-2" />

        <span className="uppercase tracking-[0.35em] text-sm">Back</span>
      </button>

      <div
        className="
        max-w-7xl
        mx-auto
        min-h-screen
        grid
        lg:grid-cols-[1.15fr_0.85fr]
        px-8
        lg:px-20"
      >
        {/* LEFT */}

        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col justify-center pr-20"
        >
          <p className="uppercase tracking-[0.45em] text-gray-500 text-sm"></p>

          <h1
            className="
            mt-8
            text-7xl
            lg:text-[110px]
            italic font-semibold
            leading-[0.9]"
          >
            SIGNUP .
          </h1>

          {/* <p
            className="
            mt-10
            
            
            text-lg
            text-gray-400
            leading-9"
          >
            Create your account and step into a world of timeless <span className="italic">fashion</span> .
            Discover carefully curated collections, premium craftsmanship, and
            effortless style designed to elevate every moment.
          </p> */}
        </motion.div>

        {/* RIGHT */}

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center justify-center pt-24 pb-10"
        >
          <form className="w-full max-w-md flex flex-col gap-14">
            {/* Email */}

            <div className="space-y-4">
              <label className="uppercase tracking-[0.35em] text-xs text-gray-500">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                className="
                w-full
                bg-transparent
                border-b
                border-white/20
                pb-4
                outline-none
                text-lg
                placeholder:text-gray-600
                focus:border-white
                transition"
              />
            </div>

            <div className="space-y-4">
              <label className="uppercase tracking-[0.35em] text-xs text-gray-500">
                Username
              </label>

              <input
                type="email"
                placeholder="Enter your Username"
                className="
                w-full
                bg-transparent
                border-b
                border-white/20
                pb-4
                outline-none
                text-lg
                placeholder:text-gray-600
                focus:border-white
                transition"
              />
            </div>

            <div className="space-y-4">
              <label className="uppercase tracking-[0.35em] text-xs text-gray-500">
                Phone Number
              </label>

              <input
                type="email"
                placeholder="Enter your Phone Number"
                className="
                w-full
                bg-transparent
                border-b
                border-white/20
                pb-4
                outline-none
                text-lg
                placeholder:text-gray-600
                focus:border-white
                transition"
              />
            </div>
            {/* Password */}

            <div className="space-y-4">
              <label className="uppercase tracking-[0.35em] text-xs text-gray-500">
                Password
              </label>

              <div className="relative">
                <input
                  type="text"
                  placeholder="••••••••"
                  className="
                  w-full
                  bg-transparent
                  border-b
                  border-white/20
                  pb-4
                  outline-none
                  text-lg
                  placeholder:text-gray-600
                  focus:border-white
                  transition"
                />

                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowPassword((prev) => !prev);
                  }}
                  className="absolute right-0 top-1 text-gray-500 hover:text-white transition"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Enter Button */}

            <motion.button
              whileHover={{ x: 8 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.25 }}
              type="submit"
              className="
              group
              inline-flex
              items-center
              gap-4
              w-fit
              mt-2
              uppercase
              tracking-[0.45em]
              text-base
              font-medium"
            >
              <span>ENTER</span>

              <RiArrowRightLongFill
                size={28}
                className="transition-transform duration-300 group-hover:translate-x-2"
              />
            </motion.button>

            <div className="h-[2px] bg-white/10 "/>
          </form>

          
        </motion.div>
      </div>
    </section>
  );
};

export default Signup;
