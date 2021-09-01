import React, { useEffect, useState } from "react";

import "../../styles/components/__components-dir.scss";
const Select = ({item, changeInput}) => {
console.log(item.options)
  const [value, setValue] = useState(item.selected);
  const onChange = (event) => {

    setValue(event.target.value);
    changeInput(item.name, event.target.value);
  };
  return (
<div className="select">
  <h2 className="placeholder-white">{item.name}</h2>

 <select style={{color:"pink !important"}} placeholder={item.placeholder} onChange={onChange}>
 <option value="" disabled selected>{item.placeholder}</option>
 {item.options.map((option)=>
  <option value={option.value}>{option.name}</option>
  )}

</select>
</div>
  );
};

export default Select;
