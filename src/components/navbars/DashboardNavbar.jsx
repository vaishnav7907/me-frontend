import React from "react";
import { motion } from "motion/react";
import { IoReorderTwoOutline } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import { UseMe } from "../context/Meprovider";
const DashboardNavbar = () => {
  const navigate= useNavigate()

const {setSidebar,sidebar}=UseMe()

  const navbarItems = [
    
    { name: "New" ,
      path:"/mainpage"
    },
    // { name: "Women" },
    // { name: "Men" },
    { name: "Brands",
      path:"/mainpage/Brands"
     },
    { name: "Sales" ,
      path:"/mainpage/Sales"
    },
    { name: "Cart",
      path:"/mainpage/Cart"
     },
  ];
  return (
    <div>
      <div className="flex items-center justify-between pt-7 pl-7 pr-7 bg-black">
        <div className=" flex items-center gap-20">
          <div>
            <motion.h1 className="text-4xl text-white  cursor-pointer">
              <span className="font-thin">M</span>
              <span className="font-bold">E</span>
            </motion.h1>
          </div>
          
          <div className=" flex items-center gap-12 text-white font-thin">
            {navbarItems.map((items,index ) => (
              <NavLink key={index} to={items.path}>
              <motion.div  className="cursor-pointer relative group" whileHover={{y:-2}}>
                <p className=" uppercase tracking-[0.2em] text-sm">{items.name}</p>
                <span className="absolute  left-0 -bottom-2 h-[1px] w-0  bg-white transition-all duration-300 group-hover:w-full"></span>
              </motion.div>
              </NavLink>
            ))}
          </div>
        </div>
        <div>
          <IoReorderTwoOutline  size={26} className="text-white"  onClick={()=>setSidebar(!sidebar)}/>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
