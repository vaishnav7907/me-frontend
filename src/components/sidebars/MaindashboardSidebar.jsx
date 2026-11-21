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
      path: "/signin",
    },
    {
      icon: <PiUserPlusBold />,
      name: "Sign Up",
      path: "/signup",
    },
    {
      icon: <FiUser />,
      name: "Profile",
      path: "/profile",
    },
    {
      icon: <FiSettings />,
      name: "Settings",
      path: "/settings",
    },
  ];

  return (
    <motion.aside
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.4 }}
      className="h-dvh w-[min(80vw,288px)] sm:w-72 bg-[#0b0b0b] border-l border-white/10 flex flex-col justify-between overflow-y-auto overflow-x-hidden"
    >
      {/* Logo */}
      <div>
        <div className="px-6 sm:px-10 py-8 sm:py-10">
          <h1 className="text-white text-3xl sm:text-4xl font-thin tracking-[0.35em]">
            <span className="font-extralight">M</span>
            <span className="font-bold">E</span>
          </h1>

          <p className="text-gray-500 text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] mt-2">
            Fashion Store
          </p>
        </div>

        {/* Menu */}
        <div className="mt-5 sm:mt-10 flex flex-col gap-2 px-3 sm:px-4">
          {menus.map((item) => (
            <NavLink key={item.name} to={item.path}>
              <motion.button
                whileHover={{
                  x: 6,
                  backgroundColor: "rgba(255,255,255,0.05)",
                }}
                whileTap={{ scale: 0.97 }}
                className="w-full flex items-center gap-3 sm:gap-4 rounded-xl px-4 sm:px-6 py-3.5 sm:py-4 text-gray-400 hover:text-white transition-all duration-300"
              >
                <span className="text-lg sm:text-xl shrink-0">{item.icon}</span>

                <span className="uppercase tracking-[0.18em] sm:tracking-[0.25em] text-xs sm:text-sm whitespace-nowrap">
                  {item.name}
                </span>
              </motion.button>
            </NavLink>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-white/10 px-5 sm:px-8 py-5 sm:py-6">
        <p className="text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-gray-600">
          ME Fashion
        </p>

        <p className="text-gray-500 text-xs sm:text-sm mt-2 leading-5 sm:leading-6">
          Timeless elegance for every season.
        </p>
      </div>
    </motion.aside>
  );
};

export default MaindashboardSidebar;