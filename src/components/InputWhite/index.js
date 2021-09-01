import React, { useEffect, useState } from "react";

import "../../styles/components/__components-dir.scss";
const Input = ({item, changeInput,white}) => {

  const [value, setValue] = useState(item.value);
  const onChange = (event) => {

    setValue(event.target.value);
    changeInput(item.name, event.target.value);
  };
  return (
<div className="input-white">
  <h2 className="placeholder-white">{item.name}</h2>
 <input className="input-white-field"name={item.name}  value={value} placeholder={item.placeholder} type={item.type} onChange={onChange}/>
 
</div>
  );
};

export default Input;
