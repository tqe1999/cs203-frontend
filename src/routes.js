/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import Icons from "views/Icons.js";
import Maps from "views/Maps.js";
import Notifications from "views/Notifications.js";
import Upgrade from "views/Upgrade.js";
import FootfallData from "views/FootfallData.js"
import Supervisor from "views/Supervisor.js"
import Administrator from "views/Administrator.js"
import TableLayout from "views/TableLayout.js"
import Logout from "views/Logout.js"
import Gov from "views/Gov.js"
import Shop from "views/Shop.js"
import { LocalDiningOutlined } from "@material-ui/icons";

const dashboardRoutes = [
  // {
  //   upgrade: true,
  //   path: "/upgrade",
  //   name: "Upgrade to PRO",
  //   icon: "nc-icon nc-alien-33",
  //   component: Upgrade,
  //   layout: "/admin",
  // },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/user",
    name: "User Profile",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/admin",
  },
  // {
  //   path: "/table",
  //   name: "Table List",
  //   icon: "nc-icon nc-notes",
  //   component: TableList,
  //   layout: "/admin",
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "nc-icon nc-paper-2",
  //   component: Typography,
  //   layout: "/admin",
  // },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "nc-icon nc-atom",
  //   component: Icons,
  //   layout: "/admin",
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "nc-icon nc-pin-3",
  //   component: Maps,
  //   layout: "/admin",
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "nc-icon nc-bell-55",
  //   component: Notifications,
  //   layout: "/admin",
  // },
  {
    path: "/operationaldata",
    name: "Operational Data",
    icon: "nc-icon nc-chart-bar-32",
    component: FootfallData,
    layout: "/admin",
  },
  {
    path: "/measures",
    name: "Measures & News",
    icon: "nc-icon nc-atom",
    component: Gov,
    layout: "/admin",
  },
  {
    path: "/administrator",
    name: "Supervisor Mgmt",
    icon: "nc-icon nc-paper-2",
    component: Administrator,
    layout: "/admin",
  },
  {
    path: "/supervisor",
    name: "Employee Mgmt",
    icon: "nc-icon nc-bell-55",
    component: Supervisor,
    layout: "/admin",
  },
  {
    path: "/shopmanagement",
    name: "Shop Management",
    icon: "nc-icon nc-settings-gear-64",
    component: Shop,
    layout: "/admin",
  },
  {
    path: "/floorplanner",
    name: "Floor Planner",
    icon: "nc-icon nc-notes",
    component: TableLayout,
    layout: "/admin",
  },
  {
    path: "/logout",
    name: "Logout",
    icon: "nc-icon nc-button-power",
    component: Logout,
    layout: "/admin"
  }
];

export default dashboardRoutes;
