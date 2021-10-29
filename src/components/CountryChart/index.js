import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import "../../styles/components/__components-dir.scss";
import {  Bar } from 'react-chartjs-2'
import { statCountryRequest } from "../../actions/Statistics";
import CircularProgress from "@material-ui/core/CircularProgress";
const CountryChart = ({}) => {
const dispatch = useDispatch();
const { video } = useParams();

const getColor = (cont) =>{
  if(cont===0){
    return {backgroundColor:'rgba(169, 177, 143, 0.4)',borderColor:'rgba(169, 177, 143, 1)'}
  }else  if(cont===1){
    return {backgroundColor:'rgba(203, 128, 125, 0.4)',borderColor:'rgba(203, 128, 125, 1)'}
  }else  if(cont===2){
    return {backgroundColor:'rgba(182, 132, 161, 0.4)',borderColor:'rgba(182, 132, 161, 1)'}
  }else  if(cont===3){
    return {backgroundColor:'rgba(240, 181, 179, 0.4)',borderColor:'rgba(240, 181, 179, 1)'}
  }else  if(cont===4){
    return {backgroundColor:'rgba(186, 153, 134, 0.4)',borderColor:'rgba(186, 153, 134, 1)'}
  }
}
<<<<<<< HEAD
const { country,loaderStatistics } = useSelector((state) => ({
=======
const { country,loaderStatistics,loaderCountry } = useSelector((state) => ({
>>>>>>> e7378db40bd8bd8325ec48c0e53f0cc4922dadbf
  ...state.stats,
}));
const [barData, setBarData] = useState({
  labels: [],
  datasets: [
    {
<<<<<<< HEAD
      label: 'Countries',
=======
      label: 'Paises',
>>>>>>> e7378db40bd8bd8325ec48c0e53f0cc4922dadbf
      backgroundColor: [],
      borderColor: [],
      borderWidth: 2,
      data: [],
    },
  ],
});
useEffect(() => {
  
  dispatch(statCountryRequest(video));
}, []);

useEffect(() => {
  let cont=0
  if(barData.labels.length===0 && country.length>0){
    let aux=barData
    for(let i=0;i<country.length;i++){
      aux.labels.push(country[i]._id)
      aux.datasets[0].data.push(country[i].total)
      aux.datasets[0].backgroundColor.push(getColor(cont).backgroundColor)
      aux.datasets[0].borderColor.push(getColor(cont).borderColor)
      if(cont<4){
        cont++
      }else{
        cont=0
      }
    }
    setBarData(aux)

  }
}, [country]);



const barOptions = {
  aspectRatio: 1.4,
  scales: {
    xAxes: [
      {
        stacked: true,
      },
    ],
    yAxes: [
      {
        stacked: true,
      },
    ],
  },
}


  return (
<div style={{width:"100%",height:"100%",display:"flex", justifyContent:"center",alignItems:"center"}}>
  {country.length>0 &&
<Bar data={barData} options={barOptions} width={null} height={null} />
}
<<<<<<< HEAD
{country.length === 0 && loaderStatistics &&
=======
{country.length === 0 && loaderCountry &&
>>>>>>> e7378db40bd8bd8325ec48c0e53f0cc4922dadbf
        <CircularProgress size={100} thickness={5} />
       }
</div>
  );
};

export default CountryChart;
