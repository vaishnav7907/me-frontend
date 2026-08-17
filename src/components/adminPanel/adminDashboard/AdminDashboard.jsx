import React from "react";
import AdminNavbar from "../adminNavbar/AdminNavbar";
import AdminSidebar from "../adminSidebar/AdminSidebar";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-black flex">
      <div>
        <AdminSidebar />
      </div>
      <div  className="min-h-screen ml-[260px] w-full">
        <div className="">
          <AdminNavbar />
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default AdminDashboard;
