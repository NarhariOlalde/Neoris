import React from "react";
import UserTable from "../../components/admin_components/UserTable";
import Sidebar from "../../components/navigation/adminSidebar/sidebar";

const AdminDashboard = () => {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ width: "18rem", flexShrink: 0, backgroundColor: "black" }}>
        <Sidebar />
      </div>
      <div style={{ flexGrow: 1, overflow: 'auto', backgroundColor: "white" }}>
        <UserTable />
      </div>
    </div>
  );
};

export default AdminDashboard;
