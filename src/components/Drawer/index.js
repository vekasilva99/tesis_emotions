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
      <NavLink to='/home' className={color ? "navlink green":"navlink"}>Inicio</NavLink>
      <NavLink to='/signin' className={color ? "navlink green":"navlink"}>Iniciar Sesion</NavLink>
      <NavLink to='/signup' className={color ? "navlink green":"navlink"}>Registrarse</NavLink>
      <NavLink to='/join-us' className={color ? "navlink green":"navlink"}>Únete</NavLink>
      </>
      :
      <>
      {role === "company" &&
      <>
            <NavLink to='/homeCompany' className={color ? "navlink green":"navlink"}>Inicio</NavLink>
      <NavLink to='/videos' className={color ? "navlink green":"navlink"}>Videos</NavLink>
      <NavLink to='/emotions' className={color ? "navlink green":"navlink"}>Emociones</NavLink>
      <NavLink to='/testModel' className={color ? "navlink green":"navlink"}>Prueba el Modelo</NavLink>
      <NavLink to='/testModelAttention' className={color ? "navlink green":"navlink"}>Prueba el Modelo de Atención</NavLink>
      </>
      }
        {role === "user" &&
      <>
            <NavLink to='/home' className={color ? "navlink green":"navlink"}>Inicio</NavLink>
      <NavLink to='/brands' className={color ? "navlink green":"navlink"}>Marcas</NavLink>
  
      </>
      }
            {role === "admin" &&
      <>
            <NavLink to='/homeAdmin' className={color ? "navlink green":"navlink"}>Inicio</NavLink>

  
      </>
      }


      </>
      }
      </div>
      

    </div>
  );
};

export default Drawer;