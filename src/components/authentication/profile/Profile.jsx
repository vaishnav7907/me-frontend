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

  // const [updateUserState,setUpdateUserState]=useState()

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
          Password
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
      {/* Background Text */}
      <h1 className="absolute top-10 left-0 text-[170px] lg:text-[260px] font-bold text-white/[0.03] uppercase select-none pointer-events-none">
        Profile
      </h1>

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="group absolute top-10 left-8 flex items-center gap-3 z-20"
      >
        <IoArrowBack className="text-xl transition-transform duration-300 group-hover:-translate-x-2" />

        <span className="uppercase tracking-[0.35em] text-sm">Back</span>
      </button>

      <div className="max-w-5xl mx-auto px-6 py-32">
        <div>
          <p className="uppercase tracking-[0.45em] text-gray-500 text-sm">
            account settings
          </p>
          <h2 className="text-5xl lg:text-7xl font-extralight mt-4 uppercase">
            my <span className="italic font-semibold">profile.</span>
          </h2>
          <p className="text-gray-400 mt-6 max-w-xl leading-8">
            Manage your personal information and shipping details for a seamless
            shopping experience with <span className="text-white">ME</span>
          </p>
        </div>

        <div className="py-10">
          <div className="border border-white/10 rounded-3xl p-8 lg:p-10 bg-white/[0.02] backdrop-blur-xl">
            <h4 className="text-2xl font-light mb-8">Personal Information</h4>
            <form
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              onSubmit={updateUser}
            >
              <div>
                <div className="flex flex-col">
                  <label
                    htmlFor=""
                    className="uppercase tracking-[0.25em] text-xs text-gray-500"
                  >
                    full name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter FullName"
                    value={FullName}
                    onChange={onchangeFullName}
                    className="bg-transparent border-b border-white/20 py-3 outline-none focus:border-white transition"
                  />
                </div>
                <div className="flex flex-col mt-12">
                  <label
                    htmlFor=""
                    className="uppercase tracking-[0.25em] text-xs text-gray-500"
                  >
                    PHONE NUMBER
                  </label>
                  <input
                    type="text"
                    value={Phone}
                    onChange={onchangePhone}
                    placeholder="Enter PhoneNumber"
                    className="bg-transparent border-b border-white/20 py-3 outline-none focus:border-white transition"
                  />
                </div>

                <div className="flex flex-col mt-12">
                  <label
                    htmlFor=""
                    className="uppercase tracking-[0.25em] text-xs text-gray-500"
                  >
                    Age
                  </label>
                  <input
                    type="text"
                    value={Age}
                    onChange={onchangeAge}
                    placeholder="Enter Your Age"
                    className="bg-transparent border-b border-white/20 py-3 outline-none focus:border-white transition"
                  />
                </div>
              </div>
              <div>
                <div className="flex flex-col">
                  <label
                    htmlFor=""
                    className="uppercase tracking-[0.25em] text-xs text-gray-500"
                  >
                    EMAIL
                  </label>
                  <input
                    type="email"
                    placeholder="Enter Email"
                    value={Email}
                    onChange={onchangeEmail}
                    className="bg-transparent border-b border-white/20 py-3 outline-none focus:border-white transition"
                  />
                </div>
                {/* <div className="flex flex-col mt-12">
                  <label
                    htmlFor=""
                    className="uppercase tracking-[0.25em] text-xs text-gray-500"
                  >
                    country
                  </label>
                  <input
                    type="text"
                    placeholder="india"
                    className="bg-transparent border-b border-white/20 py-3 outline-none focus:border-white transition"
                  />
                </div> */}
                <div className="flex flex-col mt-12">
                  <label
                    htmlFor="password"
                    className="uppercase tracking-[0.25em] text-xs text-gray-500"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      value={Password}
                      onChange={onchangePassword}
                      className="w-full bg-transparent border-b border-white/20 py-3 pr-8 outline-none focus:border-white"
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

                <div className="flex flex-col mt-12">
                  <button
                    type="submit"
                    className="px-8 py-4 border border-white rounded-full uppercase tracking-[0.25em] text-sm hover:bg-white hover:text-black transition-all duration-300"
                  >
                    update profile
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* <div className="">
          <button
            type="button"
            className="px-8 py-4 border border-white rounded-full uppercase tracking-[0.25em] text-sm hover:bg-white hover:text-black transition-all duration-300"
          >
            Change Password
          </button>
        </div> */}
        {/* <div className="">
          <div className="border border-white/10 rounded-3xl p-8 lg:p-10 bg-white/[0.02] backdrop-blur-xl">
            <h4 className="text-2xl font-light mb-8">Shipping Address</h4>
            <div className="grid grid-cols-1  gap-8">
              <div>
                <div className="flex flex-col">
                  <label
                    htmlFor=""
                    className="uppercase tracking-[0.25em] text-xs text-gray-500"
                  >
                    address line
                  </label>
                  <input
                    type="text"
                    placeholder="House No, Street, Area..."
                    className="bg-transparent border-b border-white/20 py-3 outline-none focus:border-white transition"
                  />
                </div>
                <div className="flex flex-col mt-12">
                  <label
                    htmlFor=""
                    className="uppercase tracking-[0.25em] text-xs text-gray-500"
                  >
                    city
                  </label>
                  <input
                    type="text"
                    placeholder="city"
                    className="bg-transparent border-b border-white/20 py-3 outline-none focus:border-white transition"
                  />
                </div>

                <div className="flex flex-col mt-12">
                  <label
                    htmlFor=""
                    className="uppercase tracking-[0.25em] text-xs text-gray-500"
                  >
                    state
                  </label>
                  <input
                    type="text"
                    placeholder="state"
                    className="bg-transparent border-b border-white/20 py-3 outline-none focus:border-white transition"
                  />
                </div>
                <div className="flex flex-col mt-12">
                  <label
                    htmlFor=""
                    className="uppercase tracking-[0.25em] text-xs text-gray-500"
                  >
                    pin code
                  </label>
                  <input
                    type="text"
                    placeholder="PIN Code"
                    className="bg-transparent border-b border-white/20 py-3 outline-none focus:border-white transition"
                  />
                </div>
              </div>
            </div>
          </div>
        </div> */}

        {/* <div className="py-10">
          <div className="border border-white/10 rounded-3xl p-8 lg:p-10 bg-white/[0.02] backdrop-blur-xl">
            <h4 className="text-2xl font-light mb-8">Security</h4>
            <form className="flex  justify-between items-center">
              <div className="flex flex-col">
                <label className="uppercase tracking-[0.25em] text-xs text-gray-500">
                  password
                </label>
                <input
                  type="text"
                  placeholder="Enter password"
                  className="bg-transparent border-b border-white/20 py-3 outline-none focus:border-white transition"
                />
                <p className="text-xs text-gray-500 mt-4">
                  Keep your account secure by updating your password regularly.
                </p>
              </div>
              <div>
                <button
                  type="button"
                  className="px-8 py-4 border border-white rounded-full uppercase tracking-[0.25em] text-sm hover:bg-white hover:text-black transition-all duration-300"
                >
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default Profile;
