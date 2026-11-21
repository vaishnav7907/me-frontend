import React from "react";
import { motion } from "motion/react";
import { IoArrowBack } from "react-icons/io5";
import {
  FaUser,
  FaBell,
  FaMoon,
  FaShieldAlt,
  FaGlobe,
  FaQuestionCircle,
  FaSignOutAlt,
  FaChevronRight,
} from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";

const settings = [
  {
    icon: <FaBell />,
    title: "Notifications",
    subtitle: "Manage alerts and updates",
  },
  {
    icon: <GrUpdate />,
    title: "Update User",
    subtitle: "Manage personal information",
  },
  {
    icon: <FaQuestionCircle />,
    title: "Help & Support",
    subtitle: "FAQs and customer support",
  },
];

const Settings = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen bg-black text-white px-4 sm:px-6 py-6 sm:py-10 relative overflow-hidden">
      <h1 className="absolute top-16 sm:top-20 left-0 text-6xl sm:text-[110px] md:text-[160px] lg:text-[240px] font-black uppercase text-white/[0.03] select-none pointer-events-none whitespace-nowrap">
        Settings
      </h1>

      <button
        onClick={() => navigate(-1)}
        className="group flex items-center gap-2 mb-8 sm:mb-12 relative z-10"
      >
        <IoArrowBack className="text-xl sm:text-2xl transition-transform duration-300 group-hover:-translate-x-2" />
        <span className="uppercase tracking-[0.2em] sm:tracking-[0.3em] text-xs sm:text-sm">
          Back
        </span>
      </button>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mb-8 sm:mb-12 relative"
      >
        <p className="uppercase tracking-[0.25em] sm:tracking-[0.4em] text-white/50 text-xs sm:text-sm">
          Preferences
        </p>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mt-3">
          Settings
        </h2>

        <p className="text-white/60 mt-4 sm:mt-5 leading-7 sm:leading-8 text-sm sm:text-base max-w-2xl">
          Customize your shopping experience, manage your account, and personalize
          the ME luxury store.
        </p>
      </motion.div>

      <div className="mt-6 sm:mt-10 p-1 sm:p-3 flex flex-col space-y-4 sm:space-y-5 w-full max-w-5xl">
        {settings.map((items, index) => (
          <Link to="#" key={index} className="w-full">
            <motion.div
              className="rounded-xl sm:rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 hover:border-white/30 transition-all w-full py-4 sm:py-5 px-3 sm:px-5 flex items-center justify-between gap-3 group"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: index * 0.1,
                duration: 0.45,
              }}
            >
              <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                <div className="h-11 w-11 sm:h-14 sm:w-14 shrink-0 rounded-full bg-white/10 flex items-center justify-center text-lg sm:text-xl group-hover:bg-white group-hover:text-black transition duration-300">
                  {items.icon}
                </div>

                <div className="min-w-0">
                  <h3 className="text-white text-sm sm:text-lg">
                    {items.title}
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm mt-1">
                    {items.subtitle}
                  </p>
                </div>
              </div>

              <div className="text-sm sm:text-lg transition duration-300 shrink-0">
                <FaChevronRight />
              </div>
            </motion.div>
          </Link>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className="mt-6 sm:mt-7 ml-1 sm:ml-3 flex items-center justify-center sm:justify-start gap-3 border border-red-500/40 text-red-400 px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-red-500 hover:text-white transition duration-300 text-sm sm:text-base"
      >
        <FaSignOutAlt />
        Logout
      </motion.button>
    </section>
  );
};

export default Settings;