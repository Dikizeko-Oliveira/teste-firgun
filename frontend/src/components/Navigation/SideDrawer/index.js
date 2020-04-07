import React from "react";

import "./styles.css";

import logoImg from "../../../assets/logo.png";
import NavigationItems from "../NavigationItems";

const sideDrawer = props => {
  let attachedClasses = ["SideDrawer", "Close"];
  
  if (props.open) {
    attachedClasses = ["SideDrawer", "Open"];
  }

  return (
    <>
      <div className={attachedClasses.join(" ")} onClick={props.closed}>
        <div className="Logo">
          <img src={logoImg} alt="Logo" />
        </div>
        <nav>
          <NavigationItems isAdmin={props.isAdmin}/>
        </nav>
      </div>
    </>
  );
};

export default sideDrawer;
