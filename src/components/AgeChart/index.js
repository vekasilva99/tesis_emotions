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
const { ages,loaderStatistics,loaderAge } = useSelector((state) => ({
  ...state.stats,
}));
const [barData, setBarData] = useState({
  labels: [],
  datasets: [
    {
      label: 'Grupos Etarios',
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
      if(ages[i]._id==="Niños"){
        aux.datasets[0].backgroundColor.push("rgba(240, 181, 179, 0.4)")
        aux.datasets[0].borderColor.push("rgba(240, 181, 179, 1)")
      }else if(ages[i]._id==="Adolescentes"){
        aux.datasets[0].backgroundColor.push("rgba(169, 177, 143, 0.4)")
        aux.datasets[0].borderColor.push("rgba(169, 177, 143, 1)")
      }else if(ages[i]._id==="Adultos"){
        aux.datasets[0].backgroundColor.push("rgba(203, 128, 125, 0.4)")
        aux.datasets[0].borderColor.push("rgba(203, 128, 125, 1)")
      }else if(ages[i]._id==="3era Edad"){
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
{ages.length === 0 && loaderAge &&
        <CircularProgress size={100} thickness={5} />
       }
</div>
  );
};

export default AgeChart;
