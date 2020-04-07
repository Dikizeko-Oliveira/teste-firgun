import React from "react";

import "./styles.css";

import DrawerToggle from "../SideDrawer/DrawerToggle";
import logoImg from "../../../assets/logo.png";

const toolbar = props => (
  <header className="Toolbar">
    <DrawerToggle clicked={props.drawerToggleClicked} />
    <div className="Logo">
      <img src={logoImg} alt="" />
    </div>
  </header>
);

export default toolbar;
