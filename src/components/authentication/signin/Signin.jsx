import React, { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { RiArrowRightLongFill } from "react-icons/ri";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { UseMe } from "../../context/Meprovider";
import axios from "axios";

const Signin = () => {
  const navigate = useNavigate();

  const { FullName, setFullName, Password, setPassword, userId, setUserId } =
    UseMe();

  const onchangeFullname = (e) => {
    setFullName(e.target.value);
  };

  const onchangePassword = (e) => {
    setPassword(e.target.value);
  };

  const [showPassword, setShowPassword] = useState(false);

  const loginSubmit = async (e) => {
    e.preventDefault();

    try {
      const userloginApi = await axios.post(
        `${import.meta.env.VITE_API_URL}/Me/userAdminLogin`,
        {
          FullName,
          Password,
        },
      );

      console.log("user signIn", userloginApi.data);

      const { token, user } = userloginApi.data;

      if (user.role !== "user") {
        alert("Only users can sign in here");
        return;
      }

      if (!user.id) {
        alert("User ID is missing");
        return;
      }

      localStorage.setItem("userToken", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("userId", user.id);

      setUserId(user.id);

      setFullName("");
      setPassword("");

      alert("Successfully joined ✅");
      navigate("/mainpage");
    } catch (error) {
      console.log("Error in user sign in:", error);
      console.log("Server response:", error.response?.data);

      alert(error.response?.data?.message || "User sign in failed");
    }
  };

  return (
    <section className="relative min-h-screen bg-black text-white overflow-hidden">
      <h1 className="absolute -top-4 sm:-top-10 right-2 sm:right-8 text-[100px] sm:text-[180px] md:text-[220px] lg:text-[320px] font-bold text-white/[0.03] select-none pointer-events-none whitespace-nowrap">
        ME
      </h1>

      <div className="hidden lg:block absolute left-1/2 top-0 h-full w-px bg-white/10" />

      <button
        onClick={() => navigate(-1)}
        className="group absolute top-6 left-4 sm:top-10 sm:left-10 flex items-center gap-2 sm:gap-3 z-20"
      >
        <IoArrowBack className="text-lg sm:text-xl transition-transform duration-300 group-hover:-translate-x-2" />

        <span className="uppercase tracking-[0.2em] sm:tracking-[0.35em] text-xs sm:text-sm">
          Back
        </span>
      </button>

      <div className="max-w-7xl mx-auto min-h-screen grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] px-4 sm:px-8 lg:px-20 pt-24 sm:pt-28 lg:pt-0 pb-10 sm:pb-14">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col justify-center pr-0 lg:pr-20 py-8 sm:py-10 lg:py-0"
        >
          <p className="uppercase tracking-[0.3em] sm:tracking-[0.45em] text-gray-500 text-xs sm:text-sm">
            Welcome Back
          </p>

          <h1 className="mt-5 sm:mt-8 text-5xl sm:text-7xl md:text-8xl lg:text-[110px] font-extralight leading-[0.9]">
            WELCOME
            <br />
            <span className="italic font-semibold">BACK .</span>
          </h1>

          <p className="mt-6 sm:mt-10 max-w-sm text-sm sm:text-base lg:text-lg text-gray-400 leading-7 sm:leading-9">
            Continue your journey with <span className="text-white">ME</span> .
            Discover timeless essentials crafted with elegance and simplicity.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center justify-center pt-8 sm:pt-10 lg:pt-24"
        >
          <form
            className="w-full max-w-md flex flex-col gap-9 sm:gap-14"
            onSubmit={loginSubmit}
          >
            <div className="space-y-3 sm:space-y-4">
              <label className="uppercase tracking-[0.25em] sm:tracking-[0.35em] text-xs text-gray-500">
                USER NAME
              </label>

              <input
                type="text"
                value={FullName}
                onChange={onchangeFullname}
                placeholder="User Name"
                className="w-full bg-transparent border-b border-white/20 pb-3 sm:pb-4 outline-none text-base sm:text-lg placeholder:text-gray-600 focus:border-white transition"
              />
            </div>

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
                  className="w-full bg-transparent border-b border-white/20 pb-3 sm:pb-4 outline-none text-base sm:text-lg placeholder:text-gray-600 focus:border-white transition pr-8"
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

            <div className="text-right text-xs sm:text-sm">
              <button
                type="button"
                className="text-gray-500 hover:text-white transition-colors duration-300"
              >
                Forgot Password
              </button>
            </div>

            <motion.button
              whileHover={{ x: 8 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.25 }}
              type="submit"
              className="group inline-flex items-center gap-3 sm:gap-4 w-fit mt-1 sm:mt-2 uppercase tracking-[0.3em] sm:tracking-[0.45em] text-sm sm:text-base font-medium"
            >
              <span>ENTER</span>

              <RiArrowRightLongFill
                size={24}
                className="transition-transform duration-300 group-hover:translate-x-2 sm:w-7 sm:h-7"
              />
            </motion.button>
          </form>

          <div className="w-full max-w-md mt-12 sm:mt-20">
            <div className="h-[2px] bg-white/10"></div>

            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-3 sm:gap-4 mt-6 sm:mt-8 text-xs sm:text-sm">
              <p className="text-gray-500">New to ME?</p>

              <button
                type="button"
                onClick={() => navigate("/signup")}
                className="uppercase tracking-[0.15em] sm:tracking-[0.2em] hover:underline"
              >
                Create Account
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Signin;