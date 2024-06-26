import React from 'react';
import SideNavigation from '../../components/SideNavigation';
import UserTable from '../../components/admin_components/UserTable';

const UserTablePage = () => {
    return (
      <div style={{ display: "flex" }}>
        <SideNavigation />
        <div style={{ flexGrow: 1 }}>
          <UserTable />
        </div>
      </div>
    );
  };

export default UserTablePage;
