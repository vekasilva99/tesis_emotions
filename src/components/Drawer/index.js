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
<<<<<<< HEAD
      <NavLink to='/home' className={color ? "navlink green":"navlink"}>Home</NavLink>
      <NavLink to='/signin' className={color ? "navlink green":"navlink"}>Sign In</NavLink>
      <NavLink to='/signup' className={color ? "navlink green":"navlink"}>Sign Up</NavLink>
      <NavLink to='/join-us' className={color ? "navlink green":"navlink"}>Join us</NavLink>
=======
      <NavLink to='/home' className={color ? "navlink green":"navlink"}>Inicio</NavLink>
      <NavLink to='/signin' className={color ? "navlink green":"navlink"}>Iniciar Sesion</NavLink>
      <NavLink to='/signup' className={color ? "navlink green":"navlink"}>Registrarse</NavLink>
      <NavLink to='/join-us' className={color ? "navlink green":"navlink"}>Únete</NavLink>
>>>>>>> e7378db40bd8bd8325ec48c0e53f0cc4922dadbf
      </>
      :
      <>
      {role === "company" &&
      <>
<<<<<<< HEAD
            <NavLink to='/homeCompany' className={color ? "navlink green":"navlink"}>Home</NavLink>
      <NavLink to='/videos' className={color ? "navlink green":"navlink"}>Videos</NavLink>
      <NavLink to='/emotions' className={color ? "navlink green":"navlink"}>Emotions</NavLink>
      <NavLink to='/testModel' className={color ? "navlink green":"navlink"}>Test Model</NavLink>
=======
            <NavLink to='/homeCompany' className={color ? "navlink green":"navlink"}>Inicio</NavLink>
      <NavLink to='/videos' className={color ? "navlink green":"navlink"}>Videos</NavLink>
      <NavLink to='/emotions' className={color ? "navlink green":"navlink"}>Emociones</NavLink>
      <NavLink to='/testModel' className={color ? "navlink green":"navlink"}>Prueba el Modelo</NavLink>
      <NavLink to='/testModelAttention' className={color ? "navlink green":"navlink"}>Prueba el Modelo de Atención</NavLink>
>>>>>>> e7378db40bd8bd8325ec48c0e53f0cc4922dadbf
      </>
      }
        {role === "user" &&
      <>
<<<<<<< HEAD
            <NavLink to='/home' className={color ? "navlink green":"navlink"}>Home</NavLink>
      <NavLink to='/brands' className={color ? "navlink green":"navlink"}>Brands</NavLink>
=======
            <NavLink to='/home' className={color ? "navlink green":"navlink"}>Inicio</NavLink>
      <NavLink to='/brands' className={color ? "navlink green":"navlink"}>Marcas</NavLink>
>>>>>>> e7378db40bd8bd8325ec48c0e53f0cc4922dadbf
  
      </>
      }


      </>
      }
      </div>
      

    </div>
  );
};

export default Drawer;