import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import axios from "axios";
import { UseMe } from "../../context/Meprovider";

const Profile = () => {
  const navigate = useNavigate();
  const { userId } = UseMe();
  const [FullName, setFullName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Age, setAge] = useState("");
  const [Phone, setPhone] = useState("");

  const [showPassword, setShowPassword] = useState(false);

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

  useEffect(() => {
    const getUser = async () => {
      try {
        const token = localStorage.getItem("userToken");

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/Me/getUser/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const user = res.data.user;

        setFullName(user.FullName || "");
        setEmail(user.Email || "");
        setPhone(user.Phone || "");
        setAge(user.Age ?? "");
      } catch (error) {
        console.log(error.response?.data || error.message);
      }
    };

    if (userId) getUser();
  }, [userId]);

  const updateUser = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("userToken");
      const id = localStorage.getItem("userId");

      if (!token || !id || id === "null" || id === "undefined") {
        alert("Please login again");
        return;
      }

      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/Me/updateUser/${id}`,
        {
          FullName,
          Email,
          Phone,
          Age,
          Password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log(response.data);
      alert("Profile updated successfully");
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to update profile");
    }
  };

  return (
    <section className="min-h-screen bg-black text-white relative overflow-hidden">
      <h1 className="absolute top-8 sm:top-10 left-0 text-7xl sm:text-[120px] md:text-[170px] lg:text-[260px] font-bold text-white/[0.03] uppercase select-none pointer-events-none whitespace-nowrap">
        Profile
      </h1>

      <button
        onClick={() => navigate(-1)}
        className="group absolute top-6 left-4 sm:top-10 sm:left-8 flex items-center gap-2 sm:gap-3 z-20"
      >
        <IoArrowBack className="text-lg sm:text-xl transition-transform duration-300 group-hover:-translate-x-2" />

        <span className="uppercase tracking-[0.2em] sm:tracking-[0.35em] text-xs sm:text-sm">
          Back
        </span>
      </button>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-24 sm:py-28 md:py-32">
        <div>
          <p className="uppercase tracking-[0.3em] sm:tracking-[0.45em] text-gray-500 text-xs sm:text-sm">
            account settings
          </p>

          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight mt-3 sm:mt-4 uppercase">
            my <span className="italic font-semibold">profile.</span>
          </h2>

          <p className="text-gray-400 mt-4 sm:mt-6 max-w-xl leading-7 sm:leading-8 text-sm sm:text-base">
            Manage your personal information and shipping details for a seamless
            shopping experience with <span className="text-white">ME</span>
          </p>
        </div>

        <div className="py-6 sm:py-10">
          <div className="border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 bg-white/[0.02] backdrop-blur-xl">
            <h4 className="text-xl sm:text-2xl font-light mb-6 sm:mb-8">
              Personal Information
            </h4>

            <form
              className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
              onSubmit={updateUser}
            >
              <div>
                <div className="flex flex-col">
                  <label
                    htmlFor=""
                    className="uppercase tracking-[0.2em] sm:tracking-[0.25em] text-xs text-gray-500"
                  >
                    full name
                  </label>

                  <input
                    type="text"
                    placeholder="Enter FullName"
                    value={FullName}
                    onChange={onchangeFullName}
                    className="w-full bg-transparent border-b border-white/20 py-3 outline-none focus:border-white transition text-sm sm:text-base"
                  />
                </div>

                <div className="flex flex-col mt-8 sm:mt-12">
                  <label
                    htmlFor=""
                    className="uppercase tracking-[0.2em] sm:tracking-[0.25em] text-xs text-gray-500"
                  >
                    PHONE NUMBER
                  </label>

                  <input
                    type="text"
                    value={Phone}
                    onChange={onchangePhone}
                    placeholder="Enter PhoneNumber"
                    className="w-full bg-transparent border-b border-white/20 py-3 outline-none focus:border-white transition text-sm sm:text-base"
                  />
                </div>

                <div className="flex flex-col mt-8 sm:mt-12">
                  <label
                    htmlFor=""
                    className="uppercase tracking-[0.2em] sm:tracking-[0.25em] text-xs text-gray-500"
                  >
                    Age
                  </label>

                  <input
                    type="text"
                    value={Age}
                    onChange={onchangeAge}
                    placeholder="Enter Your Age"
                    className="w-full bg-transparent border-b border-white/20 py-3 outline-none focus:border-white transition text-sm sm:text-base"
                  />
                </div>
              </div>

              <div>
                <div className="flex flex-col">
                  <label
                    htmlFor=""
                    className="uppercase tracking-[0.2em] sm:tracking-[0.25em] text-xs text-gray-500"
                  >
                    EMAIL
                  </label>

                  <input
                    type="email"
                    placeholder="Enter Email"
                    value={Email}
                    onChange={onchangeEmail}
                    className="w-full bg-transparent border-b border-white/20 py-3 outline-none focus:border-white transition text-sm sm:text-base"
                  />
                </div>

                <div className="flex flex-col mt-8 sm:mt-12">
                  <label
                    htmlFor="password"
                    className="uppercase tracking-[0.2em] sm:tracking-[0.25em] text-xs text-gray-500"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      value={Password}
                      onChange={onchangePassword}
                      className="w-full bg-transparent border-b border-white/20 py-3 pr-8 outline-none focus:border-white text-sm sm:text-base"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-0 top-1 text-gray-500 hover:text-white"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <div className="flex flex-col mt-8 sm:mt-12">
                  <button
                    type="submit"
                    className="w-full px-5 sm:px-8 py-3 sm:py-4 border border-white rounded-full uppercase tracking-[0.15em] sm:tracking-[0.25em] text-xs sm:text-sm hover:bg-white hover:text-black transition-all duration-300"
                  >
                    update profile
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;