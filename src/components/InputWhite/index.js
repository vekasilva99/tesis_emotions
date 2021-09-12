import React, { useEffect, useState } from "react";

import "../../styles/components/__components-dir.scss";
const Input = ({pink, index, submitted,large,item, changeInput,white,changeError,setSubmitted}) => {
  const [error, setError] = useState(item.error);
  const [value, setValue] = useState(item.value);
  const onChange = (event) => {
    setSubmitted();
    setTimeout(() => {changeError(true, index, "");}, 400);
  
    
  
    setValue(event.target.value);
    changeInput(item.name, event.target.value);
  };
  useEffect(() => {
    setError(item.error);

  }, [submitted]);

  useEffect(() => {
    
  
  }, [item]);
  return (
<div className={large ? pink ? "input-white large-input pink": "input-white large-input":pink ? "input-white pink":"input-white"}>
  <h2 className={large ?"placeholder-white large-input" :"placeholder-white"}>{item.name}</h2>
 <input className={large ? pink ? item.error !="" ? "input-white-field large-input pink error" : "input-white-field large-input pink": item.error !="" ? "input-white-field large-input error" :"input-white-field large-input":pink ? item.error !="" ? "input-white-field pink error" :"input-white-field pink": item.error !="" ? "input-white-field error":"input-white-field"}name={item.name}  value={value} placeholder={item.placeholder} type={item.type} onChange={onChange}/>
 
</div>
  );
};

export default Input;
