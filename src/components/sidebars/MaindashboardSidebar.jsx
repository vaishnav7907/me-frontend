import React from 'react'
import { motion } from "motion/react";
import {
  FiHome,
  FiGrid,
  FiShoppingBag,
  FiHeart,
  FiUser,
  FiSettings,
} from "react-icons/fi";
const MaindashboardSidebar = () => {
     const menus = [
    { icon: <FiHome />, name: "Home" },
    { icon: <FiGrid />, name: "Collections" },
    { icon: <FiShoppingBag />, name: "Shop" },
    { icon: <FiHeart />, name: "Wishlist" },
    { icon: <FiUser />, name: "Profile" },
    { icon: <FiSettings />, name: "Settings" },
  ];

  return (
   <motion.aside
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="h-screen w-72 bg-[#0b0b0b] border-r border-white/10 flex flex-col justify-between"
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
          {menus.map((item, index) => (
            <motion.button
              key={index}
              whileHover={{
                x: 8,
                backgroundColor: "rgba(255,255,255,0.05)",
              }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-5 rounded-xl px-6 py-4 text-gray-400 hover:text-white transition"
            >
              <span className="text-xl">{item.icon}</span>

              <span className="uppercase tracking-[0.25em] text-sm">
                {item.name}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Bottom */}
    
    </motion.aside>
  )
}

export default MaindashboardSidebar
