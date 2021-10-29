import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import "../../styles/components/__components-dir.scss";
import {  Line } from 'react-chartjs-2'
import { statAttentionRequest } from "../../actions/Statistics";
import CircularProgress from "@material-ui/core/CircularProgress";
const AttentionChart = ({}) => {
const dispatch = useDispatch();
const { video } = useParams();
<<<<<<< HEAD
const { attention,loaderStatistics } = useSelector((state) => ({
=======
const { attention,loaderStatistics,loaderAttention } = useSelector((state) => ({
>>>>>>> e7378db40bd8bd8325ec48c0e53f0cc4922dadbf
  ...state.stats,
}));
const [lineData, setLineData] = useState({
  labels: [],
  datasets: [
    {
<<<<<<< HEAD
      label: 'High Level of Attention',
=======
      label: 'Alto Nivel de Atención',
>>>>>>> e7378db40bd8bd8325ec48c0e53f0cc4922dadbf
      fill: false,
      lineTension: 0.3,
      backgroundColor: 'rgba(203, 128, 125, 0.4)',
      borderColor: 'rgba(203, 128, 125, 1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(203, 128, 125, 1)',
      pointBackgroundColor: 'rgba(203, 128, 125, 1)',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(203, 128, 125, 1)',
      pointHoverBorderColor: 'rgba(203, 128, 125, 1)',
      pointHoverBorderWidth: 2,
      pointRadius: 2,
      pointHitRadius: 10,
      data: [],
    },
    {
<<<<<<< HEAD
      label: 'Low Level of Attention',
=======
      label: 'Bajo Nivel de Atención',
>>>>>>> e7378db40bd8bd8325ec48c0e53f0cc4922dadbf
      fill: false,
      lineTension: 0.3,
      backgroundColor: 'rgba(169, 177, 143, 0.4)',
      borderColor: 'rgba(169, 177, 143, 1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(169, 177, 143, 1)',
      pointBackgroundColor: 'rgba(169, 177, 143, 1)',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(169, 177, 143, 1)',
      pointHoverBorderColor: 'rgba(169, 177, 143, 1)',
      pointHoverBorderWidth: 2,
      pointRadius: 2,
      pointHitRadius: 10,
      data: [],
    },
  ],
});
useEffect(() => {
  
  dispatch(statAttentionRequest(video));
}, []);

useEffect(() => {
  if(lineData.labels.length===0 && Object.keys(attention).length>0){
    let aux=lineData
    for(let i=0;i<attention.attentionValues.length;i++){
      aux.labels.push(attention.attentionValues[i]._id)
      aux.datasets[0].data.push(attention.attentionValues[i].total)
      aux.datasets[1].data.push(attention.notAttentionValues[i].total)
    }
    setLineData(aux)

  }
}, [attention]);





const lineOptions = {
  aspectRatio: 1.4,
  scales: {
    xAxes: [
      {
        display: false,
      },
    ],
  },
}


  return (
<div style={{width:"100%",height:"100%",display:"flex", justifyContent:"center",alignItems:"center"}}>
  {Object.keys(attention).length>0 &&
<Line data={lineData} options={lineOptions} width={null} height={null} />
}
<<<<<<< HEAD
{Object.keys(attention).length === 0 && loaderStatistics &&
=======
{Object.keys(attention).length === 0 && loaderAttention &&
>>>>>>> e7378db40bd8bd8325ec48c0e53f0cc4922dadbf
        <CircularProgress size={100} thickness={5} />
       }
</div>
  );
};

export default AttentionChart;
