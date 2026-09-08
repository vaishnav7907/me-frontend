import React, { useState } from "react";
import {
  FiArrowLeft,
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
} from "react-icons/fi";
import { UseMe } from "../../../context/Meprovider";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = ({ setAdminSignIn, todash }) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    FullName,
    setFullName,
    Password,
    setPassword,
  } = UseMe();

  const navigate = useNavigate();

  const fullNameOnchange = (e) => {
    setFullName(e.target.value);
  };

  const passwordOnChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const adminSigninApi = await axios.post(
        `${import.meta.env.VITE_API_URL}/Me/userAdminLogin`,
        {
          FullName,
          Password,
        }
      );

      localStorage.setItem(
        "token",
        adminSigninApi.data.token
      );

      console.log("login data", adminSigninApi.data);

      alert("Admin login successfully ✅");

      setAdminSignIn(false);
      todash(true);

      navigate("/adminDash");
    } catch (error) {
      console.log("Error in admin login:", error);
      console.log(
        "Server response:",
        error.response?.data
      );
    }
  };

  return (
    <div className="fixed inset-0 z-[200] bg-[#070809] flex items-center justify-center px-5">
      <div className="absolute w-[500px] h-[500px] bg-white/[0.03] rounded-full blur-[120px]" />

      <div className="relative w-full max-w-3xl bg-[#0d0f12] border border-[#24272c] rounded-3xl shadow-2xl shadow-black/50 overflow-hidden">
        <div className="grid grid-cols-2 min-h-[390px]">
          <div className="bg-[#101216] border-r border-[#24272c] p-10 flex flex-col justify-between">
            <button
              type="button"
              onClick={() => setAdminSignIn(false)}
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
                Welcome back.
              </h1>

              <p className="text-sm text-neutral-500 leading-6 mt-3 max-w-xs">
                Sign in to manage your store, products,
                orders and business operations.
              </p>
            </div>

            <p className="text-[10px] uppercase tracking-[0.18em] text-neutral-700">
              ME Administration
            </p>
          </div>

          <div className="p-10 flex flex-col justify-center">
            <div>
              <h2 className="text-2xl font-semibold text-white">
                Sign In
              </h2>

              <p className="text-sm text-neutral-500 mt-1">
                Enter your administrator credentials
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-7 space-y-5"
            >
              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-2">
                  User Name
                </label>

                <div className="relative">
                  <FiMail
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600"
                  />

                  <input
                    type="text"
                    name="email"
                    value={FullName}
                    onChange={fullNameOnchange}
                    placeholder="admin"
                    required
                    className="w-full h-11 pl-11 pr-4 rounded-xl bg-[#15171b] border border-[#292c32] text-sm text-white placeholder:text-neutral-600 outline-none focus:border-neutral-500 transition"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-medium text-neutral-400">
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-[11px] text-neutral-500 hover:text-white transition"
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="relative">
                  <FiLock
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600"
                  />

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="password"
                    value={Password}
                    onChange={passwordOnChange}
                    placeholder="Enter your password"
                    required
                    className="w-full h-11 pl-11 pr-11 rounded-xl bg-[#15171b] border border-[#292c32] text-sm text-white placeholder:text-neutral-600 outline-none focus:border-neutral-500 transition"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
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

              <button
                type="submit"
                className="w-full h-11 rounded-xl bg-white text-black text-sm font-semibold hover:bg-neutral-200 active:scale-[0.98] transition-all"
              >
                Sign In
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

export default AdminLogin;