import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import "../../styles/components/__components-dir.scss";
import {  Pie, Doughnut } from 'react-chartjs-2'
import { statGenderRequest } from "../../actions/Statistics";
const GenderChart = ({}) => {
const dispatch = useDispatch();
const { video } = useParams();
const { gender } = useSelector((state) => ({
  ...state.stats,
}));
const [pieData, setPieData] = useState({
  labels: [],
  datasets: [
    {
      data: [],
      backgroundColor: ['#FF6384', '#36A2EB'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB'],
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
    }
    setPieData(aux)
console.log("hjj",aux)
  }
}, [gender]);



const pieOptions = {  
  aspectRatio: 1.4, }
  return (
<div style={{width:"100%",height:"100%",display:"flex", justifyContent:"center",alignItems:"center"}}>
  {gender.length>0 &&
<Pie data={pieData} options={pieOptions} width={null} height={null} />
}
</div>
  );
};

export default GenderChart;
