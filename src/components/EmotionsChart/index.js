import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import "../../styles/components/__components-dir.scss";
import { Line } from "react-chartjs-2";
import { emotionsInVideoRequest } from "../../actions/Statistics";
import CircularProgress from "@material-ui/core/CircularProgress";
const EmotionsChart = ({ selectedEmotions }) => {
  const dispatch = useDispatch();
  const { video } = useParams();
  const { emotionsInVideo,loaderStatistics } = useSelector((state) => ({
    ...state.stats,
  }));
 
  const getColor = (cont) => {
    if (cont === 0) {
      return {
        backgroundColor: "rgba(169, 177, 143, 0.4)",
        borderColor: "rgba(169, 177, 143, 1)",
      };
    } else if (cont === 1) {
      return {
        backgroundColor: "rgba(203, 128, 125, 0.4)",
        borderColor: "rgba(203, 128, 125, 1)",
      };
    } else if (cont === 2) {
      return {
        backgroundColor: "rgba(182, 132, 161, 0.4)",
        borderColor: "rgba(182, 132, 161, 1)",
      };
    } else if (cont === 3) {
      return {
        backgroundColor: "rgba(240, 181, 179, 0.4)",
        borderColor: "rgba(240, 181, 179, 1)",
      };
    } else if (cont === 4) {
      return {
        backgroundColor: "rgba(186, 153, 134, 0.4)",
        borderColor: "rgba(186, 153, 134, 1)",
      };
    }
  };

  const getDatasetInfo = (label, cont) => {
    return {
      label: label,
      fill: false,
      lineTension: 0.3,
      backgroundColor: getColor(cont).backgroundColor,
      borderColor: getColor(cont).borderColor,
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: getColor(cont).backgroundColor,
      pointBackgroundColor: getColor(cont).backgroundColor,
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: getColor(cont).backgroundColor,
      pointHoverBorderColor: getColor(cont).backgroundColor,
      pointHoverBorderWidth: 2,
      pointRadius: 2,
      pointHitRadius: 10,
      data: [],
    };
  };

  const [lineData, setLineData] = useState({
    labels: [],
    datasets: [],
  });


  useEffect(() => {
    if (
      lineData.labels.length === 0 &&
      emotionsInVideo.length > 0 &&
      emotionsInVideo[0].emotionResults.length > 0
    ) {
      let aux = lineData;
      let cont = 0;
      // emotionsInVideo[0]
      for (let j = 0; j < emotionsInVideo[0].emotionResults.length; j++) {
        let auxData = getDatasetInfo(
          emotionsInVideo[0].emotionResults[j].name,
          cont
        );
        aux.datasets.push(auxData);
        if (cont < 4) {
          cont++;
        } else {
          cont = 0;
        }
      }
      for (let i = 0; i < emotionsInVideo.length; i++) {
        aux.labels.push(emotionsInVideo[i].time);
        for (let j = 0; j < emotionsInVideo[i].emotionResults.length; j++) {
          let auxData = aux.datasets;
          auxData[j].data.push(emotionsInVideo[i].emotionResults[j].views);
          aux.datasets = auxData;
        }
      }

      setLineData(aux);
    
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
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {emotionsInVideo.length > 0 && (
        <Line
          data={lineData}
          options={lineOptions}
          width={null}
          height={null}
        />
      )}

      {emotionsInVideo.length === 0 && loaderStatistics &&
        <CircularProgress size={100} thickness={5} />
       }
    </div>
  );
};

export default EmotionsChart;
