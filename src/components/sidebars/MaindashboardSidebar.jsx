import React from "react";
import { motion } from "motion/react";
import { FiUser, FiSettings } from "react-icons/fi";
import { PiSignInBold, PiUserPlusBold } from "react-icons/pi";
import { NavLink } from "react-router-dom";

const MaindashboardSidebar = () => {
  const menus = [
    {
      icon: <PiSignInBold />,
      name: "Sign In",
      path:"/signin"
    },
    {
      icon: <PiUserPlusBold />,
      name: "Sign Up",
    },
    {
      icon: <FiUser />,
      name: "Profile",
    },
    {
      icon: <FiSettings />,
      name: "Settings",
    },
  ];

  return (
    <motion.aside
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.4 }}
      className="h-screen w-72 bg-[#0b0b0b] border-l border-white/10 flex flex-col justify-between"
    >
      {/* Logo */}
      <div>
        <div className="px-10 py-10">
          <h1 className="text-white text-4xl font-thin tracking-[0.35em]">
            <span className="font-extralight">M</span>
            <span className="font-bold">E</span>
          </h1>

          <p className="text-gray-500 text-xs uppercase tracking-[0.4em] mt-2">
            Fashion Store
          </p>
        </div>

        {/* Menu */}
        <div className="mt-10 flex flex-col gap-2 px-4">
          {menus.map((item) => (
            <NavLink key={item.name} to={item.path}>
            <motion.button
              
              whileHover={{
                x: 8,
                backgroundColor: "rgba(255,255,255,0.05)",
              }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-4 rounded-xl px-6 py-4 text-gray-400 hover:text-white transition-all duration-300"
            >
              <span className="text-xl">{item.icon}</span>

              <span className="uppercase tracking-[0.25em] text-sm">
                {item.name}
              </span>
            </motion.button>
            </NavLink>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-white/10 px-8 py-6">
        <p className="text-xs uppercase tracking-[0.3em] text-gray-600">
          ME Fashion
        </p>

        <p className="text-gray-500 text-sm mt-2">
          Timeless elegance for every season.
        </p>
      </div>
    </motion.aside>
  );
};

export default MaindashboardSidebar;