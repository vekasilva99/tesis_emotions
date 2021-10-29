import React, { useEffect, useState } from "react";
import {NavLink, withRouter} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import "../../styles/components/__components-dir.scss";
import { VscClose } from 'react-icons/vsc';

const Drawer= ({sideDrawerOpen,drawerToggleClickHandler,color}) => {

  const { _id,role } = useSelector((state) => ({
    ...state.auth,
  }));
  return (
    <div className={sideDrawerOpen ? "drawer-container drawer-visible" :"drawer-container"} style={{background:color ? color:""}}>
      <div className="drawer-close-container"><VscClose className={color ? "close-icon green":"close-icon"} onClick={drawerToggleClickHandler}/></div>
      <div className="navlinks-container">
        {role === null ?
        <>
      <NavLink to='/home' className={color ? "navlink green":"navlink"}>Home</NavLink>
      <NavLink to='/signin' className={color ? "navlink green":"navlink"}>Sign In</NavLink>
      <NavLink to='/signup' className={color ? "navlink green":"navlink"}>Sign Up</NavLink>
      <NavLink to='/join-us' className={color ? "navlink green":"navlink"}>Join us</NavLink>
      </>
      :
      <>
      {role === "company" &&
      <>
            <NavLink to='/homeCompany' className={color ? "navlink green":"navlink"}>Home</NavLink>
      <NavLink to='/videos' className={color ? "navlink green":"navlink"}>Videos</NavLink>
      <NavLink to='/emotions' className={color ? "navlink green":"navlink"}>Emotions</NavLink>
      <NavLink to='/testModel' className={color ? "navlink green":"navlink"}>Test Model</NavLink>
      </>
      }
        {role === "user" &&
      <>
            <NavLink to='/home' className={color ? "navlink green":"navlink"}>Home</NavLink>
      <NavLink to='/brands' className={color ? "navlink green":"navlink"}>Brands</NavLink>
  
      </>
      }


      </>
      }
      </div>
      

    </div>
  );
};

export default Drawer;