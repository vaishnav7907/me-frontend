import React from "react";
import { FiSearch, FiBell } from "react-icons/fi";
import { UseMe } from "../../context/Meprovider";
import { useLocation } from "react-router-dom";
const AdminNavbar = () => {
  const location = useLocation();
  const pageNames = {
    "/adminDash": "Dashboard",
    "/adminDash/storeProducts": "Products",
    "/adminDash/storeNewArrivals": "New Arrivals",
    "/adminDash/storeBrands": "Brands",
    "/adminDash/storeOrders": "Orders",
    "/adminDash/storeCustomers": "Customers",
    "/adminDash/storeSales": "Sales",
    "/adminDash/settings": "Settings",
  };

  const navbarHead = pageNames[location.pathname] || "Dashboard";
  return (
    <div className=" h-[80px] border-b  border-[#242932] flex  items-center px-6 ">
      <div className=" w-full flex justify-between items-center ">
        <div>
          <p className=" hidden sm:block text-[9px] uppercase tracking-[0.3em] text-[#505762] ">
            ME / ADMIN
          </p>
          <h2 className="text-lg font-semibold mt-1 text-white">
            {" "}
            {navbarHead}
          </h2>
        </div>

        <div className="flex gap-3">
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
              placeholder="Search products, orders..."
              className="
                  bg-transparent
                  outline-none
                  w-full
                  text-xs
                  text-white
                  placeholder:text-[#505762] "
            />
          </div>

          <div
            className="   
                flex
                items-center
                justify-center
                bg-[#12151A]
                border
                border-[#242932]
                h-10
                w-[40px]
                rounded-lg"
          >
            <FiBell size={20} className="text-white" />
          </div>

          <div className="bg-[#12151A] h-10 w-[2px]" />

          <div className="flex items-center gap-2">
            <div
              className="   
                flex
                items-center
                justify-center
                 bg-[#8B5CF6]/10
                  border
                  border-[#8B5CF6]/20
                  text-[#A78BFA]
                  text-xs
                h-10
                w-[40px]
                rounded-lg"
            >
              A
            </div>
            <div>
              <p className="text-white font-semibold">Admin</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
