import React, { useState } from "react";
import { motion } from "motion/react";
import { FiArrowRight, FiLock, FiUserPlus } from "react-icons/fi";
import AdminLogin from "../adminLogin/AdminLogin";
import AdminSignup from "../adminSignup/AdminSignup";

const AdminWelcomePage = ({adminLoginToDash}) => {
  const [adminSignIn, setAdminSignIn] = useState(false);
  const [adminSignUp, setAdminSignUp] = useState(false);

  return (
    <div className="relative min-h-dvh bg-[#08090b] text-white flex items-center justify-center px-4 sm:px-6 py-6 overflow-hidden">
      
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[500px] h-[500px] bg-white/[0.025] rounded-full blur-3xl -top-40 -right-40" />
        <div className="absolute w-[400px] h-[400px] bg-white/[0.02] rounded-full blur-3xl -bottom-40 -left-40" />
      </div>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative w-full max-w-5xl"
      >
        <div className="border border-[#25282e] bg-[#0e1013] rounded-[28px] overflow-hidden shadow-2xl shadow-black/30">
          
          <div className="grid lg:grid-cols-2 min-h-[540px]">

            {/* LEFT SECTION */}
            <div className="flex flex-col justify-between p-8 sm:p-12 lg:p-16 border-b lg:border-b-0 lg:border-r border-[#25282e]">
              
              <div>
                {/* Logo */}
                <div className="flex items-center gap-2">
                  <div className="h-9 w-9 bg-white text-black rounded-lg flex items-center justify-center font-bold">
                    M
                  </div>

                  <span className="text-lg font-semibold tracking-[0.2em]">
                    ME
                  </span>
                </div>

                {/* Welcome Content */}
                <div className="mt-16 sm:mt-20">
                  <p className="text-xs uppercase tracking-[0.3em] text-neutral-500 mb-5">
                    Administration
                  </p>

                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05]">
                    Welcome to <br />
                    <span className="text-neutral-500">ME.</span>
                  </h1>

                  <p className="text-neutral-400 text-sm leading-7 max-w-md mt-6">
                    Manage your products, orders, customers and store
                    performance from one powerful workspace.
                  </p>
                </div>
              </div>

              {/* Bottom Text */}
              <p className="text-xs text-neutral-600 mt-12">
                Create Your Own Trend
              </p>
            </div>

            {/* RIGHT SECTION */}
            <div className="flex items-center justify-center p-8 sm:p-12 lg:p-16">
              <div className="w-full max-w-sm">

                {/* Icon */}
                <div className="h-14 w-14 rounded-2xl border border-[#30343b] bg-[#15171b] flex items-center justify-center mb-7">
                  <FiLock
                    size={20}
                    className="text-neutral-300"
                  />
                </div>

                {/* Heading */}
                <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">
                  Admin Access
                </p>

                <h2 className="text-3xl font-semibold mt-3">
                  Manage your store
                </h2>

                <p className="text-sm text-neutral-500 leading-6 mt-3">
                  Sign in to your existing account or create a new
                  administrator account to get started.
                </p>

                {/* Buttons */}
                <div className="space-y-3 mt-8">

                  {/* Sign In */}
                  <button
                    onClick={() => {
                      setAdminSignIn(true);
                      setAdminSignUp(false);
                    }}
                    className="w-full h-12 rounded-xl bg-white text-black text-sm font-medium flex items-center justify-center gap-2 hover:bg-neutral-200 transition duration-200"
                  >
                    Sign In
                    <FiArrowRight size={17} />
                  </button>

                  {/* Sign Up */}
                  <button
                    onClick={() => {
                      setAdminSignUp(true);
                      setAdminSignIn(false);
                    }}
                    className="w-full h-12 rounded-xl border border-[#30343b] text-white text-sm font-medium flex items-center justify-center gap-2 hover:bg-[#181b20] transition duration-200"
                  >
                    <FiUserPlus size={17} />
                    Create Admin Account
                  </button>

                </div>

                {/* Divider */}
                <div className="flex items-center gap-3 my-8">
                  <div className="h-px bg-[#25282e] flex-1" />

                  <span className="text-[10px] uppercase tracking-widest text-neutral-600 whitespace-nowrap">
                    Secure Access
                  </span>

                  <div className="h-px bg-[#25282e] flex-1" />
                </div>

                {/* Footer */}
                <p className="text-center text-xs text-neutral-600">
                  Authorized administrators only
                </p>

              </div>
            </div>

          </div>
        </div>
      </motion.div>

      {/* ADMIN LOGIN OVERLAY */}
      {adminSignIn && (
        <AdminLogin
          setAdminSignIn={setAdminSignIn}
          setAdminSignUp={setAdminSignUp}
          todash={adminLoginToDash}
        />
      )}

      {/* ADMIN SIGNUP OVERLAY */}
      {adminSignUp && (
        <AdminSignup
          setAdminSignUp={setAdminSignUp}
          setAdminSignIn={setAdminSignIn}
        />
      )}

    </div>
  );
};

export default AdminWelcomePage;