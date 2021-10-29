import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import "../../styles/components/__components-dir.scss";
import {  Line } from 'react-chartjs-2'
import { statAttentionRequest } from "../../actions/Statistics";
const AttentionChart = ({}) => {
const dispatch = useDispatch();
const { video } = useParams();
const { attention } = useSelector((state) => ({
  ...state.stats,
}));
const [lineData, setLineData] = useState({
  labels: [],
  datasets: [
    {
      label: 'High Level of Attention',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [],
    },
    {
      label: 'Low Level of Attention',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
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
console.log("Graph",aux)
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
</div>
  );
};

export default AttentionChart;
