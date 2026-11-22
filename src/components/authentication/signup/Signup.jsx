import React, { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { RiArrowRightLongFill } from "react-icons/ri";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import axios from "axios";
import { UseMe } from "../../context/Provider";
// import { UseMe } from "../../context/Meprovider";

const Signup = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const {
    FullName,
    setFullName,
    Email,
    setEmail,
    Password,
    setPassword,
    Phone,
    setPhone,
    userId,
    setUserId,
  } = UseMe();
  const [Age, setAge] = useState("");

  const onchangeFullName = (e) => {
    setFullName(e.target.value);
  };

  const onchangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onchangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onchangeAge = (e) => {
    setAge(e.target.value);
  };

  const onchangePhone = (e) => {
    setPhone(e.target.value);
  };

  const userSingnupFn = async (e) => {
    e.preventDefault();

    try {
      const userSignupApi = await axios.post(
        `${import.meta.env.VITE_API_URL}/Me/userSignup`,
        {
          Email,
          FullName,
          Phone,
          Age: Number(Age),
          Password,
        },
      );

      console.log("User signup:", userSignupApi.data);

      const createdUser = userSignupApi.data.user;

      if (createdUser?._id || createdUser?.id) {
        setUserId(createdUser._id || createdUser.id);
      }

      alert("Successfully joined ✅");

      setEmail("");
      setFullName("");
      setPhone("");
      setPassword("");
      setAge("");

      navigate("/mainpage");
    } catch (error) {
      console.error("Error in user signup:", error);
      console.error("Server response:", error.response?.data);

      alert(error.response?.data?.message || "User signup failed");
    }
  };

  return (
    <section className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Watermark */}

      <h1
        className="
        absolute
        -top-4 sm:-top-10
        right-2 sm:right-8
        text-[100px] sm:text-[160px] md:text-[220px]
        lg:text-[320px]
        font-bold
        text-white/[0.03]
        select-none
        pointer-events-none
        whitespace-nowrap"
      >
        ME
      </h1>

      {/* Divider */}

      <div className="hidden lg:block absolute left-1/2 top-0 h-full w-px bg-white/10" />

      {/* Back */}

      <button
        onClick={() => navigate(-1)}
        className="group absolute top-6 left-4 sm:top-8 sm:left-8 lg:top-10 lg:left-10 flex items-center gap-2 sm:gap-3 z-20"
      >
        <IoArrowBack className="text-lg sm:text-xl transition-transform duration-300 group-hover:-translate-x-2" />

        <span className="uppercase tracking-[0.25em] sm:tracking-[0.35em] text-xs sm:text-sm">
          Back
        </span>
      </button>

      <div
        className="
        max-w-7xl
        mx-auto
        min-h-screen
        grid
        grid-cols-1
        lg:grid-cols-[1.15fr_0.85fr]
        px-4
        sm:px-8
        lg:px-20
        pt-24
        sm:pt-28
        lg:pt-0
        pb-8
        sm:pb-12"
      >
        {/* LEFT */}

        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col justify-center pr-0 lg:pr-20 py-4 sm:py-8 lg:py-0"
        >
          <p className="uppercase tracking-[0.45em] text-gray-500 text-sm"></p>

          <h1
            className="
            mt-4 sm:mt-8
            text-5xl
            sm:text-7xl
            md:text-8xl
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
          className="flex flex-col items-center justify-center pt-8 sm:pt-12 lg:pt-24 pb-6 sm:pb-10"
        >
          <form
            className="w-full max-w-md flex flex-col gap-8 sm:gap-10 lg:gap-14"
            onSubmit={userSingnupFn}
          >
            {/* Email */}

            <div className="space-y-3 sm:space-y-4">
              <label className="uppercase tracking-[0.25em] sm:tracking-[0.35em] text-xs text-gray-500">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={Email}
                onChange={onchangeEmail}
                className="
                w-full
                bg-transparent
                border-b
                border-white/20
                pb-3 sm:pb-4
                outline-none
                text-base sm:text-lg
                placeholder:text-gray-600
                focus:border-white
                transition"
              />
            </div>

            <div className="space-y-3 sm:space-y-4">
              <label className="uppercase tracking-[0.25em] sm:tracking-[0.35em] text-xs text-gray-500">
                User name
              </label>

              <input
                type="text"
                placeholder="Enter your Username"
                value={FullName}
                onChange={onchangeFullName}
                className="
                w-full
                bg-transparent
                border-b
                border-white/20
                pb-3 sm:pb-4
                outline-none
                text-base sm:text-lg
                placeholder:text-gray-600
                focus:border-white
                transition"
              />
            </div>

            <div className="space-y-3 sm:space-y-4">
              <label className="uppercase tracking-[0.25em] sm:tracking-[0.35em] text-xs text-gray-500">
                Age
              </label>

              <input
                type="number"
                min="1"
                max="120"
                placeholder="Enter your Age"
                value={Age}
                onChange={onchangeAge}
                required
                className="w-full bg-transparent border-b border-white/20 pb-3 sm:pb-4 outline-none text-base sm:text-lg placeholder:text-gray-600 focus:border-white transition"
              />
            </div>

            <div className="space-y-3 sm:space-y-4">
              <label className="uppercase tracking-[0.25em] sm:tracking-[0.35em] text-xs text-gray-500">
                Phone Number
              </label>

              <input
                type="tel"
                placeholder="Enter your Phone Number"
                value={Phone}
                onChange={onchangePhone}
                className="
                w-full
                bg-transparent
                border-b
                border-white/20
                pb-3 sm:pb-4
                outline-none
                text-base sm:text-lg
                placeholder:text-gray-600
                focus:border-white
                transition"
              />
            </div>
            {/* Password */}

            <div className="space-y-3 sm:space-y-4">
              <label className="uppercase tracking-[0.25em] sm:tracking-[0.35em] text-xs text-gray-500">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={Password}
                  onChange={onchangePassword}
                  placeholder="••••••••"
                  className="
                  w-full
                  bg-transparent
                  border-b
                  border-white/20
                  pb-3 sm:pb-4
                  outline-none
                  text-base sm:text-lg
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
              gap-3 sm:gap-4
              w-fit
              mt-1 sm:mt-2
              uppercase
              tracking-[0.3em] sm:tracking-[0.45em]
              text-sm sm:text-base
              font-medium"
            >
              <span>ENTER</span>

              <RiArrowRightLongFill
                size={28}
                className="transition-transform duration-300 group-hover:translate-x-2"
              />
            </motion.button>

            <div className="h-[2px] bg-white/10 " />
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Signup;
