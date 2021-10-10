import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/components/__components-dir.scss";
const DatePick = ({selected,onChange,white,name,errorDate,submitted,removeError}) => {
  const [error, setError] = useState(errorDate);
  useEffect(() => {
    setError(errorDate);

  }, [submitted]);
  return (
<div className={white ? error!="" ? "input-white edit error-date": "input-white edit":error!="" ? "input edit error-date":"input edit"}>
  <h2 className="placeholder" >{name}</h2>
  <DatePicker selected={selected} onChange={(date) => {setError("");removeError();onChange(date)}} />
 
</div>
  );
};

export default DatePick;
