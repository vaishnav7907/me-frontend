import React, { useState } from "react";
import {
  FiArrowLeft,
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
  FiUser,
} from "react-icons/fi";
import axios from "axios";
import { UseMe } from "../../../context/Meprovider";

const AdminSignup = ({ setAdminSignUp, setAdminSignIn }) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    FullName,
    setFullName,
    Email,
    setEmail,
    Password,
    setPassword,
  } = UseMe();

  const fullNameOnchange = (e) => {
    setFullName(e.target.value);
  };

  const emailOnChange = (e) => {
    setEmail(e.target.value);
  };

  const passwordOnchange = (e) => {
    setPassword(e.target.value);
  };

  const adminSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/Me/adminSignup`,
        {
          FullName,
          Email,
          Password,
        }
      );

      console.log("Signup response:", response.data);

      alert("Admin account created successfully ✅");

      // Close signup
      setAdminSignUp(false);

      // Open login
      setAdminSignIn(true);

      // Optional: clear form after successful signup
      setFullName("");
      setEmail("");
      setPassword("");

    } catch (error) {
      console.log("Error in admin signup:", error);
      console.log("Server response:", error.response?.data);

      alert(
        error.response?.data?.message ||
        "Admin signup failed"
      );
    }
  };

  return (
    <div className="fixed inset-0 z-[200] bg-[#070809] flex items-center justify-center px-5">

      {/* Background glow */}
      <div className="absolute w-[500px] h-[500px] bg-white/[0.03] rounded-full blur-[120px]" />

      {/* Main Card */}
      <div className="relative w-full max-w-4xl bg-[#0d0f12] border border-[#24272c] rounded-3xl shadow-2xl shadow-black/50 overflow-hidden">

        <div className="grid grid-cols-2 min-h-[440px]">

          {/* LEFT SECTION */}
          <div className="bg-[#101216] border-r border-[#24272c] p-10 flex flex-col justify-between">

            <button
              type="button"
              onClick={() => setAdminSignUp(false)}
              className="flex items-center gap-2 text-sm text-neutral-500 hover:text-white transition group w-fit"
            >
              <FiArrowLeft
                size={15}
                className="group-hover:-translate-x-1 transition-transform"
              />

              Back
            </button>

            <div>
              <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center">
                <span className="text-black text-xl font-bold">
                  ME
                </span>
              </div>

              <h1 className="text-4xl font-semibold text-white tracking-tight mt-7">
                Join ME.
              </h1>

              <p className="text-sm text-neutral-500 leading-6 mt-3 max-w-xs">
                Create your administrator account and start managing
                your store from one powerful workspace.
              </p>
            </div>

            <p className="text-[10px] uppercase tracking-[0.18em] text-neutral-700">
              ME Administration
            </p>

          </div>

          {/* RIGHT SECTION */}
          <div className="p-10 flex flex-col justify-center">

            <div>
              <h2 className="text-2xl font-semibold text-white">
                Create Account
              </h2>

              <p className="text-sm text-neutral-500 mt-1">
                Set up your administrator account
              </p>
            </div>

            <form
              onSubmit={adminSignup}
              className="mt-7 space-y-4"
            >

              {/* FULL NAME */}
              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-2">
                  Full Name
                </label>

                <div className="relative">

                  <FiUser
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600"
                  />

                  <input
                    type="text"
                    name="name"
                    value={FullName}
                    onChange={fullNameOnchange}
                    placeholder="Enter your name"
                    required
                    className="w-full h-11 pl-11 pr-4 rounded-xl bg-[#15171b] border border-[#292c32] text-sm text-white placeholder:text-neutral-600 outline-none focus:border-neutral-500 transition"
                  />

                </div>
              </div>

              {/* EMAIL */}
              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-2">
                  Email Address
                </label>

                <div className="relative">

                  <FiMail
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600"
                  />

                  <input
                    type="email"
                    name="email"
                    value={Email}
                    onChange={emailOnChange}
                    placeholder="admin@example.com"
                    required
                    className="w-full h-11 pl-11 pr-4 rounded-xl bg-[#15171b] border border-[#292c32] text-sm text-white placeholder:text-neutral-600 outline-none focus:border-neutral-500 transition"
                  />

                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-2">
                  Password
                </label>

                <div className="relative">

                  <FiLock
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600"
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={Password}
                    onChange={passwordOnchange}
                    placeholder="Create a password"
                    required
                    className="w-full h-11 pl-11 pr-11 rounded-xl bg-[#15171b] border border-[#292c32] text-sm text-white placeholder:text-neutral-600 outline-none focus:border-neutral-500 transition"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-600 hover:text-white transition"
                  >
                    {showPassword ? (
                      <FiEyeOff size={16} />
                    ) : (
                      <FiEye size={16} />
                    )}
                  </button>

                </div>
              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                className="w-full h-11 rounded-xl bg-white text-black text-sm font-semibold hover:bg-neutral-200 active:scale-[0.98] transition-all mt-2"
              >
                Create Admin Account
              </button>

            </form>

            <p className="text-center text-[10px] text-neutral-700 mt-6">
              Authorized administrators only
            </p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSignup;