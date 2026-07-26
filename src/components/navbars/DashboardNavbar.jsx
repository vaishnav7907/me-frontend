import React from "react";
import { motion } from "motion/react";
import { IoReorderTwoOutline } from "react-icons/io5";
const DashboardNavbar = () => {
  const navbarItems = [
    { name: "New" },
    { name: "Women" },
    { name: "Men" },
    { name: "Collections" },
    { name: "Sales" },
    { name: "Cart" },
  ];
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className=" flex items-center gap-20">
          <div>
            <motion.h1 className="text-4xl text-black  cursor-pointer">
              <span className="font-thin">M</span>
              <span className="font-bold">E</span>
            </motion.h1>
          </div>
          <div className=" flex items-center gap-12 text-white font-thin">
            {navbarItems.map((items, ) => (
              <motion.div key={items.name} className="cursor-pointer relative group" whileHover={{y:-2}}>
                <p className=" uppercase tracking-[0.2em] text-sm">{items.name}</p>
                <span className="absolute  left-0 -bottom-2 h-[1px] w-0  bg-white transition-all duration-300 group-hover:w-full"></span>
              </motion.div>
            ))}
          </div>
        </div>
        <div>
          <IoReorderTwoOutline  size={26} className="text-white"/>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
