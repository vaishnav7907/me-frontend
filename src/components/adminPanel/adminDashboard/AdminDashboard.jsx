import React from "react";
import AdminNavbar from "../adminNavbar/AdminNavbar";
import AdminSidebar from "../adminSidebar/AdminSidebar";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-black flex">
      <div>
        <AdminSidebar />
      </div>
      <div  className="min-h-screen ml-[260px] w-full">
        <div className=" sticky top-0 z-50 bg-black">
          <AdminNavbar />
        </div>
        <div>
          <Outlet/>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
