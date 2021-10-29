import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import "../../styles/components/__components-dir.scss";
import {  Bar } from 'react-chartjs-2'
import { statAgeRequest } from "../../actions/Statistics";
const AgeChart = ({}) => {
const dispatch = useDispatch();
const { video } = useParams();
const { ages } = useSelector((state) => ({
  ...state.stats,
}));
const [barData, setBarData] = useState({
  labels: [],
  datasets: [
    {
      label: 'Age Groups',
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
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
    }
    setBarData(aux)
console.log("hjj",aux)
  }
}, [ages]);



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
  {ages.length>0 &&
<Bar data={barData} options={barOptions} width={null} height={null} />
}
</div>
  );
};

export default AgeChart;
