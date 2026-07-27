import React from "react";
import DashboadrNavbar from "../../../navbars/DashboardNavbar";
import NewCollections from "../NewCollections";

import Brands from "../Brands";
import Sales from "../Sales";
const MainPage = () => {
  return (
    <div className=" w-full bg-black  ">
      <div className="flex flex-col gap-7 w-full">
        <div className="overflow-hidden">
          <DashboadrNavbar />
        </div>
        <div className="w-full h-screen  ">
          {/* <NewCollections /> */}
         {/* <Brands/> */}
         <Sales/>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
