import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar/index";
import Drawer from "../components/Drawer/index";
import Circle from "../components/Circle/index";
import CircularText from "../components/CircularText/index";
import Item from "../components/Item/index";
import { useDispatch, useSelector } from "react-redux";
import adidasLogo from "../assets/images/adidas.png";
import benefitLogo from "../assets/images/benefit.png";
import cocaColaLogo from "../assets/images/cocaCola.png";
import lorealLogo from "../assets/images/loreal.png";
import neutrogenaLogo from "../assets/images/neutrogena.png";
import nikeLogo from "../assets/images/nike.png";
import { fetchCompaniesRequest } from "../actions/Brands";
import "../styles/pages/__pages-dir.scss";
import "@webpunk/circular-text";
const Home = (props) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  const companies = useSelector((state) => [...state.brands.companies]);
  const drawerToggleClickHandler = () => {
    setSideDrawerOpen(!sideDrawerOpen);
  };
  useEffect(() => {
    dispatch(fetchCompaniesRequest());
  }, []);

  useEffect(() => {
    if (!visible) {
      setTimeout(() => {
        setVisible(true);
      }, 600);
    }
  }, []);

  const getRadious = ()=>{
    let radious=""
if( window.innerWidth<1200){
  radious=(window.innerHeight*0.3).toString()
}else if(window.innerWidth >=1200 && window.innerWidth<2000){
      radious=(window.innerWidth*0.7).toString()

    } else if(window.innerWidth >=2000 && window.innerWidth<3000){
      radious= (window.innerWidth*0.5).toString()
  
    }else if(window.innerWidth >=3000 && window.innerWidth<4000){
      radious= (window.innerWidth*0.35).toString()
   
    }else if(window.innerWidth >=4000){
      radious= (window.innerWidth*0.3).toString()
    }

return radious
  

  }

  const getRadiousSmall = ()=>{
    let radious=""

    if(window.innerWidth >=1200 && window.innerWidth<2000){
      radious=(window.innerWidth*0.15).toString()

    } else if(window.innerWidth >=2000 && window.innerWidth<3000){
      radious= (window.innerWidth*0.10).toString()
  
    }else if(window.innerWidth >=3000 && window.innerWidth<4000){
      radious= (window.innerWidth*0.07).toString()
   
    }else if(window.innerWidth >=4000){
      radious= (window.innerWidth*0.07).toString()
    }
    else if(window.innerWidth >=5000){
      radious= (window.innerWidth*0.09).toString()
    }
    else if(window.innerWidth >=6000){
      radious= (window.innerWidth*0.1).toString()
    }
  
return radious
  
  }
  return (
    <>
      <div className="home-big-circle">
        <circular-text
<<<<<<< HEAD
          text="Full service creative agency  Full service creative agency   "
=======
          text="Agencia creativa de servicio completo  Agencia creativa de servicio completo "
>>>>>>> e7378db40bd8bd8325ec48c0e53f0cc4922dadbf
          radius={getRadious()}
        ></circular-text>
      </div>
      <Sidebar drawerToggleClickHandler={drawerToggleClickHandler} />
      <Drawer
        sideDrawerOpen={sideDrawerOpen}
        drawerToggleClickHandler={drawerToggleClickHandler}
      />


      <Circle />
      <div className={visible ? companies.length>0 ? "app-home":"app-home no-companies" : companies.length>0 ? "app-home onload":"app-home onload no-companies"}>
        <div className="section-home" >
<<<<<<< HEAD
          <h2 className="home-title-vertical">Full service creative agency</h2>
          <h1 className="home-title">We build brands of the future</h1>
=======
          <h2 className="home-title-vertical">Agencia creativa de servicio completo</h2>
          <h1 className="home-title">Construimos Marcas del Futuro</h1>
>>>>>>> e7378db40bd8bd8325ec48c0e53f0cc4922dadbf
        </div>
        <div
          className="section-home"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          <div className="medium-circle-home">
            <div className="medium-circle-center"></div>
            <div className="circular-cont">
              <circular-text
<<<<<<< HEAD
                text="Full service creative agency    "
=======
                text="Agencia creativa de servicio completo "
>>>>>>> e7378db40bd8bd8325ec48c0e53f0cc4922dadbf
                radius={getRadiousSmall()}
              ></circular-text>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
<<<<<<< HEAD
            <h1 className="subtitle-home">What we do.</h1>
            <h2 className="paragraph-home">
              Full service creative agency Full service creative agency Full
              service creative agency Full Full service creative agencyservice
              creative agency Full service creative agency Full service creative
              agency Full service creative agency Full service creative agency
              Full service creative agency Full service creative agency. Full
              service creative agency Full service creative agency Full service
              creative agency.
=======
            <h1 className="subtitle-home">¿Qué hacemos?</h1>
            <h2 className="paragraph-home">
              Proporcionamos información relevante a 
              empresas acerca de la recepción de sus comerciales
               con el uso de Inteligencia Artificial. A través de nuestra
                plataforma, usuarios de todo el mundo podrán visualizar las
                 propagandas disponibles, y mediante sus dispositivos captaremos
                 las expresiones faciales que realicen a lo largo de la transmisión, 
                 con el fin de que cada empresa pueda evaluar lo que sus comerciales causan en los usuarios.
>>>>>>> e7378db40bd8bd8325ec48c0e53f0cc4922dadbf
            </h2>
          </div>
        </div>
        {companies.length>0 ?
        <div
          className="section-home"
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          
<<<<<<< HEAD
          <h1 className="subtitle2-home">Our Brands.</h1>
=======
          <h1 className="subtitle2-home">Nuestras Marcas.</h1>
>>>>>>> e7378db40bd8bd8325ec48c0e53f0cc4922dadbf
          <div className="brands-container-home">
            {companies
              .filter((comp) => {
                return comp.accepted && comp.active;
              })
              .map((company) => {
                return <Item company={company} image={adidasLogo} />;
              })}
          </div>
        </div>
        :null}
      </div>
    </>
  );
};

<<<<<<< HEAD
export default Home;
=======
export default Home;
>>>>>>> e7378db40bd8bd8325ec48c0e53f0cc4922dadbf
