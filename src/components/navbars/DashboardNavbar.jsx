import React from "react";
import { motion } from "motion/react";
import { IoReorderTwoOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { UseMe } from "../context/Meprovider";

const DashboardNavbar = () => {
  const { setSidebar, sidebar } = UseMe();

  const navbarItems = [
    {
      name: "New",
      path: "/mainpage",
    },
    {
      name: "Collections",
      path: "/mainpage/Collections",
    },
    {
      name: "Brands",
      path: "/mainpage/Brands",
    },
    {
      name: "Sales",
      path: "/mainpage/Sales",
    },
    {
      name: "Cart",
      path: "/mainpage/Cart",
    },
  ];

  return (
    <div className="w-full bg-black">
      <div className="flex flex-col bg-black">
        {/* Top Navbar */}
        <div className="flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-10 pt-5 sm:pt-6 md:pt-7">
          {/* Logo */}
          <div>
            <motion.h1
              whileHover={{ scale: 1.03 }}
              className="text-3xl sm:text-4xl text-white cursor-pointer"
            >
              <span className="font-thin">M</span>
              <span className="font-bold">E</span>
            </motion.h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-10 xl:gap-12 text-white font-thin">
            {navbarItems.map((items, index) => (
              <NavLink key={index} to={items.path}>
                <motion.div
                  className="cursor-pointer relative group"
                  whileHover={{ y: -2 }}
                >
                  <p className="uppercase tracking-[0.15em] lg:tracking-[0.2em] text-xs lg:text-sm whitespace-nowrap">
                    {items.name}
                  </p>

                  <span className="absolute left-0 -bottom-2 h-[1px] w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
                </motion.div>
              </NavLink>
            ))}
          </div>

          {/* Sidebar Toggle */}
          <motion.div
            whileTap={{ scale: 0.9 }}
            className="cursor-pointer text-white"
            onClick={() => setSidebar(!sidebar)}
          >
            <IoReorderTwoOutline size={24} className="sm:w-7 sm:h-7" />
          </motion.div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden w-full overflow-x-auto scrollbar-hide mt-6 px-4 sm:px-6 pb-3">
          <div className="flex items-center gap-6 sm:gap-8 min-w-max text-white font-thin">
            {navbarItems.map((items, index) => (
              <NavLink key={index} to={items.path}>
                <motion.div
                  className="cursor-pointer relative group"
                  whileTap={{ scale: 0.95 }}
                >
                  <p className="uppercase tracking-[0.15em] text-[10px] sm:text-xs whitespace-nowrap">
                    {items.name}
                  </p>

                  <span className="absolute left-0 -bottom-1.5 h-[1px] w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
                </motion.div>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
