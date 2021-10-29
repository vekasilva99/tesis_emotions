import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import "../../styles/components/__components-dir.scss";
import {  Bar } from 'react-chartjs-2'
import { statAgeRequest } from "../../actions/Statistics";
import CircularProgress from "@material-ui/core/CircularProgress";
const AgeChart = ({}) => {
const dispatch = useDispatch();
const { video } = useParams();
<<<<<<< HEAD
const { ages,loaderStatistics } = useSelector((state) => ({
=======
const { ages,loaderStatistics,loaderAge } = useSelector((state) => ({
>>>>>>> e7378db40bd8bd8325ec48c0e53f0cc4922dadbf
  ...state.stats,
}));
const [barData, setBarData] = useState({
  labels: [],
  datasets: [
    {
<<<<<<< HEAD
      label: 'Age Groups',
=======
      label: 'Grupos Etarios',
>>>>>>> e7378db40bd8bd8325ec48c0e53f0cc4922dadbf
      backgroundColor: [
      ],
      borderColor: [
      ],
      borderWidth: 2,
      data: [],
    },
  ],
});
useEffect(() => {
  
  dispatch(statAgeRequest(video));
}, []);

useEffect(() => {
  if(barData.labels.length===0 && ages.length>0){
    let aux=barData
    for(let i=0;i<ages.length;i++){
      aux.labels.push(ages[i]._id)
      aux.datasets[0].data.push(ages[i].total)
      if(ages[i]._id==="Kids"){
        aux.datasets[0].backgroundColor.push("rgba(240, 181, 179, 0.4)")
        aux.datasets[0].borderColor.push("rgba(240, 181, 179, 1)")
      }else if(ages[i]._id==="Teenagers"){
        aux.datasets[0].backgroundColor.push("rgba(169, 177, 143, 0.4)")
        aux.datasets[0].borderColor.push("rgba(169, 177, 143, 1)")
      }else if(ages[i]._id==="Adults"){
        aux.datasets[0].backgroundColor.push("rgba(203, 128, 125, 0.4)")
        aux.datasets[0].borderColor.push("rgba(203, 128, 125, 1)")
      }else if(ages[i]._id==="Elderly"){
        aux.datasets[0].backgroundColor.push("rgba(182, 132, 161, 0.4)")
        aux.datasets[0].borderColor.push("rgba(182, 132, 161, 1)")
      }else{
        aux.datasets[0].backgroundColor.push("rgba(186, 153, 134, 0.4)")
        aux.datasets[0].borderColor.push("rgba(186, 153, 134, 1)")
      }

    }
    setBarData(aux)

  }
}, [ages]);



const barOptions = {
  aspectRatio: 1.4,
  scale:{
    lineWidth:5
  },
  scales: {
    xAxes: [
      {
        stacked: true,
        lineWidth:5
      },
    ],
    yAxes: [
      {
        stacked: true,
        lineWidth:5
      },
    ],
  },
 
}


  return (
<div style={{width:"100%",height:"100%",display:"flex", justifyContent:"center",alignItems:"center"}}>
  {ages.length>0 &&
<Bar data={barData} options={barOptions} width={null} height={null} />
}
<<<<<<< HEAD
{ages.length === 0 && loaderStatistics &&
=======
{ages.length === 0 && loaderAge &&
>>>>>>> e7378db40bd8bd8325ec48c0e53f0cc4922dadbf
        <CircularProgress size={100} thickness={5} />
       }
</div>
  );
};

export default AgeChart;
