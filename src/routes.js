import {
  Dashboard,
} from "@material-ui/icons";


import DashboardPage from "views/Dashboard/Dashboard.jsx";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/user",
    hide: "false"
  },
];

export default dashboardRoutes;
