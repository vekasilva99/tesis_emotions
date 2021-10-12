import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../styles/components/__components-dir.scss";
const Input = ({
  item,
  changeInput,
  white,
  index,
  submitted,
  changeError,
  setSubmitted,
}) => {
  const [error, setError] = useState(item.error);
  const [value, setValue] = useState(item.value);
  const successCompany = useSelector((state) => ({ ...state.company.success }));
  useEffect(() => {
    if (Object.keys(successCompany).length > 0 ) {
      setValue("");
      changeInput(item.name, "");
    }
  }, [successCompany]);
  const onChange = (event) => {
    setSubmitted();
    setTimeout(() => {
      changeError(true, index, "");
    }, 400);

    setValue(event.target.value);
    changeInput(item.name, event.target.value);
  };
  useEffect(() => {
    setError(item.error);
  }, [submitted]);

  useEffect(() => {}, [item]);
  return (
    <div className={white ? "input-white" : "input"}>
      <h2 className="placeholder">{item.name}</h2>
      <input
        name={item.name}
        className={
          white
            ? item.error != ""
              ? "input-white-field error"
              : "input-white-field"
            : item.error != ""
            ? "input-field error"
            : "input-field"
        }
        value={value}
        placeholder={item.placeholder}
        type={item.type}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
