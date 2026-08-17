import React from "react";
import { FiSearch, FiBell } from "react-icons/fi";
const AdminNavbar = () => {
  return (
    <div className=" h-[80px] border-b  border-[#242932] flex  items-center px-6">
      <div className=" w-full flex justify-between items-center ">
        <div>
          <p className=" hidden sm:block text-[9px] uppercase tracking-[0.3em] text-[#505762] ">
            ME / ADMIN
          </p>
          <h2 className="text-lg font-semibold mt-1 text-white"> DAshboard</h2>
        </div>

        <div>
          <div
            className="   hidden
                md:flex
                items-center
                gap-3
                bg-[#12151A]
                border
                border-[#242932]
                px-4
                h-10
                w-[220px]
                lg:w-[280px]
                rounded-lg"
          >
            <FiSearch size={20} className="text-[#666D78]" />
            <input
              type="text"
              className="
                  bg-transparent
                  outline-none
                  w-full
                  text-xs
                  text-white
                  placeholder:text-[#505762] "
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
