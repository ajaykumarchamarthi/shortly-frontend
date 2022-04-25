import React from "react";
import classes from "./Dashboard.module.css";
import Profile from "./Profile.js/Profile";
import UrlData from "./UrlData/UrlData";

function Dashboard() {
  return (
    <div className={classes.dashboard}>
      <Profile />
      <UrlData />
    </div>
  );
}

export default Dashboard;
