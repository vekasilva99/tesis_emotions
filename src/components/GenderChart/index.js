import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import "../../styles/components/__components-dir.scss";
import {  Pie, Doughnut,defaults } from 'react-chartjs-2'
import { statGenderRequest } from "../../actions/Statistics";
import CircularProgress from "@material-ui/core/CircularProgress";
const GenderChart = ({}) => {
const dispatch = useDispatch();
const { video } = useParams();
const { gender,loaderStatistics,loaderGender } = useSelector((state) => ({
  ...state.stats,
}));

defaults.scale.grid.display=false
defaults.font.family='Exo-Medium'
defaults.color='black'
defaults.borderColor="black"
defaults.scale.grid.display=false
defaults.scale.grid.borderWidth=5
defaults.scale.grid.borderColor="white"
defaults.scale.ticks.padding=10
const [pieData, setPieData] = useState({
  labels: [],
  datasets: [
    {
      data: [],
      backgroundColor: [],
      hoverBackgroundColor: [],
    },
  ],
});
useEffect(() => {
  
  dispatch(statGenderRequest(video));
}, []);

useEffect(() => {
  if(pieData.labels.length===0 && gender.length>0){
    let aux=pieData
    for(let i=0;i<gender.length;i++){
      aux.labels.push(gender[i]._id)
      aux.datasets[0].data.push(gender[i].total)
      if(gender[i]._id==="Femenino"){
        aux.datasets[0].backgroundColor.push("#CB807D")
        aux.datasets[0].hoverBackgroundColor.push("#CB807D")
      }else if(gender[i]._id==="Masculino"){
        aux.datasets[0].backgroundColor.push("#A9B18F")
        aux.datasets[0].hoverBackgroundColor.push("#A9B18F") 
      }else{
        aux.datasets[0].backgroundColor.push("#BA9986")
        aux.datasets[0].hoverBackgroundColor.push("#BA9986") 
      }
    }
    setPieData(aux)

  }
}, [gender]);



const pieOptions = {  
  aspectRatio: 1.4,    
}
  return (
<div style={{width:"100%",height:"100%",display:"flex", justifyContent:"center",alignItems:"center"}}>
  {gender.length>0 &&
<Pie data={pieData} options={pieOptions} width={null} height={null} />
}
{gender.length === 0 && loaderGender &&
        <CircularProgress size={100} thickness={5} />
       }
</div>
  );
};

export default GenderChart;