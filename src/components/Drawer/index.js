import React, { useEffect, useState } from "react";
import {NavLink, withRouter} from 'react-router-dom';
import "../../styles/components/__components-dir.scss";
import { VscClose } from 'react-icons/vsc';

const Drawer= ({sideDrawerOpen,drawerToggleClickHandler}) => {


  return (
    <div className={sideDrawerOpen ? "drawer-container drawer-visible" :"drawer-container"}>
      <div className="drawer-close-container"><VscClose className="close-icon" onClick={drawerToggleClickHandler}/></div>
      <div className="navlinks-container">
      <NavLink to='/home' className="navlink">Home</NavLink>
      <NavLink to='/home' className="navlink">Sign In</NavLink>
      <NavLink to='/home' className="navlink">Sign Up</NavLink>
      <NavLink to='/home' className="navlink">Join us</NavLink>
      </div>
      

    </div>
  );
};

export default Drawer;