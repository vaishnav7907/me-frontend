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
import { useNavigate } from "react-router-dom";

const settings = [
  {
    icon: <FaUser />,
    title: "Account",
    subtitle: "Profile information and personal details",
  },
  {
    icon: <FaBell />,
    title: "Notifications",
    subtitle: "Manage alerts and updates",
  },
  {
    icon: <FaMoon />,
    title: "Appearance",
    subtitle: "Dark theme preferences",
  },
  {
    icon: <FaShieldAlt />,
    title: "Privacy",
    subtitle: "Security and account protection",
  },
  {
    icon: <FaGlobe />,
    title: "Language",
    subtitle: "English",
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
    <section className="min-h-screen bg-black text-white px-6 py-10 relative overflow-hidden">

      {/* Watermark */}
      <h1 className="absolute top-20 left-0 text-[160px] lg:text-[240px] font-black uppercase text-white/[0.03] select-none pointer-events-none">
        Settings
      </h1>

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="group flex items-center gap-2 mb-12"
      >
        <IoArrowBack className="text-2xl transition-transform duration-300 group-hover:-translate-x-2" />
        <span className="uppercase tracking-[0.3em] text-sm">
          Back
        </span>
      </button>

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mb-12"
      >
        <p className="uppercase tracking-[0.4em] text-white/50 text-sm">
          Preferences
        </p>

        <h2 className="text-5xl font-light mt-3">
          Settings
        </h2>

        <p className="text-white/60 mt-5 leading-8">
          Customize your shopping experience, manage your account,
          and personalize the ME luxury store.
        </p>
      </motion.div>

      {/* Settings List */}
      <div className="max-w-4xl space-y-5">
        {settings.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: index * 0.08,
              duration: 0.45,
            }}
            className="group flex items-center justify-between border border-white/10 bg-white/[0.02] rounded-2xl p-6 hover:border-white/30 hover:bg-white/[0.05] transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-center gap-5">
              <div className="h-14 w-14 rounded-full bg-white/10 flex items-center justify-center text-xl group-hover:bg-white group-hover:text-black transition duration-300">
                {item.icon}
              </div>

              <div>
                <h3 className="text-xl font-medium">
                  {item.title}
                </h3>

                <p className="text-white/50 text-sm mt-1">
                  {item.subtitle}
                </p>
              </div>
            </div>

            <FaChevronRight className="text-white/40 group-hover:translate-x-2 transition-transform duration-300" />
          </motion.div>
        ))}
      </div>

      {/* Logout */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className="mt-14 flex items-center gap-3 border border-red-500/40 text-red-400 px-8 py-4 rounded-full hover:bg-red-500 hover:text-white transition duration-300"
      >
        <FaSignOutAlt />
        Logout
      </motion.button>
    </section>
  );
};

export default Settings;
