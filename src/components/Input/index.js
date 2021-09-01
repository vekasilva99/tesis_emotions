import React, { useEffect, useState } from "react";

import "../../styles/components/__components-dir.scss";
const Input = ({item, changeInput,white}) => {

  const [value, setValue] = useState(item.value);
  const onChange = (event) => {

    setValue(event.target.value);
    changeInput(item.name, event.target.value);
  };
  return (
<div className={white ? "input-white":"input"}>
  <h2 className="placeholder">{item.name}</h2>
 <input name={item.name} className={white ? "input-white-field" :"input-field"} value={value} placeholder={item.placeholder} type={item.type} onChange={onChange}/>
 
</div>
  );
};

export default Input;
