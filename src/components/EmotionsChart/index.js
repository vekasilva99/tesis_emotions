import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import "../../styles/components/__components-dir.scss";
import {  Line } from 'react-chartjs-2'
import { emotionsInVideoRequest } from "../../actions/Statistics";
const EmotionsChart = ({selectedEmotions}) => {
const dispatch = useDispatch();
const { video } = useParams();
const { emotionsInVideo } = useSelector((state) => ({
  ...state.stats,
}));

const getDatasetInfo = (label) => {

  return {
    label: label,
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
  }
}

const [lineData, setLineData] = useState({
  labels: [],
  datasets: [],
});
console.log("KK",selectedEmotions)


useEffect(() => {
  

  if(lineData.labels.length===0 && emotionsInVideo.length>0 && emotionsInVideo[0].emotionResults.length>0){

    let aux=lineData
    // emotionsInVideo[0]
    for(let j=0;j<emotionsInVideo[0].emotionResults.length;j++){
      let auxData=getDatasetInfo(emotionsInVideo[0].emotionResults[j].name)
      aux.datasets.push(auxData)
      
      }
    for(let i=0;i<emotionsInVideo.length;i++){
      aux.labels.push(emotionsInVideo[i].time)
      for(let j=0;j<emotionsInVideo[i].emotionResults.length;j++){
        let auxData=aux.datasets
        auxData[j].data.push(emotionsInVideo[i].emotionResults[j].views)
        aux.datasets=auxData
        
        }

    }

    setLineData(aux)
console.log("Graph",aux)
  }
}, [emotionsInVideo]);





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
  {emotionsInVideo.length>0 &&
<Line data={lineData} options={lineOptions} width={null} height={null} />
}
</div>
  );
};

export default EmotionsChart;
