import { useState } from "react";
import Link from 'next/link';
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

const SideNavigation = () => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div style={{ height: "100vh" }}>
      <ProSidebar collapsed={collapsed} style={{ height: "100%", display: 'flex', flexDirection: 'column' }}>
        <SidebarHeader style={{ backgroundColor: 'black' }}>
          <div
            onClick={toggleCollapsed}
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: collapsed ? "center" : "flex-end",
              padding: "10px",
            }}
          >
            <MenuOutlinedIcon style={{ color: 'white' }} />
          </div>
        </SidebarHeader>
        <SidebarContent style={{ backgroundColor: '#f0f0f0', flex: 1, paddingLeft: collapsed ? '0' : '20px' }}>
          <Menu iconShape="square">
            <MenuItem
              icon={<HomeOutlinedIcon />}
              style={{ paddingLeft: '10px' }}
            >
              <Link href="/">Home Page</Link>
            </MenuItem>
            <SubMenu
              title="User Management"
              icon={<PeopleOutlinedIcon />}
              style={{ paddingLeft: '10px' }}
            >
              <MenuItem style={{ paddingLeft: '20px' }}>
                <Link href="/admin/userTable">User Table</Link>
              </MenuItem>
              <MenuItem style={{ paddingLeft: '20px' }}>New User</MenuItem>
            </SubMenu>
            <SubMenu
              title="Graphics"
              icon={<BarChartOutlinedIcon />}
              style={{ paddingLeft: '10px' }}
            >
              <MenuItem style={{ paddingLeft: '20px' }}>Bar Chart</MenuItem>
              <MenuItem style={{ paddingLeft: '20px' }}>Pie Chart</MenuItem>
              <MenuItem style={{ paddingLeft: '20px' }}>Line Chart</MenuItem>
            </SubMenu>
            <MenuItem
              icon={<SettingsOutlinedIcon />}
              style={{ paddingLeft: '10px' }}
            >
              <Link href="/admin/settings">Settings</Link>
            </MenuItem>
          </Menu>
        </SidebarContent>
        <SidebarFooter style={{ backgroundColor: 'black' }}>
          ©  Neoris
        </SidebarFooter>
      </ProSidebar>
    </div>
  );
};

export default SideNavigation;
