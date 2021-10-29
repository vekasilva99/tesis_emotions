import React, { useEffect, useState } from "react";

import "../../styles/components/__components-dir.scss";
const Select = ({
  pink,
  index,
  submitted,
  large,
  item,
  changeInput,
  white,
  changeError,
  setSubmitted,
}) => {
  const [error, setError] = useState(item.error);
  const [value, setValue] = useState(item.value);
  const onChange = (event) => {
    setSubmitted();
    // setTimeout(() => {changeError(true, index, "");}, 400);

    changeError(false, index, "");
    setError("");
    setValue(event.target.value);
    changeInput(item.name, event.target.value);
  };
  useEffect(() => {
    setError(item.error);
    if (item.error != "") {
    }
  }, [submitted]);

  useEffect(() => {}, [item]);
  return (
    <div className={error === "" ? "select-white" : "select-white error-select"}>
      {/* <h2 className="placeholder-white">{item.name}</h2> */}
      <h2 className="placeholder">{item.name}</h2>
      <select
        style={{ color: "pink !important" }}
        placeholder={item.placeholder}
        onChange={onChange}
      >
     
        {item.options.map((option) => (
          <option value={option.value}>{option.name}</option>
        ))}
      </select>
    </div>
  );
};

export default Select;
