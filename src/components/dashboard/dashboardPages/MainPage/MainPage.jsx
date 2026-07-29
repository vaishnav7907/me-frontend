import React from "react";
import DashboardNavbar from "../../../navbars/DashboardNavbar";
import { Outlet } from "react-router-dom";
import MaindashboardSidebar from "../../../sidebars/MaindashboardSidebar";
import { UseMe } from "../../../context/Meprovider";
import { AnimatePresence } from "motion/react";
import { motion } from "motion/react";
const MainPage = () => {
  const { sidebar, setSidebar } = UseMe();
  return (
    <div className="min-h-screen bg-black">
      <div className="flex flex-col">
        <div className="sticky top-0 z-50">
          <DashboardNavbar />
        </div>

        <div className="w-full ">
          <Outlet />
<AnimatePresence>
          {sidebar && (
            <>
              <motion.div
              initial={{opacity:0}}
              animate={{opacity:1}}
              exit={{opacity:1}}
                className="fixed inset-0 bg-black/50 z-40"
                onClick={() => setSidebar(false)}
              />

              <div className="fixed top-0 right-0 h-screen z-50">
                <MaindashboardSidebar />
              </div>
            </>
          )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
