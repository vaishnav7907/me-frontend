import React from "react";
import DashboadrNavbar from "../../../navbars/DashboardNavbar";
import NewCollections from "../NewCollections";
import MenCollection from "../MenCollection";
const MainPage = () => {
  return (
    <div className="h-screen w-full bg-black overflow-hidden ">
      <div className="flex flex-col gap-7 w-full">
        <div>
          <DashboadrNavbar />
        </div>
        <div className="w-full h-screen  ">
          {/* <NewCollections /> */}
          <MenCollection/>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
